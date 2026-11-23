import type { RefObject } from "react";
import type { NpcSpec, TrinketSpec } from "@/components/playground/Playground";
import { alien, globe, pill, robot, trinket } from "../cast/cast";

type Slot = RefObject<HTMLElement | null>;

export const heroTrinkets = (title: Slot): readonly TrinketSpec[] => {
  const anchor = { element: title };
  return [
    trinket({ id: "plus-sky", kind: "plus", color: "sky", home: { x: 0.043, y: 0.05 }, size: 28, anchor }),
    trinket({ id: "star-lime", kind: "star", color: "lime", home: { x: 0, y: 0.372 }, size: 32, anchor }),
    trinket({ id: "crown-amber", kind: "crown", color: "amber", home: { x: 0.144, y: 0.5 }, size: 44, anchor }),
    trinket({ id: "asterisk-orange", kind: "asterisk", color: "orange", home: { x: 0.707, y: 0.056 }, size: 36, anchor }),
    trinket({ id: "plus-green", kind: "plus", color: "green", home: { x: 0.8475, y: 0.228 }, size: 30, anchor }),
    trinket({ id: "star-sky", kind: "star", color: "sky", home: { x: 1, y: 0.5 }, size: 30, anchor }),
    trinket({ id: "plus-lime", kind: "plus", color: "lime", home: { x: 0.718, y: 0.628 }, size: 32, anchor }),
    trinket({ id: "asterisk-sky", kind: "asterisk", color: "sky", home: { x: 0.455, y: 0.257 }, size: 34, anchor }),
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

export const heroNpcs = (title: Slot, robotSlot: Slot): readonly NpcSpec[] => [
  robot({ anchor: { element: robotSlot, fit: 0.78 }, home: { x: 0.7, y: 0.46 } }),
  alien({ anchor: { element: title }, home: { x: 0.85, y: -0.015 }, compactHome: { x: 0.88, y: 0.585 }, roams: true }),
  globe({ anchor: { element: title }, home: { x: 0.11, y: 0.09 }, compactHome: { x: 0.14, y: 0.92 }, roams: true }),
];
