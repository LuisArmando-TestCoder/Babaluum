import { StatCard } from "@/components/cards/StatCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import type { Stat } from "@/content/stats";
import styles from "./StatsRow.module.scss";

const SHAPES: readonly NotchPreset[] = ["ticket", "tab", "stat"];

type StatsRowProps = { stats: readonly Stat[] };

export const StatsRow = ({ stats }: StatsRowProps) => (
  <Section spacing="s">
    <RevealGroup as="ul" className={styles.row}>
      {stats.map((stat, index) => (
        <RevealItem as="li" key={stat.value} index={index}>
          <StatCard value={stat.value} label={stat.label} body={stat.body} tone={stat.tone} shape={SHAPES[index % SHAPES.length]} className={styles.card} />
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
