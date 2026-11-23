import type { Tone } from "@/domain/design/tone";

export type Stat = { value: string; label: string; body?: string; tone: Tone };

export const IMPACT_STATS: readonly Stat[] = [
  { value: "+1500", label: "Personas en la comunidad", body: "Estudiantes y profesionales que aprenden con nosotros.", tone: "orange" },
  { value: "+600", label: "Personas en la red", body: "Ejecutivos, profesionales y estudiantes conectados.", tone: "lime" },
  { value: "3", label: "Áreas de contenido", body: "Inteligencia artificial, conciencia ambiental y desarrollo profesional.", tone: "purple" },
];
