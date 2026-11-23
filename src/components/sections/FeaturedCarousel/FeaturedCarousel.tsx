"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/primitives/Container";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { StepControls } from "@/components/primitives/StepControls";
import type { ImageAsset } from "@/domain/design/media";
import { useCarousel } from "@/hooks/useCarousel";
import styles from "./FeaturedCarousel.module.scss";

const SHAPES: readonly NotchPreset[] = ["portrait", "frame", "photo"];

const GROUP = { hidden: {}, shown: { transition: { staggerChildren: 0.1 } } };

type Slide = { href: string; title: string; summary: string; cover: ImageAsset };

type FeaturedCarouselProps = { eyebrow: string; title: string; subject: string; slides: readonly Slide[]; cursor?: string };

export const FeaturedCarousel = ({ eyebrow, title, subject, slides, cursor }: FeaturedCarouselProps) => {
  const carousel = useCarousel();
  const atStart = carousel.edge === "start" || carousel.edge === "fits";
  const atEnd = carousel.edge === "end" || carousel.edge === "fits";

  return (
    <section className={styles.section}>
      <Container className={styles.head}>
        <SectionHeader eyebrow={eyebrow} accent="orange" title={title} measure="narrow" className={styles.header} />
        <div className={styles.controls}>
          <StepControls subject={subject} onStep={carousel.step} atStart={atStart} atEnd={atEnd} />
        </div>
      </Container>
      <div className={styles.bleed}>
        <div ref={carousel.viewport} className={styles.viewport} data-cursor="Arrastra">
          <motion.ul
            ref={carousel.track}
            className={styles.track}
            style={{ x: carousel.x }}
            drag="x"
            dragConstraints={carousel.viewport}
            dragElastic={0.08}
            variants={GROUP}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            {...carousel.dragHandlers}
          >
            {slides.map((slide, index) => (
              <RevealItem as="li" key={slide.href} index={index} className={styles.slide}>
                <div onFocus={() => carousel.reveal(index)}>
                  <ProjectCard {...slide} cursor={cursor} shape={SHAPES[index % SHAPES.length]} />
                </div>
              </RevealItem>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};
