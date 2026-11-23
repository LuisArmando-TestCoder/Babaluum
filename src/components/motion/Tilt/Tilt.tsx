"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type TiltProps = {
  max?: number;
  className?: string;
  children: ReactNode;
};

const SPRING = { stiffness: 180, damping: 16, mass: 0.5 };

export const Tilt = ({ max = 7, className, children }: TiltProps) => {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-max, max]), SPRING);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [max, -max]), SPRING);

  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const release = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div className={className} style={{ rotateX, rotateY, transformPerspective: 900 }} onPointerMove={follow} onPointerLeave={release}>
      {children}
    </motion.div>
  );
};
