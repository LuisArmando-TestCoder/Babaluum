import { describe, expect, it } from "vitest";
import { FOUNDER } from "./founder";
import { HOME } from "./home";
import { IMPACT } from "./impact";
import { METHOD } from "./method";
import { NEWSLETTER, SIGNUP } from "./newsletter";
import { PROGRAM_PAGES } from "./programPages";
import { PROGRAMS } from "./programs";
import { EXPLORE_NAV, FOOTER_NAV, PRIMARY_NAV, SITE } from "./site";
import { STUDIO, STUDIO_BAND } from "./studio";

const EVERYTHING = JSON.stringify([FOUNDER, HOME, IMPACT, METHOD, NEWSLETTER, SIGNUP, PROGRAM_PAGES, PROGRAMS, EXPLORE_NAV, FOOTER_NAV, PRIMARY_NAV, SITE, STUDIO, STUDIO_BAND]);

const TEMPLATE_LEFTOVERS = ["Revento", "Boost your website", "digital marketing", "Lorem ipsum"];

describe("site copy", () => {
  it.each(TEMPLATE_LEFTOVERS)("has no template text left: %s", (leftover) => {
    expect(EVERYTHING).not.toContain(leftover);
  });
});
