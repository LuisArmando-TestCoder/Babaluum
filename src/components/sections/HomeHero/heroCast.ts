import type { RefObject } from "react";
import type { NpcSpec, TrinketSpec } from "@/components/playground/Playground";
import { alien, globe, robot, trinket } from "../cast/cast";

export const heroTrinkets: readonly TrinketSpec[] = [
  trinket({ id: "plus-sky", kind: "plus", color: "sky", home: { x: 0.12, y: 0.215 }, size: 26 }),
  trinket({ id: "star-lime", kind: "star", color: "lime", home: { x: 0.083, y: 0.35 }, size: 28 }),
  trinket({ id: "crown-amber", kind: "crown", color: "amber", home: { x: 0.205, y: 0.405 }, size: 38 }),
  trinket({ id: "asterisk-orange", kind: "asterisk", color: "orange", home: { x: 0.672, y: 0.215 }, size: 30 }),
  trinket({ id: "plus-green", kind: "plus", color: "green", home: { x: 0.79, y: 0.29 }, size: 26 }),
  trinket({ id: "star-sky", kind: "star", color: "sky", home: { x: 0.918, y: 0.405 }, size: 26 }),
  trinket({ id: "plus-lime", kind: "plus", color: "lime", home: { x: 0.682, y: 0.462 }, size: 28 }),
  trinket({ id: "asterisk-sky", kind: "asterisk", color: "sky", home: { x: 0.462, y: 0.302 }, size: 28 }),
];

export const heroNpcs = (robotSlot: RefObject<HTMLElement | null>): readonly NpcSpec[] => [
  robot({ anchor: robotSlot }),
  alien({ x: 0.79, y: 0.19 }),
  globe({ x: 0.177, y: 0.232 }),
];
