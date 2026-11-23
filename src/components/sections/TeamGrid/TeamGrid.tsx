import { MemberCard } from "@/components/cards/MemberCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { Member } from "@/content/team";
import styles from "./TeamGrid.module.scss";

const SHAPES: readonly NotchPreset[] = ["crest", "crown", "crest"];

type TeamGridProps = { members: readonly Member[]; withHeader?: boolean };

export const TeamGrid = ({ members, withHeader = false }: TeamGridProps) => (
  <Section spacing={withHeader ? "m" : "l"}>
    {withHeader && (
      <SectionHeader eyebrow="Nosotros" title="Conoce al equipo" measure="narrow" aside="Detrás de Babaluum hay escritores, pasantes y voluntarios que hacen posible cada iniciativa." />
    )}
    <RevealGroup as="ul" className={styles.grid}>
      {members.map((member, index) => (
        <RevealItem as="li" key={member.id} index={index}>
          <MemberCard name={member.name} role={member.role} portrait={member.portrait} shape={SHAPES[index % SHAPES.length]} />
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
