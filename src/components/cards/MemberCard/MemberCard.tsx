import { Media } from "@/components/primitives/Media";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import type { ImageAsset } from "@/domain/design/media";
import styles from "./MemberCard.module.scss";

type MemberCardProps = {
  name: string;
  role: string;
  portrait: ImageAsset;
  shape?: NotchPreset;
};

export const MemberCard = ({ name, role, portrait, shape = "crest" }: MemberCardProps) => (
  <article className={styles.card}>
    <Media image={portrait} ratio="410 / 440" tone="sky" notches={NOTCHES[shape]} sizes="(min-width: 900px) 30vw, 90vw" className={styles.media} />
    <h3 className={styles.name}>{name}</h3>
    <p className={styles.role}>{role}</p>
  </article>
);
