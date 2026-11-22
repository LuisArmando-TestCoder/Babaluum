import { Section } from "@/components/primitives/Section";
import type { LegalSection } from "@/content/legal";
import styles from "./LegalBody.module.scss";

type LegalBodyProps = { sections: readonly LegalSection[] };

export const LegalBody = ({ sections }: LegalBodyProps) => (
  <Section spacing="m">
    <article className={styles.body}>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className={styles.heading}>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </article>
  </Section>
);
