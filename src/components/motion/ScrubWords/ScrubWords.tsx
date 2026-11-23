"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Word, WordSegment } from "@/domain/design/words";
import { toWords } from "@/domain/design/words";
import styles from "./ScrubWords.module.scss";

type ScrubWordProps = { word: Word; progress: MotionValue<number>; from: number; to: number };

const ScrubWord = ({ word, progress, from, to }: ScrubWordProps) => {
  const opacity = useTransform(progress, [from, to], [0.16, 1]);
  return (
    <motion.span className={styles.word} style={{ opacity }} data-accent={word.accent}>
      {word.word}{" "}
    </motion.span>
  );
};

type ScrubWordsProps = { segments: readonly WordSegment[] };

export const ScrubWords = ({ segments }: ScrubWordsProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "end 0.55"] });
  const words = toWords(segments);
  return (
    <span ref={ref} className={styles.words}>
      {words.map((word, index) => (
        <ScrubWord key={word.key} word={word} progress={scrollYProgress} from={index / words.length} to={(index + 1) / words.length} />
      ))}
    </span>
  );
};
