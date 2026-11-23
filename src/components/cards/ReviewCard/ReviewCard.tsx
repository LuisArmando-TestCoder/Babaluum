import Image from "next/image";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import type { ImageAsset } from "@/domain/design/media";
import styles from "./ReviewCard.module.scss";

type ReviewCardProps = {
  headline: string;
  quote: string;
  author: string;
  role: string;
  portrait: ImageAsset;
};

export const ReviewCard = ({ headline, quote, author, role, portrait }: ReviewCardProps) => (
  <NotchedSurface as="figure" tone="mist" notches={NOTCHES.review} className={styles.card}>
    <h3 className={styles.headline}>{headline}</h3>
    <blockquote className={styles.quote}>{quote}</blockquote>
    <figcaption className={styles.author}>
      <Image src={portrait.src} alt="" width={60} height={60} className={styles.avatar} />
      <span className={styles.who}>
        <strong>{author}</strong>
        <small>{role}</small>
      </span>
      <span className={styles.mark} aria-hidden="true">
        ”
      </span>
    </figcaption>
  </NotchedSurface>
);
