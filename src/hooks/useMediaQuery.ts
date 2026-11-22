"use client";

import { useCallback, useSyncExternalStore } from "react";

export const useMediaQuery = (query: string, serverFallback = false): boolean => {
  const subscribe = useCallback(
    (notify: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", notify);
      return () => list.removeEventListener("change", notify);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
};

export const COMPACT_VIEWPORT = "(max-width: 899px)";
