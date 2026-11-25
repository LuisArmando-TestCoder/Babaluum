"use client";

import type { RefObject } from "react";
import { useRef, useState } from "react";
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

const bannerTrinkets = ({ top, left, right, bottom }: ImpactCopy["pills"], shelf: RefObject<HTMLElement | null>) => {
  const onShelf = { compactAnchor: { element: shelf } };
  return [
    pill({ id: "pill-top", label: top, tone: "orange", tilt: 5, home: { x: 0.49, y: 0.148 }, compactHome: { x: 0.3, y: 0.07 } }),
    pill({ id: "pill-left", label: left, tone: "green", tilt: 8, home: { x: 0.193, y: 0.467 }, compactHome: { x: 0.24, y: 0.22 }, ...onShelf }),
    pill({ id: "pill-right", label: right, tone: "red", tilt: -10, home: { x: 0.83, y: 0.47 }, compactHome: { x: 0.74, y: 0.3 }, ...onShelf }),
    pill({ id: "pill-bottom", label: bottom, tone: "lime", tilt: 5, home: { x: 0.537, y: 0.78 }, compactHome: { x: 0.5, y: 0.78 }, ...onShelf }),
    trinket({ id: "banner-crown", kind: "crown", color: "lime", home: { x: 0.685, y: 0.148 }, compactHome: { x: 0.72, y: 0.07 }, size: 44 }),
  ];
};

type ImpactBannerProps = { copy?: ImpactCopy };

export const ImpactBanner = ({ copy = IMPACT }: ImpactBannerProps) => {
  const shelf = useRef<HTMLDivElement>(null);
  const [trinkets] = useState(() => bannerTrinkets(copy.pills, shelf));

  return (
    <Section spacing="m">
      <NotchedSurface tone="purple" notches={NOTCHES.banner} className={styles.banner}>
        <Playground trinkets={trinkets} className={styles.stage}>
          <h2 className={styles.title}>
            <SplitWords segments={[{ text: copy.title }]} />
          </h2>
          <div ref={shelf} className={styles.shelf} />
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
