"use client";

import { useRef } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { PROJECTS } from "@/content/projects";
import styles from "./FeaturedProjects.module.scss";

const SHAPES: readonly NotchPreset[] = ["photo", "side", "portrait"];

export const FeaturedProjects = () => {
  const scroller = useRef<HTMLDivElement>(null);

  const slide = (direction: 1 | -1) => {
    const element = scroller.current;
    if (element) element.scrollBy({ left: direction * element.clientWidth * 0.66, behavior: "smooth" });
  };

  return (
    <section className={styles.section}>
      <Container className={styles.head}>
        <SectionHeader eyebrow="Proyectos" accent="orange" title="Proyectos destacados" className={styles.header} />
        <div className={styles.controls}>
          <button type="button" className={styles.control} aria-label="Anterior" onClick={() => slide(-1)}>
            <Icon name="chevron-left" />
          </button>
          <button type="button" className={styles.control} aria-label="Siguiente" onClick={() => slide(1)}>
            <Icon name="chevron-right" />
          </button>
        </div>
      </Container>
      <div ref={scroller} className={styles.scroller}>
        <RevealGroup as="ul" className={styles.track}>
          {PROJECTS.map((project, index) => (
            <RevealItem as="li" key={project.slug} className={styles.slide}>
              <ProjectCard
                href={`/proyectos/${project.slug}`}
                title={project.title}
                summary={project.summary}
                cover={project.cover}
                shape={SHAPES[index % SHAPES.length]}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};
