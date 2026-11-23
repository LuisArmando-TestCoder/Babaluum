import type { ReactNode } from "react";
import { cx } from "@/domain/design/cx";
import type { Accent } from "@/domain/design/tone";
import styles from "./Eyebrow.module.scss";

type EyebrowProps = {
  accent?: Accent;
  size?: "m" | "l";
  children: ReactNode;
};

export const Eyebrow = ({ accent = "red", size = "m", children }: EyebrowProps) => (
  <p className={cx(styles.eyebrow, size === "l" && styles.l)} data-accent={accent}>
    {children}
  </p>
);
