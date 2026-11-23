import { clamp } from "../physics/vector";

export type CarouselEdge = "start" | "middle" | "end" | "fits";

export const travelLimit = (viewportWidth: number, trackWidth: number): number => Math.min(0, viewportWidth - trackWidth);

export const clampTravel = (target: number, limit: number): number => clamp(target, limit, 0);

export const edgeAt = (position: number, limit: number): CarouselEdge => {
  if (limit === 0) return "fits";
  if (position >= -1) return "start";
  return position <= limit + 1 ? "end" : "middle";
};
