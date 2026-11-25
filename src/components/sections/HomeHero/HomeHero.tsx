"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Intro } from "@/components/motion/Intro";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitWords } from "@/components/motion/SplitWords";
import { Playground } from "@/components/playground/Playground";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Cusp } from "@/components/primitives/Cusp";
import { Icon } from "@/components/primitives/Icon";
import type { HeroCopy } from "@/content/home";
import { HeroFooter } from "./HeroFooter";
import { heroNpcs, heroTags, heroTrinkets } from "./heroCast";
import styles from "./HomeHero.module.scss";


const INTRO = 0.5;

const STAMP = { type: "spring", stiffness: 160, damping: 11, delay: INTRO + 0.35 } as const;


type HomeHeroProps = { copy: HeroCopy };

export const HomeHero = ({ copy }: HomeHeroProps) => {
  const { title } = copy;
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const robotSlot = useRef<HTMLSpanElement>(null);
  const tagsSlot = useRef<HTMLDivElement>(null);
  const actionSlot = useRef<HTMLDivElement>(null);
  const [npcs] = useState(() => heroNpcs(heading, { robot: robotSlot, action: actionSlot }));
  const [trinkets] = useState(() => [...heroTrinkets(heading), ...heroTags(tagsSlot, copy.tags)]);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const drift = (distance: number) => (progress: number) => progress * distance;
  const lineOne = useTransform(scrollYProgress, drift(-40));
  const lineTwo = useTransform(scrollYProgress, drift(-90));
  const lineThree = useTransform(scrollYProgress, drift(-140));
  const lineFour = useTransform(scrollYProgress, drift(-190));

  return (
    <section ref={section} data-tone="navy" className={styles.hero}>
      <Playground npcs={npcs} trinkets={trinkets} className={styles.stage}>
        <Container className={styles.inner}>
          <Intro as="p" delay={INTRO} className={styles.tagline}>
            <Icon name="heart" className={styles.heart} />
            {copy.tagline}
          </Intro>
          <h1 ref={heading} className={styles.title}>
            <motion.span className={styles.line} style={{ y: lineOne }}>
              <SplitWords immediate delay={INTRO} segments={[{ text: title.brand }]} />
            </motion.span>
            <motion.span className={styles.line} style={{ y: lineTwo }}>
              <SplitWords immediate delay={INTRO + 0.1} segments={[{ text: title.hub, accent: "purple" }]} />
              <motion.span ref={robotSlot} className={styles.slot} initial={{ scale: 0, rotate: 30 }} animate={{ scale: 1, rotate: -12 }} transition={STAMP}>
                <span className={styles.slotLabel}>
                  {title.sticker[0]}
                  <br />
                  {title.sticker[1]}
                </span>
              </motion.span>
              <SplitWords immediate delay={INTRO + 0.2} segments={[{ text: title.bridge }]} />
            </motion.span>
            <motion.span className={styles.line} style={{ y: lineThree }}>
              <SplitWords immediate delay={INTRO + 0.3} segments={[{ text: title.body }]} />
            </motion.span>
            <motion.span className={styles.line} style={{ y: lineFour }}>
              <SplitWords immediate delay={INTRO + 0.42} segments={[{ text: title.impact, accent: "amber" }, { text: title.close }]} />
            </motion.span>
          </h1>
          <Intro as="p" delay={INTRO + 0.6} className={styles.lead}>
            {copy.lead}
          </Intro>
          <Intro delay={INTRO + 0.72}>
            <div ref={actionSlot}>
              <Magnetic>
                <Button href={copy.action.href} size="l">
                  {copy.action.label}
                </Button>
              </Magnetic>
            </div>
          </Intro>
          <HeroFooter copy={copy} tagsSlot={tagsSlot} />
        </Container>
      </Playground>
      <Cusp />
    </section>
  );
};
