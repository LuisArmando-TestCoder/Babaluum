"use client";

import type { MotionValue } from "framer-motion";
import { useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export type CursorMode = "idle" | "link" | "hidden" | "label";

export type CursorTarget = { mode: CursorMode; label: string };

export type CursorState = CursorTarget & { x: MotionValue<number>; y: MotionValue<number>; active: boolean };

const IDLE: CursorTarget = { mode: "idle", label: "" };

const OFFSCREEN = -200;

export const readCursorTarget = (element: Element | null): CursorTarget => {
  const marked = element?.closest<HTMLElement>("[data-cursor]");
  const hint = marked?.dataset.cursor;
  if (hint === "hide") return { mode: "hidden", label: "" };
  if (hint) return { mode: "label", label: hint };
  return element?.closest("a, button") ? { mode: "link", label: "" } : IDLE;
};

const sameTarget = (a: CursorTarget, b: CursorTarget): boolean => a.mode === b.mode && a.label === b.label;

export const useCursor = (): CursorState => {
  const x = useMotionValue(OFFSCREEN);
  const y = useMotionValue(OFFSCREEN);
  const [target, setTarget] = useState<CursorTarget>(IDLE);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const follow = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setActive(true);
      const next = readCursorTarget(event.target instanceof Element ? event.target : null);
      setTarget((current) => (sameTarget(current, next) ? current : next));
    };
    const leave = () => setActive(false);
    window.addEventListener("pointermove", follow, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", follow);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  return { x, y, active, ...target };
};
