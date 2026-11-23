import type { ReactNode } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { Icon } from "@/components/primitives/Icon";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { cx } from "@/domain/design/cx";
import { parseStat } from "@/domain/design/stat";
import type { Tone } from "@/domain/design/tone";
import styles from "./StatCard.module.scss";

type StatCardProps = {
  value: string;
  label: string;
  body?: ReactNode;
  tone: Tone;
  ink?: "tone" | "navy";
  size?: "s" | "l";
  shape?: NotchPreset;
  className?: string;
};

const CHIP_NOTCH_SCALE = 0.62;

export const StatCard = ({ value, label, body, tone, ink = "tone", size = "l", shape, className }: StatCardProps) => {
  const isChip = size === "s";
  return (
    <NotchedSurface
      tone={tone}
      notches={NOTCHES[shape ?? (isChip ? "chip" : "stat")]}
      notchScale={isChip ? CHIP_NOTCH_SCALE : undefined}
      className={cx(styles.card, styles[size], ink === "navy" && styles.navyInk, className)}
    >
      {isChip && <Icon name="arrow-up-right" className={styles.arrow} />}
      <p className={cx(styles.value, !parseStat(value) && styles.phrase)}>
        <CountUp value={value} />
      </p>
      <p className={styles.label}>{label}</p>
      {body && <p className={styles.body}>{body}</p>}
    </NotchedSurface>
  );
};
