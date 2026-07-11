import { GoogleAnalytics } from "@next/third-parties/google";
import { getGaId } from "@/lib/analytics";

/**
 * Loads GA4 only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set (production).
 * Uses Next.js official third-parties loader (afterInteractive).
 */
export default function Analytics() {
  const gaId = getGaId();
  if (!gaId) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
