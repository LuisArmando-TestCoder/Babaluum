import type { ReactNode } from "react";
import { cx } from "@/domain/design/cx";
import styles from "./Heading.module.scss";

type HeadingLevel = 1 | 2 | 3 | 4;

export type HeadingSize = "mega" | "hero" | "h1" | "h2" | "h3" | "h4";

type HeadingProps = {
  level?: HeadingLevel;
  size?: HeadingSize;
  align?: "start" | "center";
  className?: string;
  children: ReactNode;
};

export const Heading = ({ level = 2, size = "h2", align = "start", className, children }: HeadingProps) => {
  const Tag = `h${level}` as const;
  return <Tag className={cx(styles.heading, styles[size], styles[align], className)}>{children}</Tag>;
};

type HighlightProps = {
  accent?: "fog" | "purple" | "amber" | "sky" | "lime";
  children: ReactNode;
};

export const Highlight = ({ accent = "fog", children }: HighlightProps) => (
  <span className={styles.highlight} data-accent={accent}>
    {children}
  </span>
);
