export type Voice = { wave: "sine" | "triangle"; from: number; to: number; duration: number; gain: number; delay?: number };

export const CUE_NAMES = ["press", "release", "open", "close", "step", "success", "error", "soundOn"] as const;

export type CueName = (typeof CUE_NAMES)[number];

export const CUES: Record<CueName, readonly Voice[]> = {
  press: [{ wave: "sine", from: 520, to: 310, duration: 0.06, gain: 0.05 }],
  release: [{ wave: "sine", from: 430, to: 760, duration: 0.07, gain: 0.05 }],
  open: [{ wave: "sine", from: 380, to: 640, duration: 0.11, gain: 0.05 }],
  close: [{ wave: "sine", from: 640, to: 360, duration: 0.11, gain: 0.045 }],
  step: [{ wave: "triangle", from: 620, to: 780, duration: 0.05, gain: 0.04 }],
  success: [
    { wave: "sine", from: 660, to: 660, duration: 0.09, gain: 0.05 },
    { wave: "sine", from: 990, to: 990, duration: 0.16, gain: 0.05, delay: 0.09 },
  ],
  error: [{ wave: "triangle", from: 230, to: 180, duration: 0.14, gain: 0.05 }],
  soundOn: [
    { wave: "sine", from: 520, to: 520, duration: 0.07, gain: 0.05 },
    { wave: "sine", from: 780, to: 1040, duration: 0.14, gain: 0.05, delay: 0.07 },
  ],
};

export const isCueName = (value: string | undefined): value is CueName => CUE_NAMES.some((name) => name === value);
