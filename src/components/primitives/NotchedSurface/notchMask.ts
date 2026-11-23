export type NotchEdge = "top" | "right" | "bottom" | "left";

export type NotchKind = "step" | "valley";

export type Notch = {
  edge: NotchEdge;
  at: string;
  kind?: NotchKind;
  mirror?: boolean;
};

export type MaskStyle = {
  maskImage: string;
  maskPosition: string;
  maskSize: string;
  maskRepeat: string;
  maskComposite: string;
  WebkitMaskImage: string;
  WebkitMaskPosition: string;
  WebkitMaskSize: string;
  WebkitMaskRepeat: string;
  WebkitMaskComposite: string;
};

const RADIUS = 38;
const BLEED = 2;
const WIDTH = RADIUS * 2;
const DEPTH = RADIUS + BLEED;

const CUTTER_BOX = { width: WIDTH, height: DEPTH };

const ARC_UP = `A${RADIUS} ${RADIUS} 0 0 1 ${WIDTH} ${BLEED}`;
const CLOSE = `L${WIDTH} 0 Z`;

const CUTTERS: Record<NotchKind, { width: number; height: number; path: string }> = {
  step: { ...CUTTER_BOX, path: `M0 0 L0 ${BLEED} L${RADIUS} ${DEPTH} ${ARC_UP} ${CLOSE}` },
  valley: { ...CUTTER_BOX, path: `M0 0 L0 ${BLEED} A${RADIUS} ${RADIUS} 0 0 1 ${RADIUS} ${DEPTH} ${ARC_UP} ${CLOSE}` },
};

type Box = { width: number; height: number };

const orient = (edge: NotchEdge, mirror: boolean, { width, height }: Box): string => {
  const flipX = mirror ? `translate(${width} 0) scale(-1 1)` : "";
  const byEdge: Record<NotchEdge, string> = {
    top: "",
    bottom: `translate(0 ${height}) scale(1 -1)`,
    left: `translate(0 ${width}) rotate(-90)`,
    right: `translate(${height} 0) rotate(90)`,
  };
  return `${byEdge[edge]} ${flipX}`.trim();
};

const isVertical = (edge: NotchEdge): boolean => edge === "left" || edge === "right";

const cutterImage = ({ edge, kind = "step", mirror = false }: Notch): string => {
  const cutter = CUTTERS[kind];
  const [boxWidth, boxHeight] = isVertical(edge) ? [cutter.height, cutter.width] : [cutter.width, cutter.height];
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${boxWidth}' height='${boxHeight}' viewBox='0 0 ${boxWidth} ${boxHeight}'>` +
    `<path transform='${orient(edge, mirror, cutter)}' d='${cutter.path}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const cutterSize = ({ edge, kind = "step" }: Notch): string => {
  const cutter = CUTTERS[kind];
  const [width, height] = isVertical(edge) ? [cutter.height, cutter.width] : [cutter.width, cutter.height];
  return `calc(${width}px * var(--notch-scale, 1)) calc(${height}px * var(--notch-scale, 1))`;
};

const OVERSHOOT = `${BLEED}px * var(--notch-scale, 1)`;
const BEFORE_EDGE = `calc(-1 * ${OVERSHOOT})`;
const PAST_EDGE = `calc(100% + ${OVERSHOOT})`;

const cutterPosition = ({ edge, at }: Notch): string => {
  const byEdge: Record<NotchEdge, string> = {
    top: `${at} ${BEFORE_EDGE}`,
    bottom: `${at} ${PAST_EDGE}`,
    left: `${BEFORE_EDGE} ${at}`,
    right: `${PAST_EDGE} ${at}`,
  };
  return byEdge[edge];
};

const SOLID = "linear-gradient(#000 0 0)";

export const notchMask = (notches: readonly Notch[]): MaskStyle | undefined => {
  if (notches.length === 0) return undefined;
  const images = [...notches.map(cutterImage), SOLID].join(", ");
  const positions = [...notches.map(cutterPosition), "0 0"].join(", ");
  const sizes = [...notches.map(cutterSize), "100% 100%"].join(", ");
  const repeats = notches.map(() => "no-repeat").concat("no-repeat").join(", ");
  const composite = notches.map(() => "exclude").concat("add").join(", ");
  const webkitComposite = notches.map(() => "xor").concat("source-over").join(", ");
  return {
    maskImage: images,
    maskPosition: positions,
    maskSize: sizes,
    maskRepeat: repeats,
    maskComposite: composite,
    WebkitMaskImage: images,
    WebkitMaskPosition: positions,
    WebkitMaskSize: sizes,
    WebkitMaskRepeat: repeats,
    WebkitMaskComposite: webkitComposite,
  };
};
