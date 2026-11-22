import Link from "next/link";
import type { Tone } from "@/domain/design/tone";
import { ArrowBadge } from "@/components/primitives/ArrowBadge";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import styles from "./ProgramCard.module.scss";

type ProgramCardProps = {
  title: string;
  summary: string;
  tone: Tone;
  href: string;
  shape: NotchPreset;
};

export const ProgramCard = ({ title, summary, tone, href, shape }: ProgramCardProps) => (
  <Link href={href} className={styles.link}>
    <NotchedSurface as="article" tone={tone} notches={NOTCHES[shape]} className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <ArrowBadge className={styles.arrow} />
    </NotchedSurface>
  </Link>
);
