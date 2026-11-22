import { describe, expect, it } from "vitest";
import { createBody } from "./body";
import { pokeBodies } from "./impulse";
import { vec } from "./vector";

describe("pokeBodies", () => {
  it("pushes nearby bodies away from the point and charges them", () => {
    const near = createBody({ id: "near", kind: "artifact", radius: 10, mass: 1, home: vec(120, 100) });
    const far = createBody({ id: "far", kind: "artifact", radius: 10, mass: 1, home: vec(600, 100) });
    expect(pokeBodies([near, far], { point: vec(100, 100), radius: 80, strength: 900 })).toBe(1);
    expect(near.velocity.x).toBeGreaterThan(0);
    expect(near.energy).toBeGreaterThan(0);
    expect(far.velocity.x).toBe(0);
  });

  it("moves heavy bodies less than light ones", () => {
    const light = createBody({ id: "light", kind: "artifact", radius: 10, mass: 1, home: vec(130, 100) });
    const heavy = createBody({ id: "heavy", kind: "npc", radius: 10, mass: 5, home: vec(70, 100) });
    pokeBodies([light, heavy], { point: vec(100, 100), radius: 80, strength: 900 });
    expect(Math.abs(light.velocity.x)).toBeGreaterThan(Math.abs(heavy.velocity.x));
  });
});
