import { StatCard } from "@/components/cards/StatCard";
import { Pill } from "@/components/primitives/Pill";
import { Reveal } from "@/components/motion/Reveal";
import { HERO_TAGS } from "@/content/programs";
import { HERO_STATS } from "@/content/stats";
import styles from "./HeroFooter.module.scss";

const TAG_LOOK = [
  { tone: "orange", tilt: 8 },
  { tone: "red", tilt: -4 },
  { tone: "lime", tilt: -10 },
] as const;

const NEWSLETTER =
  "Nos enfocamos en llevar contenido profesional y educativo a nuestros miembros para su crecimiento profesional y personal. Forma parte de nuestra comunidad y empezarás a recibirlo en tu email.";

export const HeroFooter = () => (
  <div className={styles.footer}>
    <Reveal className={styles.pitch}>
      <div className={styles.tags}>
        {HERO_TAGS.map((tag, index) => (
          <Pill key={tag} tone={TAG_LOOK[index]?.tone} tilt={TAG_LOOK[index]?.tilt} className={styles.tag}>
            {tag}
          </Pill>
        ))}
      </div>
      <p className={styles.statement}>
        Te ayudamos a impulsar tu talento <span className={styles.muted}>a través de nuestras iniciativas.</span>
      </p>
    </Reveal>
    <Reveal delay={0.15} className={styles.stats}>
      <div className={styles.cards}>
        {HERO_STATS.map((stat) => (
          <StatCard key={stat.value} value={stat.value} label={stat.label} tone={stat.tone} size="s" withArrow shape="tab" />
        ))}
      </div>
      <p className={styles.note}>{NEWSLETTER}</p>
    </Reveal>
  </div>
);
