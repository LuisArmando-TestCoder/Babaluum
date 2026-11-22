"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { LIME, NAVY, PURPLE } from "../palette";

type StickerProps = { text: string; glyph?: string };

const scallop = (points: number, outer: number, inner: number): string =>
  Array.from({ length: points * 2 }, (_, index) => {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = (Math.PI * index) / points;
    return `${index === 0 ? "M" : "L"}${(60 + Math.cos(angle) * radius).toFixed(2)} ${(60 + Math.sin(angle) * radius).toFixed(2)}`;
  }).join(" ") + " Z";

const OUTER = scallop(18, 58, 54);
const INNER = scallop(14, 30, 27);

export const Sticker = ({ text, glyph = "B" }: StickerProps) => {
  const ringId = `${useId()}-ring`;
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
      <defs>
        <path id={ringId} d="M60 60 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0" />
      </defs>
      <path d={OUTER} fill={PURPLE} strokeLinejoin="round" stroke={PURPLE} strokeWidth={4} />
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} style={{ originX: 0.5, originY: 0.5 }}>
        <text fontSize={11.5} fontWeight={700} letterSpacing={1.4} fill={NAVY}>
          <textPath href={`#${ringId}`}>{text}</textPath>
        </text>
      </motion.g>
      <path d={INNER} fill={LIME} stroke={LIME} strokeWidth={3} strokeLinejoin="round" />
      <text x={60} y={69} textAnchor="middle" fontSize={26} fontWeight={800} fill={NAVY}>
        {glyph}
      </text>
    </svg>
  );
};
