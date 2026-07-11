import Script from "next/script";
import { getGaId } from "@/lib/analytics";

/**
 * GA4 loader — dual-script pattern recommended by Google.
 * afterInteractive: runs after hydration without blocking first paint.
 * Placed from root layout; works on static + client navigations (page_view
 * is sent on full load; SPA routes can call trackEvent if added later).
 */
export default function Analytics() {
  const gaId = getGaId();
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
