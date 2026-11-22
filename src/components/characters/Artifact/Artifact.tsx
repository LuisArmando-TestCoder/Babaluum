"use client";

import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";
import { REST_POSE } from "@/domain/rig/pose";
import { motionValue } from "framer-motion";
import type { ArtifactKind } from "./shapes";
import { ARTIFACT_SHAPES } from "./shapes";

type ArtifactProps = {
  kind: ArtifactKind;
  color: string;
  energy?: MotionValue<number>;
};

const RESTING = motionValue(REST_POSE.energy);

export const Artifact = ({ kind, color, energy = RESTING }: ArtifactProps) => {
  const haloOpacity = useTransform(energy, [0, 0.15, 1], [0, 0.25, 0.7]);
  const haloScale = useTransform(energy, [0, 1], [1, 1.9]);
  const draw = ARTIFACT_SHAPES[kind];

  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" overflow="visible" aria-hidden="true">
      <motion.g style={{ opacity: haloOpacity, scale: haloScale, originX: 0.5, originY: 0.5 }}>{draw(color)}</motion.g>
      {draw(color)}
    </svg>
  );
};
