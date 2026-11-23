import { describe, expect, it } from "vitest";
import { createBurst } from "./sparks";

describe("createBurst", () => {
  const burst = createBurst({ id: "b1", x: 120, y: 80, count: 6, random: () => 0.5 });

  it("starts every spark at the click", () => {
    expect(burst).toMatchObject({ id: "b1", x: 120, y: 80 });
    expect(burst.sparks).toHaveLength(6);
  });

  it("spreads sparks around the full circle", () => {
    expect(burst.sparks.map((spark) => spark.angle)).toEqual([0, 60, 120, 180, 240, 300]);
  });

  it("gives each spark a unique id and a short flight", () => {
    expect(new Set(burst.sparks.map((spark) => spark.id)).size).toBe(6);
    expect(burst.sparks.every((spark) => spark.distance >= 34 && spark.distance <= 78)).toBe(true);
  });
});
