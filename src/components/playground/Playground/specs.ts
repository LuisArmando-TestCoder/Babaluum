import type { MotionValue } from "framer-motion";
import type { ReactNode, RefObject } from "react";
import type { PoseValues } from "@/hooks/poseValues";

export type Placement = { x: number; y: number };

type BodySpecBase = {
  id: string;
  radius: number;
  mass: number;
  home: Placement;
  size: number;
  seed: number;
};

export type NpcSpec = BodySpecBase & {
  temperament: "anchored" | "roamer";
  anchor?: RefObject<HTMLElement | null>;
  render: (pose: PoseValues) => ReactNode;
};

export type TrinketSpec = BodySpecBase & {
  render: (energy: MotionValue<number>) => ReactNode;
};
