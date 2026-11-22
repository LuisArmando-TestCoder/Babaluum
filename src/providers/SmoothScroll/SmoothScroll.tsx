"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

const LENIS_OPTIONS = { lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true, anchors: true } as const;

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const reduced = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      {reduced ? children : <ReactLenis root options={LENIS_OPTIONS}>{children}</ReactLenis>}
    </MotionConfig>
  );
};
