"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { BodyMotion } from "./simulation";
import styles from "./BodyView.module.scss";

type BodyViewProps = {
  motion: BodyMotion;
  size: number;
  children: ReactNode;
};

const boxOf = (size: number) => (size > 0 ? { width: size, height: size } : { width: "max-content" });

export const BodyView = ({ motion: values, size, children }: BodyViewProps) => (
  <motion.div
    className={styles.body}
    style={{ x: values.x, y: values.y, rotate: values.rotate, scale: values.scale, ...boxOf(size) }}
  >
    <motion.div className={styles.figure} style={{ scale: values.fit }}>
      {children}
    </motion.div>
  </motion.div>
);
