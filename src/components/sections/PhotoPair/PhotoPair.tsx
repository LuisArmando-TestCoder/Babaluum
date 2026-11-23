import type { MediaSource } from "@/components/primitives/Media";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import styles from "./PhotoPair.module.scss";

type PhotoPairProps = { eyebrow: string; title: string; aside: string; images: readonly [MediaSource, MediaSource] };

export const PhotoPair = ({ eyebrow, title, aside, images }: PhotoPairProps) => (
  <Section spacing="m">
    <SectionHeader eyebrow={eyebrow} title={title} aside={aside} measure="narrow" />
    <div className={styles.pair}>
      <Media image={images[0]} ratio="620 / 660" notches={NOTCHES.portrait} />
      <Media image={images[1]} ratio="620 / 660" notches={NOTCHES.frame} />
    </div>
  </Section>
);
