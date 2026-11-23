"use client";

import { useState } from "react";
import { ScrubText } from "@/components/motion/ScrubText";
import { SplitWords } from "@/components/motion/SplitWords";
import { Playground } from "@/components/playground/Playground";
import { Logo } from "@/components/primitives/Logo";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import type { ImpactCopy } from "@/content/impact";
import { IMPACT } from "@/content/impact";
import { pill, trinket } from "../cast/cast";
import styles from "./ImpactBanner.module.scss";

const bannerTrinkets = ({ top, left, right, bottom }: ImpactCopy["pills"]) => [
  pill({ id: "pill-top", label: top, tone: "orange", tilt: 5, home: { x: 0.49, y: 0.148 } }),
  pill({ id: "pill-left", label: left, tone: "green", tilt: 8, home: { x: 0.193, y: 0.467 } }),
  pill({ id: "pill-right", label: right, tone: "red", tilt: -10, home: { x: 0.83, y: 0.47 } }),
  pill({ id: "pill-bottom", label: bottom, tone: "lime", tilt: 5, home: { x: 0.537, y: 0.78 }, compactHome: { x: 0.66, y: 0.9 } }),
  trinket({ id: "banner-crown", kind: "crown", color: "lime", home: { x: 0.685, y: 0.148 }, size: 44 }),
];

type ImpactBannerProps = { copy?: ImpactCopy };

export const ImpactBanner = ({ copy = IMPACT }: ImpactBannerProps) => {
  const [trinkets] = useState(() => bannerTrinkets(copy.pills));

  return (
    <Section spacing="m">
      <NotchedSurface tone="purple" notches={NOTCHES.banner} className={styles.banner}>
        <Playground trinkets={trinkets} className={styles.stage}>
          <h2 className={styles.title}>
            <SplitWords segments={[{ text: copy.title }]} />
          </h2>
          <div className={styles.foot}>
            <p className={styles.note}>
              <ScrubText>{copy.note}</ScrubText>
            </p>
            <Logo />
          </div>
        </Playground>
      </NotchedSurface>
    </Section>
  );
};
