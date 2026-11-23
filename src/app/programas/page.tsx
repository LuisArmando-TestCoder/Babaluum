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
  "Publicamos contenido en tres áreas: inteligencia artificial, conciencia ambiental y desarrollo profesional.",
  "Además abrimos programas para que escritores, pasantes y voluntarios se formen participando en nuestras iniciativas.",
];

const ProgramsPage = () => (
  <>
    <PageHero eyebrow="Programas" title="Nuestros programas" lead="Contenido, programas y eventos para aprender, transformar y compartir." accent="green" />
    <MissionSplit title="Contenido e iniciativas" highlight="para crecer con propósito" emphasis="loud" paragraphs={PROGRAMS_INTRO} image={IMAGES.workshop} />
    <ProgramsGrid eyebrow="Programas" title="Áreas de contenido y programas" />
    <ProgramsList
      eyebrow="Elige tu ruta"
      title="Qué encuentras en cada uno"
      aside="Elige lo que te interesa y te contamos cómo participar."
      offers={PROGRAM_OFFERS}
    />
    <TestimonialSpotlight />
    <FaqSection />
    <CtaBanner />
  </>
);

export default ProgramsPage;
