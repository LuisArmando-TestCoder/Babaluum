"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  delay?: number;
  distance?: number;
  className?: string;
  children: ReactNode;
};

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

export const Reveal = ({ delay = 0, distance = 40, className, children }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: distance }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 1.1, delay, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
};

const SLAP = { type: "spring", stiffness: 120, damping: 14, mass: 0.9 } as const;

const itemVariants: Variants = {
  hidden: (index: number) => ({ opacity: 0, y: 90, rotate: index % 2 === 0 ? -5 : 5, scale: 0.92 }),
  shown: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { ...SLAP, opacity: { duration: 0.3 } } },
};

type RevealGroupProps = {
  as?: "div" | "ul" | "ol";
  className?: string;
  children: ReactNode;
};

const GROUPS = { div: motion.div, ul: motion.ul, ol: motion.ol } as const;

export const RevealGroup = ({ as = "div", className, children }: RevealGroupProps) => {
  const Group = GROUPS[as];
  return (
    <Group className={className} variants={groupVariants} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.12 }}>
      {children}
    </Group>
  );
};

type RevealItemProps = {
  as?: "div" | "li";
  index?: number;
  className?: string;
  children: ReactNode;
};

export const RevealItem = ({ as = "div", index = 0, className, children }: RevealItemProps) => {
  const Item = as === "li" ? motion.li : motion.div;
  return (
    <Item className={className} variants={itemVariants} custom={index}>
      {children}
    </Item>
  );
};
