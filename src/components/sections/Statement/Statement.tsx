import { ScrubWords } from "@/components/motion/ScrubWords";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { twoTone } from "@/domain/design/words";
import styles from "./Statement.module.scss";

type StatementProps = { lead: string; highlight: string; align?: "center" | "start" };

export const Statement = ({ lead, highlight, align = "center" }: StatementProps) => (
  <Section spacing="m">
    <div className={styles[align]}>
      <Heading size="h2" align={align} className={styles.heading}>
        <ScrubWords segments={twoTone(lead, highlight)} />
      </Heading>
    </div>
  </Section>
);
