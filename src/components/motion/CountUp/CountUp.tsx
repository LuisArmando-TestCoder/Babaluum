"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import type { StatParts } from "@/domain/design/stat";
import { formatStat, parseStat } from "@/domain/design/stat";

const Counter = ({ parts }: { parts: StatParts }) => {
  const reduced = useReducedMotion();
  const amount = useMotionValue(parts.amount);
  const text = useTransform(amount, (current) => formatStat(parts, current));

  const count = () => {
    if (reduced) return;
    amount.set(0);
    animate(amount, parts.amount, { duration: 1.8, ease: [0.19, 1, 0.22, 1] });
  };

  return (
    <motion.span onViewportEnter={count} viewport={{ once: true, amount: 0.8 }}>
      {text}
    </motion.span>
  );
};

export const CountUp = ({ value }: { value: string }) => {
  const parts = parseStat(value);
  return parts ? <Counter parts={parts} /> : value;
};
