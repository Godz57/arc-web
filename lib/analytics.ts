/**
 * Analytics helpers — GTM + GA4.
 *
 * GTM container: NEXT_PUBLIC_GTM_ID (e.g. GTM-XXXXXXX)
 * GA4 stream:    NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX)
 *
 * When GTM is installed, keep GA4 either:
 *  - via direct gtag on the site (current setup), OR
 *  - via a GA4 Configuration tag inside GTM
 * …but not both for the same Measurement ID (double pageviews).
 *
 * Set NEXT_PUBLIC_GA_VIA_GTM=true only after GA4 is configured inside GTM;
 * that disables the direct gtag loader.
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
