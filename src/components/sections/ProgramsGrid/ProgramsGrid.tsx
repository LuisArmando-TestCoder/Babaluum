import { ProgramCard } from "@/components/cards/ProgramCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { Program } from "@/content/programs";
import { PROGRAMS } from "@/content/programs";
import styles from "./ProgramsGrid.module.scss";

const SHAPES: readonly NotchPreset[] = ["ticket", "tab", "stat", "stat", "ticket", "side"];

type ProgramTeaser = Pick<Program, "slug" | "href" | "title" | "summary" | "tone">;

type ProgramsGridProps = { eyebrow?: string; title?: string; aside?: string; cards?: readonly ProgramTeaser[] };

export const ProgramsGrid = ({
  eyebrow = "Nuestros programas",
  title = "Programas diseñados para impulsar resultados reales",
  aside = "Crece con experiencias de aprendizaje diseñadas para inspirar, conectar y generar impacto.",
  cards = PROGRAMS,
}: ProgramsGridProps) => (
  <Section>
    <SectionHeader eyebrow={eyebrow} accent="red" title={title} aside={aside} />
    <RevealGroup as="ul" className={styles.grid}>
      {cards.map((program, index) => (
        <RevealItem as="li" key={program.slug} index={index}>
          <ProgramCard
            title={program.title}
            summary={program.summary}
            tone={program.tone}
            href={program.href}
            shape={SHAPES[index % SHAPES.length] ?? "ticket"}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
