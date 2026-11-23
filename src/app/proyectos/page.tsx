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
    <PageHero eyebrow="Proyectos" title="Nuestras iniciativas" lead="Podcast, blog, programas y eventos: lo que hacemos para acercar el conocimiento." accent="orange" />
    <FeatureSlider heading="Iniciativa destacada" subject="Iniciativa" slides={FEATURED} ctaLabel="Ver iniciativa" />
    <ProjectsGrid />
    <FaqSection />
    <CtaBanner />
  </>
);

export default ProjectsPage;
