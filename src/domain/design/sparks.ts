export type Spark = { id: string; angle: number; distance: number; spin: number; size: number; accent: SparkAccent; delay: number };

export type Burst = { id: string; x: number; y: number; sparks: readonly Spark[] };

const ACCENTS = ["lime", "orange", "purple", "green", "sky", "amber"] as const;

type SparkAccent = (typeof ACCENTS)[number];

type BurstSeed = { id: string; x: number; y: number; count?: number; random: () => number };

const between = (min: number, max: number, random: () => number): number => min + (max - min) * random();

export const createBurst = ({ id, x, y, count = 9, random }: BurstSeed): Burst => ({
  id,
  x,
  y,
  sparks: Array.from({ length: count }, (_, index) => ({
    id: `${id}-${index}`,
    angle: (360 / count) * index + between(-16, 16, random),
    distance: between(34, 78, random),
    spin: between(-220, 220, random),
    size: between(7, 13, random),
    accent: ACCENTS[index % ACCENTS.length] ?? "lime",
    delay: between(0, 60, random),
  })),
});
