import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { MissionSplit } from "@/components/sections/MissionSplit";
import { PageHero } from "@/components/sections/PageHero";
import { ProgramsGrid } from "@/components/sections/ProgramsGrid";
import { ProgramsList } from "@/components/sections/ProgramsList";
import { TestimonialSpotlight } from "@/components/sections/TestimonialSpotlight";
import { IMAGES } from "@/content/images";
import { PROGRAM_OFFERS } from "@/content/programs";

export const metadata: Metadata = { title: "Programas" };

const PROGRAMS_INTRO = [
  "Cada programa combina aprendizaje práctico, mentoría y un proyecto real que puedes mostrar al terminar.",
  "Trabajamos en tres áreas clave: inteligencia artificial, conciencia ambiental y desarrollo profesional.",
];

const ProgramsPage = () => (
  <>
    <PageHero eyebrow="Programas" title="Nuestros programas" lead="Experiencias diseñadas para aprender, transformar y compartir." accent="green" />
    <MissionSplit title="Rutas a tu medida" highlight="para crecer con propósito" emphasis="loud" paragraphs={PROGRAMS_INTRO} image={IMAGES.workshop} />
    <ProgramsGrid eyebrow="Programas" title="Programas de calidad" />
    <ProgramsList
      eyebrow="Elige tu ruta"
      title="Qué vas a lograr en cada programa"
      aside="Cada programa termina en algo real que puedes mostrar. Elige uno y te contamos las próximas fechas."
      offers={PROGRAM_OFFERS}
    />
    <TestimonialSpotlight />
    <FaqSection />
    <CtaBanner />
  </>
);

export default ProgramsPage;
