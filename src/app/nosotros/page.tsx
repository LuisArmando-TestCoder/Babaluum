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
  "Somos un hub de aprendizaje y contenido para quienes quieren crecer, adaptarse y liderar el cambio.",
  "Creamos contenido accesible, conectamos personas con ideas afines y facilitamos experiencias que inspiran transformación profesional.",
  "Explora nuestro podcast, lee artículos, súmate a programas o participa en eventos. Tu recorrido empieza acá.",
];

const AboutPage = () => (
  <>
    <PageHero eyebrow="Nosotros" title="Descubre Babaluum" lead="Nuestra visión, nuestra misión y el concepto detrás de la plataforma y la comunidad." companion="globe" />
    <Statement lead="Somos el hub de contenido para mentes" highlight="que quieren cambiar el mundo" />
    <MissionSplit title="Nuestra misión y visión" paragraphs={MISSION} image={IMAGES.teamTable} stat={{ value: "+1500", label: "Personas ya son parte de la comunidad" }} cta={{ label: "Contáctanos", href: "/contacto" }} />
    <PhotoPair eyebrow="Nosotros" title="Por qué elegir Babaluum" aside="Contenido, comunidad e iniciativas para aprender, transformar y compartir." images={[IMAGES.loft, IMAGES.moodboard]} />
    <Statement align="start" lead="Conectamos inteligencia artificial, sostenibilidad" highlight="y desarrollo profesional" />
    <StatsRow stats={IMPACT_STATS} />
    <ValuesRow />
    <TeamGrid members={LEADERSHIP} withHeader />
    <TestimonialSpotlight />
    <CtaBanner />
  </>
);

export default AboutPage;
