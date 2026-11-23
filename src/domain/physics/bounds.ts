import type { Body } from "./body";
import { clamp, vec } from "./vector";

export type Bounds = { width: number; height: number };

const COMPACT_WIDTH = 640;

export const isCompact = ({ width }: Pick<Bounds, "width">): boolean => width < COMPACT_WIDTH;

type Range = { min: number; max: number };

const reflect = (value: number, { min, max }: Range, speed: number): [number, number] => {
  if (value < min) return [min, Math.abs(speed)];
  if (value > max) return [max, -Math.abs(speed)];
  return [value, speed];
};

export const containBody = (body: Body, bounds: Bounds, bounce: number): void => {
  const [x, vx] = reflect(body.position.x, { min: body.radius, max: bounds.width - body.radius }, body.velocity.x);
  const [y, vy] = reflect(body.position.y, { min: body.radius, max: bounds.height - body.radius }, body.velocity.y);
  const hitWall = x !== body.position.x || y !== body.position.y;
  body.position = vec(clamp(x, 0, bounds.width), clamp(y, 0, bounds.height));
  body.velocity = hitWall ? vec(vx * bounce, vy * bounce) : vec(vx, vy);
};
