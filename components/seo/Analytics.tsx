import Script from "next/script";
import { getGaId, getGtmId, isGaViaGtm } from "@/lib/analytics";

/**
 * Google Tag Manager + optional direct GA4.
 *
 * GTM snippet equivalent (container head script) via next/script.
 * noscript iframe is rendered in layout as first body child.
 */
export default function Analytics() {
  const gtmId = getGtmId();
  const gaId = getGaId();
  const loadDirectGa = Boolean(gaId) && !isGaViaGtm();

  return (
    <>
      {gtmId ? (
        <>
          {/* Google Tag Manager — as high as practical in the document */}
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        </>
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
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}

/** GTM noscript fallback — must be first content inside <body> */
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
