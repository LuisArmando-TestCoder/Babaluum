import type { RefObject } from "react";
import type { NpcSpec, Placement, TrinketSpec } from "@/components/playground/Playground";
import { alien, globe, robot, trinket } from "../cast/cast";

export type Companion = "alien" | "globe" | "robot" | "none";

type Align = "center" | "start";

type Slot = RefObject<HTMLElement | null>;

const BESIDE_TITLE: Record<Exclude<Companion, "none">, Record<Align, Placement>> = {
  alien: { center: { x: 1.05, y: 1.2 }, start: { x: 1.12, y: 0.2 } },
  globe: { center: { x: -0.05, y: 1.15 }, start: { x: 1.12, y: 0.2 } },
  robot: { center: { x: 1.06, y: 1.1 }, start: { x: 1.14, y: 0.4 } },
};

const ABOVE_TITLE: Record<Exclude<Companion, "none">, Placement> = {
  alien: { x: 0.88, y: -0.5 },
  globe: { x: 0.12, y: -0.5 },
  robot: { x: 0.88, y: -0.55 },
};

const COMPANIONS = { alien, globe, robot } as const;

const SIZES = { alien: 104, globe: 88, robot: 150 } as const;

export const companionCast = (companion: Companion, align: Align, title: Slot): readonly NpcSpec[] =>
  companion === "none"
    ? []
    : [COMPANIONS[companion]({ anchor: { element: title }, home: BESIDE_TITLE[companion][align], compactHome: align === "center" ? ABOVE_TITLE[companion] : undefined, size: SIZES[companion], roams: true })];

export const pageHeroTrinkets = (title: Slot): readonly TrinketSpec[] => [
  trinket({ id: "hero-asterisk", kind: "asterisk", color: "purple", home: { x: 0.005, y: 0.12 }, size: 34, anchor: { element: title } }),
  trinket({ id: "hero-crown", kind: "crown", color: "amber", home: { x: 0.885, y: 0.03 }, size: 44, anchor: { element: title } }),
  trinket({ id: "hero-star", kind: "star", color: "lime", home: { x: 0.5, y: 0.93 }, size: 34, anchor: { element: title } }),
];
