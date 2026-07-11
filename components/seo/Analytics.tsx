import Script from "next/script";
import {
  getGaId,
  getGoogleAdsId,
  getGtmId,
  isGaViaGtm,
} from "@/lib/analytics";

/**
 * GTM + GA4 (+ optional Google Ads gtag config).
 * Prefer importing conversions from GA4 into Google Ads rather than
 * installing a second conversion pixel — avoids double counting.
 */
export default function Analytics() {
  const gtmId = getGtmId();
  const gaId = getGaId();
  const adsId = getGoogleAdsId();
  const loadDirectGa = Boolean(gaId) && !isGaViaGtm();

  return (
    <>
      {gtmId ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      ) : null}

      {loadDirectGa ? (
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
              gtag('config', '${gaId}', { send_page_view: true });
              ${
                adsId
                  ? `gtag('config', '${adsId}');`
                  : ""
              }
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}

/** GTM noscript fallback — first child inside <body> */
export function GtmNoscript() {
  const gtmId = getGtmId();
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
