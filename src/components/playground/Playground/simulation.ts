import type { MotionValue } from "framer-motion";
import { motionValue } from "framer-motion";
import type { Temperament } from "@/domain/npc/temperament";
import { temperamentForces } from "@/domain/npc/temperament";
import type { Body } from "@/domain/physics/body";
import { createBody } from "@/domain/physics/body";
import type { Poke } from "@/domain/physics/impulse";
import { pokeBodies } from "@/domain/physics/impulse";
import type { Vec2 } from "@/domain/physics/vector";
import { vec } from "@/domain/physics/vector";
import type { World } from "@/domain/physics/world";
import { createWorld, resizeWorld, stepWorld } from "@/domain/physics/world";
import { castScaleFor } from "@/domain/rig/castScale";
import type { Homes } from "@/domain/rig/placement";
import { homeFor } from "@/domain/rig/placement";
import { derivePose } from "@/domain/rig/pose";
import type { PoseValues } from "@/hooks/poseValues";
import { createPoseValues, writePose } from "@/hooks/poseValues";
import type { AnchorSpec, NpcSpec, Placement, TrinketSpec } from "./specs";

export type BodyMotion = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  fit: MotionValue<number>;
  pose: PoseValues;
};

export type View<Spec> = { spec: Spec; motion: BodyMotion };

type Layout = Homes & { size: number; anchor?: AnchorSpec };

export type Simulation = {
  world: World;
  npcViews: ReadonlyArray<View<NpcSpec>>;
  trinketViews: ReadonlyArray<View<TrinketSpec>>;
  motions: ReadonlyMap<string, BodyMotion>;
  layouts: ReadonlyMap<string, Layout>;
  visible: MotionValue<number>;
  settled: boolean;
};

export type Frame = { root: HTMLElement; pointer: Vec2 | null; wind: Vec2; delta: number; running: boolean };

const CENTER: Placement = { x: 0.5, y: 0.5 };

const createMotion = (): BodyMotion => ({
  x: motionValue(0),
  y: motionValue(0),
  rotate: motionValue(0),
  scale: motionValue(1),
  fit: motionValue(1),
  pose: createPoseValues(),
});

const toLayout = ({ home, compactHome, size, anchor }: NpcSpec | TrinketSpec): Layout => ({ home, compactHome, size, anchor });

export const createSimulation = (npcs: readonly NpcSpec[], trinkets: readonly TrinketSpec[]): Simulation => {
  const npcBodies = npcs.map((spec) => createBody({ ...spec, kind: "npc", home: vec() }));
  const trinketBodies = trinkets.map((spec) => createBody({ ...spec, kind: "artifact", home: vec() }));
  const temperaments = new Map<string, Temperament>(npcs.map((npc) => [npc.id, npc.temperament]));
  const npcViews = npcs.map((spec) => ({ spec, motion: createMotion() }));
  const trinketViews = trinkets.map((spec) => ({ spec, motion: createMotion() }));
  return {
    world: createWorld([...npcBodies, ...trinketBodies], temperamentForces(temperaments)),
    npcViews,
    trinketViews,
    motions: new Map([...npcViews, ...trinketViews].map(({ spec, motion }) => [spec.id, motion])),
    layouts: new Map<string, Layout>([
      ...npcs.map((spec) => [spec.id, toLayout(spec)] as const),
      ...trinkets.map((spec) => [spec.id, toLayout(spec)] as const),
    ]),
    visible: motionValue(0),
    settled: false,
  };
};

type Stage = { origin: DOMRect; castScale: number };

const placeFreely = (body: Body, layout: Layout, { origin, castScale }: Stage): number => {
  const home = homeFor(layout, origin.width);
  body.home = vec(home.x * origin.width, home.y * origin.height);
  return layout.size > 0 ? castScale : 1;
};

const placeOnAnchor = (body: Body, layout: Layout, { origin, castScale }: Stage): number => {
  const rect = layout.anchor?.element.current?.getBoundingClientRect();
  if (!rect) return placeFreely(body, layout, { origin, castScale });
  const home = homeFor(layout, origin.width);
  body.home = vec(rect.left - origin.left + rect.width * home.x, rect.top - origin.top + rect.height * home.y);
  const fit = layout.anchor?.fit;
  if (layout.size === 0) return 1;
  return fit ? (rect.height * fit) / layout.size : castScale;
};

const layOut = (simulation: Simulation, stage: Stage): void => {
  for (const body of simulation.world.bodies) {
    const layout = simulation.layouts.get(body.id) ?? { home: CENTER, size: 0 };
    const fit = layout.anchor ? placeOnAnchor(body, layout, stage) : placeFreely(body, layout, stage);
    body.radius = body.baseRadius * fit;
    simulation.motions.get(body.id)?.fit.set(fit);
  }
};

const settle = (simulation: Simulation): void => {
  for (const body of simulation.world.bodies) body.position = { ...body.home };
  simulation.settled = true;
  simulation.visible.set(1);
};

const syncMotion = (body: Body, motion: BodyMotion, pointer: Vec2 | null): void => {
  motion.x.set(body.position.x);
  motion.y.set(body.position.y);
  if (body.kind === "npc") {
    writePose(motion.pose, derivePose(body, pointer));
    return;
  }
  motion.rotate.set((body.rotation * 180) / Math.PI);
  motion.scale.set(1 + body.energy * 0.35);
  motion.pose.energy.set(body.energy);
};

export const toLocal = (root: HTMLElement, client: Vec2): Vec2 => {
  const origin = root.getBoundingClientRect();
  return vec(client.x - origin.left, client.y - origin.top);
};

export const tickSimulation = (simulation: Simulation, { root, pointer, wind, delta, running }: Frame): void => {
  const origin = root.getBoundingClientRect();
  resizeWorld(simulation.world, { width: origin.width, height: origin.height });
  layOut(simulation, { origin, castScale: castScaleFor(origin.width) });
  if (!simulation.settled) settle(simulation);
  const localPointer = pointer ? vec(pointer.x - origin.left, pointer.y - origin.top) : null;
  if (running) stepWorld(simulation.world, delta / 1000, { pointer: localPointer, wind });
  for (const body of simulation.world.bodies) {
    const motion = simulation.motions.get(body.id);
    if (motion) syncMotion(body, motion, localPointer);
  }
};

export const pokeSimulation = (simulation: Simulation, poke: Poke): number => pokeBodies(simulation.world.bodies, poke);
