import { ScrubText } from "@/components/motion/ScrubText";
import Link from "next/link";
import { Tilt } from "@/components/motion/Tilt";
import { ArrowBadge } from "@/components/primitives/ArrowBadge";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import type { Tone } from "@/domain/design/tone";
import styles from "./ProgramCard.module.scss";

type ProgramCardProps = {
  title: string;
  summary: string;
  tone: Tone;
  href: string;
  shape: NotchPreset;
};

export const ProgramCard = ({ title, summary, tone, href, shape }: ProgramCardProps) => (
  <Tilt className={styles.tilt}>
    <Link href={href} className={styles.link} data-cursor="Ver">
      <NotchedSurface as="article" tone={tone} notches={NOTCHES[shape]} className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>
          <ScrubText>{summary}</ScrubText>
        </p>
        <ArrowBadge className={styles.arrow} />
      </NotchedSurface>
    </Link>
  </Tilt>
);
