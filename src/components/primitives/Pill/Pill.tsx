import type { ReactNode } from "react";
import type { Tone } from "@/domain/design/tone";
import { cx } from "@/domain/design/cx";
import styles from "./Pill.module.scss";

type PillProps = {
  tone?: Tone;
  tilt?: number;
  className?: string;
  children: ReactNode;
};

export const Pill = ({ tone = "orange", tilt = 0, className, children }: PillProps) => (
  <span data-tone={tone} className={cx(styles.pill, className)} style={{ rotate: `${tilt}deg` }}>
    {children}
  </span>
);
