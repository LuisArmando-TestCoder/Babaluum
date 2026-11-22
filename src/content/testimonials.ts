import type { ImageAsset } from "@/domain/design/media";
import { IMAGES } from "./images";

export type Testimonial = { id: string; headline: string; quote: string; author: string; role: string; portrait: ImageAsset };

export const FEATURED_TESTIMONIAL = {
  lead: "Babaluum transformó mi presencia en línea",
  highlight: "un 200% en solo tres meses",
  author: "Mateo R., creador de contenido",
  portrait: IMAGES.mateo,
} as const;

const QUOTE = "Las estrategias basadas en datos y la creatividad de la comunidad me ayudaron a crecer y a encontrar mi voz. Totalmente recomendado.";

export const TESTIMONIALS: readonly Testimonial[] = [
  { id: "t1", headline: "Babaluum transformó mi presencia digital", quote: QUOTE, author: "Lucía Rojas", role: "Estudiante de comunicación", portrait: IMAGES.lucia },
  { id: "t2", headline: "Trabajar con Babaluum fue un antes y un después", quote: QUOTE, author: "Andrés Mora", role: "Emprendedor", portrait: IMAGES.andres },
  { id: "t3", headline: "La comunidad es excepcional", quote: QUOTE, author: "Mei Chen", role: "Diseñadora UX", portrait: IMAGES.mei },
  { id: "t4", headline: "Nos ayudaron a recaudar fondos para la causa", quote: QUOTE, author: "Carmen Vargas", role: "Directora de ONG", portrait: IMAGES.carmen },
  { id: "t5", headline: "Aprendí IA aplicándola a algo real", quote: QUOTE, author: "Diego Solís", role: "Ingeniero de datos", portrait: IMAGES.diego },
  { id: "t6", headline: "Un equipo creativo de verdad", quote: QUOTE, author: "Rosa Jiménez", role: "Docente", portrait: IMAGES.rosa },
];
