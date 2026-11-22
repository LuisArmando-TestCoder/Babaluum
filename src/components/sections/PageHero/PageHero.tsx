"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "@/components/primitives/Container";
import { Cusp } from "@/components/primitives/Cusp";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import type { Accent } from "@/domain/design/tone";
import { cx } from "@/domain/design/cx";
import { SplitWords } from "@/components/motion/SplitWords";
import { Playground } from "@/components/playground/Playground";
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

export const PageHero = ({ eyebrow, title, lead, accent = "red", companion = "alien", align = "center" }: PageHeroProps) => {
  const [npcs] = useState(() => companionCast(companion, align));
  const [trinkets] = useState(() => pageHeroTrinkets(align));

  return (
    <section data-tone="navy" className={cx(styles.hero, styles[align])}>
      <Playground npcs={npcs} trinkets={trinkets} className={styles.stage}>
        <Container className={styles.inner}>
          <div className={styles.heading}>
            <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
            <h1 className={styles.title}>
              <SplitWords immediate segments={[{ text: title }]} />
            </h1>
          </div>
          {lead && <div className={styles.lead}>{lead}</div>}
        </Container>
      </Playground>
      <Cusp />
    </section>
  );
};
