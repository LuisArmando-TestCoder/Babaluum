"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { Button } from "@/components/primitives/Button";
import { Heading } from "@/components/primitives/Heading";
import type { MediaSource } from "@/components/primitives/Media";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { StepControls } from "@/components/primitives/StepControls";
import styles from "./FeatureSlider.module.scss";

export type FeatureSlide = { key: string; title: string; body: string; image: MediaSource; href: string };

type FeatureSliderProps = {
  heading?: string;
  subject: string;
  slides: readonly FeatureSlide[];
  ctaLabel: string;
};

const SWAP = { duration: 0.5, ease: [0.19, 1, 0.22, 1] } as const;

export const FeatureSlider = ({ heading, subject, slides, ctaLabel }: FeatureSliderProps) => {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  if (!slide) return null;

  return (
    <Section spacing="l">
      <div className={styles.grid}>
        <div className={styles.copy}>
          {heading && (
            <Heading size="h2" className={styles.heading}>
              <SplitWords segments={[{ text: heading }]} />
            </Heading>
          )}
          <AnimatePresence mode="wait">
            <motion.div key={slide.key} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={SWAP}>
              <Heading size={heading ? "h4" : "h3"} level={heading ? 3 : 2} className={styles.title}>
                {slide.title}
              </Heading>
              <p className={styles.body}>{slide.body}</p>
              <Button href={slide.href} variant="dark" size="l">
                {ctaLabel}
              </Button>
            </motion.div>
          </AnimatePresence>
          <div className={styles.nav}>
            <StepControls subject={subject} onStep={(direction) => setIndex(index + direction)} atStart={index === 0} atEnd={index === slides.length - 1} />
            <p className={styles.counter} aria-live="polite">
              {index + 1}
              <span>/{slides.length}</span>
            </p>
          </div>
        </div>
        <Media key={slide.key} image={slide.image} ratio="700 / 560" notches={NOTCHES.frame} priority sizes="(min-width: 900px) 50vw, 90vw" />
      </div>
    </Section>
  );
};
