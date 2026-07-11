/**
 * Google Analytics 4 helpers.
 * Measurement ID via NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX).
 * No-ops when the ID is missing (local/dev without GA).
 */

export function getGaId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id || !id.startsWith("G-")) return undefined;
  return id;
}

type GtagFn = (
  command: "event" | "config" | "js" | "set",
  ...args: unknown[]
) => void;

function gtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as Window & { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : undefined;
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
