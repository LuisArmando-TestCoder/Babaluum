import type { Vec2 } from "./vector";
import { vec } from "./vector";

export type BodyKind = "npc" | "artifact";

export type Body = {
  readonly id: string;
  readonly kind: BodyKind;
  readonly baseRadius: number;
  readonly inverseMass: number;
  radius: number;
  readonly seed: number;
  position: Vec2;
  velocity: Vec2;
  home: Vec2;
  rotation: number;
  angularVelocity: number;
  energy: number;
};

export type BodySpec = {
  id: string;
  kind: BodyKind;
  radius: number;
  mass: number;
  home: Vec2;
  seed?: number;
};

export const createBody = (spec: BodySpec): Body => ({
  id: spec.id,
  kind: spec.kind,
  baseRadius: spec.radius,
  radius: spec.radius,
  inverseMass: spec.mass > 0 ? 1 / spec.mass : 0,
  seed: spec.seed ?? 0,
  position: { ...spec.home },
  velocity: vec(),
  home: { ...spec.home },
  rotation: 0,
  angularVelocity: 0,
  energy: 0,
});

export const isNpc = (body: Body): boolean => body.kind === "npc";

export const isArtifact = (body: Body): boolean => body.kind === "artifact";
