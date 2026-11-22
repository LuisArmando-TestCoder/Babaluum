import type { ImageAsset } from "@/domain/design/media";
import { IMAGES } from "./images";

export type Member = { id: string; name: string; role: string; portrait: ImageAsset };

export const LEADERSHIP: readonly Member[] = [
  { id: "marco", name: "Marco Robles", role: "Estratega digital", portrait: IMAGES.portraitOne },
  { id: "sofia", name: "Sofía Luis", role: "Directora creativa", portrait: IMAGES.portraitTwo },
  { id: "emma", name: "Emma Tania", role: "Experta en contenido", portrait: IMAGES.portraitThree },
];

export const TEAM: readonly Member[] = [
  { id: "andres", name: "Andrés Mora", role: "Programas de IA", portrait: IMAGES.andres },
  { id: "amara", name: "Amara Brown", role: "Comunidad", portrait: IMAGES.amara },
  { id: "mei", name: "Mei Chen", role: "Diseño de experiencias", portrait: IMAGES.mei },
  { id: "lucia", name: "Lucía Rojas", role: "Podcast", portrait: IMAGES.lucia },
  { id: "diego", name: "Diego Solís", role: "Datos e impacto", portrait: IMAGES.diego },
  { id: "carmen", name: "Carmen Vargas", role: "Alianzas", portrait: IMAGES.carmen },
  { id: "rosa", name: "Rosa Jiménez", role: "Formación", portrait: IMAGES.rosa },
  { id: "sofia-v", name: "Sofía Vega", role: "Dirección de arte", portrait: IMAGES.sofia },
  { id: "mateo", name: "Mateo Ruiz", role: "Contenido", portrait: IMAGES.mateo },
];

export const VALUES = [
  { title: "Innovación", body: "Nos adelantamos con estrategias creativas.", icon: "bolt" },
  { title: "Transparencia", body: "Construimos confianza con comunicación abierta.", icon: "cube" },
  { title: "Impacto", body: "Nos enfocamos en resultados que importan.", icon: "crown" },
  { title: "Colaboración", body: "Crecemos en comunidad, con éxitos compartidos.", icon: "aperture" },
] as const;
