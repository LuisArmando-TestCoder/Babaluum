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

type Staging = Pick<TrinketSpec, "home" | "compactHome" | "anchor" | "compactAnchor">;

type TrinketOptions = Staging & { id: string; kind: ArtifactKind; color: TrinketColor; size?: number };

const seedOf = (id: string): number => [...id].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) % 997, 7) / 997;

export const trinket = ({ id, kind, color, size = 30, ...staging }: TrinketOptions): TrinketSpec => ({
  id,
  ...staging,
  size,
  radius: size * 0.55,
  mass: 1,
  seed: seedOf(id),
  render: (energy) => <Artifact kind={kind} color={TRINKET_COLORS[color]} energy={energy} />,
});

type PillOptions = Staging & {
  id: string;
  label: string;
  tone: Tone;
  tilt: number;
  ink?: "tone" | "navy";
  size?: "s" | "m";
};

const PILL_REACH = { s: 30, m: 40 } as const;

export const pill = ({ id, label, tone, tilt, ink, size = "m", ...staging }: PillOptions): TrinketSpec => ({
  id,
  ...staging,
  size: 0,
  radius: PILL_REACH[size],
  mass: 1.4,
  seed: seedOf(id),
  render: () => (
    <Pill tone={tone} tilt={tilt} ink={ink} size={size}>
      {label}
    </Pill>
  ),
});

type StickerOptions = Staging & { id: string; size?: number };

export const sticker = ({ id, size = 112, ...staging }: StickerOptions): TrinketSpec => ({
  id,
  ...staging,
  size,
  radius: size * 0.48,
  mass: 2,
  seed: seedOf(id),
  render: () => <Sticker text="babaluum · mentes inquietas · babaluum · mentes inquietas ·" />,
});

type CompanionOptions = Partial<Staging> & { size?: number; roams?: boolean };

type CompanionKind = { id: string; size: number; reach: number; mass: number; seed: number; render: NpcSpec["render"] };

const CENTER: Placement = { x: 0.5, y: 0.5 };

const companion =
  (kind: CompanionKind) =>
  ({ home = CENTER, size = kind.size, roams, ...staging }: CompanionOptions = {}): NpcSpec => ({
    id: kind.id,
    temperament: (roams ?? !staging.anchor) ? "roamer" : "anchored",
    ...staging,
    home,
    size,
    radius: size * kind.reach,
    mass: kind.mass,
    seed: kind.seed,
    render: kind.render,
  });

export const robot = companion({ id: "robot", size: 200, reach: 0.36, mass: 4, seed: 0.21, render: (pose) => <Robot pose={pose} /> });

export const alien = companion({ id: "alien", size: 116, reach: 0.46, mass: 3, seed: 0.63, render: (pose) => <Alien pose={pose} /> });

export const globe = companion({ id: "globe", size: 92, reach: 0.44, mass: 3, seed: 0.37, render: (pose) => <Globe pose={pose} /> });
