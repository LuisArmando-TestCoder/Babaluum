import type { ReactNode } from "react";
import type { Accent } from "@/domain/design/tone";
import { cx } from "@/domain/design/cx";
import { Eyebrow } from "../Eyebrow";
import type { HeadingSize } from "../Heading";
import { Heading } from "../Heading";
import styles from "./SectionHeader.module.scss";

type SectionHeaderProps = {
  eyebrow?: string;
  accent?: Accent;
  title: ReactNode;
  size?: HeadingSize;
  aside?: ReactNode;
  className?: string;
};

export const SectionHeader = ({ eyebrow, accent, title, size = "h1", aside, className }: SectionHeaderProps) => (
  <header className={cx(styles.header, className)}>
    <div className={styles.main}>
      {eyebrow && <Eyebrow accent={accent}>{eyebrow}</Eyebrow>}
      <Heading size={size}>{title}</Heading>
    </div>
    {aside && <p className={styles.aside}>{aside}</p>}
  </header>
);
