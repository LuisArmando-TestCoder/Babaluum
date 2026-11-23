import Link from "next/link";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Pill } from "@/components/primitives/Pill";
import type { ImageAsset } from "@/domain/design/media";
import styles from "./PostCard.module.scss";

type PostCardProps = {
  href: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  cover: ImageAsset;
};

export const PostCard = ({ href, title, excerpt, category, author, date, cover }: PostCardProps) => (
  <Link href={href} className={styles.card} data-cursor="Leer">
    <Media image={cover} ratio="620 / 430" notches={NOTCHES.portrait} sizes="(min-width: 900px) 45vw, 90vw" className={styles.media} />
    <p className={styles.meta}>
      <Pill tone="purple">{category}</Pill>
      <span className={styles.byline}>
        <strong>{author}</strong>
        <time>{date}</time>
      </span>
    </p>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.excerpt}>{excerpt}</p>
  </Link>
);
