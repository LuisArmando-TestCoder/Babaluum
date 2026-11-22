"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { Accent } from "@/domain/design/tone";
import styles from "./SplitWords.module.scss";

export type WordSegment = { text: string; accent?: Accent };

type SplitWordsProps = {
  segments: readonly WordSegment[];
  delay?: number;
  immediate?: boolean;
};

const containerVariants: Variants = {
  hidden: {},
  shown: (delay: number) => ({ transition: { staggerChildren: 0.06, delayChildren: delay } }),
};

const wordVariants: Variants = {
  hidden: { y: "110%", rotate: 6 },
  shown: { y: "0%", rotate: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

const toWords = (segments: readonly WordSegment[]) =>
  segments.flatMap((segment, segmentIndex) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word, wordIndex) => ({ key: `${segmentIndex}-${wordIndex}`, word, accent: segment.accent })),
  );

export const SplitWords = ({ segments, delay = 0, immediate = false }: SplitWordsProps) => {
  const trigger = immediate ? { animate: "shown" } : { whileInView: "shown", viewport: { once: true, amount: 0.4 } };
  return (
    <motion.span className={styles.words} variants={containerVariants} initial="hidden" custom={delay} {...trigger}>
      {toWords(segments).map(({ key, word, accent }) => (
        <span key={key} className={styles.mask}>
          <motion.span className={styles.word} variants={wordVariants} data-accent={accent}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};
