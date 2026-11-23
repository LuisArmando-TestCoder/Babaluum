import type { Tone } from "@/domain/design/tone";

export type Plan = { id: string; name: string; summary: string; price: string; features: readonly string[]; tone: Tone; badge?: string };

export const PLANS: readonly Plan[] = [
  {
    id: "comunidad",
    name: "Comunidad",
    summary: "Para recibir contenido y enterarte de todo primero.",
    price: "Gratis",
    features: ["Newsletter semanal con contenido exclusivo", "Artículos del blog y episodios del podcast", "Invitaciones a nuestros eventos"],
    tone: "purple",
  },
  {
    id: "programas",
    name: "Programas",
    summary: "Para quienes quieren participar y sumar experiencia.",
    price: "Por convocatoria",
    features: ["Programa de escritores", "Pasantías", "Voluntariados"],
    tone: "lime",
  },
  {
    id: "aliados",
    name: "Aliados",
    summary: "Para organizaciones y marcas que quieren colaborar.",
    price: "A la medida",
    features: ["Colaboraciones en eventos", "Contenido en conjunto", "Alianzas con impacto social"],
    tone: "green",
  },
];
