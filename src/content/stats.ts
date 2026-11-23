import type { Tone } from "@/domain/design/tone";

export type Stat = { value: string; label: string; body?: string; tone: Tone };

export const IMPACT_STATS: readonly Stat[] = [
  { value: "300+", label: "Proyectos creados", body: "Piezas de contenido y campañas lanzadas por nuestra comunidad.", tone: "orange" },
  { value: "2.5X", label: "Más alcance", body: "Promedio de crecimiento en audiencia tras completar un programa.", tone: "lime" },
  { value: "10M+", label: "Impresiones generadas", body: "Personas alcanzadas con mensajes de impacto social.", tone: "purple" },
];
