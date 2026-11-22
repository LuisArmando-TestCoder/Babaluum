import { Accordion } from "@/components/primitives/Accordion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading } from "@/components/primitives/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/primitives/Section";
import { FAQS } from "@/content/faqs";
import styles from "./FaqSection.module.scss";

const ITEMS = FAQS.map((faq) => ({ id: faq.id, title: faq.question, body: faq.answer }));

export const FaqSection = () => (
  <Section>
    <div className={styles.grid}>
      <Reveal>
        <Eyebrow accent="purple">FAQ</Eyebrow>
        <Heading size="h1" className={styles.title}>
          Tus preguntas respondidas
        </Heading>
        <p className={styles.note}>Todo lo que necesitas saber sobre Babaluum, sus programas y cómo trabajamos.</p>
      </Reveal>
      <Reveal delay={0.1}>
        <Accordion items={ITEMS} defaultOpenId={ITEMS[0]?.id} />
      </Reveal>
    </div>
  </Section>
);
