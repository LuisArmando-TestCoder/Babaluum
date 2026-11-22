import type { RefObject } from "react";
import type { ArtifactKind } from "@/components/characters/Artifact";
import { Alien } from "@/components/characters/Alien";
import { Artifact } from "@/components/characters/Artifact";
import { Globe } from "@/components/characters/Globe";
import { Robot } from "@/components/characters/Robot";
import { Sticker } from "@/components/characters/Sticker";
import { Pill } from "@/components/primitives/Pill";
import type { Tone } from "@/domain/design/tone";
import { AMBER, GREEN, LIME, ORANGE, PURPLE, RED, SKY } from "@/components/characters/palette";
import type { NpcSpec, Placement, TrinketSpec } from "@/components/playground/Playground";

export const TRINKET_COLORS = { lime: LIME, sky: SKY, purple: PURPLE, orange: ORANGE, amber: AMBER, red: RED, green: GREEN } as const;

export type TrinketColor = keyof typeof TRINKET_COLORS;

type TrinketOptions = { id: string; kind: ArtifactKind; color: TrinketColor; home: Placement; size?: number };

const seedOf = (id: string): number => [...id].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) % 997, 7) / 997;

export const trinket = ({ id, kind, color, home, size = 30 }: TrinketOptions): TrinketSpec => ({
  id,
  home,
  size,
  radius: size * 0.55,
  mass: 1,
  seed: seedOf(id),
  render: (energy) => <Artifact kind={kind} color={TRINKET_COLORS[color]} energy={energy} />,
});

type PillOptions = { id: string; label: string; tone: Tone; tilt: number; home: Placement };

export const pill = ({ id, label, tone, tilt, home }: PillOptions): TrinketSpec => ({
  id,
  home,
  size: 0,
  radius: 34,
  mass: 1.4,
  seed: seedOf(id),
  render: () => (
    <Pill tone={tone} tilt={tilt}>
      {label}
    </Pill>
  ),
});

export const sticker = (id: string, home: Placement, size = 92): TrinketSpec => ({
  id,
  home,
  size,
  radius: size * 0.48,
  mass: 2,
  seed: seedOf(id),
  render: () => <Sticker text="babaluum · mentes inquietas · babaluum · mentes inquietas ·" />,
});

type CompanionOptions = { anchor?: RefObject<HTMLElement | null>; home?: Placement; size?: number };

export const robot = ({ anchor, home = { x: 0.62, y: 0.4 }, size = 205 }: CompanionOptions = {}): NpcSpec => ({
  id: "robot",
  temperament: anchor ? "anchored" : "roamer",
  anchor,
  home,
  size,
  radius: size * 0.36,
  mass: 4,
  seed: 0.21,
  render: (pose) => <Robot pose={pose} />,
});

export const alien = (home: Placement, size = 92): NpcSpec => ({
  id: "alien",
  temperament: "roamer",
  home,
  size,
  radius: size * 0.46,
  mass: 3,
  seed: 0.63,
  render: (pose) => <Alien pose={pose} />,
});

export const globe = (home: Placement, size = 76, anchor?: RefObject<HTMLElement | null>): NpcSpec => ({
  id: "globe",
  temperament: anchor ? "anchored" : "roamer",
  anchor,
  home,
  size,
  radius: size * 0.44,
  mass: 3,
  seed: 0.37,
  render: (pose) => <Globe pose={pose} />,
});
