const STORAGE_KEY = "babaluum:sound";
const OFF = "off";
const ON = "on";

const listeners = new Set<() => void>();

const session: { muted?: boolean } = {};

const readStored = (): boolean => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === OFF;
  } catch {
    return false;
  }
};

const store = (muted: boolean): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, muted ? OFF : ON);
  } catch {
    session.muted = muted;
  }
};

export const isMuted = (): boolean => session.muted ?? readStored();

export const isMutedOnServer = (): boolean => false;

export const setMuted = (muted: boolean): void => {
  session.muted = muted;
  store(muted);
  for (const listener of listeners) listener();
};

export const subscribeToMute = (listener: () => void): (() => void) => {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};
