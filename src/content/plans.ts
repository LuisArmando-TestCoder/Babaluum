import type { Tone } from "@/domain/design/tone";

export type Plan = { id: string; name: string; summary: string; price: string; features: readonly string[]; tone: Tone; badge?: string };

export const PLANS: readonly Plan[] = [
  { id: "explorador", name: "Explorador", summary: "Ideal para quienes dan sus primeros pasos en la comunidad.", price: "$0/mes", features: ["Comunidad abierta", "Episodios del podcast", "Eventos mensuales", "Boletín de oportunidades"], tone: "purple" },
  { id: "impulso", name: "Impulso", summary: "Para quienes quieren crear y crecer con acompañamiento.", price: "$19/mes", features: ["Todo lo del Explorador", "Un programa por trimestre", "Mentoría grupal", "Revisión de portafolio"], tone: "lime", badge: "Más popular" },
  { id: "organizaciones", name: "Organizaciones", summary: "Para equipos y ONG que buscan impacto medible.", price: "$249/mes", features: ["Programas a la medida", "Voluntariado corporativo", "Medición de impacto", "Talleres in-company"], tone: "green" },
];
