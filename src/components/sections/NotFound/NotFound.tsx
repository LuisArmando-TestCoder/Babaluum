"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Playground } from "@/components/playground/Playground";
import { alien, globe, robot, trinket } from "../cast/cast";
import styles from "./NotFound.module.scss";

const TRINKETS = [
  trinket({ id: "lost-star", kind: "star", color: "lime", home: { x: 0.2, y: 0.3 }, size: 30 }),
  trinket({ id: "lost-plus", kind: "plus", color: "sky", home: { x: 0.8, y: 0.25 }, size: 26 }),
  trinket({ id: "lost-crown", kind: "crown", color: "amber", home: { x: 0.3, y: 0.75 }, size: 34 }),
  trinket({ id: "lost-asterisk", kind: "asterisk", color: "orange", home: { x: 0.72, y: 0.72 }, size: 30 }),
  trinket({ id: "lost-heart", kind: "heart", color: "red", home: { x: 0.5, y: 0.15 }, size: 26 }),
];

export const NotFound = () => {
  const [npcs] = useState(() => [
    alien({ x: 0.15, y: 0.55 }),
    globe({ x: 0.85, y: 0.5 }),
    robot({ home: { x: 0.62, y: 0.82 }, size: 120 }),
  ]);

  return (
    <section data-tone="navy" className={styles.section}>
      <Playground npcs={npcs} trinkets={TRINKETS} className={styles.stage}>
        <div className={styles.content}>
          <div className={styles.sign} aria-hidden="true">
            <span>404</span>
          </div>
          <h1 className={styles.title}>¡Ups! Página no encontrada</h1>
          <p className={styles.text}>Parece que esta página se fue de voluntariado. Volvamos al inicio.</p>
          <Button href="/">Volver al inicio</Button>
        </div>
      </Playground>
    </section>
  );
};
