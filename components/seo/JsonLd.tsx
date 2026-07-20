import type { Locale } from "@/i18n/routing";
import { buildJsonLd, getSiteUrl } from "@/lib/seo";

/**
 * Server-rendered JSON-LD. Prefer this over client injection so crawlers
 * and the Rich Results Test always see the markup in the initial HTML.
 */
export default function JsonLd({ locale = "pt" }: { locale?: Locale }) {
  const jsonLd = buildJsonLd(getSiteUrl(), locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
