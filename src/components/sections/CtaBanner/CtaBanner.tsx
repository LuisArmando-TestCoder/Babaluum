"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { RefObject } from "react";
import { useRef, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Playground } from "@/components/playground/Playground";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { globe, pill, sticker, trinket } from "../cast/cast";
import styles from "./CtaBanner.module.scss";

type Slot = RefObject<HTMLElement | null>;

const ctaTrinkets = (action: Slot) => {
  const beside = (fit: number) => ({ element: action, fit });
  return [
    trinket({ id: "cta-crown", kind: "crown", color: "lime", home: { x: 0.215, y: 0.185 }, compactAnchor: beside(0.6), compactHome: { x: -0.17, y: 0.15 }, size: 42 }),
    trinket({ id: "cta-star", kind: "star", color: "purple", home: { x: 0.27, y: 0.527 }, compactAnchor: beside(0.5), compactHome: { x: -0.1, y: 1.05 }, size: 34 }),
    trinket({ id: "cta-plus", kind: "plus", color: "lime", home: { x: 0.83, y: 0.365 }, compactAnchor: beside(0.5), compactHome: { x: 1.08, y: -0.4 }, size: 34 }),
    pill({ id: "cta-metrics", label: "Comunidad", tone: "lime", tilt: 5, home: { x: 0.655, y: 0.188 }, compactHome: { x: 0.74, y: 0.085 } }),
    pill({ id: "cta-strategy", label: "Contenido", tone: "red", tilt: -8, home: { x: 0.3, y: 0.707 }, compactHome: { x: 0.27, y: 0.07 } }),
    sticker({ id: "cta-sticker", home: { x: 0.765, y: 0.63 }, compactAnchor: beside(0.85), compactHome: { x: 1.13, y: 0.5 } }),
  ];
};

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

const banner: Variants = {
  hidden: { scale: 0.88, y: 80 },
  shown: { scale: 1, y: 0, transition: { duration: 1.2, ease: EASE_OUT, staggerChildren: 0.12, delayChildren: 0.2 } },
};

const line: Variants = {
  hidden: { y: "110%" },
  shown: { y: "0%", transition: { duration: 1, ease: EASE_OUT } },
};

export const CtaBanner = () => {
  const globeSlot = useRef<HTMLSpanElement>(null);
  const actionSlot = useRef<HTMLDivElement>(null);
  const [npcs] = useState(() => [globe({ anchor: { element: globeSlot, fit: 1.32 }, compactAnchor: { element: globeSlot, fit: 0.95 } })]);
  const [trinkets] = useState(() => ctaTrinkets(actionSlot));

  return (
    <Container className={styles.wrap}>
      <motion.div variants={banner} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }}>
        <NotchedSurface tone="navy" notches={NOTCHES.cta} className={styles.banner}>
          <Playground npcs={npcs} trinkets={trinkets} className={styles.stage}>
            <h2 className={styles.title}>
              <span className={styles.mask}>
                <motion.span className={styles.line} variants={line}>
                  <span className={styles.soft}>¿Listo para crear</span> con Babaluum
                </motion.span>
              </span>
              <span className={styles.mask}>
                <motion.span className={styles.line} variants={line}>
                  y desbloquear{" "}
                  <span className={styles.word}>
                    t<span ref={globeSlot} data-cast-seat className={styles.slot} />
                    do
                  </span>{" "}
                  tu potencial?
                </motion.span>
              </span>
            </h2>
            <div ref={actionSlot}>
              <Magnetic>
                <Button href="/contacto" size="l">
                  Contáctanos
                </Button>
              </Magnetic>
            </div>
          </Playground>
        </NotchedSurface>
      </motion.div>
    </Container>
  );
};
