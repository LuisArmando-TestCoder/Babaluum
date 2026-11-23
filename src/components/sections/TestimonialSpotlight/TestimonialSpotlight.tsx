import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading } from "@/components/primitives/Heading";
import { Icon } from "@/components/primitives/Icon";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { FEATURED_TESTIMONIAL } from "@/content/testimonials";
import { twoTone } from "@/domain/design/words";
import styles from "./TestimonialSpotlight.module.scss";

type TestimonialSpotlightProps = { layout?: "split" | "centered" };

export const TestimonialSpotlight = ({ layout = "split" }: TestimonialSpotlightProps) => (
  <Section className={styles[layout]}>
    <div className={styles.grid}>
      {layout === "split" && (
        <Media image={FEATURED_TESTIMONIAL.portrait} ratio="400 / 472" notches={NOTCHES.portrait} sizes="(min-width: 900px) 30vw, 80vw" />
      )}
      <div className={styles.copy}>
        <Reveal>
          <span className={styles.badge} aria-hidden="true">
            <Icon name="quote" />
          </span>
          <Eyebrow accent="red">Testimonios</Eyebrow>
        </Reveal>
        <Heading size="h2" align={layout === "centered" ? "center" : "start"}>
          <SplitWords segments={twoTone(FEATURED_TESTIMONIAL.lead, FEATURED_TESTIMONIAL.highlight)} />
        </Heading>
        <Reveal delay={0.2}>
          <p className={styles.author}>{FEATURED_TESTIMONIAL.author}</p>
        </Reveal>
      </div>
    </div>
  </Section>
);
