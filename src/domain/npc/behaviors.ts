import type { Body } from "../physics/body";
import { isArtifact } from "../physics/body";
import type { Vec2 } from "../physics/vector";
import { distance, length, normalize, scale, subtract, vec } from "../physics/vector";
import type { Force, StepContext } from "../physics/world";
import { smoothNoise } from "./noise";

export type SpringTuning = { stiffness: number };

export type FloatTuning = { amplitude: number };

export type CuriosityTuning = { radius: number; keepDistance: number; strength: number };

export type FleeTuning = { radius: number; strength: number };

export type ForageTuning = { period: number; strength: number; arrivalRadius: number };

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

export const pickForageTarget = (body: Body, context: StepContext, period: number): Body | undefined => {
  const artifacts = context.bodies.filter(isArtifact);
  if (artifacts.length === 0) return undefined;
  const slot = Math.floor(context.time / period + body.seed * 101);
  return artifacts[Math.abs(slot) % artifacts.length];
};

export const forage =
  ({ period, strength, arrivalRadius }: ForageTuning): Force =>
  (body, context) => {
    if (context.pointer && distance(context.pointer, body.position) < arrivalRadius * 4) return vec();
    const target = pickForageTarget(body, context, period);
    if (!target) return vec();
    return arrive(body.position, target.position, { slowRadius: arrivalRadius, strength });
  };
