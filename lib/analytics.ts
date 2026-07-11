/**
 * Google Analytics 4 helpers.
 *
 * Measurement ID: NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX).
 * Fallback hardcode keeps production tracking alive if env is missing
 * on a given deploy (NEXT_PUBLIC is public anyway).
 */

/** Production GA4 stream — ARC WEB */
export const GA_MEASUREMENT_ID_FALLBACK = "G-CGLHP3YJXN";

export function getGaId(): string | undefined {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (fromEnv && fromEnv.startsWith("G-")) return fromEnv;
  // Prefer env in all environments; only fall back in production builds
  if (process.env.NODE_ENV === "production") {
    return GA_MEASUREMENT_ID_FALLBACK;
  }
  return undefined;
}

type GtagFn = (
  command: "event" | "config" | "js" | "set" | "consent",
  ...args: unknown[]
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

function gtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined;
  return typeof window.gtag === "function" ? window.gtag : undefined;
}

/** Fire a GA4 event when the tag is loaded */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  const send = gtag();
  if (!send) return;
  send("event", name, params);
}

export function trackContactSubmit(projectType?: string) {
  trackEvent("generate_lead", {
    method: "contact_form",
    project_type: projectType || "unspecified",
  });
  trackEvent("contact_form_submit", {
    project_type: projectType || "unspecified",
  });
}

export function trackWhatsAppClick(placement: string) {
  trackEvent("contact", {
    method: "whatsapp",
    placement,
  });
  trackEvent("whatsapp_click", { placement });
}
