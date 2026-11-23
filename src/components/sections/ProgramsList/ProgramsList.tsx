import { OfferCard } from "@/components/cards/OfferCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { Offer } from "@/content/programs";
import styles from "./ProgramsList.module.scss";

type ProgramsListProps = { eyebrow: string; title: string; aside: string; offers: readonly Offer[] };

export const ProgramsList = ({ eyebrow, title, aside, offers }: ProgramsListProps) => (
  <Section>
    <SectionHeader eyebrow={eyebrow} accent="green" title={title} aside={aside} />
    <RevealGroup as="ul" className={styles.list}>
      {offers.map((offer, index) => (
        <RevealItem as="li" key={offer.id} index={index}>
          <OfferCard {...offer} listTitle="Lo que te llevas" />
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
