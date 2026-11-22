import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/primitives/Button";
import { Heading } from "@/components/primitives/Heading";
import type { MediaSource } from "@/components/primitives/Media";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import styles from "./FeatureSplit.module.scss";

type FeatureSplitProps = {
  title: string;
  kicker?: string;
  body: string;
  image: MediaSource;
  cta: { label: string; href: string };
};

export const FeatureSplit = ({ title, kicker, body, image, cta }: FeatureSplitProps) => (
  <Section spacing="m">
    <div className={styles.grid}>
      <Reveal>
        <Heading size="h2" level={2}>
          {title}
        </Heading>
        {kicker && <p className={styles.kicker}>{kicker}</p>}
        <p className={styles.body}>{body}</p>
        <Button href={cta.href} variant="dark">
          {cta.label}
        </Button>
      </Reveal>
      <Parallax speed={0.1}>
        <Media image={image} ratio="4 / 3" notches={NOTCHES.photo} priority />
      </Parallax>
    </div>
  </Section>
);
