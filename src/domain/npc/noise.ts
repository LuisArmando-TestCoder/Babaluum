const HARMONICS = [
  { frequency: 0.31, weight: 0.5 },
  { frequency: 0.67, weight: 0.3 },
  { frequency: 1.43, weight: 0.2 },
] as const;

export const smoothNoise = (seed: number, time: number): number =>
  HARMONICS.reduce(
    (sum, { frequency, weight }, index) => sum + Math.sin(time * frequency + seed * (index + 1) * 12.9898) * weight,
    0,
  );
