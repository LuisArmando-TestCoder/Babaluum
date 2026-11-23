import type { MetadataRoute } from "next";
import { POSTS } from "@/content/posts";
import { PROGRAM_PAGES } from "@/content/programPages";
import { PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";

const STATIC_ROUTES = ["", "/nosotros", "/equipo", "/programas", "/planes", "/metodo", "/proyectos", "/blog", "/testimonios", "/contacto", "/studio", "/privacidad", "/terminos"];

const sitemap = (): MetadataRoute.Sitemap => [
  ...STATIC_ROUTES.map((route) => ({ url: `${SITE.url}${route}` })),
  ...PROGRAM_PAGES.map((page) => ({ url: `${SITE.url}/programas/${page.slug}` })),
  ...PROJECTS.map((project) => ({ url: `${SITE.url}/proyectos/${project.slug}` })),
  ...POSTS.map((post) => ({ url: `${SITE.url}/blog/${post.slug}`, lastModified: post.date })),
];

export default sitemap;
