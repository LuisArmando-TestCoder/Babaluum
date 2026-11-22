"use client";

import type { MotionValue } from "framer-motion";
import { useTransform } from "framer-motion";

export const useMix = (
  first: MotionValue<number>,
  second: MotionValue<number>,
  mix: (first: number, second: number) => number,
): MotionValue<number> => useTransform(() => mix(first.get(), second.get()));
