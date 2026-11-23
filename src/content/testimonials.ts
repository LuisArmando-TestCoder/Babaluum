import type { ImageAsset } from "@/domain/design/media";
import { IMAGES } from "./images";

export type Testimonial = { id: string; headline: string; quote: string; author: string; role: string; portrait: ImageAsset };

export const FEATURED_TESTIMONIAL = {
  eyebrow: "Nuestra fundadora",
  lead: "Creo en el conocimiento como el único puente",
  highlight: "para transformarnos y evolucionar.",
  author: "Mariana Murillo, fundadora de Babaluum",
  portrait: IMAGES.founder,
} as const;

export const TESTIMONIALS: readonly Testimonial[] = [];
