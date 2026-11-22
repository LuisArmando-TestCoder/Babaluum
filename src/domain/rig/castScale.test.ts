import { describe, expect, it } from "vitest";
import { castScaleFor } from "./castScale";

describe("castScaleFor", () => {
  it("keeps full size on desktop stages", () => {
    expect(castScaleFor(1440)).toBe(1);
  });

  it("shrinks proportionally on tablets", () => {
    expect(castScaleFor(800)).toBeCloseTo(0.63, 2);
  });

  it("never shrinks characters below a readable size", () => {
    expect(castScaleFor(320)).toBe(0.48);
  });
});
