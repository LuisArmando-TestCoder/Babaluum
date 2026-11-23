import Link from "next/link";
import { Media } from "@/components/primitives/Media";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import type { ImageAsset } from "@/domain/design/media";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  href: string;
  title: string;
  summary: string;
  cover: ImageAsset;
  shape?: NotchPreset;
  ratio?: string;
  cursor?: string;
};

export const ProjectCard = ({ href, title, summary, cover, shape = "photo", ratio = "540 / 428", cursor = "Ver" }: ProjectCardProps) => (
  <Link href={href} className={styles.card} draggable={false} data-cursor={cursor}>
    <Media image={cover} ratio={ratio} notches={NOTCHES[shape]} sizes="(min-width: 900px) 40vw, 90vw" className={styles.media} />
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.summary}>{summary}</p>
  </Link>
);
