import type { ReactNode } from "react";

export type ArtifactKind = "star" | "plus" | "asterisk" | "crown" | "heart";

const STAR =
  "M24 4.5c1.1 0 2 .7 2.4 1.7l4.3 9.4 10.2 1.2c2.2.3 3.1 3 1.5 4.5l-7.6 7 2.1 10.1c.4 2.2-1.9 3.9-3.8 2.8L24 36.1l-9.1 5.1c-1.9 1.1-4.2-.6-3.8-2.8l2.1-10.1-7.6-7c-1.6-1.5-.7-4.2 1.5-4.5l10.2-1.2 4.3-9.4c.4-1 1.3-1.7 2.4-1.7Z";
const CROWN = "M5 15.5 15 24l9-14 9 14 10-8.5-4 22.5H9L5 15.5Z";
const HEART = "M24 42S5 30.5 5 17.4A9.6 9.6 0 0 1 24 13a9.6 9.6 0 0 1 19 4.4C43 30.5 24 42 24 42Z";

export const ARTIFACT_SHAPES: Record<ArtifactKind, (fill: string) => ReactNode> = {
  star: (fill) => <path d={STAR} fill={fill} />,
  plus: (fill) => (
    <g fill={fill}>
      <rect x={18} y={4} width={12} height={40} rx={4} />
      <rect x={4} y={18} width={40} height={12} rx={4} />
    </g>
  ),
  asterisk: (fill) => (
    <g fill={fill}>
      {[0, 60, 120].map((angle) => (
        <rect key={angle} x={19.5} y={3} width={9} height={42} rx={4.5} transform={`rotate(${angle} 24 24)`} />
      ))}
    </g>
  ),
  crown: (fill) => <path d={CROWN} fill={fill} strokeLinejoin="round" stroke={fill} strokeWidth={3} />,
  heart: (fill) => <path d={HEART} fill={fill} />,
};
