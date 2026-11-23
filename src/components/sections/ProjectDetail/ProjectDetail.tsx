import { StatCard } from "@/components/cards/StatCard";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { Heading } from "@/components/primitives/Heading";
import { Icon } from "@/components/primitives/Icon";
import { Media } from "@/components/primitives/Media";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import type { Project } from "@/content/projects";
import { twoTone } from "@/domain/design/words";
import styles from "./ProjectDetail.module.scss";

type ProjectDetailProps = { project: Project };

const STAT_SHAPES: readonly NotchPreset[] = ["tab", "ticket", "stat"];

const Meta = ({ project }: ProjectDetailProps) => (
  <NotchedSurface tone="lime" className={styles.meta}>
    <dl className={styles.facts}>
      {[
        ["Impulsa", project.client],
        ["Área", project.area],
        ["Duración", project.duration],
      ].map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
    <Icon name="arrow-up-right" className={styles.metaArrow} />
  </NotchedSurface>
);

export const ProjectDetail = ({ project }: ProjectDetailProps) => (
  <Section spacing="l">
    <div className={styles.cover}>
      <Media image={project.cover} ratio="1280 / 610" notches={NOTCHES.cover} priority sizes="100vw" />
      <Parallax speed={0.12} className={styles.metaSlot}>
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
        <ol className={styles.list}>
          {project.challenges.map((challenge) => (
            <li key={challenge}>{challenge}</li>
          ))}
        </ol>
      </div>
    </Reveal>
    <div className={styles.gallery}>
      {project.gallery.map((image, index) => (
        <Media key={image.src} image={image} ratio="620 / 500" notches={index === 0 ? NOTCHES.crown : NOTCHES.side} />
      ))}
    </div>
    <Reveal className={styles.block}>
      <h2 className={styles.label}>Solución</h2>
      <p className={styles.text}>{project.solution}</p>
    </Reveal>
    <Heading size="h2" className={styles.results}>
      <ScrubWords segments={twoTone("Más impacto a través de", "la comunidad y el conocimiento.")} />
    </Heading>
    {project.results.length > 0 && (
      <RevealGroup as="ul" className={styles.stats}>
        {project.results.map((stat, index) => (
          <RevealItem as="li" key={stat.value} index={index}>
            <StatCard value={stat.value} label={stat.label} body={stat.body} tone={stat.tone} shape={STAT_SHAPES[index % STAT_SHAPES.length]} />
          </RevealItem>
        ))}
      </RevealGroup>
    )}
    <Reveal className={styles.block}>
      <h2 className={styles.label}>Estrategia</h2>
      <p className={styles.text}>{project.strategy}</p>
    </Reveal>
  </Section>
);
