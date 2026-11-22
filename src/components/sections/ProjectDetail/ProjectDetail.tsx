import { StatCard } from "@/components/cards/StatCard";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Heading, Highlight } from "@/components/primitives/Heading";
import { Media } from "@/components/primitives/Media";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import type { Project } from "@/content/projects";
import styles from "./ProjectDetail.module.scss";

type ProjectDetailProps = { project: Project };

const Meta = ({ project }: ProjectDetailProps) => (
  <NotchedSurface tone="lime" notches={NOTCHES.tab} className={styles.meta}>
    {[
      ["Cliente", project.client],
      ["Área", project.area],
      ["Duración", project.duration],
    ].map(([label, value]) => (
      <p key={label}>
        <small>{label}</small>
        <strong>{value}</strong>
      </p>
    ))}
  </NotchedSurface>
);

export const ProjectDetail = ({ project }: ProjectDetailProps) => (
  <Section spacing="m">
    <div className={styles.cover}>
      <Media image={project.cover} ratio="16 / 8" notches={NOTCHES.banner} priority sizes="100vw" />
      <Parallax speed={0.2} className={styles.metaSlot}>
        <Meta project={project} />
      </Parallax>
    </div>
    <Reveal className={styles.columns}>
      <div>
        <h2 className={styles.label}>Objetivo</h2>
        <p className={styles.text}>{project.objective}</p>
      </div>
      <div>
        <h2 className={styles.label}>Retos</h2>
        <ol className={styles.text}>
          {project.challenges.map((challenge) => (
            <li key={challenge}>{challenge}</li>
          ))}
        </ol>
      </div>
    </Reveal>
    <div className={styles.gallery}>
      {project.gallery.map((image, index) => (
        <Parallax key={image.src} speed={0.06 + index * 0.08}>
          <Media image={image} ratio="1 / 1" notches={index === 0 ? NOTCHES.portrait : NOTCHES.side} />
        </Parallax>
      ))}
    </div>
    <Reveal>
      <h2 className={styles.label}>Solución</h2>
      <p className={styles.text}>{project.solution}</p>
    </Reveal>
    <Heading size="h2" className={styles.results}>
      Más impacto a través de <Highlight>la comunidad y los datos.</Highlight>
    </Heading>
    <RevealGroup as="ul" className={styles.stats}>
      {project.results.map((stat) => (
        <RevealItem as="li" key={stat.value}>
          <StatCard value={stat.value} label={stat.label} body={stat.body} tone={stat.tone} shape="tab" />
        </RevealItem>
      ))}
    </RevealGroup>
    <Reveal>
      <h2 className={styles.label}>Estrategia</h2>
      <p className={styles.text}>{project.strategy}</p>
    </Reveal>
  </Section>
);
