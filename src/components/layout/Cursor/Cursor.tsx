"use client";

import { motion, useSpring } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";
import styles from "./Cursor.module.scss";

const FOLLOW = { stiffness: 520, damping: 40, mass: 0.5 };

export const Cursor = () => {
  const cursor = useCursor();
  const x = useSpring(cursor.x, FOLLOW);
  const y = useSpring(cursor.y, FOLLOW);

  return (
    <motion.div className={styles.cursor} style={{ x, y }} data-mode={cursor.mode} data-active={cursor.active} aria-hidden="true">
      <span className={styles.disc}>
        <span className={styles.label}>{cursor.label}</span>
      </span>
    </motion.div>
  );
};
