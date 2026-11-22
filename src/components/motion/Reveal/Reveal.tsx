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

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const Reveal = ({ delay = 0, distance = 48, className, children }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: distance }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.9, delay, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 56, rotate: 1.5 },
  shown: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

type RevealGroupProps = {
  as?: "div" | "ul";
  className?: string;
  children: ReactNode;
};

export const RevealGroup = ({ as = "div", className, children }: RevealGroupProps) => {
  const Group = as === "ul" ? motion.ul : motion.div;
  return (
    <Group className={className} variants={groupVariants} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.15 }}>
      {children}
    </Group>
  );
};

type RevealItemProps = {
  as?: "div" | "li";
  className?: string;
  children: ReactNode;
};

export const RevealItem = ({ as = "div", className, children }: RevealItemProps) => {
  const Item = as === "li" ? motion.li : motion.div;
  return (
    <Item className={className} variants={itemVariants}>
      {children}
    </Item>
  );
};
