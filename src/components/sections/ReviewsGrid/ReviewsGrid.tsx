import { ReviewCard } from "@/components/cards/ReviewCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { TESTIMONIALS } from "@/content/testimonials";
import styles from "./ReviewsGrid.module.scss";

type ReviewsGridProps = { limit?: number; withHeader?: boolean };

export const ReviewsGrid = ({ limit = TESTIMONIALS.length, withHeader = false }: ReviewsGridProps) => (
  <Section spacing="m">
    {withHeader && <SectionHeader eyebrow="Testimonios" title="Lo que dice nuestra comunidad" aside="Historias reales de personas que crearon algo con propósito." />}
    <RevealGroup as="ul" className={styles.grid}>
      {TESTIMONIALS.slice(0, limit).map((review) => (
        <RevealItem as="li" key={review.id}>
          <ReviewCard headline={review.headline} quote={review.quote} author={review.author} role={review.role} portrait={review.portrait} />
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
