import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { Button } from "@/components/primitives/Button";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Pill } from "@/components/primitives/Pill";
import { Section } from "@/components/primitives/Section";
import styles from "./StudioBand.module.scss";

type StudioBandProps = { copy: { status: string; title: string; text: string; action: { label: string; href: string } } };

export const StudioBand = ({ copy }: StudioBandProps) => (
  <Section spacing="m">
    <NotchedSurface tone="navy" notches={NOTCHES.cta} className={styles.band}>
      <Reveal className={styles.copy}>
        <Pill tone="lime" ink="navy" tilt={-6} size="m">
          {copy.status}
        </Pill>
        <h2 className={styles.title}>{copy.title}</h2>
        <p className={styles.text}>
          <ScrubText>{copy.text}</ScrubText>
        </p>
      </Reveal>
      <Button href={copy.action.href} size="l">
        {copy.action.label}
      </Button>
    </NotchedSurface>
  </Section>
);
