import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/", disallow: "/api/" },
  sitemap: `${SITE.url}/sitemap.xml`,
});

export default robots;
