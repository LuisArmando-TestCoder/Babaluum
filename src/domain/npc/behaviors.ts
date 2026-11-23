import type { Body } from "../physics/body";
import { isArtifact, isNpc } from "../physics/body";
import { isCompact } from "../physics/bounds";
import type { Vec2 } from "../physics/vector";
import { add, distance, length, normalize, scale, subtract, vec } from "../physics/vector";
import type { Force, StepContext } from "../physics/world";
import { smoothNoise } from "./noise";

export type SpringTuning = { stiffness: number };

export type FloatTuning = { amplitude: number };

export type CuriosityTuning = { radius: number; keepDistance: number; strength: number };

export type FleeTuning = { radius: number; strength: number };

export type ForageTuning = { period: number; strength: number; arrivalRadius: number; range: number };

export type ForagePatch = Pick<ForageTuning, "period" | "range">;

export const homeSpring =
  ({ stiffness }: SpringTuning): Force =>
  (body) =>
    scale(subtract(body.home, body.position), stiffness);

export const idleFloat =
  ({ amplitude }: FloatTuning): Force =>
  (body, { time }) =>
    vec(smoothNoise(body.seed, time) * amplitude, smoothNoise(body.seed + 7, time * 1.3) * amplitude);

type Approach = { slowRadius: number; strength: number };

const arrive = (from: Vec2, to: Vec2, { slowRadius, strength }: Approach): Vec2 => {
  const offset = subtract(to, from);
  const gap = length(offset);
  if (gap === 0) return vec();
  return scale(normalize(offset), strength * Math.min(1, gap / slowRadius));
};

export const pointerCuriosity =
  ({ radius, keepDistance, strength }: CuriosityTuning): Force =>
  (body, { pointer }) => {
    if (!pointer || distance(pointer, body.position) > radius) return vec();
    const away = normalize(subtract(body.position, pointer));
    const target = subtract(pointer, scale(away, -keepDistance));
    return arrive(body.position, target, { slowRadius: keepDistance, strength });
  };

export const pointerFlee =
  ({ radius, strength }: FleeTuning): Force =>
  (body, { pointer }) => {
    if (!pointer) return vec();
    const offset = subtract(body.position, pointer);
    const gap = length(offset);
    if (gap > radius || gap === 0) return vec();
    return scale(normalize(offset), strength * (1 - gap / radius));
  };

export type SeparationTuning = { spacing: number; strength: number };

export type DriftTuning = { response: number };

const pushAwayFrom = (body: Body, other: Body, { spacing, strength }: SeparationTuning): Vec2 => {
  const offset = subtract(body.position, other.position);
  const gap = length(offset);
  const reach = (body.radius + other.radius) * spacing;
  if (gap === 0 || gap >= reach) return vec();
  return scale(normalize(offset), strength * (1 - gap / reach));
};

export const keepApart =
  (tuning: SeparationTuning): Force =>
  (body, { bodies }) =>
    bodies
      .filter((other) => other !== body && isNpc(other))
      .reduce((total, other) => add(total, pushAwayFrom(body, other, tuning)), vec());

export const scrollDrift =
  ({ response }: DriftTuning): Force =>
  (body, { wind }) =>
    scale(wind, response * (0.6 + body.seed * 0.8));

export const pickForageTarget = (body: Body, context: StepContext, { period, range }: ForagePatch): Body | undefined => {
  const artifacts = context.bodies.filter((other) => isArtifact(other) && distance(other.home, body.home) <= range);
  if (artifacts.length === 0) return undefined;
  const slot = Math.floor(context.time / period + body.seed * 101);
  return artifacts[Math.abs(slot) % artifacts.length];
};

export const forage =
  ({ period, strength, arrivalRadius, range }: ForageTuning): Force =>
  (body, context) => {
    if (context.pointer && distance(context.pointer, body.position) < arrivalRadius * 4) return vec();
    const target = pickForageTarget(body, context, { period, range });
    if (!target) return vec();
    return arrive(body.position, target.position, { slowRadius: arrivalRadius, strength });
  };

export const onRoomyStages =
  (force: Force): Force =>
  (body, context) =>
    isCompact(context.bounds) ? vec() : force(body, context);

export const calmerOnCompactStages =
  (force: Force, factor: number): Force =>
  (body, context) =>
    isCompact(context.bounds) ? scale(force(body, context), factor) : force(body, context);
