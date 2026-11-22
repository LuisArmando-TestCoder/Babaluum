import type { ReactNode } from "react";
import type { Accent } from "@/domain/design/tone";
import styles from "./Eyebrow.module.scss";

type EyebrowProps = {
  accent?: Accent;
  children: ReactNode;
};

export const Eyebrow = ({ accent = "red", children }: EyebrowProps) => (
  <p className={styles.eyebrow} data-accent={accent}>
    {children}
  </p>
);
