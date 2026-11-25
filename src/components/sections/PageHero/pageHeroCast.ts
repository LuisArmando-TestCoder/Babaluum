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

export type HeroSlots = { title: Slot; eyebrow: Slot };

const ON_PHONES: Record<Align, Placement> = {
  center: { x: 0.5, y: -1.1 },
  start: { x: 1.45, y: -0.4 },
};

const COMPANIONS = { alien, globe, robot } as const;

const SIZES = { alien: 104, globe: 88, robot: 150 } as const;

const PHONE_FIT = { alien: 1.7, globe: 1.7, robot: 1.2 } as const;

export const companionCast = (companion: Companion, align: Align, slots: HeroSlots): readonly NpcSpec[] =>
  companion === "none"
    ? []
    : [
        COMPANIONS[companion]({
          anchor: { element: slots.title },
          home: BESIDE_TITLE[companion][align],
          compactAnchor: { element: slots.eyebrow, fit: PHONE_FIT[companion] },
          compactHome: ON_PHONES[align],
          size: SIZES[companion],
          roams: true,
        }),
      ];

export const pageHeroTrinkets = ({ title, eyebrow }: HeroSlots): readonly TrinketSpec[] => {
  const staging = { anchor: { element: title }, compactAnchor: { element: eyebrow, fit: 0.55 } };
  return [
    trinket({ id: "hero-asterisk", kind: "asterisk", color: "purple", home: { x: 0.005, y: 0.12 }, compactHome: { x: -0.22, y: 0.6 }, size: 34, ...staging }),
    trinket({ id: "hero-crown", kind: "crown", color: "amber", home: { x: 0.885, y: 0.03 }, compactHome: { x: 1.3, y: 0.3 }, size: 44, ...staging }),
    trinket({ id: "hero-star", kind: "star", color: "lime", home: { x: 0.5, y: 0.93 }, compactHome: { x: -0.5, y: 0.1 }, size: 34, ...staging }),
  ];
};
