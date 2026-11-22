import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/primitives/Icon";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { VALUES } from "@/content/team";
import styles from "./ValuesRow.module.scss";

type ValuesRowProps = { framed?: boolean; withHeader?: boolean };

const ValuesList = () => (
  <RevealGroup as="ul" className={styles.list}>
    {VALUES.map((value) => (
      <RevealItem as="li" key={value.title} className={styles.item}>
        <h3 className={styles.title}>
          <span className={styles.icon}>
            <Icon name={value.icon} />
          </span>
          {value.title}
        </h3>
        <p className={styles.body}>{value.body}</p>
      </RevealItem>
    ))}
  </RevealGroup>
);

export const ValuesRow = ({ framed = false, withHeader = true }: ValuesRowProps) => (
  <Section spacing="m">
    {withHeader && <SectionHeader eyebrow="Nosotros" title="Nuestros valores" aside="Lo que nos guía en cada programa, proyecto y conversación." />}
    {framed ? (
      <NotchedSurface tone="sky" notches={NOTCHES.tab} className={styles.frame}>
        <ValuesList />
      </NotchedSurface>
    ) : (
      <ValuesList />
    )}
  </Section>
);
