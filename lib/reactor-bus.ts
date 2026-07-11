/**
 * Lightweight event bus so the hero reactor stays in sync with the rest of the site
 * (assembly complete, form sent, manual power-up) without a heavy global store.
 */

export type ReactorPulseKind = "power" | "assemble" | "transmit";

export type ReactorSiteStatus =
  | "online"
  | "overdrive"
  | "assembled"
  | "uplink";

type PulseListener = (kind: ReactorPulseKind) => void;
type StatusListener = (status: ReactorSiteStatus) => void;

const pulseListeners = new Set<PulseListener>();
const statusListeners = new Set<StatusListener>();

let siteStatus: ReactorSiteStatus = "online";
let assembledUnlocked = false;
let statusResetTimer: ReturnType<typeof setTimeout> | null = null;

export function getReactorStatus(): ReactorSiteStatus {
  return siteStatus;
}

export function subscribeReactorPulse(fn: PulseListener): () => void {
  pulseListeners.add(fn);
  return () => pulseListeners.delete(fn);
}

export function subscribeReactorStatus(fn: StatusListener): () => void {
  statusListeners.add(fn);
  fn(siteStatus);
  return () => statusListeners.delete(fn);
}

function publishStatus(next: ReactorSiteStatus) {
  siteStatus = next;
  statusListeners.forEach((fn) => fn(next));
}

function scheduleReturn(holdMs: number) {
  if (statusResetTimer) clearTimeout(statusResetTimer);
  statusResetTimer = setTimeout(() => {
    publishStatus(assembledUnlocked ? "assembled" : "online");
    statusResetTimer = null;
  }, holdMs);
}

/** Fire a core pulse (+ temporary status for UI chrome). */
export function pulseReactor(kind: ReactorPulseKind = "power") {
  pulseListeners.forEach((fn) => fn(kind));

  if (kind === "power") {
    publishStatus("overdrive");
    scheduleReturn(900);
  } else if (kind === "assemble") {
    assembledUnlocked = true;
    publishStatus("assembled");
  } else if (kind === "transmit") {
    publishStatus("uplink");
    scheduleReturn(2200);
  }
}

/** Mark modules docked (from Process scroll) — sticky until reload. */
export function markReactorAssembled(): boolean {
  if (assembledUnlocked) return false;
  pulseReactor("assemble");
  return true;
}
