/**
 * HUD audio via Web Audio API — zero asset files, always free.
 * Muted by default (localStorage + autoplay-safe).
 */

import { storageGet, storageSet } from "@/lib/safe-storage";

type HudSound = "boot" | "hover" | "power" | "transmit" | "click";

const STORAGE_KEY = "arc_audio_muted";

let ctx: AudioContext | null = null;
let muted = true;
const listeners = new Set<(m: boolean) => void>();

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    } catch {
      return null;
    }
  }
  return ctx;
}

export function isMuted(): boolean {
  return muted;
}

export function loadMutePreference(): boolean {
  if (typeof window === "undefined") return true;
  const stored = storageGet(STORAGE_KEY);
  // default muted
  muted = stored === null ? true : stored === "1";
  return muted;
}

export function setMuted(next: boolean) {
  muted = next;
  storageSet(STORAGE_KEY, next ? "1" : "0");
  listeners.forEach((fn) => fn(next));
  // resume context on unmute (user gesture)
  if (!next) {
    const c = getCtx();
    if (c?.state === "suspended") void c.resume().catch(() => {});
  }
}

export function toggleMute(): boolean {
  setMuted(!muted);
  return muted;
}

export function subscribeMute(fn: (m: boolean) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function tone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.08,
  frequencyEnd?: number
) {
  if (muted) return;
  try {
    const c = getCtx();
    if (!c) return;
    if (c.state === "suspended") void c.resume().catch(() => {});

    const now = c.currentTime;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    if (frequencyEnd != null) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(frequencyEnd, 1),
        now + duration
      );
    }
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(gain, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  } catch {
    // ignore audio failures on restricted browsers
  }
}

export function playHud(sound: HudSound) {
  if (muted) return;
  switch (sound) {
    case "boot":
      tone(220, 0.08, "square", 0.04);
      setTimeout(() => tone(330, 0.08, "square", 0.04), 90);
      setTimeout(() => tone(440, 0.12, "square", 0.05), 180);
      setTimeout(() => tone(660, 0.2, "sine", 0.06), 300);
      break;
    case "hover":
      tone(880, 0.04, "sine", 0.025);
      break;
    case "click":
      tone(520, 0.05, "triangle", 0.05);
      break;
    case "power":
      tone(120, 0.35, "sawtooth", 0.06, 880);
      setTimeout(() => tone(660, 0.15, "sine", 0.05), 100);
      break;
    case "transmit":
      tone(400, 0.08, "square", 0.04);
      setTimeout(() => tone(600, 0.08, "square", 0.04), 80);
      setTimeout(() => tone(900, 0.2, "sine", 0.05), 180);
      break;
    default:
      break;
  }
}
