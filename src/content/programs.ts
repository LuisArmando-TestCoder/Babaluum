import type { Tone } from "@/domain/design/tone";

export type Program = { slug: string; title: string; summary: string; tone: Tone };

export const PROGRAMS: readonly Program[] = [
  { slug: "ia-aplicada", title: "Inteligencia artificial aplicada", summary: "Aprende a crear con IA de forma ética y útil: prompts, automatizaciones y proyectos reales para tu comunidad.", tone: "orange" },
  { slug: "creacion-de-contenido", title: "Creación de contenido", summary: "Del guion a la publicación: narrativa, video corto y diseño para que tus ideas lleguen lejos.", tone: "purple" },
  { slug: "conciencia-ambiental", title: "Conciencia ambiental", summary: "Proyectos de impacto con organizaciones locales para cuidar el planeta y medir lo que cambia.", tone: "red" },
  { slug: "desarrollo-profesional", title: "Desarrollo profesional", summary: "Mentorías, portafolio y habilidades blandas para dar el siguiente paso en tu carrera.", tone: "lime" },
  { slug: "voluntariados", title: "Voluntariados", summary: "Pon tu talento al servicio de causas que importan y suma experiencia con propósito.", tone: "green" },
  { slug: "podcast", title: "Podcast ¿Cómo lo hacen?", summary: "Conversaciones con quienes ya lo lograron: procesos, errores y aprendizajes sin filtro.", tone: "navy" },
];

export const HERO_TAGS = ["Programas", "Podcast", "Voluntariados"] as const;
