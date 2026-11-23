"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { cx } from "@/domain/design/cx";
import type { WordSegment } from "@/domain/design/words";
import { toWords } from "@/domain/design/words";
import styles from "./SplitWords.module.scss";

type SplitWordsProps = {
  segments: readonly WordSegment[];
  delay?: number;
  immediate?: boolean;
};

const STAGGER = 0.055;

const containerVariants: Variants = {
  hidden: {},
  shown: (delay: number) => ({ transition: { staggerChildren: STAGGER, delayChildren: delay } }),
};

const wordVariants: Variants = {
  hidden: { y: "118%", rotate: 7 },
  shown: { y: "0%", rotate: 0, transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } },
};

const startsAfter = (seconds: number) => ({ "--word-delay": `${seconds.toFixed(3)}s` }) as CSSProperties;

type WordsProps = Pick<SplitWordsProps, "segments"> & { delay: number };

const IntroWords = ({ segments, delay }: WordsProps) => (
  <span className={styles.words}>
    {toWords(segments).map(({ key, word, accent }, index) => (
      <span key={key} className={styles.mask}>
        <span className={cx(styles.word, styles.intro)} style={startsAfter(delay + index * STAGGER)} data-accent={accent}>
          {word}
        </span>
      </span>
    ))}
  </span>
);

const InViewWords = ({ segments, delay }: WordsProps) => (
  <motion.span className={styles.words} variants={containerVariants} initial="hidden" custom={delay} whileInView="shown" viewport={{ once: true, amount: 0.5 }}>
    {toWords(segments).map(({ key, word, accent }) => (
      <span key={key} className={styles.mask}>
        <motion.span className={styles.word} variants={wordVariants} data-accent={accent}>
          {word}
        </motion.span>
      </span>
    ))}
  </motion.span>
);

export const SplitWords = ({ segments, delay = 0, immediate = false }: SplitWordsProps) =>
  immediate ? <IntroWords segments={segments} delay={delay} /> : <InViewWords segments={segments} delay={delay} />;
