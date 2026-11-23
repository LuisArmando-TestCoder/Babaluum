import { describe, expect, it } from "vitest";
import { clampTravel, edgeAt, travelLimit } from "./carousel";

describe("carousel", () => {
  it("has nowhere to travel when the track fits", () => {
    expect(travelLimit(1200, 900)).toBe(0);
    expect(edgeAt(0, 0)).toBe("fits");
  });

  it("travels left by the overflow and no further", () => {
    const limit = travelLimit(1000, 2600);
    expect(limit).toBe(-1600);
    expect(clampTravel(-9999, limit)).toBe(-1600);
    expect(clampTravel(300, limit)).toBe(0);
  });

  it("reports which edge the track rests on", () => {
    expect(edgeAt(0, -1600)).toBe("start");
    expect(edgeAt(-800, -1600)).toBe("middle");
    expect(edgeAt(-1600, -1600)).toBe("end");
  });
});
