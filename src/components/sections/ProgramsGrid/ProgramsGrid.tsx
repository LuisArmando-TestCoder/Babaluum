import { ProgramCard } from "@/components/cards/ProgramCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { PROGRAMS } from "@/content/programs";
import styles from "./ProgramsGrid.module.scss";

const SHAPES: readonly NotchPreset[] = ["ticket", "tab", "stat", "tab", "ticket", "side"];

type ProgramsGridProps = { eyebrow?: string; title?: string; aside?: string };

export const ProgramsGrid = ({
  eyebrow = "Nuestros programas",
  title = "Programas diseñados para impulsar resultados reales",
  aside = "Crece con experiencias de aprendizaje diseñadas para inspirar, conectar y generar impacto.",
}: ProgramsGridProps) => (
  <Section>
    <SectionHeader eyebrow={eyebrow} accent="red" title={title} aside={aside} />
    <RevealGroup as="ul" className={styles.grid}>
      {PROGRAMS.map((program, index) => (
        <RevealItem as="li" key={program.slug}>
          <ProgramCard
            title={program.title}
            summary={program.summary}
            tone={program.tone}
            href={`/programas#${program.slug}`}
            shape={SHAPES[index % SHAPES.length] ?? "ticket"}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
