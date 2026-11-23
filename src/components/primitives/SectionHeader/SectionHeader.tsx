import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { SplitWords } from "@/components/motion/SplitWords";
import { cx } from "@/domain/design/cx";
import type { Accent } from "@/domain/design/tone";
import { twoTone } from "@/domain/design/words";
import { Eyebrow } from "../Eyebrow";
import type { HeadingSize } from "../Heading";
import { Heading } from "../Heading";
import styles from "./SectionHeader.module.scss";

type SectionHeaderProps = {
  eyebrow?: string;
  accent?: Accent;
  title: string;
  highlight?: string;
  size?: HeadingSize;
  measure?: "narrow" | "wide";
  aside?: ReactNode;
  className?: string;
};

export const SectionHeader = ({ eyebrow, accent, title, highlight = "", size = "h1", measure = "wide", aside, className }: SectionHeaderProps) => (
  <header className={cx(styles.header, className)}>
    <div className={cx(styles.main, styles[measure])}>
      {eyebrow && <Eyebrow accent={accent}>{eyebrow}</Eyebrow>}
      <Heading size={size}>
        <SplitWords segments={twoTone(title, highlight)} />
      </Heading>
    </div>
    {aside && (
      <Reveal className={styles.aside} delay={0.15}>
        <p>
          <ScrubText>{aside}</ScrubText>
        </p>
      </Reveal>
    )}
  </header>
);
