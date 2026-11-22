import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { MissionSplit } from "@/components/sections/MissionSplit";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoPair } from "@/components/sections/PhotoPair";
import { Statement } from "@/components/sections/Statement";
import { StatsRow } from "@/components/sections/StatsRow";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { TestimonialSpotlight } from "@/components/sections/TestimonialSpotlight";
import { ValuesRow } from "@/components/sections/ValuesRow";
import { IMAGES } from "@/content/images";
import { IMPACT_STATS } from "@/content/stats";
import { LEADERSHIP } from "@/content/team";

export const metadata: Metadata = { title: "Nosotros" };

const MISSION = [
  "En Babaluum somos más que una comunidad: somos tu equipo de crecimiento. Nacimos para transformar ideas en proyectos con impacto real.",
  "Con mentores experimentados y herramientas actuales, ayudamos a estudiantes, profesionales y organizaciones a desbloquear su potencial.",
  "Desde emprendimientos hasta ONG consolidadas, acompañamos a personas de muchas industrias a crecer en el mundo digital.",
];

const AboutPage = () => (
  <>
    <PageHero eyebrow="Nosotros" title="Descubre Babaluum" lead="Crecimiento a través de experiencias diseñadas para generar resultados." companion="globe" />
    <Statement lead="En Babaluum creemos que cada persona tiene el potencial" highlight="de lograr resultados extraordinarios" />
    <MissionSplit title="Nuestra misión y visión" paragraphs={MISSION} image={IMAGES.teamTable} stat={{ value: "400+", label: "Proyectos lanzados en distintas industrias" }} cta={{ label: "Contáctanos", href: "/contacto" }} />
    <PhotoPair eyebrow="Nosotros" title="Por qué elegir Babaluum" aside="Crecimiento a través de experiencias diseñadas para alcanzar, inspirar y generar resultados." images={[IMAGES.loft, IMAGES.moodboard]} />
    <Statement align="start" lead="Con años de experiencia y un historial" highlight="de resultados medibles" />
    <StatsRow stats={IMPACT_STATS} />
    <ValuesRow />
    <TeamGrid members={LEADERSHIP} withHeader />
    <TestimonialSpotlight />
    <CtaBanner />
  </>
);

export default AboutPage;
