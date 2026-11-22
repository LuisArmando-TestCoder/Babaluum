import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { MethodAccordion } from "@/components/sections/MethodAccordion";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { ValuesRow } from "@/components/sections/ValuesRow";

export const metadata: Metadata = { title: "Cómo trabajamos" };

const MethodPage = () => (
  <>
    <PageHero eyebrow="Cómo trabajamos" title="Nuestro proceso" lead="Un camino claro para pasar de la idea al impacto." accent="green" companion="robot" />
    <Statement lead="Nuestro compromiso es ayudarte a lograr tus metas con" highlight="iniciativas innovadoras y decisiones basadas en datos." />
    <ValuesRow framed withHeader={false} />
    <MethodAccordion eyebrow="Cómo trabajamos" title="Nuestro método" />
    <FeaturedProjects />
    <FaqSection />
    <CtaBanner />
  </>
);

export default MethodPage;
