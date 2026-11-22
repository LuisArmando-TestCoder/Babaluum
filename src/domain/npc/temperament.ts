import type { Body } from "../physics/body";
import type { Force, ForceSelector } from "../physics/world";
import { forage, homeSpring, idleFloat, pointerCuriosity, pointerFlee } from "./behaviors";

export type Temperament = "anchored" | "roamer" | "trinket";

const TEMPERAMENTS: Record<Temperament, readonly Force[]> = {
  anchored: [
    homeSpring({ stiffness: 16 }),
    pointerCuriosity({ radius: 320, keepDistance: 150, strength: 1300 }),
    idleFloat({ amplitude: 40 }),
  ],
  roamer: [
    homeSpring({ stiffness: 1.6 }),
    forage({ period: 5.5, strength: 520, arrivalRadius: 70 }),
    pointerCuriosity({ radius: 420, keepDistance: 130, strength: 1500 }),
    idleFloat({ amplitude: 160 }),
  ],
  trinket: [
    homeSpring({ stiffness: 11 }),
    idleFloat({ amplitude: 70 }),
    pointerFlee({ radius: 150, strength: 5200 }),
  ],
};

export const temperamentForces = (temperaments: ReadonlyMap<string, Temperament>): ForceSelector => (body: Body) =>
  TEMPERAMENTS[temperaments.get(body.id) ?? "trinket"];
