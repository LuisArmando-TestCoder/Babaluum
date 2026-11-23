"use client";

import type { ReactNode } from "react";
import { createContext, use, useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import type { Control, Gesture } from "@/domain/sound/control";
import { cueFor, rateFor } from "@/domain/sound/control";
import type { CueName } from "@/domain/sound/cues";
import { CUES } from "@/domain/sound/cues";
import { vary } from "@/domain/sound/variation";
import { isMuted, isMutedOnServer, setMuted, subscribeToMute } from "./muteStore";
import { playVoices } from "./synth";

type SoundApi = { muted: boolean; toggleMute: () => void; play: (cue: CueName, rate?: number) => void };

const SILENT: SoundApi = { muted: true, toggleMute: () => undefined, play: () => undefined };

const SoundContext = createContext<SoundApi>(SILENT);

export const useSound = (): SoundApi => use(SoundContext);

const CONTROLS = "a, button, [data-sound]";

const readControl = (target: EventTarget | null): Control | null => {
  const element = target instanceof Element ? target.closest<HTMLElement>(CONTROLS) : null;
  if (!element || element.matches(":disabled")) return null;
  return { sound: element.dataset.sound, expanded: element.getAttribute("aria-expanded"), rate: element.dataset.soundRate };
};

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const muted = useSyncExternalStore(subscribeToMute, isMuted, isMutedOnServer);
  const audio = useRef<AudioContext | null>(null);

  const play = useCallback((cue: CueName, rate = 1) => {
    if (isMuted() || typeof AudioContext === "undefined") return;
    audio.current ??= new AudioContext();
    void audio.current.resume();
    playVoices(
      audio.current,
      CUES[cue].map((voice) => vary(voice, { rate, jitter: Math.random() })),
    );
  }, []);

  useEffect(() => {
    const respond = (event: Event, gesture: Gesture) => {
      const control = readControl(event.target);
      if (!control) return;
      const cue = cueFor(control, gesture);
      if (cue) play(cue, rateFor(control));
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") respond(event, "down");
    };
    const onClick = (event: MouseEvent) => respond(event, "up");
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("click", onClick, true);
    };
  }, [play]);

  const toggleMute = useCallback(() => {
    setMuted(!isMuted());
    play("soundOn");
  }, [play]);

  const api = useMemo(() => ({ muted, toggleMute, play }), [muted, toggleMute, play]);

  return <SoundContext value={api}>{children}</SoundContext>;
};
