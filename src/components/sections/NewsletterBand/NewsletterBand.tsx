import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import type { NewsletterCopy } from "@/content/newsletter";
import { SignupFlow } from "./SignupFlow";
import styles from "./NewsletterBand.module.scss";

type NewsletterBandProps = { copy: NewsletterCopy; id?: string };

export const NewsletterBand = ({ copy, id = "boletin" }: NewsletterBandProps) => (
  <Section spacing="m" id={id}>
    <NotchedSurface tone="lime" notches={NOTCHES.banner} className={styles.band}>
      <Reveal>
        <h2 className={styles.title}>{copy.title}</h2>
        <p className={styles.aside}>
          <ScrubText>{copy.aside}</ScrubText>
        </p>
      </Reveal>
      <SignupFlow interest={copy.interest} action={copy.action} />
    </NotchedSurface>
  </Section>
);
