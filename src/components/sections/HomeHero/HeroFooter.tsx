import type { RefObject } from "react";
import { StatCard } from "@/components/cards/StatCard";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import type { HeroCopy } from "@/content/home";
import styles from "./HeroFooter.module.scss";

type HeroFooterProps = { copy: Pick<HeroCopy, "tags" | "statement" | "stats" | "note">; tagsSlot: RefObject<HTMLDivElement | null> };

export const HeroFooter = ({ copy, tagsSlot }: HeroFooterProps) => (
  <div className={styles.footer}>
    <Reveal className={styles.pitch}>
      <div ref={tagsSlot} className={styles.tags}>
        <ul className={styles.tagNames}>
          {copy.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <p className={styles.statement}>
        <ScrubText from={0.98} to={0.8}>
          {copy.statement.lead}
        </ScrubText>{" "}
        <ScrubText from={0.86} to={0.62} className={styles.muted}>
          {copy.statement.rest}
        </ScrubText>
      </p>
    </Reveal>
    <Reveal delay={0.15} className={styles.stats}>
      <div className={styles.cards}>
        {copy.stats.map((stat) => (
          <StatCard key={stat.value} value={stat.value} label={stat.label} tone={stat.tone} ink="navy" size="s" />
        ))}
      </div>
      <p className={styles.note}>
        <ScrubText>{copy.note}</ScrubText>
      </p>
    </Reveal>
  </div>
);
