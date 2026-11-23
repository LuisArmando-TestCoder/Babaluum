import type { Voice } from "@/domain/sound/cues";

const SILENCE = 0.0001;
const ATTACK = 0.004;
const TAIL = 0.02;

const playVoice = (context: AudioContext, voice: Voice): void => {
  const start = context.currentTime + (voice.delay ?? 0);
  const end = start + voice.duration;
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  oscillator.type = voice.wave;
  oscillator.frequency.setValueAtTime(voice.from, start);
  oscillator.frequency.exponentialRampToValueAtTime(voice.to, end);
  envelope.gain.setValueAtTime(SILENCE, start);
  envelope.gain.exponentialRampToValueAtTime(voice.gain, start + ATTACK);
  envelope.gain.exponentialRampToValueAtTime(SILENCE, end);
  oscillator.connect(envelope).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(end + TAIL);
};

export const playVoices = (context: AudioContext, voices: readonly Voice[]): void => {
  for (const voice of voices) playVoice(context, voice);
};
