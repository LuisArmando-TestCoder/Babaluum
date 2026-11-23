"use client";

import Link from "next/link";
import { useState } from "react";
import { Intro } from "@/components/motion/Intro";
import { SplitWords } from "@/components/motion/SplitWords";
import { Playground } from "@/components/playground/Playground";
import { Button } from "@/components/primitives/Button";
import { Pill } from "@/components/primitives/Pill";
import { alien, pill, robot, trinket } from "../cast/cast";
import styles from "./ComingSoon.module.scss";

type Action = { label: string; href: string };

type Services = { top: string; left: string; right: string };

type ComingSoonCopy = {
  eyebrow: string;
  status: string;
  title: string;
  text: string;
  closing: string;
  services: Services;
  actions: { primary: Action; secondary: Action };
};

const INTRO = 0.5;

const floatingCast = ({ top, left, right }: Services) => [
  pill({ id: "service-top", label: top, tone: "orange", tilt: 6, home: { x: 0.5, y: 0.14 } }),
  pill({ id: "service-left", label: left, tone: "green", tilt: -8, home: { x: 0.24, y: 0.2 } }),
  pill({ id: "service-right", label: right, tone: "red", tilt: 9, home: { x: 0.78, y: 0.21 } }),
  trinket({ id: "soon-star", kind: "star", color: "lime", home: { x: 0.08, y: 0.3 }, size: 34 }),
  trinket({ id: "soon-plus", kind: "plus", color: "sky", home: { x: 0.92, y: 0.3 }, size: 30 }),
  trinket({ id: "soon-crown", kind: "crown", color: "amber", home: { x: 0.36, y: 0.9 }, size: 40 }),
  trinket({ id: "soon-asterisk", kind: "asterisk", color: "orange", home: { x: 0.62, y: 0.92 }, size: 34 }),
];

type ComingSoonProps = { copy: ComingSoonCopy };

export const ComingSoon = ({ copy }: ComingSoonProps) => {
  const [npcs] = useState(() => [alien({ home: { x: 0.14, y: 0.88 } }), robot({ home: { x: 0.86, y: 0.88 }, size: 130 })]);
  const [trinkets] = useState(() => floatingCast(copy.services));

  return (
    <section data-tone="navy" className={styles.section}>
      <Playground npcs={npcs} trinkets={trinkets} className={styles.stage}>
        <div className={styles.content}>
          <Intro delay={INTRO} className={styles.kicker}>
            <span className={styles.eyebrow}>{copy.eyebrow}</span>
            <Pill tone="lime" ink="navy" tilt={-6} size="m">
              {copy.status}
            </Pill>
          </Intro>
          <h1 className={styles.title}>
            <SplitWords immediate delay={INTRO + 0.1} segments={[{ text: copy.title }]} />
          </h1>
          <Intro as="p" delay={INTRO + 0.5} className={styles.text}>
            {copy.text}
          </Intro>
          <Intro as="p" delay={INTRO + 0.6} className={styles.closing}>
            {copy.closing}
          </Intro>
          <Intro delay={INTRO + 0.7} className={styles.actions}>
            <Button href={copy.actions.primary.href} size="l">
              {copy.actions.primary.label}
            </Button>
            <Link href={copy.actions.secondary.href} className={styles.back}>
              {copy.actions.secondary.label}
            </Link>
          </Intro>
        </div>
      </Playground>
    </section>
  );
};
