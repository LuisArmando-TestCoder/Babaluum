import { describe, expect, it } from "vitest";
import { homeFor } from "./placement";

const home = { x: 0.85, y: 0 };
const compactHome = { x: 0.88, y: 0.58 };

describe("homeFor", () => {
  it("uses the design home on wide stages", () => {
    expect(homeFor({ home, compactHome }, 1280)).toBe(home);
  });

  it("uses the compact home on phone-width stages", () => {
    expect(homeFor({ home, compactHome }, 390)).toBe(compactHome);
  });

  it("falls back to the design home when no compact home is set", () => {
    expect(homeFor({ home }, 390)).toBe(home);
  });
});
