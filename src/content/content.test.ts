import { describe, expect, it } from "vitest";
import { FAQS } from "./faqs";
import { FOUNDER } from "./founder";
import { HOME } from "./home";
import { IMPACT } from "./impact";
import { METHOD } from "./method";
import { NEWSLETTER, SIGNUP } from "./newsletter";
import { PLANS } from "./plans";
import { POSTS } from "./posts";
import { PROGRAM_PAGES } from "./programPages";
import { PROGRAMS } from "./programs";
import { PROJECTS } from "./projects";
import { EXPLORE_NAV, FOOTER_NAV, PRIMARY_NAV, SITE } from "./site";
import { IMPACT_STATS } from "./stats";
import { STUDIO, STUDIO_BAND } from "./studio";
import { TEAM } from "./team";
import { TESTIMONIALS } from "./testimonials";

const EVERYTHING = JSON.stringify([FAQS, PLANS, POSTS, PROJECTS, IMPACT_STATS, TEAM, FOUNDER, HOME, IMPACT, METHOD, NEWSLETTER, SIGNUP, PROGRAM_PAGES, PROGRAMS, EXPLORE_NAV, FOOTER_NAV, PRIMARY_NAV, SITE, STUDIO, STUDIO_BAND]);

const TEMPLATE_LEFTOVERS = ["Revento", "Boost your website", "digital marketing", "Lorem ipsum", "4000 0000", "/mes", "48 horas"];

describe("site copy", () => {
  it.each(TEMPLATE_LEFTOVERS)("has no template text left: %s", (leftover) => {
    expect(EVERYTHING).not.toContain(leftover);
  });
});

describe("people and quotes", () => {
  it("lists no invented testimonials", () => {
    expect(TESTIMONIALS).toEqual([]);
  });

  it("names only the founder on the team until real profiles arrive", () => {
    expect(TEAM.map((member) => member.name)).toEqual(["Mariana Murillo"]);
  });

  it("links every article to its original on babaluum.com", () => {
    expect(POSTS.every((post) => post.source.startsWith("https://www.babaluum.com/post/"))).toBe(true);
  });
});
