"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import type { PoseValues } from "@/hooks/poseValues";
import { useMix } from "@/hooks/useMix";
import { ALIEN_EYE, ALIEN_EYE_SHINE, ALIEN_MARK, ALIEN_RIM, ALIEN_SKIN } from "../palette";
import { RigPart } from "../RigPart";
import { BLINK, FLOATY, SNAPPY } from "../rigSprings";

type AlienProps = { pose: PoseValues };

const HEAD = "M100 8 C162 8 193 50 191 98 C189 150 142 200 100 203 C58 200 11 150 9 98 C7 50 38 8 100 8 Z";

export const Alien = ({ pose }: AlienProps) => {
  const tilt = useSpring(useMix(pose.lookX, pose.lean, (look, lean) => look * 10 + lean * 8), SNAPPY);
  const rimX = useSpring(useTransform(pose.lean, (lean) => 7 - lean * 10), FLOATY);
  const rimY = useSpring(useTransform(pose.lookY, (look) => 5 - look * 6), FLOATY);
  const eyeX = useSpring(useTransform(pose.lookX, (look) => look * 9), SNAPPY);
  const eyeY = useSpring(useTransform(pose.lookY, (look) => look * 6), SNAPPY);
  const blush = useTransform(pose.energy, (energy) => 0.55 + energy * 0.45);
  const smile = useTransform(pose.energy, (energy) => `M80 156 Q100 ${170 + energy * 14} 120 156`);

  return (
    <svg viewBox="0 0 200 212" width="100%" height="100%" overflow="visible" aria-hidden="true">
      <RigPart rotate={tilt} pivot={{ x: 100, y: 200 }}>
        <RigPart x={rimX} y={rimY}>
          <path d={HEAD} fill={ALIEN_RIM} />
        </RigPart>
        <path d={HEAD} fill={ALIEN_SKIN} />
        <path d="M70 72 Q100 58 130 72 L114 100 Q100 110 86 100 Z" fill={ALIEN_MARK} opacity={0.55} />
        <motion.ellipse cx={52} cy={150} rx={24} ry={18} fill={ALIEN_MARK} style={{ opacity: blush }} />
        <motion.ellipse cx={148} cy={150} rx={24} ry={18} fill={ALIEN_MARK} style={{ opacity: blush }} />
        <RigPart x={eyeX} y={eyeY}>
          <motion.g animate={BLINK} style={{ originY: 0.5 }}>
            <ellipse cx={60} cy={110} rx={34} ry={21} fill={ALIEN_EYE} transform="rotate(20 60 110)" />
            <ellipse cx={140} cy={110} rx={34} ry={21} fill={ALIEN_EYE} transform="rotate(-20 140 110)" />
            <path d="M40 98 Q56 86 76 100" fill="none" stroke={ALIEN_EYE_SHINE} strokeWidth={7} strokeLinecap="round" />
            <path d="M124 100 Q144 86 160 98" fill="none" stroke={ALIEN_EYE_SHINE} strokeWidth={7} strokeLinecap="round" />
          </motion.g>
        </RigPart>
        <path d="M93 140 Q100 132 107 140" fill="none" stroke={ALIEN_EYE} strokeWidth={3} strokeLinecap="round" />
        <motion.path d={smile} fill="none" stroke={ALIEN_EYE} strokeWidth={3.5} strokeLinecap="round" />
      </RigPart>
    </svg>
  );
};
