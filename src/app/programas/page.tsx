import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { MissionSplit } from "@/components/sections/MissionSplit";
import { PageHero } from "@/components/sections/PageHero";
import { ProgramsGrid } from "@/components/sections/ProgramsGrid";
import { TestimonialSpotlight } from "@/components/sections/TestimonialSpotlight";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = { title: "Programas" };

const PROGRAMS_INTRO = [
  "Cada programa combina aprendizaje práctico, mentoría y un proyecto real que puedes mostrar al terminar.",
  "Trabajamos en tres áreas clave: inteligencia artificial, conciencia ambiental y desarrollo profesional.",
];

const ProgramsPage = () => (
  <>
    <PageHero eyebrow="Programas" title="Nuestros programas" lead="Experiencias diseñadas para aprender, transformar y compartir." accent="green" />
    <MissionSplit title="Soluciones a tu medida" paragraphs={PROGRAMS_INTRO} image={IMAGES.workshop} />
    <ProgramsGrid eyebrow="Programas" title="Programas de calidad" />
    <TestimonialSpotlight />
    <FaqSection />
    <CtaBanner />
  </>
);

export default ProgramsPage;
