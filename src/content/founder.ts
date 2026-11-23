import type { ImageAsset } from "@/domain/design/media";
import { IMAGES } from "./images";

export type FounderCopy = { eyebrow: string; quote: string; name: string; role: string; image: ImageAsset };

export const FOUNDER: FounderCopy = {
  eyebrow: "Aprende. Transforma. Comparte.",
  quote:
    "“Creo en el conocimiento como el único puente para transformarnos y evolucionar. Babaluum nació como un espacio para compartir ideas que despiertan, conectan e inspiran a actuar. Cada persona que llega, se convierte en parte de una comunidad que aprende y crece junta.”",
  name: "Mariana Murillo",
  role: "Fundadora de Babaluum",
  image: IMAGES.founder,
};
