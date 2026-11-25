"use client";

import { motion, useAnimationFrame, useInView, useReducedMotion, useScroll, useVelocity } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import type { Vec2 } from "@/domain/physics/vector";
import { vec } from "@/domain/physics/vector";
import { cx } from "@/domain/design/cx";
import { BodyView } from "./BodyView";
import type { NpcSpec, TrinketSpec } from "./specs";
import { createSimulation, pokeSimulation, tickSimulation, toLocal } from "./simulation";
import styles from "./Playground.module.scss";

type PlaygroundProps = {
  npcs?: readonly NpcSpec[];
  trinkets?: readonly TrinketSpec[];
  className?: string;
  children?: ReactNode;
};

const POKE = { radius: 90, strength: 1800 };

const clientPoint = (event: PointerEvent): Vec2 => vec(event.clientX, event.clientY);

export const Playground = ({ npcs = [], trinkets = [], className, children }: PlaygroundProps) => {
  const root = useRef<HTMLDivElement>(null);
  const pointer = useRef<Vec2 | null>(null);
  const [simulation] = useState(() => createSimulation(npcs, trinkets));
  const inView = useInView(root, { margin: "20% 0px" });
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  useAnimationFrame((_, delta) => {
    if (!root.current || (!inView && simulation.settled)) return;
    tickSimulation(simulation, {
      root: root.current,
      pointer: pointer.current,
      wind: vec(0, scrollVelocity.get()),
      delta,
      running: !reduced,
    });
  });

  const track = (event: PointerEvent) => {
    pointer.current = clientPoint(event);
  };

  const poke = (event: PointerEvent) => {
    if (root.current) pokeSimulation(simulation, { ...POKE, point: toLocal(root.current, clientPoint(event)) });
  };

  return (
    <div
      ref={root}
      className={cx(styles.playground, className)}
      onPointerMove={track}
      onPointerLeave={() => (pointer.current = null)}
      onPointerDown={poke}
    >
      {children}
      <motion.div data-cast-layer className={styles.layer} style={{ opacity: simulation.visible }} aria-hidden="true">
        {simulation.trinketViews.map(({ spec, motion: values }) => (
          <BodyView key={spec.id} id={spec.id} motion={values} size={spec.size}>
            {spec.render(values.pose.energy)}
          </BodyView>
        ))}
        {simulation.npcViews.map(({ spec, motion: values }) => (
          <BodyView key={spec.id} id={spec.id} motion={values} size={spec.size}>
            {spec.render(values.pose)}
          </BodyView>
        ))}
      </motion.div>
    </div>
  );
};
