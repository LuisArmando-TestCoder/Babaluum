import type { Body } from "../physics/body";
import type { Force, ForceSelector } from "../physics/world";
import { calmerOnCompactStages, forage, homeSpring, idleFloat, keepApart, onRoomyStages, pointerCuriosity, pointerFlee, scrollDrift } from "./behaviors";

export type Temperament = "anchored" | "roamer" | "trinket";

const TEMPERAMENTS: Record<Temperament, readonly Force[]> = {
  anchored: [
    homeSpring({ stiffness: 16 }),
    pointerCuriosity({ radius: 320, keepDistance: 150, strength: 1300 }),
    idleFloat({ amplitude: 40 }),
    scrollDrift({ response: 0.12 }),
  ],
  roamer: [
    homeSpring({ stiffness: 2.4 }),
    onRoomyStages(forage({ period: 5.5, strength: 460, arrivalRadius: 70, range: 390 })),
    pointerCuriosity({ radius: 420, keepDistance: 130, strength: 1500 }),
    calmerOnCompactStages(idleFloat({ amplitude: 120 }), 0.25),
    keepApart({ spacing: 1.7, strength: 2600 }),
    scrollDrift({ response: 0.25 }),
  ],
  trinket: [
    homeSpring({ stiffness: 11 }),
    idleFloat({ amplitude: 70 }),
    pointerFlee({ radius: 150, strength: 5200 }),
    scrollDrift({ response: 0.55 }),
  ],
};

export const temperamentForces = (temperaments: ReadonlyMap<string, Temperament>): ForceSelector => (body: Body) =>
  TEMPERAMENTS[temperaments.get(body.id) ?? "trinket"];
