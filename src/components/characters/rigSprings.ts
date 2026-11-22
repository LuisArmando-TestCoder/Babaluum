import type { TargetAndTransition } from "framer-motion";

export const SNAPPY = { stiffness: 220, damping: 20, mass: 0.6 } as const;

export const WOBBLY = { stiffness: 110, damping: 6, mass: 0.5 } as const;

export const FLOATY = { stiffness: 60, damping: 12, mass: 1 } as const;

export const BLINK: TargetAndTransition = {
  scaleY: [1, 1, 0.08, 1],
  transition: { duration: 3.6, times: [0, 0.92, 0.95, 1], repeat: Infinity, ease: "easeInOut" },
};
