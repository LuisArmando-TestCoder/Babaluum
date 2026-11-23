"use client";

import { useCallback, useEffect, useState } from "react";
import type { Burst } from "@/domain/design/sparks";
import { createBurst } from "@/domain/design/sparks";

const centerOf = (element: Element): { x: number; y: number } => {
  const box = element.getBoundingClientRect();
  return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
};

const originOf = (event: MouseEvent, element: Element): { x: number; y: number } =>
  event.detail === 0 ? centerOf(element) : { x: event.clientX, y: event.clientY };

export const useSparks = (): { bursts: readonly Burst[]; dismiss: (id: string) => void } => {
  const [bursts, setBursts] = useState<readonly Burst[]>([]);

  useEffect(() => {
    const ignite = (event: MouseEvent) => {
      const source = event.target instanceof Element ? event.target.closest("[data-burst]") : null;
      if (!source) return;
      const burst = createBurst({ id: `burst-${event.timeStamp}`, ...originOf(event, source), random: Math.random });
      setBursts((current) => [...current, burst]);
    };
    document.addEventListener("click", ignite, true);
    return () => document.removeEventListener("click", ignite, true);
  }, []);

  const dismiss = useCallback((id: string) => setBursts((current) => current.filter((burst) => burst.id !== id)), []);

  return { bursts, dismiss };
};
