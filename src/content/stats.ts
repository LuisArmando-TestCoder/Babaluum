import type { Tone } from "@/domain/design/tone";

export type Stat = { value: string; label: string; body?: string; tone: Tone };

export const HERO_STATS: readonly Stat[] = [
  { value: "+1500", label: "Personas forman parte de nuestra comunidad", tone: "green" },
  { value: "Únete a nuestra red", label: "+600 ejecutivos, profesionales y estudiantes ya son parte de la red Babaluum. ¿Y vos?", tone: "lime" },
];

export const IMPACT_STATS: readonly Stat[] = [
  { value: "300+", label: "Proyectos creados", body: "Piezas de contenido y campañas lanzadas por nuestra comunidad.", tone: "orange" },
  { value: "2.5X", label: "Más alcance", body: "Promedio de crecimiento en audiencia tras completar un programa.", tone: "lime" },
  { value: "10M+", label: "Impresiones generadas", body: "Personas alcanzadas con mensajes de impacto social.", tone: "purple" },
];

export const WHY_POINTS = [
  { title: "Comunidad experta", body: "Mentores con años de experiencia y resultados medibles acompañan cada paso.", stat: { value: "300+", label: "Proyectos lanzados con impacto", tone: "purple" as Tone } },
  { title: "Aprender haciendo", body: "Cada programa termina en algo real que puedes mostrar, publicar y medir.", stat: { value: "200%", label: "Crecimiento promedio en alcance", tone: "red" as Tone } },
] as const;
