"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Intro } from "@/components/motion/Intro";
import { SplitWords } from "@/components/motion/SplitWords";
import { Playground } from "@/components/playground/Playground";
import { Button } from "@/components/primitives/Button";
import { NOT_FOUND } from "@/content/notFound";
import { useCursor } from "@/hooks/useCursor";
import { alien, trinket } from "../cast/cast";
import styles from "./NotFound.module.scss";

const TRINKETS = [
  trinket({ id: "lost-star", kind: "star", color: "lime", home: { x: 0.16, y: 0.3 }, size: 34 }),
  trinket({ id: "lost-plus", kind: "plus", color: "purple", home: { x: 0.84, y: 0.26 }, size: 30 }),
  trinket({ id: "lost-crown", kind: "crown", color: "amber", home: { x: 0.1, y: 0.5 }, size: 40 }),
  trinket({ id: "lost-asterisk", kind: "asterisk", color: "orange", home: { x: 0.9, y: 0.52 }, size: 34 }),
  trinket({ id: "lost-heart", kind: "heart", color: "red", home: { x: 0.7, y: 0.4 }, size: 28 }),
];

const LIGHTS = ["port", "bow", "keel", "stern", "starboard"] as const;

const INTRO = 1.5;

const FOLLOW = { stiffness: 60, damping: 14, mass: 1.2 };

const REACH = 0.14;

const toDrift = (pointerX: number): number => (pointerX < 0 ? 0 : (pointerX - window.innerWidth / 2) * REACH);

export const NotFound = () => {
  const dome = useRef<HTMLSpanElement>(null);
  const [npcs] = useState(() => [alien({ anchor: { element: dome, fit: 1.2 }, home: { x: 0.5, y: 0.42 } })]);
  const cursor = useCursor();
  const drift = useSpring(useTransform(cursor.x, toDrift), FOLLOW);

  return (
    <section className={styles.section}>
      <Playground npcs={npcs} trinkets={TRINKETS} className={styles.stage}>
        <div className={styles.sky} aria-hidden="true">
          <motion.div className={styles.craft} style={{ x: drift }}>
            <div className={styles.saucer}>
              <span ref={dome} className={styles.dome} />
              <span className={styles.hull}>
                {LIGHTS.map((light) => (
                  <i key={light} className={styles.light} />
                ))}
              </span>
            </div>
            <div className={styles.beam} />
            <div className={styles.cargo}>
              <div className={styles.sign}>
                <span className={styles.plate}>
                  <span className={styles.code}>{NOT_FOUND.code}</span>
                  <span className={styles.caption}>{NOT_FOUND.caption}</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <SplitWords immediate delay={INTRO} segments={[{ text: NOT_FOUND.title }]} />
          </h1>
          <Intro as="p" delay={INTRO + 0.35} className={styles.text}>
            {NOT_FOUND.text}
          </Intro>
          <Intro delay={INTRO + 0.5}>
            <Button href={NOT_FOUND.action.href} size="l">
              {NOT_FOUND.action.label}
            </Button>
          </Intro>
        </div>
      </Playground>
    </section>
  );
};
