"use client";

import { Logo } from "@/components/primitives/Logo";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SplitWords } from "@/components/motion/SplitWords";
import { Playground } from "@/components/playground/Playground";
import { pill, trinket } from "../cast/cast";
import styles from "./ImpactBanner.module.scss";

const TRINKETS = [
  pill({ id: "pill-visual", label: "Contenido visual", tone: "orange", tilt: 3, home: { x: 0.49, y: 0.14 } }),
  pill({ id: "pill-growth", label: "Crecimiento", tone: "green", tilt: 7, home: { x: 0.2, y: 0.46 } }),
  pill({ id: "pill-strategy", label: "Estrategia", tone: "red", tilt: -9, home: { x: 0.82, y: 0.48 } }),
  pill({ id: "pill-metrics", label: "Impacto medible", tone: "lime", tilt: 6, home: { x: 0.6, y: 0.8 } }),
  trinket({ id: "banner-crown", kind: "crown", color: "lime", home: { x: 0.68, y: 0.12 }, size: 30 }),
];

export const ImpactBanner = () => (
  <Section spacing="s">
    <NotchedSurface tone="purple" notches={NOTCHES.banner} className={styles.banner}>
      <Playground trinkets={TRINKETS} className={styles.stage}>
        <h2 className={styles.title}>
          <SplitWords segments={[{ text: "Redefinimos el impacto digital con iniciativas que generan cambios reales" }]} />
        </h2>
        <div className={styles.foot}>
          <p className={styles.note}>Contenido con propósito que conecta, inspira y transforma comunidades.</p>
          <Logo className={styles.logo} />
        </div>
      </Playground>
    </NotchedSurface>
  </Section>
);
