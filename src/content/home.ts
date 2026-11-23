import type { ImpactCopy } from "./impact";
import { buildMethod } from "./method";
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

const TEMPLATE_CARD = "Boost your website’s visibility and attract organic traffic with SEO tailored to your business goals.";

const TEMPLATE_POINT = "With years of experience and a track record of delivering measurable results, we craft strategies that work.";

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
  cards: PROGRAMS.map((program) => ({ ...program, summary: TEMPLATE_CARD })),
};

const whyPoints: readonly WhyPoint[] = [
  { title: "Proven expertise", body: TEMPLATE_POINT, stat: { value: "300+", label: "Successful Campaigns Launched Industries", tone: "purple" } },
  { title: "Data-driven approach", body: TEMPLATE_POINT, stat: { value: "200%", label: "Growth in Conversion Rates on Average", tone: "red" } },
];

const whyChoose = {
  eyebrow: "Why choose us!",
  title: "Why Revento is the trusted choice",
  aside: "Experience growth through innovative digital marketing designed to reach, inspire, and deliver results.",
  points: whyPoints,
};

const TEMPLATE_SPRINT = "Identify target audience segments and key value propositions. Develop a comprehensive marketing strategy.";

const method = buildMethod({
  eyebrow: "How we work",
  title: "Our working method",
  steps: [
    {
      title: "Understanding your business",
      body: "We begin by getting to know your brand, industry, and audience. By understanding your challenges, goals, and unique value, we lay the foundation.",
    },
    {
      title: "Strategic planning and creative execution",
      body: "Based on in-depth research and data analysis, we craft a strategic roadmap that outlines clear objectives, timelines, and key deliverables.",
    },
    {
      title: "Collaboration and optimization",
      body: "We begin by getting to know your brand, industry, and audience. By understanding your challenges, goals, and unique value.",
    },
    {
      title: "Delivering and reporting results",
      body: "Our ultimate goal is your success. Whether it’s driving more traffic, increasing conversions, or boosting brand awareness, we focus on impactful results.",
    },
  ],
  phases: [
    { title: "Strategy", duration: "Duration: 3 Weeks", tags: ["Functionality", "Goals", "Ideation", "Research"] },
    { title: "Discovery", duration: "Duration: 3 Weeks", tags: ["User Interviews", "Target", "Flow Chart", "Preliminary"] },
    { title: "Solution", duration: "Duration: 4 Weeks", tags: ["Design Materials", "Copywriting", "Target", "Contents"] },
  ],
  brand: {
    palette: { source: "Marketing Material Design", page: "Page 05", title: "Color Pallete", note: "At Revento, we believe that colors speak louder than words." },
    typography: { title: "Typography", note: "Typography That Amplifies", primaryLabel: "Primary font", secondaryLabel: "Secondary font" },
    posts: { title: "Marketing Posts", note: "Engaging Designs That Drive Social Media Success", handle: "Revento" },
  },
  sprints: {
    first: { title: "1-3 Sprints", hours: "2.30 hrs", heading: "Discovery and Strategy Development and Conduct market research", body: TEMPLATE_SPRINT },
    notes: { title: "Note Taking Session", note: "Notes for Marketing Research" },
    second: { title: "3-5 Sprints", hours: "2.30 hrs", heading: "Discovery and Strategy Development", body: TEMPLATE_SPRINT },
  },
  results: {
    chart: { title: "Exploration and Problem Definition", body: "Understand the market landscape, identify key challenges.", caption: "Research Conduct Phase 1" },
    campaign: { title: "Campaign Results", note: "Industry reports and trends Q3", metricLabel: "Traffic increase", metric: "85%" },
  },
});

const impact: ImpactCopy = {
  title: "Redefining digital impact with innovative strategies that drive real results!",
  note: "Boost your website’s visibility and attract organic traffic",
  pills: { top: "Dynamic Visuals", left: "Business Growth", right: "Brand Strategy", bottom: "Performance Metrics" },
};

const blogs = { eyebrow: "Our works", title: "Our featured blogs", subject: "Blog", cursor: "Leer" };

export const HOME = { hero, integrated, whyChoose, method, impact, blogs };
