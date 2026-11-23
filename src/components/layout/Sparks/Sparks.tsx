"use client";

import type { CSSProperties } from "react";
import type { Burst, Spark } from "@/domain/design/sparks";
import { useSparks } from "@/hooks/useSparks";
import styles from "./Sparks.module.scss";

const flightOf = ({ angle, distance, spin, size, delay }: Spark) =>
  ({ "--angle": `${angle}deg`, "--distance": `${distance}px`, "--spin": `${spin}deg`, "--size": `${size}px`, "--delay": `${delay}ms` }) as CSSProperties;

type BurstViewProps = { burst: Burst; onDone: (id: string) => void };

const BurstView = ({ burst, onDone }: BurstViewProps) => {
  const last = burst.sparks.at(-1)?.id;
  return (
    <span className={styles.burst} style={{ left: burst.x, top: burst.y }}>
      {burst.sparks.map((spark) => (
        <span
          key={spark.id}
          className={styles.spark}
          data-accent={spark.accent}
          style={flightOf(spark)}
          onAnimationEnd={spark.id === last ? () => onDone(burst.id) : undefined}
        />
      ))}
    </span>
  );
};

export const Sparks = () => {
  const { bursts, dismiss } = useSparks();
  return (
    <div className={styles.layer} aria-hidden="true">
      {bursts.map((burst) => (
        <BurstView key={burst.id} burst={burst} onDone={dismiss} />
      ))}
    </div>
  );
};
