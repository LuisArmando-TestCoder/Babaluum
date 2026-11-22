"use client";

import type { ReactNode } from "react";
import type { Pivot, SvgMotion } from "@/hooks/useSvgTransform";
import { useSvgTransform } from "@/hooks/useSvgTransform";

type RigPartProps = SvgMotion & {
  pivot?: Pivot;
  children: ReactNode;
};

const ORIGIN: Pivot = { x: 0, y: 0 };

export const RigPart = ({ pivot = ORIGIN, children, ...motion }: RigPartProps) => {
  const ref = useSvgTransform(motion, pivot);
  return <g ref={ref}>{children}</g>;
};
