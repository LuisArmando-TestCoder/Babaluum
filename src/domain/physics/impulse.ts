import type { Body } from "./body";
import type { Vec2 } from "./vector";
import { add, distance, normalize, scale, subtract } from "./vector";

export type Poke = { point: Vec2; radius: number; strength: number };

export const pokeBodies = (bodies: readonly Body[], { point, radius, strength }: Poke): number => {
  let touched = 0;
  for (const body of bodies) {
    const gap = distance(body.position, point);
    if (gap > radius + body.radius) continue;
    const falloff = 1 - Math.min(gap / (radius + body.radius), 1);
    const push = scale(normalize(subtract(body.position, point)), strength * falloff * body.inverseMass);
    body.velocity = add(body.velocity, push);
    body.angularVelocity += (push.x - push.y) * 0.02;
    body.energy = Math.min(1, body.energy + falloff);
    touched += 1;
  }
  return touched;
};
