import { isCompact } from "../physics/bounds";

export type Placement = { x: number; y: number };

export type Homes = { home: Placement; compactHome?: Placement };

export const homeFor = ({ home, compactHome }: Homes, stageWidth: number): Placement => (isCompact({ width: stageWidth }) ? (compactHome ?? home) : home);
