import type { MotionValue } from "framer-motion";
import { motionValue } from "framer-motion";
import type { RefObject } from "react";
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
import { derivePose } from "@/domain/rig/pose";
import type { PoseValues } from "@/hooks/poseValues";
import { createPoseValues, writePose } from "@/hooks/poseValues";
import type { NpcSpec, Placement, TrinketSpec } from "./specs";

export type BodyMotion = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  pose: PoseValues;
};

export type View<Spec> = { spec: Spec; motion: BodyMotion };

export type Simulation = {
  world: World;
  npcViews: ReadonlyArray<View<NpcSpec>>;
  trinketViews: ReadonlyArray<View<TrinketSpec>>;
  motions: ReadonlyMap<string, BodyMotion>;
  placements: ReadonlyMap<string, Placement>;
  anchors: ReadonlyMap<string, RefObject<HTMLElement | null>>;
  visible: MotionValue<number>;
  castScale: number;
  settled: boolean;
};

export type Frame = { root: HTMLElement; pointer: Vec2 | null; delta: number; running: boolean };

const createMotion = (): BodyMotion => ({
  x: motionValue(0),
  y: motionValue(0),
  rotate: motionValue(0),
  scale: motionValue(1),
  pose: createPoseValues(),
});

export const createSimulation = (npcs: readonly NpcSpec[], trinkets: readonly TrinketSpec[]): Simulation => {
  const specs = [...npcs.map((spec) => ({ spec, kind: "npc" as const })), ...trinkets.map((spec) => ({ spec, kind: "artifact" as const }))];
  const bodies = specs.map(({ spec, kind }) => createBody({ ...spec, kind, home: vec() }));
  const temperaments = new Map<string, Temperament>(npcs.map((npc) => [npc.id, npc.temperament]));
  const npcViews = npcs.map((spec) => ({ spec, motion: createMotion() }));
  const trinketViews = trinkets.map((spec) => ({ spec, motion: createMotion() }));
  return {
    world: createWorld(bodies, temperamentForces(temperaments)),
    npcViews,
    trinketViews,
    motions: new Map([...npcViews, ...trinketViews].map(({ spec, motion }) => [spec.id, motion])),
    placements: new Map(specs.map(({ spec }) => [spec.id, spec.home])),
    anchors: new Map(npcs.flatMap((npc) => (npc.anchor ? [[npc.id, npc.anchor] as const] : []))),
    visible: motionValue(0),
    castScale: 0,
    settled: false,
  };
};

const pointWithin = (anchor: HTMLElement, origin: DOMRect, placement: Placement): Vec2 => {
  const rect = anchor.getBoundingClientRect();
  return vec(rect.left - origin.left + rect.width * placement.x, rect.top - origin.top + rect.height * placement.y);
};

const placeHomes = (simulation: Simulation, origin: DOMRect): void => {
  for (const body of simulation.world.bodies) {
    const anchor = simulation.anchors.get(body.id)?.current;
    const placement = simulation.placements.get(body.id) ?? { x: 0.5, y: 0.5 };
    body.home = anchor ? pointWithin(anchor, origin, placement) : vec(placement.x * origin.width, placement.y * origin.height);
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

export const tickSimulation = (simulation: Simulation, { root, pointer, delta, running }: Frame): void => {
  const origin = root.getBoundingClientRect();
  const castScale = castScaleFor(origin.width);
  resizeWorld(simulation.world, { width: origin.width, height: origin.height }, castScale);
  if (castScale !== simulation.castScale) {
    simulation.castScale = castScale;
    root.style.setProperty("--cast-scale", String(castScale));
  }
  placeHomes(simulation, origin);
  if (!simulation.settled) settle(simulation);
  const localPointer = pointer ? vec(pointer.x - origin.left, pointer.y - origin.top) : null;
  if (running) stepWorld(simulation.world, delta / 1000, localPointer);
  for (const body of simulation.world.bodies) {
    const motion = simulation.motions.get(body.id);
    if (motion) syncMotion(body, motion, localPointer);
  }
};

export const pokeSimulation = (simulation: Simulation, poke: Poke): number => pokeBodies(simulation.world.bodies, poke);
