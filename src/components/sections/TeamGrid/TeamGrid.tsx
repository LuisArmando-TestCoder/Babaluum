import { MemberCard } from "@/components/cards/MemberCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { Member } from "@/content/team";
import styles from "./TeamGrid.module.scss";

const SHAPES: readonly NotchPreset[] = ["tab", "stat", "ticket"];

type TeamGridProps = { members: readonly Member[]; withHeader?: boolean };

export const TeamGrid = ({ members, withHeader = false }: TeamGridProps) => (
  <Section spacing="m">
    {withHeader && <SectionHeader eyebrow="Nosotros" title="Conoce al equipo" aside="Personas curiosas que acompañan a nuestra comunidad todos los días." />}
    <RevealGroup as="ul" className={styles.grid}>
      {members.map((member, index) => (
        <RevealItem as="li" key={member.id}>
          <MemberCard name={member.name} role={member.role} portrait={member.portrait} shape={SHAPES[index % SHAPES.length]} />
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
