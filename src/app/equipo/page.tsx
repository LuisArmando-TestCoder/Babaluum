import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { TEAM } from "@/content/team";

export const metadata: Metadata = { title: "Equipo" };

const TeamPage = () => (
  <>
    <PageHero eyebrow="Nuestro equipo" title="Conoce al equipo" lead="Personas curiosas que acompañan a nuestra comunidad todos los días." companion="robot" />
    <TeamGrid members={TEAM} />
    <CtaBanner />
  </>
);

export default TeamPage;
