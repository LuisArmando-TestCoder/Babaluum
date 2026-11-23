import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/primitives/Icon";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { VALUES } from "@/content/team";
import type { Accent } from "@/domain/design/tone";
import styles from "./ValuesRow.module.scss";

type ValuesRowProps = { framed?: boolean; accent?: Accent };

const ValuesList = () => (
  <RevealGroup as="ul" className={styles.list}>
    {VALUES.map((value, index) => (
      <RevealItem as="li" key={value.title} index={index}>
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

export const ValuesRow = ({ framed = false, accent = "red" }: ValuesRowProps) => (
  <Section spacing="m">
    {framed ? (
      <NotchedSurface tone="mist" notches={NOTCHES.offer} className={styles.frame}>
        <ValuesList />
      </NotchedSurface>
    ) : (
      <>
        <SectionHeader eyebrow="Nosotros" accent={accent} title="Nuestros valores" aside="Lo que nos guía en cada programa, proyecto y conversación." />
        <ValuesList />
      </>
    )}
  </Section>
);
