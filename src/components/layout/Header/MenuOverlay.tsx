"use client";

import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/primitives/Button";
import { EXPLORE_NAV, HEADER_ACTIONS, PRIMARY_NAV } from "@/content/site";
import { isCurrent } from "./NavLink";
import styles from "./MenuOverlay.module.scss";

type MenuOverlayProps = { open: boolean; pathname: string; onNavigate: () => void };

const ORIGIN = "calc(100% - 3rem) 3rem";

const panel: Variants = {
  closed: { clipPath: `circle(0% at ${ORIGIN})`, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  open: { clipPath: `circle(160% at ${ORIGIN})`, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], staggerChildren: 0.06, delayChildren: 0.25 } },
};

const item: Variants = {
  closed: { y: 60, opacity: 0 },
  open: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } },
};

export const MenuOverlay = ({ open, pathname, onNavigate }: MenuOverlayProps) => (
  <AnimatePresence>
    {open && (
      <motion.nav aria-label="Menú" className={styles.overlay} variants={panel} initial="closed" animate="open" exit="closed">
        <ul className={styles.links}>
          {PRIMARY_NAV.map((link) => (
            <motion.li key={link.href} variants={item}>
              <Link href={link.href} className={styles.link} aria-current={isCurrent(pathname, link.href) ? "page" : undefined} onClick={onNavigate}>
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>
        <motion.ul className={styles.more} variants={item}>
          {EXPLORE_NAV.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onNavigate}>
                {link.label}
              </Link>
            </li>
          ))}
        </motion.ul>
        <motion.div className={styles.actions} variants={item}>
          <Button href={HEADER_ACTIONS.join.href} size="l">
            {HEADER_ACTIONS.join.label}
          </Button>
        </motion.div>
      </motion.nav>
    )}
  </AnimatePresence>
);
