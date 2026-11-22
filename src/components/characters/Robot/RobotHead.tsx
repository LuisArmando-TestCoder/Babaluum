"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import type { PoseValues } from "@/hooks/poseValues";
import { useMix } from "@/hooks/useMix";
import { GLOW, GLOW_DEEP, INK, VIOLET, VISOR } from "../palette";
import { RigPart } from "../RigPart";
import { BLINK, SNAPPY, WOBBLY } from "../rigSprings";
import type { RobotPaint } from "./RobotDefs";

type RobotHeadProps = { pose: PoseValues; paint: RobotPaint };

const Antenna = ({ sway, base, path, tip }: { sway: PoseValues["lean"]; base: { x: number; y: number }; path: string; tip: { x: number; y: number; angle: number } }) => (
  <RigPart rotate={sway} pivot={base}>
    <path d={path} fill="none" stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
    <rect x={tip.x - 4.5} y={tip.y - 4.5} width={9} height={9} rx={2} fill={GLOW} transform={`rotate(${tip.angle} ${tip.x} ${tip.y})`} />
  </RigPart>
);

export const RobotHead = ({ pose, paint }: RobotHeadProps) => {
  const tilt = useSpring(useMix(pose.lookX, pose.lean, (look, lean) => look * 8 - lean * 6), SNAPPY);
  const shiftX = useSpring(useTransform(pose.lookX, (look) => look * 5), SNAPPY);
  const shiftY = useSpring(useTransform(pose.lookY, (look) => look * 4), SNAPPY);
  const eyeX = useSpring(useTransform(pose.lookX, (look) => look * 10), SNAPPY);
  const eyeY = useSpring(useTransform(pose.lookY, (look) => look * 5), SNAPPY);
  const leftSway = useSpring(useMix(pose.lean, pose.energy, (lean, energy) => -lean * 28 - energy * 30), WOBBLY);
  const rightSway = useSpring(useMix(pose.lean, pose.energy, (lean, energy) => -lean * 28 + energy * 30), WOBBLY);
  const mouth = useTransform(pose.energy, (energy) => `M84 124 Q101 ${138 + energy * 12} 118 124`);

  return (
    <RigPart rotate={tilt} x={shiftX} y={shiftY} pivot={{ x: 100, y: 156 }}>
      <Antenna sway={leftSway} base={{ x: 40, y: 104 }} path="M40 104 C30 74 36 52 51 33" tip={{ x: 52, y: 31, angle: -30 }} />
      <Antenna sway={rightSway} base={{ x: 170, y: 100 }} path="M170 100 C179 64 162 32 142 16" tip={{ x: 140, y: 13, angle: 30 }} />
      <rect x={18} y={90} width={18} height={44} rx={7} fill={VISOR} />
      <rect x={164} y={86} width={19} height={46} rx={7} fill={VISOR} />
      <rect x={175} y={96} width={10} height={24} rx={5} fill={VIOLET} />
      <rect x={28} y={42} width={146} height={116} rx={48} fill={`url(#${paint.shell})`} />
      <rect x={28} y={42} width={146} height={116} rx={48} fill={`url(#${paint.sheen})`} />
      <rect x={68} y={36} width={60} height={28} rx={9} fill={VISOR} />
      <rect x={73} y={26} width={50} height={26} rx={8} fill={`url(#${paint.violet})`} />
      <rect x={55} y={74} width={94} height={38} rx={19} fill={VISOR} />
      <RigPart x={eyeX} y={eyeY}>
        <motion.g animate={BLINK} style={{ originY: 0.5 }}>
          <circle cx={84} cy={93} r={8.5} fill={GLOW} />
          <circle cx={120} cy={93} r={8.5} fill={GLOW} />
          <circle cx={86.5} cy={95.5} r={4} fill={GLOW_DEEP} />
          <circle cx={122.5} cy={95.5} r={4} fill={GLOW_DEEP} />
        </motion.g>
      </RigPart>
      <motion.path d={mouth} fill="none" stroke={VISOR} strokeWidth={7.5} strokeLinecap="round" />
    </RigPart>
  );
};
