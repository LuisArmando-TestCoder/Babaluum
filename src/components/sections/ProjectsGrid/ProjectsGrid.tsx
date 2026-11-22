import { ProjectCard } from "@/components/cards/ProjectCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { PROJECTS } from "@/content/projects";
import styles from "./ProjectsGrid.module.scss";

const SHAPES: readonly NotchPreset[] = ["photo", "side", "portrait", "tab"];

export const ProjectsGrid = () => (
  <Section spacing="m">
    <SectionHeader eyebrow="Proyectos" accent="orange" title="Todos los proyectos" aside="Iniciativas creadas por nuestra comunidad con aliados y organizaciones." />
    <RevealGroup as="ul" className={styles.grid}>
      {PROJECTS.map((project, index) => (
        <RevealItem as="li" key={project.slug}>
          <ProjectCard
            href={`/proyectos/${project.slug}`}
            title={project.title}
            summary={project.summary}
            cover={project.cover}
            meta={project.area}
            shape={SHAPES[index % SHAPES.length]}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
