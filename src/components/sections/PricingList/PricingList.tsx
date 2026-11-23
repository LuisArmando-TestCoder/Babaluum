import { OfferCard } from "@/components/cards/OfferCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { PLANS } from "@/content/plans";
import { twoTone } from "@/domain/design/words";
import styles from "./PricingList.module.scss";

export const PricingList = () => (
  <Section>
    <Heading size="h2" align="center" className={styles.title}>
      <SplitWords segments={twoTone("Tres formas de", "ser parte de Babaluum")} />
    </Heading>
    <RevealGroup as="ul" className={styles.list}>
      {PLANS.map((plan, index) => (
        <RevealItem as="li" key={plan.id} index={index}>
          <OfferCard
            id={plan.id}
            tone={plan.tone}
            title={plan.name}
            summary={plan.summary}
            badge={plan.badge}
            listTitle="Incluye"
            items={plan.features}
            headline={plan.price}
            cta={{ label: "Quiero participar", href: `/contacto?plan=${plan.id}#mensaje` }}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
