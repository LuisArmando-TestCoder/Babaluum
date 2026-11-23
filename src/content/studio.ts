import type { NewsletterCopy } from "./newsletter";

export const STUDIO = {
  eyebrow: "Babaluum Studio",
  status: "Muy pronto",
  title: "Aquí se está cocinando algo chiva",
  text: "Babaluum Studio es nuestra agencia creativa: producciones, redes sociales y estrategia para marcas de distintas industrias.",
  closing: "La página llega muy pronto. Primero nos estamos concentrando en Baba.",
  services: { top: "Producciones", left: "Redes sociales", right: "Estrategia" },
  actions: { primary: { label: "Hablemos de tu proyecto", href: "/contacto#mensaje" }, secondary: { label: "Volver a Babaluum", href: "/" } },
} as const;

export const STUDIO_BAND = {
  status: STUDIO.status,
  title: "¿Buscas una agencia creativa?",
  text: "Conoce Babaluum Studio: producciones, redes sociales y estrategia.",
  action: { label: "Ir a Studio", href: "/studio" },
} as const;

export const STUDIO_NEWSLETTER: NewsletterCopy = {
  title: "¿Te avisamos cuando abra?",
  aside: "Deja tu correo y te escribimos el día que Babaluum Studio estrene página.",
  action: "Avísame",
  interest: "studio",
};
