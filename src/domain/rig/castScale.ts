import { clamp } from "../physics/vector";

const DESIGN_WIDTH = 1280;
const SMALLEST = 0.48;

export const castScaleFor = (stageWidth: number): number =>
  Math.round(clamp(stageWidth / DESIGN_WIDTH, SMALLEST, 1) * 100) / 100;
