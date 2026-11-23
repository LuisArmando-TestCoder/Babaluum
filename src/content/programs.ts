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
    format: "En línea, en vivo",
    duration: "8 semanas",
    outcomes: ["Prompts y flujos de trabajo con IA", "Automatizaciones para tu día a día", "Un proyecto aplicado a una causa real"],
  },
  {
    slug: "conciencia-ambiental",
    href: "/programas#conciencia-ambiental",
    title: "Conciencia ambiental",
    summary: "Ideas y ejemplos para vivir y trabajar de forma más sostenible.",
    tone: "purple",
    format: "Presencial y en campo",
    duration: "10 semanas",
    outcomes: ["Diagnóstico ambiental de tu comunidad", "Campaña con una organización aliada", "Indicadores de impacto medidos"],
  },
  {
    slug: "desarrollo-profesional",
    href: "/programas#desarrollo-profesional",
    title: "Desarrollo profesional",
    summary: "Herramientas y consejos para crecer en tu carrera, paso a paso.",
    tone: "red",
    format: "En línea, con mentoría",
    duration: "6 semanas",
    outcomes: ["Portafolio revisado por mentores", "Entrevistas y presentaciones en práctica", "Un plan de carrera a 12 meses"],
  },
  {
    slug: "programa-de-escritores",
    href: "/programas/programa-de-escritores",
    title: "Programa de escritores",
    summary: "Escribe y publica artículos sobre tecnología, sostenibilidad y carrera con acompañamiento editorial.",
    tone: "lime",
    format: "En línea, con edición",
    duration: "Abre en 2027",
    outcomes: ["Un artículo publicado en el blog de Babaluum", "Retroalimentación editorial en cada entrega", "Tu firma en un portafolio de escritura"],
  },
  {
    slug: "podcast",
    href: "/programas#podcast",
    title: "¿Cómo lo hacen? Podcast",
    summary: "Conversaciones con quienes ya lo lograron: procesos, errores y aprendizajes.",
    tone: "green",
    format: "Audio y video",
    duration: "Quincenal",
    outcomes: ["Entrevistas con creadores y líderes", "Sesiones en vivo con preguntas", "Guías descargables de cada episodio"],
  },
  {
    slug: "pasantias-y-voluntariados",
    href: "/programas/pasantias-y-voluntariados",
    title: "Pasantías y voluntariados",
    summary: "Pon tu talento al servicio de causas que importan y suma experiencia con propósito.",
    tone: "navy",
    format: "Presencial",
    duration: "Fechas abiertas",
    outcomes: ["Jornadas con organizaciones aliadas", "Horas de voluntariado certificadas", "Una red de personas con tus intereses"],
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
