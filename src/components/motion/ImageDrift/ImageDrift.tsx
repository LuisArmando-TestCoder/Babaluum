"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import styles from "./ImageDrift.module.scss";

const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.19, 1, 0.22, 1] as const;

export const ImageDrift = ({ children }: { children: ReactNode }) => {
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={frame} className={styles.frame}>
      <motion.div
        className={styles.drift}
        style={{ y }}
        initial={{ scale: 1.4 }}
        whileInView={{ scale: 1.14 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.6, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
      <motion.span
        className={styles.shutter}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.1, ease: EASE_IN_OUT }}
      />
    </div>
  );
};
