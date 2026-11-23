import { StatCard } from "@/components/cards/StatCard";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { IMAGES } from "@/content/images";
import type { WhyPoint } from "@/content/home";
import styles from "./WhyChoose.module.scss";

type WhyChooseProps = { eyebrow: string; title: string; aside: string; points: readonly WhyPoint[] };

export const WhyChoose = ({ eyebrow, title, aside, points }: WhyChooseProps) => (
  <Section>
    <SectionHeader eyebrow={eyebrow} accent="orange" title={title} aside={aside} className={styles.header} />
    <div className={styles.layout}>
      {points.map((point, index) => (
        <Reveal key={point.title} delay={index * 0.15} className={styles.point}>
          <h3 className={styles.title}>{point.title}</h3>
          <p className={styles.body}>
            <ScrubText>{point.body}</ScrubText>
          </p>
          <Parallax speed={0.1 + index * 0.08} className={styles.stat}>
            <StatCard value={point.stat.value} label={point.stat.label} tone={point.stat.tone} size="s" />
          </Parallax>
        </Reveal>
      ))}
      <Media image={IMAGES.stage} ratio="540 / 710" notches={NOTCHES.photo} sizes="(min-width: 900px) 40vw, 90vw" className={styles.photo} />
    </div>
  </Section>
);
