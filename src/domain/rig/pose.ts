import type { Body } from "../physics/body";
import type { Vec2 } from "../physics/vector";
import { clamp, length, normalize, subtract, vec } from "../physics/vector";

export type Pose = {
  lookX: number;
  lookY: number;
  lean: number;
  speed: number;
  energy: number;
  roll: number;
};

export const REST_POSE: Pose = { lookX: 0, lookY: 0, lean: 0, speed: 0, energy: 0, roll: 0 };

const LOOK_REACH = 420;
const LEAN_SPEED = 900;
const FULL_SPEED = 700;

const lookVector = (body: Body, pointer: Vec2 | null): Vec2 => {
  if (pointer) {
    const offset = subtract(pointer, body.position);
    const reach = clamp(length(offset) / LOOK_REACH, 0, 1);
    const direction = normalize(offset);
    return vec(direction.x * reach, direction.y * reach);
  }
  return vec(clamp(body.velocity.x / FULL_SPEED, -1, 1), clamp(body.velocity.y / FULL_SPEED, -1, 1));
};

export const derivePose = (body: Body, pointer: Vec2 | null): Pose => {
  const look = lookVector(body, pointer);
  return {
    lookX: look.x,
    lookY: look.y,
    lean: clamp(body.velocity.x / LEAN_SPEED, -1, 1),
    speed: clamp(length(body.velocity) / FULL_SPEED, 0, 1),
    energy: body.energy,
    roll: (body.position.x - body.home.x) / Math.max(body.radius, 1),
  };
};
