import type { ReactNode } from "react";
import type { Tone } from "@/domain/design/tone";
import { cx } from "@/domain/design/cx";
import { ArrowBadge } from "@/components/primitives/ArrowBadge";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import styles from "./StatCard.module.scss";

type StatCardProps = {
  value: string;
  label: string;
  body?: ReactNode;
  tone: Tone;
  size?: "s" | "l";
  shape?: NotchPreset;
  withArrow?: boolean;
  className?: string;
};

export const StatCard = ({ value, label, body, tone, size = "l", shape = "stat", withArrow = false, className }: StatCardProps) => (
  <NotchedSurface tone={tone} notches={NOTCHES[shape]} className={cx(styles.card, styles[size], className)}>
    {withArrow && <ArrowBadge size="s" className={styles.arrow} icon="arrow-up-right" />}
    <p className={styles.value}>{value}</p>
    <p className={styles.label}>{label}</p>
    {body && <p className={styles.body}>{body}</p>}
  </NotchedSurface>
);
