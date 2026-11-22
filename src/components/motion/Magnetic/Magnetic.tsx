"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type MagneticProps = {
  strength?: number;
  className?: string;
  children: ReactNode;
};

const SPRING = { stiffness: 260, damping: 18, mass: 0.6 };

export const Magnetic = ({ strength = 0.35, className, children }: MagneticProps) => {
  const reduced = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, SPRING);
  const y = useSpring(offsetY, SPRING);

  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    offsetX.set((event.clientX - rect.left - rect.width / 2) * strength);
    offsetY.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const release = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div className={className} style={{ x, y, display: "inline-block" }} onPointerMove={follow} onPointerLeave={release}>
      {children}
    </motion.div>
  );
};
