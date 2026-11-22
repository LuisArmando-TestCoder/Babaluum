import Image from "next/image";
import type { ImageAsset } from "@/domain/design/media";
import type { Tone } from "@/domain/design/tone";
import { cx } from "@/domain/design/cx";
import type { Notch } from "../NotchedSurface";
import { NotchedSurface } from "../NotchedSurface";
import styles from "./Media.module.scss";

export type MediaSource = ImageAsset;

type MediaProps = {
  image: MediaSource;
  ratio?: string;
  notches?: readonly Notch[];
  tone?: Tone;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export const Media = ({ image, ratio = "4 / 3", notches, tone, sizes = "(min-width: 900px) 50vw, 100vw", priority, className }: MediaProps) => (
  <NotchedSurface as="figure" tone={tone} notches={notches} className={cx(styles.media, className)} style={{ aspectRatio: ratio }}>
    <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className={styles.image} />
  </NotchedSurface>
);
