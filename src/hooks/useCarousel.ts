"use client";

import type { MotionValue } from "framer-motion";
import { animate, useMotionValue } from "framer-motion";
import type { MouseEvent, RefObject } from "react";
import { useRef, useState } from "react";
import type { CarouselEdge } from "@/domain/design/carousel";
import { clampTravel, edgeAt, travelLimit } from "@/domain/design/carousel";

const GLIDE = { type: "spring", stiffness: 120, damping: 22, mass: 0.9 } as const;

export type Carousel = {
  viewport: RefObject<HTMLDivElement | null>;
  track: RefObject<HTMLUListElement | null>;
  x: MotionValue<number>;
  edge: CarouselEdge;
  step: (direction: 1 | -1) => void;
  reveal: (index: number) => void;
  dragHandlers: {
    onPointerDown: () => void;
    onDragStart: () => void;
    onDragEnd: () => void;
    onClickCapture: (event: MouseEvent) => void;
  };
};

const slidePitch = (track: HTMLUListElement | null): number => {
  const [first, second] = track ? Array.from(track.children) : [];
  if (!(first instanceof HTMLElement)) return 0;
  return second instanceof HTMLElement ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
};

export const useCarousel = (): Carousel => {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const dragged = useRef(false);
  const x = useMotionValue(0);
  const [edge, setEdge] = useState<CarouselEdge>("start");

  const limit = () => travelLimit(viewport.current?.clientWidth ?? 0, track.current?.scrollWidth ?? 0);

  const glideTo = (target: number) => {
    const destination = clampTravel(target, limit());
    animate(x, destination, GLIDE);
    setEdge(edgeAt(destination, limit()));
  };

  return {
    viewport,
    track,
    x,
    edge,
    step: (direction) => glideTo(x.get() - direction * slidePitch(track.current)),
    reveal: (index) => glideTo(-index * slidePitch(track.current)),
    dragHandlers: {
      onPointerDown: () => {
        dragged.current = false;
      },
      onDragStart: () => {
        dragged.current = true;
      },
      onDragEnd: () => setEdge(edgeAt(x.get(), limit())),
      onClickCapture: (event) => {
        if (!dragged.current) return;
        event.preventDefault();
        event.stopPropagation();
        dragged.current = false;
      },
    },
  };
};
