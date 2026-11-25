import { chromium } from "playwright-core";
import { MIN_FONT, MIN_TARGET, measurePage } from "./probes.js";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const WIDTHS = [360, 390, 430];
const EXTRA_ROUTES = ["/ruta-que-no-existe"];
const SETTLE_MS = 1500;
const STAGE_MS = 400;

const routesFromSitemap = async () => {
  const xml = await (await fetch(`${BASE_URL}/sitemap.xml`)).text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => new URL(url).pathname);
  return [...new Set([...paths, ...EXTRA_ROUTES])];
};

const launch = () =>
  process.env.CHROME_PATH ? chromium.launch({ executablePath: process.env.CHROME_PATH }) : chromium.launch({ channel: "chrome" });

const scrollThrough = async (page) => {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.evaluate(() => window.scrollTo(0, 0));
};

const LIMITS = { minTarget: MIN_TARGET, minFont: MIN_FONT };

const measureStages = async (page) => {
  const count = await page.evaluate(() => document.querySelectorAll("[data-cast-layer]").length);
  const found = [];
  for (let stage = 0; stage < count; stage += 1) {
    await page.evaluate((index) => document.querySelectorAll("[data-cast-layer]")[index].parentElement.scrollIntoView({ block: "center" }), stage);
    await page.waitForTimeout(STAGE_MS);
    found.push(await page.evaluate(measurePage, { ...LIMITS, stage }));
  }
  return found;
};

const auditRoute = async (context, { route, width }) => {
  const page = await context.newPage();
  await page.setViewportSize({ width, height: 844 });
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
  await scrollThrough(page);
  await page.waitForTimeout(SETTLE_MS);
  const found = [await page.evaluate(measurePage, LIMITS), ...(await measureStages(page))];
  await page.close();
  return found.flatMap((result) => Object.entries(result).flatMap(([check, issues]) => issues.map((issue) => `${route} @${width}px [${check}] ${issue}`)));
};

const auditAll = async (routes) => {
  const browser = await launch();
  const context = await browser.newContext({ isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const failures = [];
  for (const route of routes) {
    for (const width of WIDTHS) failures.push(...(await auditRoute(context, { route, width })));
  }
  await browser.close();
  return failures;
};

const routes = process.env.ROUTES ? process.env.ROUTES.split(",") : await routesFromSitemap();
const failures = [...new Set(await auditAll(routes))];
process.stdout.write(failures.length ? `${failures.join("\n")}\n\n${failures.length} mobile issues.\n` : `Mobile checks passed on ${routes.length} routes at ${WIDTHS.join(", ")}px.\n`);
process.exitCode = failures.length ? 1 : 0;
