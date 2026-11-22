import type { ReactNode } from "react";
import type { Tone } from "@/domain/design/tone";
import { cx } from "@/domain/design/cx";
import { Container } from "../Container";
import styles from "./Section.module.scss";

type SectionProps = {
  tone?: Tone;
  spacing?: "s" | "m" | "l";
  id?: string;
  className?: string;
  bleed?: boolean;
  children: ReactNode;
};

export const Section = ({ tone = "white", spacing = "l", id, className, bleed = false, children }: SectionProps) => (
  <section id={id} data-tone={tone} className={cx(styles.section, styles[spacing], className)}>
    {bleed ? children : <Container>{children}</Container>}
  </section>
);
