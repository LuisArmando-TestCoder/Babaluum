"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { Intro } from "@/components/motion/Intro";
import { SplitWords } from "@/components/motion/SplitWords";
import { Playground } from "@/components/playground/Playground";
import { Container } from "@/components/primitives/Container";
import { Cusp } from "@/components/primitives/Cusp";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import type { Notch } from "@/components/primitives/NotchedSurface";
import { NotchedSurface } from "@/components/primitives/NotchedSurface";
import { cx } from "@/domain/design/cx";
import type { Accent } from "@/domain/design/tone";
import type { Companion } from "./pageHeroCast";
import { companionCast, pageHeroTrinkets } from "./pageHeroCast";
import styles from "./PageHero.module.scss";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  accent?: Accent;
  companion?: Companion;
  align?: "center" | "start";
};

const INTRO = 0.5;

const EDGE_NOTCH: readonly Notch[] = [{ edge: "right", at: "52%" }];

export const PageHero = ({ eyebrow, title, lead, accent = "red", companion = "alien", align = "center" }: PageHeroProps) => {
  const titleBox = useRef<HTMLSpanElement>(null);
  const eyebrowBox = useRef<HTMLSpanElement>(null);
  const [npcs] = useState(() => companionCast(companion, align, { title: titleBox, eyebrow: eyebrowBox }));
  const [trinkets] = useState(() => (align === "center" ? pageHeroTrinkets({ title: titleBox, eyebrow: eyebrowBox }) : []));

  return (
    <NotchedSurface as="section" tone="navy" notches={align === "start" ? EDGE_NOTCH : []} className={cx(styles.hero, styles[align])}>
      <Playground npcs={npcs} trinkets={trinkets} className={styles.stage}>
        <Container className={styles.inner}>
          <div className={styles.heading}>
            <Intro delay={INTRO}>
              <span ref={eyebrowBox} className={styles.eyebrowBox}>
                <Eyebrow accent={accent} size="l">
                  {eyebrow}
                </Eyebrow>
              </span>
            </Intro>
            <h1 className={styles.title}>
              <span ref={titleBox} className={styles.titleBox}>
                <SplitWords immediate delay={INTRO} segments={[{ text: title }]} />
              </span>
            </h1>
          </div>
          {lead && (
            <Intro delay={INTRO + 0.35} className={styles.lead}>
              {lead}
            </Intro>
          )}
        </Container>
      </Playground>
      {align === "center" && <Cusp />}
    </NotchedSurface>
  );
};
