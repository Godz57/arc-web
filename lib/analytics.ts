/**
 * Analytics helpers — GTM + GA4 (+ Google Ads conversion import).
 *
 * Events designed to import as conversions in Google Ads via GA4:
 *  - generate_lead (primary — form submit)
 *  - contact (secondary — WhatsApp click)
 *
 * Optional direct Google Ads tag:
 *  NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
 * (only if you install Ads tag separately; prefer GA4 import when possible)
 */

export const GTM_ID_FALLBACK = "GTM-KN4DLJ2W";
export const GA_MEASUREMENT_ID_FALLBACK = "G-CGLHP3YJXN";

export function getGtmId(): string | undefined {
  const fromEnv = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  if (fromEnv && fromEnv.startsWith("GTM-")) return fromEnv;
  if (process.env.NODE_ENV === "production") return GTM_ID_FALLBACK;
  return fromEnv?.startsWith("GTM-") ? fromEnv : GTM_ID_FALLBACK;
}

export function getGaId(): string | undefined {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (fromEnv && fromEnv.startsWith("G-")) return fromEnv;
  if (process.env.NODE_ENV === "production") return GA_MEASUREMENT_ID_FALLBACK;
  return undefined;
}

/** Optional AW- ID if using Google Ads conversion tag (not required with GA4 import). */
export function getGoogleAdsId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  if (id && id.startsWith("AW-")) return id;
  return undefined;
}

/** When true, GA4 is expected to fire only from GTM (no direct gtag). */
export function isGaViaGtm(): boolean {
  return process.env.NEXT_PUBLIC_GA_VIA_GTM === "true";
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Push custom events to dataLayer (GTM) and gtag (direct GA) when present.
 */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    ...params,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

/**
 * Primary conversion for Google Ads (import from GA4 as "Lead").
 * Recommended event: generate_lead
 */
export function trackContactSubmit(projectType?: string) {
  const params = {
    method: "contact_form",
    project_type: projectType || "unspecified",
    currency: "BRL",
    // value is optional; set later when you know avg lead value
    // value: 0,
  } as const;

  trackEvent("generate_lead", params);
  trackEvent("contact_form_submit", {
    method: "contact_form",
    project_type: projectType || "unspecified",
  });
}

/**
 * Secondary conversion — WhatsApp click (import as "Contact" if desired).
 */
export function trackWhatsAppClick(placement: string) {
  trackEvent("contact", {
    method: "whatsapp",
    placement,
  });
  trackEvent("whatsapp_click", { placement, method: "whatsapp" });
}
