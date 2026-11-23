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

type ProjectSeed = Pick<Project, "slug" | "title" | "summary" | "cover" | "area" | "objective" | "challenges" | "solution" | "strategy">;

const initiative = (seed: ProjectSeed): Project => ({ ...seed, client: "Babaluum", duration: "Iniciativa permanente", gallery: [IMAGES.prototype, IMAGES.loft], results: [] });

export const PROJECTS: readonly Project[] = [
  initiative({
    slug: "podcast-como-lo-hacen",
    title: "¿Cómo lo hacen? Podcast",
    summary: "Conversaciones con quienes ya recorrieron el camino.",
    cover: IMAGES.setup,
    area: "Desarrollo profesional",
    objective: "Acercar a estudiantes y profesionales las historias, los procesos y los aprendizajes de personas que ya lograron lo que ellos buscan.",
    challenges: ["Hacer preguntas que de verdad sirvan a quien escucha.", "Convertir una trayectoria larga en ideas aplicables.", "Mantener conversaciones cercanas y sin poses."],
    solution: "Entrevistas en las que cada invitado cuenta cómo lo hizo: qué funcionó, qué no y qué haría distinto.",
    strategy: "Elegimos invitados de las tres áreas de Babaluum y compartimos cada episodio con la comunidad junto al contenido del blog.",
  }),
  initiative({
    slug: "blog-babaluum",
    title: "Blog Babaluum",
    summary: "Artículos y guías sobre IA, sostenibilidad y crecimiento.",
    cover: IMAGES.desk,
    area: "Contenido",
    objective: "Publicar contenido accesible que ayude a entender lo que está cambiando en tecnología, sostenibilidad y desarrollo personal y profesional.",
    challenges: ["Explicar temas complejos con claridad.", "Sostener un ritmo constante de publicación.", "Dar espacio a voces nuevas."],
    solution: "Un blog escrito por jóvenes autores con acompañamiento editorial, organizado por categorías.",
    strategy: "Cada artículo parte de una pregunta real de la comunidad y se comparte en el newsletter y en redes.",
  }),
  initiative({
    slug: "newsletter-semanal",
    title: "Newsletter semanal",
    summary: "Contenido exclusivo en tu correo, cada semana.",
    cover: IMAGES.windows,
    area: "Comunidad",
    objective: "Mantener a la comunidad al día con contenido, convocatorias y eventos sin depender de los algoritmos de las redes.",
    challenges: ["Llegar a la bandeja de entrada con algo que valga abrir.", "Reunir en un solo lugar blog, podcast y eventos."],
    solution: "Un boletín gratuito con lo más reciente de Babaluum y las oportunidades abiertas.",
    strategy: "Quien se suscribe recibe primero las convocatorias de programas y las invitaciones a eventos.",
  }),
  initiative({
    slug: "programa-de-escritores",
    title: "Programa de escritores",
    summary: "Encontramos el talento, lo desarrollamos y lo potenciamos.",
    cover: IMAGES.pencils,
    area: "Programas",
    objective: "Dar a jóvenes apasionados por la escritura un espacio para formarse y publicar con su firma.",
    challenges: ["Encontrar voces con algo que decir.", "Acompañar el proceso de escribir, editar y publicar."],
    solution: "Un programa en el que cada autor trabaja sus artículos con retroalimentación antes de publicarlos en el blog.",
    strategy: "Los artículos se organizan en las áreas de Babaluum y se difunden con toda la comunidad.",
  }),
  initiative({
    slug: "programa-de-voluntariado",
    title: "Programa de voluntariado",
    summary: "Voluntarios que lideran proyectos de impacto social.",
    cover: IMAGES.teamTable,
    area: "Programas",
    objective: "Que nuestro equipo de voluntarios aprenda y se desarrolle en un ambiente profesional liderando proyectos e iniciativas de impacto social.",
    challenges: ["Dar responsabilidades reales desde el inicio.", "Acompañar a cada persona en su crecimiento."],
    solution: "Un voluntariado en el que cada integrante asume un rol dentro de las iniciativas de Babaluum.",
    strategy: "Los voluntarios apoyan eventos, contenido y proyectos, y forman una red entre sí.",
  }),
  initiative({
    slug: "eventos-babaluum",
    title: "Eventos Babaluum",
    summary: "De tecnología a crecimiento personal y profesional.",
    cover: IMAGES.stage,
    area: "Eventos",
    objective: "Crear espacios para aprender en persona y conectar con gente con intereses afines.",
    challenges: ["Reunir temas distintos bajo una misma comunidad.", "Lograr que cada encuentro deje algo aplicable."],
    solution: "Eventos que van desde tecnología hasta espacios de crecimiento personal y profesional.",
    strategy: "Trabajamos con aliados y colaboraciones especiales para llevar cada evento más lejos.",
  }),
];

export const findProject = (slug: string): Project | undefined => PROJECTS.find((item) => item.slug === slug);

export const PROJECT_SLIDES = PROJECTS.map((item) => ({ href: `/proyectos/${item.slug}`, title: item.title, summary: item.summary, cover: item.cover }));
