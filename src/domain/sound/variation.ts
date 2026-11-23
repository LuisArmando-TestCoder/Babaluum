import type { Voice } from "./cues";

type Variation = { rate: number; jitter: number };

const SPREAD = 0.06;

export const vary = (voice: Voice, { rate, jitter }: Variation): Voice => {
  const pitch = rate * (1 + (jitter - 0.5) * SPREAD);
  return { ...voice, from: voice.from * pitch, to: voice.to * pitch };
};
