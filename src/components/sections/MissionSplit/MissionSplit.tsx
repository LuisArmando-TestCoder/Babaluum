import { StatCard } from "@/components/cards/StatCard";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/primitives/Button";
import { Heading } from "@/components/primitives/Heading";
import type { MediaSource } from "@/components/primitives/Media";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import styles from "./MissionSplit.module.scss";

type MissionSplitProps = {
  title: string;
  paragraphs: readonly string[];
  image: MediaSource;
  stat?: { value: string; label: string };
  cta?: { label: string; href: string };
};

export const MissionSplit = ({ title, paragraphs, image, stat, cta }: MissionSplitProps) => (
  <Section spacing="m">
    <div className={styles.grid}>
      <Reveal className={styles.copy}>
        <Heading size="h4" level={2}>
          {title}
        </Heading>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
        {cta && (
          <Button href={cta.href} variant="dark" className={styles.cta}>
            {cta.label}
          </Button>
        )}
      </Reveal>
      <div className={styles.visual}>
        <Media image={image} ratio="5 / 6" notches={NOTCHES.tab} sizes="(min-width: 900px) 40vw, 90vw" />
        {stat && (
          <Parallax speed={0.25} className={styles.stat}>
            <StatCard value={stat.value} label={stat.label} tone="lime" size="s" withArrow shape="tab" />
          </Parallax>
        )}
      </div>
    </div>
  </Section>
);
