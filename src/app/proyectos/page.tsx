import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureSlider } from "@/components/sections/FeatureSlider";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { PROJECTS } from "@/content/projects";

export const metadata: Metadata = { title: "Proyectos" };

const FEATURED = PROJECTS.slice(0, 5).map((project) => ({
  key: project.slug,
  title: project.title,
  body: project.summary,
  image: project.cover,
  href: `/proyectos/${project.slug}`,
}));

const ProjectsPage = () => (
  <>
    <PageHero eyebrow="Proyectos" title="Proyectos que amamos" lead="Lo que nuestra comunidad crea cuando las ideas encuentran propósito." accent="orange" />
    <FeatureSlider heading="Proyecto destacado" subject="Proyecto" slides={FEATURED} ctaLabel="Ver proyecto" />
    <ProjectsGrid />
    <FaqSection />
    <CtaBanner />
  </>
);

export default ProjectsPage;
