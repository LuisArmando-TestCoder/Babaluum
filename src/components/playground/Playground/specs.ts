import type { MotionValue } from "framer-motion";
import type { ReactNode, RefObject } from "react";
import type { PoseValues } from "@/hooks/poseValues";

import type { Placement } from "@/domain/rig/placement";

export type { Placement };

export type AnchorSpec = { element: RefObject<HTMLElement | null>; fit?: number };

type BodySpecBase = {
  id: string;
  radius: number;
  mass: number;
  home: Placement;
  compactHome?: Placement;
  size: number;
  seed: number;
  anchor?: AnchorSpec;
};

export type NpcSpec = BodySpecBase & {
  temperament: "anchored" | "roamer";
  render: (pose: PoseValues) => ReactNode;
};

export type TrinketSpec = BodySpecBase & {
  render: (energy: MotionValue<number>) => ReactNode;
};
