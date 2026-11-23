import type { Accent } from "@/domain/design/tone";
import type { ImageAsset } from "@/domain/design/media";
import { IMAGES } from "./images";
import type { NewsletterCopy } from "./newsletter";
import type { Offer } from "./programs";

export type ProgramPage = {
  slug: string;
  title: string;
  hook: string;
  accent: Accent;
  companion: "alien" | "robot" | "globe";
  promise: { lead: string; highlight: string };
  about: { title: string; highlight: string; paragraphs: readonly string[]; image: ImageAsset };
  tracks: { eyebrow: string; title: string; aside: string; offers: readonly Offer[] };
  waitlist?: NewsletterCopy;
};

const SIGNUP_LINKS = {
  writers: "#boletin",
  volunteer: "/contacto?programa=pasantias-y-voluntariados#mensaje",
  intern: "/contacto?programa=pasantias-y-voluntariados#mensaje",
} as const;

const writers: ProgramPage = {
  slug: "programa-de-escritores",
  title: "Programa de escritores",
  hook: "Escribe sobre tecnología, sostenibilidad y carrera, y publica con tu firma ante una comunidad que sí lee.",
  accent: "lime",
  companion: "robot",
  promise: { lead: "Tu primera publicación no debería esperar a que alguien te descubra.", highlight: "Aquí escribes, te editamos y publicas." },
  about: {
    title: "Un programa para",
    highlight: "encontrar tu voz y publicarla",
    paragraphs: [
      "El Programa de escritores acompaña a estudiantes y profesionales que quieren escribir con criterio sobre inteligencia artificial, conciencia ambiental y desarrollo profesional.",
      "Trabajas con una persona editora, recibes retroalimentación en cada entrega y publicas en el blog de Babaluum con tu nombre. Sales con piezas reales para tu portafolio.",
    ],
    image: IMAGES.desk,
  },
  tracks: {
    eyebrow: "Inscripciones 2027",
    title: "Lo que te llevas",
    aside: "Las inscripciones abren el próximo año. Deja tu correo y te avisamos antes que a nadie.",
    offers: [
      {
        id: "escritores",
        tone: "lime",
        title: "Programa de escritores",
        summary: "Para quienes quieren escribir mejor y publicar de verdad.",
        headline: "Abre en 2027",
        items: [
          "Acompañamiento editorial en cada artículo",
          "Publicación con tu firma en el blog de Babaluum",
          "Una comunidad de escritores para leer y ser leído",
          "Piezas publicadas para tu portafolio",
        ],
        cta: { label: "Avísame cuando abran", href: SIGNUP_LINKS.writers },
      },
    ],
  },
  waitlist: {
    title: "Entérate primero cuando abran",
    aside: "Te escribimos el día que abran las inscripciones del Programa de escritores. Sin spam.",
    action: "Avísame",
    interest: "escritores",
  },
};

const fieldwork: ProgramPage = {
  slug: "pasantias-y-voluntariados",
  title: "Pasantías y voluntariados",
  hook: "Suma experiencia real en proyectos con impacto social, con un equipo que te acompaña.",
  accent: "green",
  companion: "globe",
  promise: { lead: "La experiencia que piden en todas las vacantes", highlight: "se consigue haciendo. Empieza aquí." },
  about: {
    title: "Dos caminos para",
    highlight: "aprender haciendo",
    paragraphs: [
      "En Babaluum creamos contenido, organizamos eventos y desarrollamos proyectos con impacto social. Las pasantías y los voluntariados son la puerta para ser parte de ese trabajo.",
      "Te integras a un equipo, asumes responsabilidades reales y recibes guía de personas con experiencia. Al terminar tienes resultados que mostrar y contactos que valen.",
    ],
    image: IMAGES.teamTable,
  },
  tracks: {
    eyebrow: "Elige tu camino",
    title: "Voluntariado o pasantía",
    aside: "Cuéntanos qué te interesa y te contactamos con los siguientes pasos.",
    offers: [
      {
        id: "voluntariado",
        tone: "green",
        title: "Voluntariado",
        summary: "Para quienes quieren aportar su tiempo y talento a iniciativas con propósito.",
        headline: "Tiempo flexible",
        items: ["Apoyo en eventos, contenido y proyectos", "Horarios que se adaptan a tu estudio o trabajo", "Una red de personas con tus mismos intereses"],
        cta: { label: "Quiero ser voluntario", href: SIGNUP_LINKS.volunteer },
      },
      {
        id: "pasantia",
        tone: "purple",
        title: "Pasantía",
        summary: "Para estudiantes y recién graduados que buscan su primera experiencia profesional.",
        headline: "Con acompañamiento",
        items: ["Un rol definido dentro de un equipo real", "Guía de personas con experiencia", "Experiencia comprobable para tu currículum"],
        cta: { label: "Quiero una pasantía", href: SIGNUP_LINKS.intern },
      },
    ],
  },
};

export const PROGRAM_PAGES: readonly ProgramPage[] = [writers, fieldwork];

export const findProgramPage = (slug: string): ProgramPage | undefined => PROGRAM_PAGES.find((page) => page.slug === slug);
