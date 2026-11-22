import Link from "next/link";
import type { ImageAsset } from "@/domain/design/media";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Media } from "@/components/primitives/Media";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  href: string;
  title: string;
  summary: string;
  cover: ImageAsset;
  shape?: NotchPreset;
  meta?: string;
};

export const ProjectCard = ({ href, title, summary, cover, shape = "photo", meta }: ProjectCardProps) => (
  <Link href={href} className={styles.card}>
    <Media image={cover} ratio="5 / 4" notches={NOTCHES[shape]} sizes="(min-width: 900px) 33vw, 90vw" className={styles.media} />
    {meta && <p className={styles.meta}>{meta}</p>}
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.summary}>{summary}</p>
  </Link>
);
