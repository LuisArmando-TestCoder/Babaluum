"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Cusp } from "@/components/primitives/Cusp";
import { Icon } from "@/components/primitives/Icon";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitWords } from "@/components/motion/SplitWords";
import { Playground } from "@/components/playground/Playground";
import { HEADER_ACTIONS, SITE } from "@/content/site";
import { HeroFooter } from "./HeroFooter";
import { heroNpcs, heroTrinkets } from "./heroCast";
import styles from "./HomeHero.module.scss";

const LEAD =
  "Conectamos a estudiantes, profesionales y organizaciones con ideas, herramientas y experiencias en tres áreas clave: inteligencia artificial, conciencia ambiental y desarrollo profesional.";

export const HomeHero = () => {
  const section = useRef<HTMLElement>(null);
  const robotSlot = useRef<HTMLSpanElement>(null);
  const [npcs] = useState(() => heroNpcs(robotSlot));
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const drift = (distance: number) => (progress: number) => progress * distance;
  const lineOne = useTransform(scrollYProgress, drift(-60));
  const lineTwo = useTransform(scrollYProgress, drift(-140));
  const lineThree = useTransform(scrollYProgress, drift(-220));
  const lineFour = useTransform(scrollYProgress, drift(-300));

  return (
    <section ref={section} data-tone="navy" className={styles.hero}>
      <Playground npcs={npcs} trinkets={heroTrinkets} className={styles.stage}>
        <Container className={styles.inner}>
          <p className={styles.tagline}>
            <Icon name="heart" className={styles.heart} />
            {SITE.tagline}
          </p>
          <h1 className={styles.title}>
            <motion.span className={styles.line} style={{ y: lineOne }}>
              <SplitWords immediate segments={[{ text: "Babaluum" }]} />
            </motion.span>
            <motion.span className={styles.line} style={{ y: lineTwo }}>
              <SplitWords immediate delay={0.1} segments={[{ text: "El hub", accent: "purple" }]} />
              <span ref={robotSlot} className={styles.slot}>
                <span className={styles.slotLabel}>
                  Mentes
                  <br />
                  inquietas
                </span>
              </span>
              <SplitWords immediate delay={0.2} segments={[{ text: "para" }]} />
            </motion.span>
            <motion.span className={styles.line} style={{ y: lineThree }}>
              <SplitWords immediate delay={0.3} segments={[{ text: "crear contenido y un" }]} />
            </motion.span>
            <motion.span className={styles.line} style={{ y: lineFour }}>
              <SplitWords immediate delay={0.45} segments={[{ text: "impacto social", accent: "amber" }, { text: "real" }]} />
            </motion.span>
          </h1>
          <p className={styles.lead}>{LEAD}</p>
          <Magnetic>
            <Button href={HEADER_ACTIONS.join.href}>{HEADER_ACTIONS.join.label}</Button>
          </Magnetic>
          <HeroFooter />
        </Container>
      </Playground>
      <Cusp />
    </section>
  );
};
