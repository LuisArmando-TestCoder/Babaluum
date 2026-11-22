import type { ImageAsset } from "@/domain/design/media";
import { IMAGES } from "./images";

export type PostSection = { heading: string; paragraphs: readonly string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  cover: ImageAsset;
  sections: readonly PostSection[];
  pullQuote: { lead: string; highlight: string };
};

const BODY = [
  "El panorama digital cambia cada semana. Quienes crean contenido con propósito necesitan herramientas nuevas, pero sobre todo criterio para elegir cuáles usar y para qué.",
  "En Babaluum lo vemos todos los días: la tecnología amplifica, pero lo que mueve a la gente es una historia honesta contada con constancia.",
];

const SECTIONS: readonly PostSection[] = [
  { heading: "1. La IA como copiloto creativo", paragraphs: BODY },
  { heading: "2. Personalización con propósito", paragraphs: BODY },
  { heading: "3. Voz, video y formatos cortos", paragraphs: BODY },
  { heading: "4. Contenido interactivo e inmersivo", paragraphs: BODY },
  { heading: "5. Sostenibilidad y marcas responsables", paragraphs: BODY },
];

type PostSeed = Pick<Post, "slug" | "title" | "cover" | "category">;

const post = ({ slug, title, cover, category }: PostSeed): Post => ({
  slug,
  title,
  excerpt: "Una guía práctica para crear con datos, intención y comunidad.",
  category,
  author: "Equipo Babaluum",
  date: "2025-10-14",
  cover,
  sections: SECTIONS,
  pullQuote: { lead: "Más impacto con menos ruido:", highlight: "crea con intención y mide lo que importa." },
});

export const POSTS: readonly Post[] = [
  post({ slug: "tendencias-2025", title: "El futuro del contenido con impacto: tendencias para 2025", cover: IMAGES.desk, category: "Contenido" }),
  post({ slug: "ia-para-ong", title: "Cómo usar IA en tu ONG sin perder tu voz", cover: IMAGES.windows, category: "IA" }),
  post({ slug: "portafolio-que-abre-puertas", title: "Un portafolio que abre puertas", cover: IMAGES.pencils, category: "Carrera" }),
  post({ slug: "podcast-desde-cero", title: "Tu podcast desde cero en 30 días", cover: IMAGES.posters, category: "Podcast" }),
  post({ slug: "campanas-ambientales", title: "Campañas ambientales que sí movilizan", cover: IMAGES.wall, category: "Ambiente" }),
  post({ slug: "medir-impacto", title: "Medir el impacto social sin complicarse", cover: IMAGES.prototype, category: "Impacto" }),
  post({ slug: "voluntariado-digital", title: "Voluntariado digital: guía rápida", cover: IMAGES.gallery, category: "Comunidad" }),
  post({ slug: "narrativa-corta", title: "Narrativa para video corto", cover: IMAGES.illustration, category: "Contenido" }),
];

export const findPost = (slug: string): Post | undefined => POSTS.find((item) => item.slug === slug);

export const formatPostDate = (iso: string): string =>
  new Intl.DateTimeFormat("es-CR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${iso}T12:00:00`));
