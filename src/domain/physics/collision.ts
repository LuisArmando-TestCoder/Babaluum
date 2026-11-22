import type { Body } from "./body";
import { isNpc } from "./body";
import type { Vec2 } from "./vector";
import { add, dot, length, perpendicular, scale, subtract } from "./vector";

export type CollisionConfig = { restitution: number; spinTransfer: number; energyPerImpact: number };

type Contact = { a: Body; b: Body; normal: Vec2 };

export const shouldCollide = (a: Body, b: Body): boolean => !(isNpc(a) && isNpc(b));

const separate = ({ a, b, normal }: Contact, overlap: number): void => {
  const totalInverseMass = a.inverseMass + b.inverseMass;
  if (totalInverseMass === 0) return;
  a.position = subtract(a.position, scale(normal, (overlap * a.inverseMass) / totalInverseMass));
  b.position = add(b.position, scale(normal, (overlap * b.inverseMass) / totalInverseMass));
};

const exchangeMomentum = ({ a, b, normal }: Contact, config: CollisionConfig): number => {
  const relative = subtract(b.velocity, a.velocity);
  const approachSpeed = dot(relative, normal);
  if (approachSpeed >= 0) return 0;
  const impulse = (-(1 + config.restitution) * approachSpeed) / (a.inverseMass + b.inverseMass);
  a.velocity = subtract(a.velocity, scale(normal, impulse * a.inverseMass));
  b.velocity = add(b.velocity, scale(normal, impulse * b.inverseMass));
  return Math.abs(approachSpeed);
};

const transferSpin = ({ a, b, normal }: Contact, config: CollisionConfig): void => {
  const tangentSpeed = dot(subtract(b.velocity, a.velocity), perpendicular(normal));
  a.angularVelocity -= (tangentSpeed * config.spinTransfer * a.inverseMass) / a.radius;
  b.angularVelocity += (tangentSpeed * config.spinTransfer * b.inverseMass) / b.radius;
};

const excite = (body: Body, impactSpeed: number, config: CollisionConfig): void => {
  body.energy = Math.min(1, body.energy + impactSpeed * config.energyPerImpact * body.inverseMass);
};

export const resolveCollision = (a: Body, b: Body, config: CollisionConfig): boolean => {
  if (!shouldCollide(a, b)) return false;
  const offset = subtract(b.position, a.position);
  const gap = length(offset);
  const overlap = a.radius + b.radius - gap;
  if (overlap <= 0) return false;
  const normal = gap === 0 ? { x: 1, y: 0 } : scale(offset, 1 / gap);
  const contact: Contact = { a, b, normal };
  separate(contact, overlap);
  const impactSpeed = exchangeMomentum(contact, config);
  transferSpin(contact, config);
  excite(a, impactSpeed, config);
  excite(b, impactSpeed, config);
  return true;
};
