import { IMPACT } from "./impact";
import { METHOD } from "./method";
import { PROGRAMS } from "./programs";
import { HEADER_ACTIONS, SITE } from "./site";
import type { Stat } from "./stats";

export type HeroCopy = {
  tagline: string;
  title: { brand: string; hub: string; sticker: readonly [string, string]; bridge: string; body: string; impact: string; close: string };
  lead: string;
  action: { label: string; href: string };
  tags: readonly string[];
  statement: { lead: string; rest: string };
  stats: readonly Stat[];
  note: string;
};

export type WhyPoint = { title: string; body: string; stat: Stat };

const hero: HeroCopy = {
  tagline: SITE.tagline,
  title: { brand: "Babaluum", hub: "El hub", sticker: ["De mentes", "inquietas"], bridge: "para", body: "crear contenido y un", impact: "impacto social", close: "real" },
  lead: "Creamos y promovemos contenido sobre Tecnología, Sostenibilidad y Desarrollo Profesional para estudiantes y profesionales en constante actualización.",
  action: HEADER_ACTIONS.join,
  tags: ["Programas", "Podcast", "Voluntariados"],
  statement: { lead: "También te ayudamos a impulsar tu talento", rest: "a través de nuestras iniciativas." },
  stats: [
    { value: "+1500", label: "Personas ya son miembros de nuestra comunidad.", tone: "green" },
    { value: "Únete a nuestra red", label: "+600 ejecutivos, profesionales y estudiantes ya son parte de la red Babaluum. ¿Y vos?", tone: "lime" },
  ],
  note: "Conectamos a nuestra comunidad con recursos, personas y oportunidades que facilitan la comprensión de estas áreas y transformen su vida profesional. Forma parte de nuestra red y comienza a crear un impacto real.",
};

const integrated = {
  eyebrow: "No somos solo un blog, ni solo un podcast, ni solo una comunidad",
  title: "Somos todo eso, integrado y con propósito.",
  aside:
    "Combinamos contenido curado en tres categorías, comunidad activa y programas de desarrollo profesional para crear una experiencia de crecimiento real, accesible y transformadora.",
  cards: PROGRAMS,
};

const whyPoints: readonly WhyPoint[] = [
  {
    title: "Contenido que sí ayuda",
    body: "Blogs, podcast y entrevistas sobre tecnología, sostenibilidad y desarrollo profesional, explicados con claridad.",
    stat: { value: "+1500", label: "Personas en nuestra comunidad", tone: "purple" },
  },
  {
    title: "Oportunidades reales",
    body: "Programas, pasantías, voluntariados y eventos para poner en práctica lo que aprendes.",
    stat: { value: "+600", label: "Ejecutivos, profesionales y estudiantes en la red", tone: "red" },
  },
];

const whyChoose = {
  eyebrow: "¿Por qué Babaluum?",
  title: "Por qué elegir Babaluum",
  aside: "Acercamos herramientas, plataformas y oportunidades profesionales a quienes quieren seguir aprendiendo.",
  points: whyPoints,
};

const blogs = { eyebrow: "Blog", title: "Artículos destacados", subject: "Artículo", cursor: "Leer" };

export const HOME = { hero, integrated, whyChoose, method: METHOD, impact: IMPACT, blogs };
