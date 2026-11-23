import type { ImageAsset } from "@/domain/design/media";
import type { Stat } from "./stats";
import { IMAGES } from "./images";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  cover: ImageAsset;
  client: string;
  area: string;
  duration: string;
  objective: string;
  challenges: readonly string[];
  solution: string;
  strategy: string;
  gallery: readonly ImageAsset[];
  results: readonly Stat[];
};

const RESULTS: readonly Stat[] = [
  { value: "4.5X", label: "Más participación", body: "Frente a la campaña anterior de la organización.", tone: "purple" },
  { value: "10K+", label: "Personas inscritas", body: "En las actividades de la campaña.", tone: "green" },
  { value: "10M+", label: "Impresiones", body: "Generadas en redes sociales.", tone: "navy" },
];

type ProjectSeed = Pick<Project, "slug" | "title" | "summary" | "cover" | "area">;

const project = ({ slug, title, summary, cover, area }: ProjectSeed): Project => ({
  slug,
  title,
  summary,
  cover,
  client: "Comunidad Babaluum",
  area,
  duration: "6 semanas",
  objective: `Lanzar ${title.toLowerCase()} y conectar a la comunidad con una causa concreta, construyendo una presencia digital sólida y medible.`,
  challenges: ["Entrar a una conversación saturada con un mensaje propio.", "Generar confianza con una audiencia nueva.", "Llegar a públicos diversos en varias plataformas."],
  solution: "Diseñamos una identidad clara, una serie de contenidos cortos y una ruta de voluntariado que convirtió la atención en acción.",
  strategy: "Combinamos narrativa, datos de audiencia y alianzas locales. Cada pieza tuvo un objetivo y una métrica, y ajustamos semana a semana según los resultados.",
  gallery: [IMAGES.prototype, IMAGES.loft],
  results: RESULTS,
});

export const PROJECTS: readonly Project[] = [
  project({ slug: "reciclaje-que-suma", title: "Reciclaje que suma", summary: "Campaña de generación de voluntarios para una organización ambiental.", cover: IMAGES.shelf, area: "Conciencia ambiental" }),
  project({ slug: "marca-con-proposito", title: "Marca con propósito", summary: "Identidad y alcance para un emprendimiento social.", cover: IMAGES.sketchbook, area: "Creación de contenido" }),
  project({ slug: "avatar-educativo", title: "Avatar educativo", summary: "Un personaje con IA que enseña finanzas a jóvenes.", cover: IMAGES.avatar, area: "Inteligencia artificial" }),
  project({ slug: "feria-de-talento", title: "Feria de talento", summary: "Evento híbrido que conectó estudiantes y empresas.", cover: IMAGES.posters, area: "Desarrollo profesional" }),
  project({ slug: "costas-limpias", title: "Costas limpias", summary: "Serie documental corta sobre limpieza de playas.", cover: IMAGES.wall, area: "Conciencia ambiental" }),
  project({ slug: "ilustra-tu-barrio", title: "Ilustra tu barrio", summary: "Convocatoria de ilustración comunitaria.", cover: IMAGES.illustration, area: "Creación de contenido" }),
  project({ slug: "movilidad-verde", title: "Movilidad verde", summary: "Prototipo de app para viajes compartidos.", cover: IMAGES.prototype, area: "Inteligencia artificial" }),
  project({ slug: "noches-de-podcast", title: "Noches de podcast", summary: "Temporada en vivo de ¿Cómo lo hacen?.", cover: IMAGES.setup, area: "Podcast" }),
];

export const findProject = (slug: string): Project | undefined => PROJECTS.find((item) => item.slug === slug);

export const PROJECT_SLIDES = PROJECTS.map((item) => ({ href: `/proyectos/${item.slug}`, title: item.title, summary: item.summary, cover: item.cover }));
