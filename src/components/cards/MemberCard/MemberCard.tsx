import type { ImageAsset } from "@/domain/design/media";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Media } from "@/components/primitives/Media";
import styles from "./MemberCard.module.scss";

type MemberCardProps = {
  name: string;
  role: string;
  portrait: ImageAsset;
  shape?: NotchPreset;
};

export const MemberCard = ({ name, role, portrait, shape = "tab" }: MemberCardProps) => (
  <article className={styles.card}>
    <Media image={portrait} ratio="1 / 1.07" tone="sky" notches={NOTCHES[shape]} sizes="(min-width: 900px) 30vw, 90vw" className={styles.media} />
    <h3 className={styles.name}>{name}</h3>
    <p className={styles.role}>{role}</p>
  </article>
);
