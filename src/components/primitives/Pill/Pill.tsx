import type { ReactNode } from "react";
import { cx } from "@/domain/design/cx";
import type { Tone } from "@/domain/design/tone";
import styles from "./Pill.module.scss";

type PillProps = {
  tone?: Tone;
  ink?: "tone" | "navy";
  size?: "s" | "m";
  tilt?: number;
  className?: string;
  children: ReactNode;
};

export const Pill = ({ tone = "orange", ink = "tone", size = "s", tilt = 0, className, children }: PillProps) => (
  <span data-tone={tone} data-ink={ink} className={cx(styles.pill, styles[size], className)} style={{ rotate: `${tilt}deg` }}>
    {children}
  </span>
);
