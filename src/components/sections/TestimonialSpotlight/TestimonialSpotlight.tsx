import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading, Highlight } from "@/components/primitives/Heading";
import { Icon } from "@/components/primitives/Icon";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { FEATURED_TESTIMONIAL } from "@/content/testimonials";
import styles from "./TestimonialSpotlight.module.scss";

type TestimonialSpotlightProps = { layout?: "split" | "centered" };

export const TestimonialSpotlight = ({ layout = "split" }: TestimonialSpotlightProps) => (
  <Section className={styles[layout]}>
    <div className={styles.grid}>
      {layout === "split" && (
        <Parallax speed={0.12}>
          <Media image={FEATURED_TESTIMONIAL.portrait} ratio="4 / 5" notches={NOTCHES.portrait} sizes="(min-width: 900px) 25vw, 80vw" />
        </Parallax>
      )}
      <Reveal className={styles.copy}>
        <span className={styles.badge} aria-hidden="true">
          <Icon name="quote" />
        </span>
        <Eyebrow accent="red">Testimonios</Eyebrow>
        <Heading size="h1" align={layout === "centered" ? "center" : "start"}>
          {FEATURED_TESTIMONIAL.lead} <Highlight>{FEATURED_TESTIMONIAL.highlight}</Highlight>
        </Heading>
        <p className={styles.author}>{FEATURED_TESTIMONIAL.author}</p>
      </Reveal>
    </div>
  </Section>
);
