import { describe, expect, it } from "vitest";
import { createBody } from "../physics/body";
import { vec } from "../physics/vector";
import { derivePose } from "./pose";

describe("derivePose", () => {
  const robot = () => createBody({ id: "robot", kind: "npc", radius: 60, mass: 3, home: vec(500, 500) });

  it("looks toward the pointer, scaled by how far it is", () => {
    const near = derivePose(robot(), vec(600, 500));
    const far = derivePose(robot(), vec(2000, 500));
    expect(near.lookX).toBeGreaterThan(0);
    expect(near.lookX).toBeLessThan(far.lookX);
    expect(far.lookX).toBe(1);
  });

  it("looks where it is heading when there is no pointer", () => {
    const body = robot();
    body.velocity = vec(0, -350);
    expect(derivePose(body, null).lookY).toBeCloseTo(-0.5, 5);
  });

  it("keeps every channel in range", () => {
    const body = robot();
    body.velocity = vec(99_999, -99_999);
    const pose = derivePose(body, null);
    for (const value of [pose.lookX, pose.lookY, pose.lean]) expect(Math.abs(value)).toBeLessThanOrEqual(1);
    expect(pose.speed).toBeLessThanOrEqual(1);
  });
});
