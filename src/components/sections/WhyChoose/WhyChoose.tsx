import { StatCard } from "@/components/cards/StatCard";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { IMAGES } from "@/content/images";
import { WHY_POINTS } from "@/content/stats";
import styles from "./WhyChoose.module.scss";

export const WhyChoose = () => (
  <Section>
    <SectionHeader
      eyebrow="¿Por qué Babaluum?"
      accent="orange"
      title="Por qué Babaluum es la comunidad de confianza"
      aside="Crecimiento a través de experiencias diseñadas para alcanzar, inspirar y generar resultados."
    />
    <div className={styles.layout}>
      {WHY_POINTS.map((point, index) => (
        <Reveal key={point.title} delay={index * 0.15} className={styles.point} >
          <h3 className={styles.title}>{point.title}</h3>
          <p className={styles.body}>{point.body}</p>
          <Parallax speed={0.18 + index * 0.12}>
            <StatCard value={point.stat.value} label={point.stat.label} tone={point.stat.tone} size="s" withArrow shape="tab" className={styles.stat} />
          </Parallax>
        </Reveal>
      ))}
      <Parallax speed={0.08} className={styles.photo}>
        <Media image={IMAGES.stage} ratio="3 / 4" notches={NOTCHES.photo} sizes="(min-width: 900px) 40vw, 90vw" />
      </Parallax>
    </div>
  </Section>
);
