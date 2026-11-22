"use client";

import { useId } from "react";
import type { PoseValues } from "@/hooks/poseValues";
import { RobotBody } from "./RobotBody";
import { RobotDefs } from "./RobotDefs";
import { RobotHead } from "./RobotHead";

type RobotProps = { pose: PoseValues };

export const Robot = ({ pose }: RobotProps) => {
  const id = useId();
  const paint = { shell: `${id}-shell`, violet: `${id}-violet`, sheen: `${id}-sheen` };
  return (
    <svg viewBox="0 0 200 262" width="100%" height="100%" overflow="visible" aria-hidden="true">
      <RobotDefs ids={paint} />
      <RobotBody pose={pose} paint={paint} />
      <RobotHead pose={pose} paint={paint} />
    </svg>
  );
};
