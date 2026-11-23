import { StatCard } from "@/components/cards/StatCard";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { SplitWords } from "@/components/motion/SplitWords";
import { Button } from "@/components/primitives/Button";
import { Heading } from "@/components/primitives/Heading";
import type { MediaSource } from "@/components/primitives/Media";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { twoTone } from "@/domain/design/words";
import styles from "./MissionSplit.module.scss";

type MissionSplitProps = {
  title: string;
  highlight?: string;
  emphasis?: "quiet" | "loud";
  paragraphs: readonly string[];
  image: MediaSource;
  stat?: { value: string; label: string };
  cta?: { label: string; href: string };
};

export const MissionSplit = ({ title, highlight = "", emphasis = "quiet", paragraphs, image, stat, cta }: MissionSplitProps) => (
  <Section spacing="m">
    <div className={styles.grid}>
      <div className={styles.copy}>
        <Heading size={emphasis === "loud" ? "h2" : "h4"} level={2} className={styles[emphasis]}>
          <SplitWords segments={twoTone(title, highlight)} />
        </Heading>
        <Reveal delay={0.1}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              <ScrubText>{paragraph}</ScrubText>
            </p>
          ))}
          {cta && (
            <Button href={cta.href} variant="dark" size="l" className={styles.cta}>
              {cta.label}
            </Button>
          )}
        </Reveal>
      </div>
      <div className={styles.visual}>
        <Media image={image} ratio={emphasis === "loud" ? "540 / 550" : "540 / 660"} notches={NOTCHES.photo} sizes="(min-width: 900px) 40vw, 90vw" />
        {stat && (
          <Parallax speed={0.14} className={styles.stat}>
            <StatCard value={stat.value} label={stat.label} tone="lime" size="s" />
          </Parallax>
        )}
      </div>
    </div>
  </Section>
);
