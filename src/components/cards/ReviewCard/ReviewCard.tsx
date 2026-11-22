import Image from "next/image";
import type { ImageAsset } from "@/domain/design/media";
import { Icon } from "@/components/primitives/Icon";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import styles from "./ReviewCard.module.scss";

type ReviewCardProps = {
  headline: string;
  quote: string;
  author: string;
  role: string;
  portrait: ImageAsset;
};

export const ReviewCard = ({ headline, quote, author, role, portrait }: ReviewCardProps) => (
  <NotchedSurface as="figure" tone="mist" notches={NOTCHES.tab} className={styles.card}>
    <h3 className={styles.headline}>{headline}</h3>
    <blockquote className={styles.quote}>{quote}</blockquote>
    <figcaption className={styles.author}>
      <Image src={portrait.src} alt={portrait.alt} width={48} height={48} className={styles.avatar} />
      <span>
        <strong>{author}</strong>
        <small>{role}</small>
      </span>
      <Icon name="quote" className={styles.mark} />
    </figcaption>
  </NotchedSurface>
);
