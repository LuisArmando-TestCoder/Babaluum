"use client";

import { useSpring, useTransform } from "framer-motion";
import type { PoseValues } from "@/hooks/poseValues";
import { useMix } from "@/hooks/useMix";
import { VISOR } from "../palette";
import { RigPart } from "../RigPart";
import { SNAPPY, WOBBLY } from "../rigSprings";
import type { RobotPaint } from "./RobotDefs";

type RobotBodyProps = { pose: PoseValues; paint: RobotPaint };

export const RobotBody = ({ pose, paint }: RobotBodyProps) => {
  const lean = useSpring(useTransform(pose.lean, (value) => value * 9), SNAPPY);
  const leftArm = useSpring(useMix(pose.lean, pose.energy, (value, energy) => value * 26 + energy * 55), WOBBLY);
  const rightArm = useSpring(useMix(pose.lean, pose.energy, (value, energy) => value * 26 - energy * 55), WOBBLY);
  const shell = `url(#${paint.shell})`;
  const violet = `url(#${paint.violet})`;

  return (
    <RigPart rotate={lean} pivot={{ x: 100, y: 256 }}>
      <ellipse cx={100} cy={206} rx={48} ry={52} fill={violet} />
      <ellipse cx={94} cy={211} rx={39} ry={41} fill={shell} />
      <path d="M126 162 C152 182 154 236 128 254 L118 252 C140 230 138 190 116 166 Z" fill={VISOR} />
      <RigPart rotate={leftArm} pivot={{ x: 54, y: 172 }}>
        <ellipse cx={46} cy={208} rx={11} ry={30} fill={shell} transform="rotate(12 46 208)" />
        <circle cx={54} cy={172} r={15} fill={violet} />
      </RigPart>
      <RigPart rotate={rightArm} pivot={{ x: 148, y: 168 }}>
        <ellipse cx={159} cy={205} rx={11} ry={32} fill={shell} transform="rotate(-10 159 205)" />
        <circle cx={148} cy={168} r={16} fill={violet} />
      </RigPart>
    </RigPart>
  );
};
