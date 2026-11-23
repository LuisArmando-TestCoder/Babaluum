"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { Icon } from "../Icon";
import styles from "./Accordion.module.scss";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  body: ReactNode;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  defaultOpenId?: string;
};

const EXPAND = { height: "auto", opacity: 1 };
const COLLAPSE = { height: 0, opacity: 0 };
const TRANSITION = { duration: 0.55, ease: [0.19, 1, 0.22, 1] } as const;

export const Accordion = ({ items, defaultOpenId }: AccordionProps) => {
  const [openId, setOpenId] = useState(defaultOpenId);
  const toggle = (id: string) => setOpenId((current) => (current === id ? undefined : id));

  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <li key={item.id} className={styles.item}>
            <button type="button" className={styles.trigger} aria-expanded={isOpen} aria-controls={`${item.id}-panel`} onClick={() => toggle(item.id)}>
              <span className={styles.toggle}>
                <Icon name={isOpen ? "minus" : "plus"} />
              </span>
              <span className={styles.title}>{item.title}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`${item.id}-panel`} className={styles.panel} initial={COLLAPSE} animate={EXPAND} exit={COLLAPSE} transition={TRANSITION}>
                  <div className={styles.body}>{item.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
};
