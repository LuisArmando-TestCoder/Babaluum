"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "@/content/images";
import { METHOD_SHOWCASE } from "@/content/method";
import styles from "./MethodShowcase.module.scss";

const rise = (index: number) => ({
  initial: { y: 120, rotate: index % 2 === 0 ? -4 : 4 },
  animate: { y: 0, rotate: 0 },
  transition: { delay: 0.12 * index, type: "spring", stiffness: 140, damping: 16 } as const,
});

export const MethodShowcase = () => {
  const { palette, typography, posts } = METHOD_SHOWCASE;
  return (
    <div className={styles.showcase}>
      <motion.article className={styles.card} {...rise(0)}>
        <p className={styles.kicker}>Material de la comunidad</p>
        <h4 className={styles.title}>{palette.title}</h4>
        <p className={styles.note}>{palette.note}</p>
        <div className={styles.swatches}>
          {palette.swatches.map((swatch) => (
            <span key={swatch} data-accent={swatch} className={styles.swatch}>
              {swatch}
            </span>
          ))}
        </div>
      </motion.article>
      <motion.article className={styles.card} {...rise(1)}>
        <h4 className={styles.title}>{typography.title}</h4>
        <p className={styles.note}>{typography.note}</p>
        <div className={styles.type}>
          <span className={styles.glyph}>Aa</span>
          <span className={styles.fonts}>
            <small>Primaria</small>
            <strong className={styles.primary}>{typography.primary}</strong>
            <small>Secundaria</small>
            <strong>{typography.secondary}</strong>
          </span>
        </div>
      </motion.article>
      <motion.article className={styles.card} {...rise(2)}>
        <h4 className={styles.title}>{posts.title}</h4>
        <p className={styles.note}>{posts.note}</p>
        <div className={styles.post}>
          <Image src={IMAGES.sofia.src} alt={IMAGES.sofia.alt} fill sizes="240px" className={styles.postImage} />
        </div>
      </motion.article>
    </div>
  );
};
