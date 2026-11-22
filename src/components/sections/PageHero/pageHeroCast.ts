import type { NpcSpec, TrinketSpec } from "@/components/playground/Playground";
import { alien, globe, robot, trinket } from "../cast/cast";

export type Companion = "alien" | "globe" | "robot" | "none";

type Align = "center" | "start";

const COMPANIONS: Record<Exclude<Companion, "none">, (align: Align) => NpcSpec> = {
  alien: (align) => alien(align === "center" ? { x: 0.86, y: 0.58 } : { x: 0.55, y: 0.35 }, 84),
  globe: (align) => globe(align === "center" ? { x: 0.13, y: 0.62 } : { x: 0.6, y: 0.4 }, 70),
  robot: (align) => robot({ home: align === "center" ? { x: 0.86, y: 0.6 } : { x: 0.62, y: 0.45 }, size: 130 }),
};

export const companionCast = (companion: Companion, align: Align): readonly NpcSpec[] =>
  companion === "none" ? [] : [COMPANIONS[companion](align)];

export const pageHeroTrinkets = (align: Align): readonly TrinketSpec[] =>
  align === "center"
    ? [
        trinket({ id: "hero-asterisk", kind: "asterisk", color: "purple", home: { x: 0.285, y: 0.44 }, size: 26 }),
        trinket({ id: "hero-crown", kind: "crown", color: "amber", home: { x: 0.71, y: 0.36 }, size: 34 }),
        trinket({ id: "hero-star", kind: "star", color: "lime", home: { x: 0.5, y: 0.66 }, size: 24 }),
      ]
    : [
        trinket({ id: "hero-crown", kind: "crown", color: "amber", home: { x: 0.4, y: 0.3 }, size: 30 }),
        trinket({ id: "hero-plus", kind: "plus", color: "green", home: { x: 0.9, y: 0.7 }, size: 22 }),
      ];
