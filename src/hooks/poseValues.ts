import type { MotionValue } from "framer-motion";
import { motionValue } from "framer-motion";
import type { Pose } from "@/domain/rig/pose";
import { REST_POSE } from "@/domain/rig/pose";

export type PoseValues = { readonly [Channel in keyof Pose]: MotionValue<number> };

const CHANNELS = Object.keys(REST_POSE) as ReadonlyArray<keyof Pose>;

export const createPoseValues = (): PoseValues =>
  Object.fromEntries(CHANNELS.map((channel) => [channel, motionValue(REST_POSE[channel])])) as PoseValues;

export const writePose = (values: PoseValues, pose: Pose): void => {
  for (const channel of CHANNELS) values[channel].set(pose[channel]);
};
