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
          {section.items && (
            <ul className={styles.items}>
              {section.items.map((item) => (
                <li key={item.text} className={styles.item}>
                  {item.term && <strong>{item.term}: </strong>}
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  </Section>
);
