"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { cx } from "@/domain/design/cx";
import { Icon } from "../Icon";
import styles from "./Accordion.module.scss";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  body: ReactNode;
  leading?: ReactNode;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  defaultOpenId?: string;
  variant?: "compact" | "panel";
  renderOpen?: (item: AccordionItem) => ReactNode;
};

const EXPAND = { height: "auto", opacity: 1 };
const COLLAPSE = { height: 0, opacity: 0 };

export const Accordion = ({ items, defaultOpenId, variant = "compact", renderOpen }: AccordionProps) => {
  const [openId, setOpenId] = useState(defaultOpenId);
  const toggle = (id: string) => setOpenId((current) => (current === id ? undefined : id));

  return (
    <ul className={cx(styles.list, styles[variant])}>
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <li key={item.id} className={styles.item} data-open={isOpen}>
            {renderOpen && isOpen ? (
              renderOpen(item)
            ) : (
              <button type="button" className={styles.trigger} aria-expanded={isOpen} onClick={() => toggle(item.id)}>
                {item.leading}
                <span className={styles.title}>{item.title}</span>
                <span className={styles.toggle}>
                  <Icon name={isOpen ? "minus" : "plus"} />
                </span>
              </button>
            )}
            <AnimatePresence initial={false}>
              {isOpen && !renderOpen && (
                <motion.div className={styles.panel} initial={COLLAPSE} animate={EXPAND} exit={COLLAPSE}>
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
