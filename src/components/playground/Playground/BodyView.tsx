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

export const BodyView = ({ motion: values, size, children }: BodyViewProps) => (
  <motion.div
    className={styles.body}
    style={{ x: values.x, y: values.y, rotate: values.rotate, scale: values.scale, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
  >
    <div className={styles.figure}>{children}</div>
  </motion.div>
);
