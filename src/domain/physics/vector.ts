export type Vec2 = { x: number; y: number };

export const vec = (x = 0, y = 0): Vec2 => ({ x, y });

export const add = (a: Vec2, b: Vec2): Vec2 => vec(a.x + b.x, a.y + b.y);

export const subtract = (a: Vec2, b: Vec2): Vec2 => vec(a.x - b.x, a.y - b.y);

export const scale = (a: Vec2, factor: number): Vec2 => vec(a.x * factor, a.y * factor);

export const dot = (a: Vec2, b: Vec2): number => a.x * b.x + a.y * b.y;

export const length = (a: Vec2): number => Math.hypot(a.x, a.y);

export const distance = (a: Vec2, b: Vec2): number => length(subtract(a, b));

export const normalize = (a: Vec2): Vec2 => {
  const size = length(a);
  return size === 0 ? vec() : scale(a, 1 / size);
};

export const clampLength = (a: Vec2, max: number): Vec2 => {
  const size = length(a);
  return size <= max ? a : scale(a, max / size);
};

export const perpendicular = (a: Vec2): Vec2 => vec(-a.y, a.x);

export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, amount: number): number => from + (to - from) * amount;
