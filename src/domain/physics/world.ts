import type { Body } from "./body";
import type { Bounds } from "./bounds";
import { containBody } from "./bounds";
import type { CollisionConfig } from "./collision";
import { resolveCollision } from "./collision";
import type { Vec2 } from "./vector";
import { add, clampLength, scale, vec } from "./vector";

export type StepContext = {
  readonly time: number;
  readonly pointer: Vec2 | null;
  readonly bodies: readonly Body[];
  readonly bounds: Bounds;
};

export type Force = (body: Body, context: StepContext) => Vec2;

export type ForceSelector = (body: Body) => readonly Force[];

export const NO_FORCES: ForceSelector = () => [];

export type WorldConfig = CollisionConfig & {
  linearDamping: number;
  angularDamping: number;
  energyDecay: number;
  wallBounce: number;
  maxSpeed: number;
  maxStep: number;
};

export type World = {
  readonly bodies: Body[];
  readonly config: WorldConfig;
  readonly forcesFor: ForceSelector;
  bounds: Bounds;
  time: number;
};

export const DEFAULT_WORLD_CONFIG: WorldConfig = {
  restitution: 0.55,
  spinTransfer: 0.6,
  energyPerImpact: 0.004,
  linearDamping: 2.2,
  angularDamping: 2.8,
  energyDecay: 1.6,
  wallBounce: 0.5,
  maxSpeed: 1400,
  maxStep: 1 / 30,
};

export const createWorld = (
  bodies: Body[],
  forcesFor: ForceSelector,
  config: Partial<WorldConfig> = {},
): World => ({
  bodies,
  forcesFor,
  config: { ...DEFAULT_WORLD_CONFIG, ...config },
  bounds: { width: 1, height: 1 },
  time: 0,
});

const sumForces = (body: Body, forces: readonly Force[], context: StepContext): Vec2 =>
  forces.reduce((total, force) => add(total, force(body, context)), vec());

type Tick = { dt: number; config: WorldConfig };

const integrate = (body: Body, acceleration: Vec2, { dt, config }: Tick): void => {
  if (body.inverseMass === 0) return;
  const damping = Math.exp(-config.linearDamping * dt);
  body.velocity = clampLength(scale(add(body.velocity, scale(acceleration, dt)), damping), config.maxSpeed);
  body.position = add(body.position, scale(body.velocity, dt));
  body.angularVelocity *= Math.exp(-config.angularDamping * dt);
  body.rotation += body.angularVelocity * dt;
  body.energy *= Math.exp(-config.energyDecay * dt);
};

const collideAll = (bodies: Body[], config: WorldConfig): void => {
  for (let i = 0; i < bodies.length; i += 1) {
    for (let j = i + 1; j < bodies.length; j += 1) {
      const a = bodies[i];
      const b = bodies[j];
      if (a && b) resolveCollision(a, b, config);
    }
  }
};

export const stepWorld = (world: World, elapsed: number, pointer: Vec2 | null): void => {
  const dt = Math.min(Math.max(elapsed, 0), world.config.maxStep);
  world.time += dt;
  const context: StepContext = { time: world.time, pointer, bodies: world.bodies, bounds: world.bounds };
  for (const body of world.bodies) {
    integrate(body, sumForces(body, world.forcesFor(body), context), { dt, config: world.config });
  }
  collideAll(world.bodies, world.config);
  for (const body of world.bodies) containBody(body, world.bounds, world.config.wallBounce);
};

export const resizeWorld = (world: World, bounds: Bounds, bodyScale = 1): void => {
  world.bounds = bounds;
  for (const body of world.bodies) body.radius = body.baseRadius * bodyScale;
};

export const findBody = (world: World, id: string): Body | undefined => world.bodies.find((body) => body.id === id);
