import type { Tone } from "@/domain/design/tone";

export type Program = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  tone: Tone;
  format: string;
  duration: string;
  outcomes: readonly string[];
};

export const PROGRAMS: readonly Program[] = [
  {
    slug: "inteligencia-artificial",
    href: "/programas#inteligencia-artificial",
    title: "Inteligencia artificial",
    summary: "Contenido claro para entender la inteligencia artificial y aprovecharla en tu estudio y tu trabajo.",
    tone: "orange",
    format: "Blog, podcast y eventos",
    duration: "Contenido semanal",
    outcomes: ["Artículos y guías prácticas sobre IA", "Herramientas para estudiar y trabajar mejor", "Eventos de tecnología de la comunidad"],
  },
  {
    slug: "conciencia-ambiental",
    href: "/programas#conciencia-ambiental",
    title: "Conciencia ambiental",
    summary: "Ideas y ejemplos para vivir y trabajar de forma más sostenible.",
    tone: "purple",
    format: "Blog, podcast y eventos",
    duration: "Contenido semanal",
    outcomes: ["Artículos sobre sostenibilidad y moda consciente", "Ideas para consumir de forma más responsable", "Iniciativas con impacto social"],
  },
  {
    slug: "desarrollo-profesional",
    href: "/programas#desarrollo-profesional",
    title: "Desarrollo profesional",
    summary: "Herramientas y consejos para crecer en tu carrera, paso a paso.",
    tone: "red",
    format: "Blog, podcast y eventos",
    duration: "Contenido semanal",
    outcomes: ["Guías de crecimiento personal y profesional", "Conversaciones del podcast ¿Cómo lo hacen?", "Espacios para conectar con la comunidad"],
  },
  {
    slug: "programa-de-escritores",
    href: "/programas/programa-de-escritores",
    title: "Programa de escritores",
    summary: "Encontramos el talento, lo desarrollamos y lo potenciamos. Una iniciativa para jóvenes apasionados por la escritura.",
    tone: "lime",
    format: "Por convocatoria",
    duration: "Abre en 2027",
    outcomes: ["Acompañamiento editorial en cada artículo", "Publicación con tu firma en el blog de Babaluum", "Una comunidad de escritores para leer y ser leído"],
  },
  {
    slug: "podcast",
    href: "/programas#podcast",
    title: "¿Cómo lo hacen? Podcast",
    summary: "Conversaciones con quienes ya lo lograron: procesos, errores y aprendizajes.",
    tone: "green",
    format: "Entrevistas",
    duration: "Nuevos episodios",
    outcomes: ["Entrevistas con personas que ya recorrieron el camino", "Procesos, errores y aprendizajes en primera persona", "Ideas que puedes aplicar a tu carrera"],
  },
  {
    slug: "pasantias-y-voluntariados",
    href: "/programas/pasantias-y-voluntariados",
    title: "Pasantías y voluntariados",
    summary: "Aprende y desarróllate en un ambiente profesional liderando proyectos e iniciativas de impacto social.",
    tone: "navy",
    format: "Por convocatoria",
    duration: "Fechas abiertas",
    outcomes: ["Experiencia liderando proyectos reales", "Un equipo que te acompaña", "Una red de personas con tus intereses"],
  },
];

export type Offer = { id: string; tone: Tone; title: string; summary: string; headline: string; items: readonly string[]; cta: { label: string; href: string } };

const hasOwnPage = (program: Program): boolean => program.href === `/programas/${program.slug}`;

const offerCta = (program: Program): Offer["cta"] =>
  hasOwnPage(program) ? { label: "Conocer el programa", href: program.href } : { label: "Quiero inscribirme", href: `/contacto?programa=${program.slug}#mensaje` };

export const PROGRAM_OFFERS: readonly Offer[] = PROGRAMS.map((program) => ({
  id: program.slug,
  tone: program.tone,
  title: program.title,
  summary: program.summary,
  headline: program.duration,
  items: program.outcomes,
  cta: offerCta(program),
}));
