"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { cx } from "@/domain/design/cx";
import styles from "./ScrubText.module.scss";

type ScrubTextProps = { children: ReactNode; from?: number; to?: number; className?: string };

const toFill = (progress: number): string => `${Math.round(progress * 1000) / 10}% 100%`;

export const ScrubText = ({ children, from = 0.95, to = 0.6, className }: ScrubTextProps) => {
  const text = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: text, offset: [`start ${from}`, `end ${to}`] });
  const backgroundSize = useTransform(scrollYProgress, toFill);

  return (
    <motion.span ref={text} className={cx(styles.scrub, className)} style={{ backgroundSize }}>
      {children}
    </motion.span>
  );
};
