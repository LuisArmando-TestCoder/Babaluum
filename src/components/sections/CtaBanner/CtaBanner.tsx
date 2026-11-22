"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Magnetic } from "@/components/motion/Magnetic";
import { Playground } from "@/components/playground/Playground";
import { globe, pill, sticker, trinket } from "../cast/cast";
import styles from "./CtaBanner.module.scss";

const TRINKETS = [
  trinket({ id: "cta-crown", kind: "crown", color: "lime", home: { x: 0.21, y: 0.2 }, size: 32 }),
  trinket({ id: "cta-star", kind: "star", color: "purple", home: { x: 0.26, y: 0.6 }, size: 26 }),
  trinket({ id: "cta-plus", kind: "plus", color: "lime", home: { x: 0.79, y: 0.42 }, size: 28 }),
  pill({ id: "cta-metrics", label: "Impacto medible", tone: "lime", tilt: 6, home: { x: 0.64, y: 0.2 } }),
  pill({ id: "cta-strategy", label: "Estrategia", tone: "red", tilt: -10, home: { x: 0.28, y: 0.8 } }),
  sticker("cta-sticker", { x: 0.75, y: 0.62 }, 84),
];

export const CtaBanner = () => {
  const globeSlot = useRef<HTMLSpanElement>(null);
  const [npcs] = useState(() => [globe({ x: 0.5, y: 0.5 }, 74, globeSlot)]);

  return (
    <Container className={styles.wrap}>
      <NotchedSurface tone="navy" notches={NOTCHES.banner} className={styles.banner}>
        <Playground npcs={npcs} trinkets={TRINKETS} className={styles.stage}>
          <h2 className={styles.title}>
            <span className={styles.soft}>¿Listo para crear</span> con Babaluum
            <br />y desbloquear t<span ref={globeSlot} className={styles.slot} />
            do tu potencial?
          </h2>
          <Magnetic>
            <Button href="/contacto">Contáctanos</Button>
          </Magnetic>
        </Playground>
      </NotchedSurface>
    </Container>
  );
};
