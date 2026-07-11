import {
  aboutContent,
  faqItems,
  services,
  siteContact,
} from "@/lib/data";

const DEFAULT_SITE_URL = "https://arcweb.com.br";

/**
 * Canonical site origin for metadata, sitemap, robots, and JSON-LD.
 * Never emits localhost/127.0.0.1 in production builds (avoids bad
 * canonicals when `.env.local` is present during `next build`).
 */
export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).trim();
  try {
    const url = new URL(raw);
    const isLocal =
      url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (isLocal && process.env.NODE_ENV === "production") {
      return DEFAULT_SITE_URL;
    }
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Shared SEO copy used in metadata + social tags */
export const seoCopy = {
  title: "ARC WEB | Criação de sites premium e experiências web",
  description:
    "Desenvolvimento de sites, landing pages e sistemas com design imersivo e performance. Peça um briefing — resposta em 24h.",
  keywords: [
    "desenvolvimento web",
    "criação de sites",
    "landing pages",
    "sites premium",
    "e-commerce",
    "sistemas web",
    "Next.js",
    "React Three Fiber",
    "freelance",
    "portfólio",
  ],
} as const;

/**
 * JSON-LD graph for Organization, Person, WebSite, ProfessionalService, FAQPage.
 * Rendered server-side so crawlers see structured data without relying on client JS.
 */
export function buildJsonLd(siteUrl: string = getSiteUrl()) {
  const logoUrl = `${siteUrl}/icon.svg`;
  const imageUrl = `${siteUrl}/opengraph-image`;
  const orgId = `${siteUrl}/#organization`;
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const serviceId = `${siteUrl}/#service`;

  const sameAs = [siteContact.linkedin, siteContact.github].filter(
    (url) => url && !url.endsWith("://github.com")
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "ARC WEB",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
        },
        image: imageUrl,
        email: siteContact.email,
        founder: { "@id": personId },
        sameAs,
        description: seoCopy.description,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: aboutContent.name,
        jobTitle: aboutContent.role,
        url: siteUrl,
        image: `${siteUrl}${aboutContent.photo}`,
        worksFor: { "@id": orgId },
        sameAs,
        description: aboutContent.lead,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: "ARC WEB",
        description: seoCopy.description,
        inLanguage: "pt-BR",
        publisher: { "@id": orgId },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: "ARC WEB",
        url: siteUrl,
        image: imageUrl,
        description: seoCopy.description,
        provider: { "@id": orgId },
        areaServed: {
          "@type": "Country",
          name: "Brasil",
        },
        availableLanguage: ["Portuguese", "pt-BR"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços ARC WEB",
          itemListElement: services.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: `${siteUrl}/#services`,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
