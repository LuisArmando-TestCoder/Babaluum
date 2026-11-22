"use client";

import type { MotionValue } from "framer-motion";
import { useMotionValueEvent, useTransform } from "framer-motion";
import type { RefCallback } from "react";
import { useCallback, useRef } from "react";

export type Pivot = { x: number; y: number };

export type SvgMotion = {
  rotate?: MotionValue<number>;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
  scaleY?: MotionValue<number>;
};

const ZERO = { get: () => 0 };
const ONE = { get: () => 1 };

const compose = (motion: SvgMotion, pivot: Pivot): string => {
  const rotate = (motion.rotate ?? ZERO).get();
  const x = (motion.x ?? ZERO).get();
  const y = (motion.y ?? ZERO).get();
  const scaleY = (motion.scaleY ?? ONE).get();
  return `translate(${x} ${y}) rotate(${rotate} ${pivot.x} ${pivot.y}) translate(0 ${pivot.y}) scale(1 ${scaleY}) translate(0 ${-pivot.y})`;
};

export const useSvgTransform = (motion: SvgMotion, pivot: Pivot): RefCallback<SVGGElement> => {
  const element = useRef<SVGGElement | null>(null);
  const sources = [motion.rotate, motion.x, motion.y, motion.scaleY].filter((value): value is MotionValue<number> => !!value);
  const transform = useTransform(sources, () => compose(motion, pivot));

  useMotionValueEvent(transform, "change", (value) => element.current?.setAttribute("transform", value));

  return useCallback(
    (node: SVGGElement | null) => {
      element.current = node;
      node?.setAttribute("transform", transform.get());
    },
    [transform],
  );
};
