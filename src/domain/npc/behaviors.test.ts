import { describe, expect, it } from "vitest";
import { createBody } from "../physics/body";
import { vec } from "../physics/vector";
import type { StepContext } from "../physics/world";
import { forage, homeSpring, pickForageTarget, pointerCuriosity, pointerFlee } from "./behaviors";
import { smoothNoise } from "./noise";

const body = (x: number, y: number, kind: "npc" | "artifact" = "npc") => {
  const created = createBody({ id: `${kind}-${x}-${y}`, kind, radius: 20, mass: 1, home: vec(0, 0), seed: 0.3 });
  created.position = vec(x, y);
  return created;
};

const context = (overrides: Partial<StepContext> = {}): StepContext => ({
  time: 0,
  pointer: null,
  bodies: [],
  bounds: { width: 1000, height: 1000 },
  ...overrides,
});

describe("behaviors", () => {
  it("pulls a body back toward home", () => {
    const force = homeSpring({ stiffness: 10 })(body(100, 0), context());
    expect(force.x).toBe(-1000);
  });

  it("makes artifacts flee a nearby pointer and ignore a distant one", () => {
    const flee = pointerFlee({ radius: 100, strength: 500 });
    expect(flee(body(50, 0, "artifact"), context({ pointer: vec(0, 0) })).x).toBeGreaterThan(0);
    expect(flee(body(500, 0, "artifact"), context({ pointer: vec(0, 0) })).x).toBe(0);
  });

  it("makes NPCs approach the pointer but stop short of it", () => {
    const curiosity = pointerCuriosity({ radius: 400, keepDistance: 80, strength: 600 });
    expect(curiosity(body(300, 0), context({ pointer: vec(0, 0) })).x).toBeLessThan(0);
    expect(curiosity(body(80, 0), context({ pointer: vec(0, 0) })).x).toBeCloseTo(0, 5);
  });

  it("forages artifacts in a rotating, deterministic order", () => {
    const npc = body(0, 0);
    const artifacts = [body(100, 0, "artifact"), body(200, 0, "artifact")];
    const first = pickForageTarget(npc, context({ bodies: artifacts, time: 0 }), 4);
    const later = pickForageTarget(npc, context({ bodies: artifacts, time: 4 }), 4);
    expect(first).toBeDefined();
    expect(later).not.toBe(first);
  });

  it("stops foraging while the pointer has its attention", () => {
    const npc = body(0, 0);
    const force = forage({ period: 4, strength: 300, arrivalRadius: 40 })(
      npc,
      context({ bodies: [body(300, 0, "artifact")], pointer: vec(20, 0) }),
    );
    expect(force).toEqual(vec());
  });

  it("keeps noise within [-1, 1]", () => {
    for (let t = 0; t < 200; t += 0.37) expect(Math.abs(smoothNoise(0.7, t))).toBeLessThanOrEqual(1);
  });
});
