import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { PROJECTS } from "@/content/projects";

export const metadata: Metadata = { title: "Proyectos" };

const ProjectsPage = () => {
  const [featured] = PROJECTS;
  return (
    <>
      <PageHero eyebrow="Proyectos" title="Proyectos que amamos" lead="Lo que nuestra comunidad crea cuando las ideas encuentran propósito." accent="orange" />
      {featured && (
        <FeatureSplit
          title="Proyecto destacado"
          kicker={featured.title}
          body={featured.summary}
          image={featured.cover}
          cta={{ label: "Ver proyecto", href: `/proyectos/${featured.slug}` }}
        />
      )}
      <ProjectsGrid />
      <FaqSection />
      <CtaBanner />
    </>
  );
};

export default ProjectsPage;
