import type { CueName } from "./cues";
import { isCueName } from "./cues";

export type Control = { sound?: string; expanded?: string | null; rate?: string };

export type Gesture = "down" | "up";

const SILENT = "none";

const SLOWEST = 0.5;
const FASTEST = 2;

const cueOnRelease = ({ sound, expanded }: Control): CueName => {
  if (isCueName(sound)) return sound;
  if (expanded === "false") return "open";
  return expanded === "true" ? "close" : "release";
};

export const cueFor = (control: Control, gesture: Gesture): CueName | null => {
  if (control.sound === SILENT) return null;
  return gesture === "down" ? "press" : cueOnRelease(control);
};

export const rateFor = ({ rate }: Control): number => {
  const parsed = Number(rate);
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(FASTEST, Math.max(SLOWEST, parsed)) : 1;
};

const STEP_INTERVAL = 0.12;

export const rateForStep = (index: number): number => 1 + index * STEP_INTERVAL;
