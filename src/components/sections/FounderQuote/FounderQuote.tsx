import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import type { FounderCopy } from "@/content/founder";
import styles from "./FounderQuote.module.scss";

type FounderQuoteProps = { copy: FounderCopy };

export const FounderQuote = ({ copy }: FounderQuoteProps) => (
  <Section>
    <div className={styles.grid}>
      <div>
        <Eyebrow accent="purple">{copy.eyebrow}</Eyebrow>
        <blockquote className={styles.quote}>
          <ScrubText from={0.9} to={0.5}>
            {copy.quote}
          </ScrubText>
        </blockquote>
        <Reveal>
          <p className={styles.name}>{copy.name}</p>
          <p className={styles.role}>{copy.role}</p>
        </Reveal>
      </div>
      <Parallax speed={0.18} className={styles.portrait}>
        <Media image={copy.image} ratio="1290 / 1807" notches={NOTCHES.portrait} sizes="(min-width: 900px) 36vw, 90vw" />
      </Parallax>
    </div>
  </Section>
);
