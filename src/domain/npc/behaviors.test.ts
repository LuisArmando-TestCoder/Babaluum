import { describe, expect, it } from "vitest";
import { createBody } from "../physics/body";
import { vec } from "../physics/vector";
import type { StepContext } from "../physics/world";
import { calmerOnCompactStages, forage, homeSpring, keepApart, onRoomyStages, pickForageTarget, pointerCuriosity, pointerFlee, scrollDrift } from "./behaviors";
import { smoothNoise } from "./noise";

const body = (x: number, y: number, kind: "npc" | "artifact" = "npc") => {
  const created = createBody({ id: `${kind}-${x}-${y}`, kind, radius: 20, mass: 1, home: vec(0, 0), seed: 0.3 });
  created.position = vec(x, y);
  return created;
};

const context = (overrides: Partial<StepContext> = {}): StepContext => ({
  time: 0,
  pointer: null,
  wind: vec(),
  bodies: [],
  bounds: { width: 1000, height: 1000 },
  ...overrides,
});

describe("behaviors", () => {
  it("switches a force off on phone-width stages", () => {
    const spring = onRoomyStages(homeSpring({ stiffness: 10 }));
    expect(spring(body(100, 0), context()).x).toBe(-1000);
    expect(spring(body(100, 0), context({ bounds: { width: 390, height: 800 } })).x).toBe(0);
  });

  it("softens a force on phone-width stages", () => {
    const spring = calmerOnCompactStages(homeSpring({ stiffness: 10 }), 0.25);
    expect(spring(body(100, 0), context()).x).toBe(-1000);
    expect(spring(body(100, 0), context({ bounds: { width: 390, height: 800 } })).x).toBe(-250);
  });

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
    const first = pickForageTarget(npc, context({ bodies: artifacts, time: 0 }), { period: 4, range: 500 });
    const later = pickForageTarget(npc, context({ bodies: artifacts, time: 4 }), { period: 4, range: 500 });
    expect(first).toBeDefined();
    expect(later).not.toBe(first);
  });

  it("only forages artifacts that live near its own home", () => {
    const npc = body(0, 0);
    const distant = body(0, 0, "artifact");
    distant.home = vec(2000, 0);
    expect(pickForageTarget(npc, context({ bodies: [distant] }), { period: 4, range: 400 })).toBeUndefined();
  });

  it("stops foraging while the pointer has its attention", () => {
    const npc = body(0, 0);
    const force = forage({ period: 4, strength: 300, arrivalRadius: 40, range: 500 })(
      npc,
      context({ bodies: [body(300, 0, "artifact")], pointer: vec(20, 0) }),
    );
    expect(force).toEqual(vec());
  });

  it("pushes overlapping NPCs apart and leaves distant ones alone", () => {
    const apart = keepApart({ spacing: 1.5, strength: 900 });
    const near = body(30, 0);
    const far = body(900, 0);
    const self = body(0, 0);
    expect(apart(self, context({ bodies: [self, near, far] })).x).toBeLessThan(0);
    expect(apart(self, context({ bodies: [self, far] }))).toEqual(vec());
  });

  it("ignores artifacts when keeping NPCs apart", () => {
    const self = body(0, 0);
    const force = keepApart({ spacing: 1.5, strength: 900 })(self, context({ bodies: [self, body(10, 0, "artifact")] }));
    expect(force).toEqual(vec());
  });

  it("drags bodies along with the scroll, each by its own amount", () => {
    const drift = scrollDrift({ response: 0.5 });
    const light = body(0, 0, "artifact");
    expect(drift(light, context({ wind: vec(0, 1000) })).y).toBeGreaterThan(0);
    expect(drift(light, context())).toEqual(vec());
  });

  it("keeps noise within [-1, 1]", () => {
    for (let t = 0; t < 200; t += 0.37) expect(Math.abs(smoothNoise(0.7, t))).toBeLessThanOrEqual(1);
  });
});
