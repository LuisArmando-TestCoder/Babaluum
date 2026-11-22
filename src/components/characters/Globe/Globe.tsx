"use client";

import { useSpring, useTransform } from "framer-motion";
import { useId } from "react";
import type { PoseValues } from "@/hooks/poseValues";
import { COASTLINE, LAND, OCEAN } from "../palette";
import { RigPart } from "../RigPart";
import { FLOATY, SNAPPY } from "../rigSprings";

type GlobeProps = { pose: PoseValues };

const RADIUS = 86;
const PERIOD = 200;

const CONTINENTS = [
  "M8 36 C26 20 52 22 60 34 C66 44 54 54 60 64 C66 76 52 92 34 92 C18 92 6 82 4 66 C2 54 0 44 8 36 Z",
  "M100 18 C112 10 130 8 150 16 C160 22 150 34 138 36 C126 38 124 48 110 46 C98 44 92 26 100 18 Z",
  "M120 92 C132 74 156 74 166 86 C176 98 196 100 200 116 C204 134 196 160 182 176 C168 192 146 196 136 184 C126 172 140 156 132 144 C124 132 112 108 120 92 Z",
  "M20 140 C34 126 54 124 70 132 C80 138 74 150 64 154 C54 158 56 172 44 178 C30 184 16 170 14 158 C12 150 14 146 20 140 Z",
] as const;

const wrap = (value: number): number => -(((value % PERIOD) + PERIOD) % PERIOD);

export const Globe = ({ pose }: GlobeProps) => {
  const clipId = `${useId()}-globe`;
  const spin = useSpring(useTransform(pose.roll, (roll) => wrap(roll * RADIUS * 0.8)), FLOATY);
  const nod = useSpring(useTransform(pose.lookY, (look) => look * 8), SNAPPY);
  const tilt = useSpring(useTransform(pose.lean, (lean) => lean * 14), SNAPPY);

  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" overflow="visible" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx={100} cy={100} r={RADIUS} />
        </clipPath>
      </defs>
      <RigPart rotate={tilt} pivot={{ x: 100, y: 100 }}>
        <circle cx={100} cy={100} r={RADIUS} fill={OCEAN} />
        <g clipPath={`url(#${clipId})`}>
          <RigPart x={spin} y={nod}>
            {[0, PERIOD].map((offset) => (
              <g key={offset} transform={`translate(${offset} 0)`}>
                {CONTINENTS.map((shape) => (
                  <path key={shape} d={shape} fill={LAND} stroke={COASTLINE} strokeWidth={6} strokeLinejoin="round" />
                ))}
              </g>
            ))}
          </RigPart>
        </g>
        <circle cx={100} cy={100} r={RADIUS} fill="none" stroke={COASTLINE} strokeWidth={9} />
      </RigPart>
    </svg>
  );
};
