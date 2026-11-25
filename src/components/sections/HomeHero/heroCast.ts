import type { RefObject } from "react";
import type { NpcSpec, TrinketSpec } from "@/components/playground/Playground";
import { alien, globe, pill, robot, trinket } from "../cast/cast";

type Slot = RefObject<HTMLElement | null>;

export const heroTrinkets = (title: Slot): readonly TrinketSpec[] => {
  const anchor = { element: title };
  return [
    trinket({ id: "plus-sky", kind: "plus", color: "sky", home: { x: 0.043, y: 0.05 }, compactHome: { x: 0.06, y: 0.05 }, size: 28, anchor }),
    trinket({ id: "star-lime", kind: "star", color: "lime", home: { x: 0, y: 0.372 }, compactHome: { x: 0.15, y: 0.06 }, size: 32, anchor }),
    trinket({ id: "crown-amber", kind: "crown", color: "amber", home: { x: 0.144, y: 0.5 }, compactHome: { x: 0.31, y: 0.93 }, size: 44, anchor }),
    trinket({ id: "asterisk-orange", kind: "asterisk", color: "orange", home: { x: 0.707, y: 0.056 }, compactHome: { x: 0.93, y: 0.06 }, size: 36, anchor }),
    trinket({ id: "plus-green", kind: "plus", color: "green", home: { x: 0.8475, y: 0.228 }, compactHome: { x: 0.97, y: 0.25 }, size: 30, anchor }),
    trinket({ id: "star-sky", kind: "star", color: "sky", home: { x: 1, y: 0.5 }, compactHome: { x: 0.7, y: 0.9 }, size: 30, anchor }),
    trinket({ id: "plus-lime", kind: "plus", color: "lime", home: { x: 0.718, y: 0.628 }, compactHome: { x: 0.82, y: 0.07 }, size: 32, anchor }),
    trinket({ id: "asterisk-sky", kind: "asterisk", color: "sky", home: { x: 0.455, y: 0.257 }, compactHome: { x: 0.86, y: 0.94 }, size: 34, anchor }),
  ];
};

const TAG_LOOKS = [
  { tone: "orange", tilt: 12, home: { x: 0.6, y: 0.16 } },
  { tone: "red", tilt: -2, home: { x: 0.32, y: 0.5 } },
  { tone: "lime", tilt: -8, home: { x: 0.6, y: 0.84 } },
] as const;

export const heroTags = (slot: Slot, labels: readonly string[]): readonly TrinketSpec[] =>
  TAG_LOOKS.flatMap((look, index) => {
    const label = labels[index];
    return label ? [pill({ id: `tag-${index}`, label, ...look, ink: "navy", size: "s", anchor: { element: slot } })] : [];
  });

type HeroSlots = { robot: Slot; action: Slot };

export const heroNpcs = (title: Slot, slots: HeroSlots): readonly NpcSpec[] => [
  robot({
    anchor: { element: slots.robot, fit: 0.78 },
    home: { x: 0.7, y: 0.46 },
    compactAnchor: { element: slots.action, fit: 1.1 },
    compactHome: { x: 1.2, y: 0.5 },
  }),
  alien({
    anchor: { element: title },
    home: { x: 0.85, y: -0.015 },
    compactAnchor: { element: slots.action, fit: 1.05 },
    compactHome: { x: -0.2, y: 0.5 },
    roams: true,
  }),
  globe({ anchor: { element: title }, home: { x: 0.11, y: 0.09 }, compactHome: { x: 0.14, y: 0.92 }, roams: true }),
];
