import { Parallax } from "@/components/motion/Parallax";
import type { MediaSource } from "@/components/primitives/Media";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import styles from "./PhotoPair.module.scss";

type PhotoPairProps = { eyebrow: string; title: string; aside: string; images: readonly [MediaSource, MediaSource] };

export const PhotoPair = ({ eyebrow, title, aside, images }: PhotoPairProps) => (
  <Section spacing="m">
    <SectionHeader eyebrow={eyebrow} title={title} aside={aside} />
    <div className={styles.pair}>
      <Parallax speed={0.06}>
        <Media image={images[0]} ratio="1 / 1.07" notches={NOTCHES.portrait} />
      </Parallax>
      <Parallax speed={0.16}>
        <Media image={images[1]} ratio="1 / 1.07" notches={NOTCHES.side} />
      </Parallax>
    </div>
  </Section>
);
