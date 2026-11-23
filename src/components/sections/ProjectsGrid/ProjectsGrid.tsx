"use client";

import { ProjectCard } from "@/components/cards/ProjectCard";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { Project } from "@/content/projects";
import { PROJECTS } from "@/content/projects";
import { FilteredGrid } from "../FilteredGrid";

const SHAPES: readonly NotchPreset[] = ["portrait", "frame", "photo", "side"];

const renderProject = (project: Project, index: number) => (
  <ProjectCard
    href={`/proyectos/${project.slug}`}
    title={project.title}
    summary={project.summary}
    cover={project.cover}
    ratio="620 / 430"
    shape={SHAPES[index % SHAPES.length]}
  />
);

export const ProjectsGrid = () => (
  <Section spacing="m">
    <SectionHeader eyebrow="Iniciativas" accent="orange" title="Todo lo que hacemos" measure="narrow" aside="Contenido, programas y eventos de la comunidad Babaluum." />
    <FilteredGrid label="Filtrar proyectos por área" items={PROJECTS} tagOf={(project) => project.area} keyOf={(project) => project.slug} render={renderProject} />
  </Section>
);
