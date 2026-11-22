"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import { Logo } from "@/components/primitives/Logo";
import { HEADER_ACTIONS, PRIMARY_NAV } from "@/content/site";
import styles from "./Header.module.scss";

type HeaderMode = "top" | "floating" | "hidden";

const CONDENSE_AFTER = 80;

const nextMode = (current: number, previous: number): HeaderMode => {
  if (current < CONDENSE_AFTER) return "top";
  return current > previous ? "hidden" : "floating";
};

export const Header = () => {
  const { scrollY } = useScroll();
  const [mode, setMode] = useState<HeaderMode>("top");
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => setMode(nextMode(current, scrollY.getPrevious() ?? 0)));

  return (
    <motion.header
      className={styles.header}
      data-mode={menuOpen ? "floating" : mode}
      animate={{ y: mode === "hidden" && !menuOpen ? "-120%" : "0%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <div className={styles.bar}>
        <Logo />
        <nav aria-label="Principal" className={styles.nav}>
          {PRIMARY_NAV.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <Button href={HEADER_ACTIONS.signIn.href} variant="accent" withArrow={false} className={styles.signIn}>
            {HEADER_ACTIONS.signIn.label}
          </Button>
          <Button href={HEADER_ACTIONS.join.href}>{HEADER_ACTIONS.join.label}</Button>
        </div>
        <button type="button" className={styles.menuToggle} aria-expanded={menuOpen} aria-label="Menú" onClick={() => setMenuOpen((open) => !open)}>
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav aria-label="Móvil" className={styles.drawer} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {[...PRIMARY_NAV, HEADER_ACTIONS.join].map((link) => (
              <Link key={link.href} href={link.href} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
