"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import { Logo } from "@/components/primitives/Logo";
import { HEADER_ACTIONS, PRIMARY_NAV } from "@/content/site";
import { useScrollLock } from "@/hooks/useScrollLock";
import { MenuOverlay } from "./MenuOverlay";
import { NavLink } from "./NavLink";
import { SoundToggle } from "../SoundToggle";
import styles from "./Header.module.scss";

type HeaderMode = "top" | "floating" | "hidden";

const CONDENSE_AFTER = 80;

const nextMode = (current: number, previous: number): HeaderMode => {
  if (current < CONDENSE_AFTER) return "top";
  return current > previous ? "hidden" : "floating";
};

export const Header = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [mode, setMode] = useState<HeaderMode>("top");
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const menuOpen = menuOpenOn === pathname;
  const hidden = mode === "hidden" && !menuOpen;

  useMotionValueEvent(scrollY, "change", (current) => setMode(nextMode(current, scrollY.getPrevious() ?? 0)));
  useScrollLock(menuOpen);

  return (
    <motion.header
      className={styles.header}
      data-mode={menuOpen ? "menu" : mode}
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ type: "spring", stiffness: 240, damping: 30 }}
    >
      <MenuOverlay open={menuOpen} pathname={pathname} onNavigate={() => setMenuOpenOn(null)} />
      <div className={styles.bar}>
        <Logo className={styles.logo} />
        <nav aria-label="Principal" className={styles.nav}>
          {PRIMARY_NAV.map((link) => (
            <NavLink key={link.href} link={link} pathname={pathname} />
          ))}
        </nav>
        <div className={styles.actions}>
          <Button href={HEADER_ACTIONS.signIn.href} variant="accent" withArrow={false} className={styles.signIn}>
            {HEADER_ACTIONS.signIn.label}
          </Button>
          <Button href={HEADER_ACTIONS.join.href} className={styles.join}>
            {HEADER_ACTIONS.join.label}
          </Button>
        </div>
        <SoundToggle placement="bar" />
        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpenOn(menuOpen ? null : pathname)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </div>
    </motion.header>
  );
};
