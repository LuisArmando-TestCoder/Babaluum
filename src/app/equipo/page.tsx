import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { TEAM } from "@/content/team";

export const metadata: Metadata = { title: "Equipo" };

const TeamPage = () => (
  <>
    <PageHero eyebrow="Nuestro equipo" title="Conoce al equipo" lead="Conoce a quienes están detrás de Babaluum, su inspiración y el proceso de creación de la plataforma." companion="robot" />
    <TeamGrid members={TEAM} />
    <CtaBanner />
  </>
);

export default TeamPage;
