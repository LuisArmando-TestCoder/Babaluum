"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { COMPACT_VIEWPORT, useMediaQuery } from "@/hooks/useMediaQuery";

type ParallaxProps = {
  speed?: number;
  rotate?: number;
  className?: string;
  children: ReactNode;
};

export const Parallax = ({ speed = 0.2, rotate = 0, className, children }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const compact = useMediaQuery(COMPACT_VIEWPORT);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const travel = reduced ? 0 : speed * (compact ? 70 : 240);
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);
  const spin = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-rotate, rotate]);

  return (
    <motion.div ref={ref} className={className} style={{ y, rotate: spin }}>
      {children}
    </motion.div>
  );
};
