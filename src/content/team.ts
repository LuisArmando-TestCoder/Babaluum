import type { ImageAsset } from "@/domain/design/media";
import { IMAGES } from "./images";

export type Member = { id: string; name: string; role: string; portrait: ImageAsset };

export const LEADERSHIP: readonly Member[] = [{ id: "mariana", name: "Mariana Murillo", role: "Fundadora de Babaluum", portrait: IMAGES.founder }];

export const TEAM: readonly Member[] = LEADERSHIP;

export const VALUES = [
  { title: "Aprende", body: "Contenido claro para entender lo que está cambiando.", icon: "bolt" },
  { title: "Transforma", body: "Lo aprendido se vuelve acción en tu vida y tu trabajo.", icon: "cube" },
  { title: "Comparte", body: "El conocimiento crece cuando circula.", icon: "crown" },
  { title: "Comunidad", body: "Crecemos juntos, con respeto y curiosidad.", icon: "aperture" },
] as const;
