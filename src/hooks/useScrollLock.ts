"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

export const useScrollLock = (locked: boolean): void => {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;
    lenis?.stop();
    document.documentElement.dataset.scrollLock = "true";
    return () => {
      lenis?.start();
      delete document.documentElement.dataset.scrollLock;
    };
  }, [locked, lenis]);
};
