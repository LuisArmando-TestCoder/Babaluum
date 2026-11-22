import { Reveal } from "@/components/motion/Reveal";
import { Heading, Highlight } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import styles from "./Statement.module.scss";

type StatementProps = { lead: string; highlight: string; align?: "center" | "start" };

export const Statement = ({ lead, highlight, align = "center" }: StatementProps) => (
  <Section spacing="m">
    <Reveal className={styles[align]}>
      <Heading size="h2" align={align} className={styles.heading}>
        {lead} <Highlight>{highlight}</Highlight>
      </Heading>
    </Reveal>
  </Section>
);
