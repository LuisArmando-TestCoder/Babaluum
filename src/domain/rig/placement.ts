import { isCompact } from "../physics/bounds";

export type Placement = { x: number; y: number };

export type Homes = { home: Placement; compactHome?: Placement };

export const forStage = <T>(wide: T, compact: T | undefined, stageWidth: number): T =>
  compact !== undefined && isCompact({ width: stageWidth }) ? compact : wide;

export const homeFor = ({ home, compactHome }: Homes, stageWidth: number): Placement => forStage(home, compactHome, stageWidth);
