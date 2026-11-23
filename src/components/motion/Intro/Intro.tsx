import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/domain/design/cx";
import styles from "./Intro.module.scss";

type IntroProps = { as?: "div" | "p"; delay?: number; className?: string; children: ReactNode };

export const Intro = ({ as: Tag = "div", delay = 0, className, children }: IntroProps) => (
  <Tag className={cx(styles.intro, className)} style={{ "--intro-delay": `${delay}s` } as CSSProperties}>
    {children}
  </Tag>
);
