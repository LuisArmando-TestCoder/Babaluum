import { describe, expect, it } from "vitest";
import { createBody } from "./body";
import { resolveCollision, shouldCollide } from "./collision";
import { DEFAULT_WORLD_CONFIG, NO_FORCES, createWorld, resizeWorld, stepWorld } from "./world";
import { vec } from "./vector";

const npc = (x: number, y: number) => createBody({ id: `npc-${x}`, kind: "npc", radius: 40, mass: 4, home: vec(x, y) });
const artifact = (x: number, y: number) =>
  createBody({ id: `art-${x}`, kind: "artifact", radius: 16, mass: 1, home: vec(x, y) });

describe("collision", () => {
  it("never collides two NPCs", () => {
    expect(shouldCollide(npc(0, 0), npc(10, 0))).toBe(false);
  });

  it("separates overlapping bodies and pushes the lighter one further", () => {
    const heavy = npc(100, 100);
    const light = artifact(130, 100);
    expect(resolveCollision(heavy, light, DEFAULT_WORLD_CONFIG)).toBe(true);
    const heavyShift = 100 - heavy.position.x;
    const lightShift = light.position.x - 130;
    expect(lightShift).toBeGreaterThan(heavyShift);
    expect(light.position.x - heavy.position.x).toBeCloseTo(56, 5);
  });

  it("transfers momentum and excites the artifact it hits", () => {
    const pusher = npc(100, 100);
    const target = artifact(150, 100);
    pusher.velocity = vec(400, 0);
    resolveCollision(pusher, target, DEFAULT_WORLD_CONFIG);
    expect(target.velocity.x).toBeGreaterThan(0);
    expect(pusher.velocity.x).toBeLessThan(400);
    expect(target.energy).toBeGreaterThan(0);
  });

  it("spins an artifact on a glancing hit", () => {
    const pusher = npc(100, 100);
    const target = artifact(140, 130);
    pusher.velocity = vec(0, 500);
    resolveCollision(pusher, target, DEFAULT_WORLD_CONFIG);
    expect(target.angularVelocity).not.toBe(0);
  });
});

describe("world", () => {
  it("keeps every body inside its bounds", () => {
    const body = artifact(50, 50);
    body.velocity = vec(-5000, -5000);
    const world = createWorld([body], NO_FORCES);
    resizeWorld(world, { width: 200, height: 200 });
    for (let frame = 0; frame < 120; frame += 1) stepWorld(world, 1 / 60, null);
    expect(body.position.x).toBeGreaterThanOrEqual(body.radius);
    expect(body.position.y).toBeGreaterThanOrEqual(body.radius);
  });

  it("clamps large frame gaps so a background tab does not explode the simulation", () => {
    const body = artifact(100, 100);
    body.velocity = vec(300, 0);
    const world = createWorld([body], NO_FORCES, { linearDamping: 0 });
    resizeWorld(world, { width: 10_000, height: 10_000 });
    stepWorld(world, 5, null);
    expect(body.position.x).toBeCloseTo(110, 5);
  });

  it("is deterministic for identical inputs", () => {
    const run = () => {
      const pusher = npc(100, 100);
      pusher.velocity = vec(500, 30);
      const bodies = [pusher, artifact(160, 100)];
      const world = createWorld(bodies, NO_FORCES);
      resizeWorld(world, { width: 800, height: 600 });
      for (let frame = 0; frame < 90; frame += 1) stepWorld(world, 1 / 60, vec(400, 300));
      return bodies.map((body) => [body.position.x, body.position.y, body.rotation]);
    };
    expect(run()).toEqual(run());
  });
});
