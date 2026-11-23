import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedCarousel } from "@/components/sections/FeaturedCarousel";
import { MethodAccordion } from "@/components/sections/MethodAccordion";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { ValuesRow } from "@/components/sections/ValuesRow";
import { PROJECT_SLIDES } from "@/content/projects";

export const metadata: Metadata = { title: "Cómo trabajamos" };

const MethodPage = () => (
  <>
    <PageHero eyebrow="Cómo trabajamos" title="Nuestro proceso" lead="Un camino claro para pasar de la idea al impacto." accent="green" companion="robot" />
    <Statement lead="Creamos contenido accesible, conectamos personas" highlight="y facilitamos experiencias que inspiran." />
    <ValuesRow framed />
    <MethodAccordion />
    <FeaturedCarousel eyebrow="Iniciativas" title="Iniciativas destacadas" subject="Iniciativa" slides={PROJECT_SLIDES} />
    <FaqSection />
    <CtaBanner />
  </>
);

export default MethodPage;
