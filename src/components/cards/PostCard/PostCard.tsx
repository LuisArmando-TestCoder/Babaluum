import Link from "next/link";
import type { ImageAsset } from "@/domain/design/media";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
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
  <Link href={href} className={styles.card}>
    <Media image={cover} ratio="4 / 3" notches={NOTCHES.photo} sizes="(min-width: 900px) 45vw, 90vw" className={styles.media} />
    <p className={styles.meta}>
      <span className={styles.category}>{category}</span>
      <span>{author}</span>
      <span>{date}</span>
    </p>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.excerpt}>{excerpt}</p>
  </Link>
);
