import {
  aboutContent,
  faqItems,
  processSteps,
  services,
  siteContact,
  whatsappNumber,
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

/** Shared SEO/GEO copy used in metadata, social tags, and answer engines */
export const seoCopy = {
  title: "ARC WEB | Criação de sites premium e experiências web",
  /** ~155 chars — keyword front + CTA */
  description:
    "Desenvolvimento de sites, landing pages e sistemas com design imersivo e performance. Peça um briefing — resposta em 24h.",
  /** Short brand line for OG/Twitter variants */
  socialDescription:
    "Sites premium, landing pages e sistemas web com design imersivo, Next.js e performance real. Briefing em 24h.",
  keywords: [
    "desenvolvimento web",
    "criação de sites",
    "criação de sites premium",
    "landing pages",
    "sites premium",
    "e-commerce",
    "sistemas web",
    "desenvolvedor front-end",
    "Next.js",
    "React Three Fiber",
    "sites interativos",
    "freelance desenvolvimento web",
    "Brasília",
    "Distrito Federal",
  ],
  /** Primary commercial H1 — brand personality + search intent */
  h1: "Criação de sites premium com design imersivo",
  h1Support:
    "Design de alto impacto, código limpo e interações memoráveis. Landing pages, sistemas e experiências web que performam no celular e impressionam no primeiro scroll.",
} as const;

/**
 * Standalone definitions (25–60 words) for GEO / AI citation.
 * Each block answers a common query without needing page context.
 */
export const geoDefinitions = [
  {
    term: "ARC WEB",
    question: "O que é a ARC WEB?",
    definition:
      "ARC WEB é um estúdio de desenvolvimento web focado em sites premium, landing pages e sistemas sob medida. Une design imersivo, engenharia em Next.js e performance real — do briefing ao deploy.",
  },
  {
    term: "site premium",
    question: "O que é um site premium?",
    definition:
      "Um site premium é uma presença digital com design intencional, código escalável e métricas de performance (Core Web Vitals). Não é template genérico: é interface pensada para conversão, marca e experiência memorável.",
  },
  {
    term: "desenvolvimento web imersivo",
    question: "O que é desenvolvimento web imersivo?",
    definition:
      "Desenvolvimento web imersivo combina interfaces cinematográficas, microinterações e, quando faz sentido, 3D em tempo real — sem sacrificar velocidade, SEO ou usabilidade em dispositivos reais.",
  },
] as const;

/**
 * JSON-LD graph for entity clarity (SEO + GEO / answer engines).
 * FAQPage still helps AEO even after Google limited FAQ rich results (2026).
 */
export function buildJsonLd(siteUrl: string = getSiteUrl()) {
  const logoUrl = `${siteUrl}/icon.svg`;
  const imageUrl = `${siteUrl}/opengraph-image`;
  const orgId = `${siteUrl}/#organization`;
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const webpageId = `${siteUrl}/#webpage`;
  const serviceId = `${siteUrl}/#service`;
  const howtoId = `${siteUrl}/#howto`;

  const sameAs = [siteContact.linkedin, siteContact.github].filter((url) => {
    if (!url) return false;
    try {
      const host = new URL(url).hostname.replace(/^www\./, "");
      // Skip empty placeholders like https://github.com (no user path)
      if (host === "github.com" && new URL(url).pathname.replace(/\/$/, "") === "") {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  });

  const telephone = whatsappNumber
    ? `+${whatsappNumber.replace(/\D/g, "")}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "ARC WEB",
        legalName: "ARC WEB",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          width: 100,
          height: 100,
        },
        image: imageUrl,
        email: siteContact.email,
        ...(telephone ? { telephone } : {}),
        founder: { "@id": personId },
        sameAs,
        description: seoCopy.description,
        knowsAbout: [
          "Desenvolvimento web",
          "Next.js",
          "Landing pages",
          "E-commerce",
          "Sistemas web",
          "React Three Fiber",
          "Design de interfaces",
          "SEO técnico",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteContact.email,
            ...(telephone ? { telephone } : {}),
            availableLanguage: ["Portuguese", "pt-BR"],
            areaServed: "BR",
          },
        ],
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
        knowsAbout: [
          "Front-end",
          "Next.js",
          "TypeScript",
          "Three.js",
          "Interfaces imersivas",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: "ARC WEB",
        alternateName: ["ARCWEB", "Arc Web"],
        description: seoCopy.description,
        inLanguage: "pt-BR",
        publisher: { "@id": orgId },
        copyrightHolder: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: siteUrl,
        name: seoCopy.title,
        description: seoCopy.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
        },
        inLanguage: "pt-BR",
        dateModified: new Date().toISOString().slice(0, 10),
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: "ARC WEB — Desenvolvimento de sites premium",
        url: siteUrl,
        image: imageUrl,
        description: seoCopy.description,
        // brand / parent org (schema.org ProfessionalService → Organization)
        brand: { "@id": orgId },
        founder: { "@id": personId },
        areaServed: [
          {
            "@type": "Country",
            name: "Brasil",
          },
          {
            "@type": "AdministrativeArea",
            name: "Distrito Federal",
          },
        ],
        priceRange: "$$",
        ...(telephone ? { telephone } : {}),
        email: siteContact.email,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços de desenvolvimento web ARC WEB",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: `${siteUrl}/#services`,
              provider: { "@id": orgId },
            },
          })),
        },
      },
      {
        "@type": "HowTo",
        "@id": howtoId,
        name: "Como a ARC WEB entrega um projeto de site",
        description:
          "Protocolo em quatro etapas: briefing, design, build e launch — do objetivo de negócio ao site no ar.",
        totalTime: "P21D",
        step: processSteps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.description,
          url: `${siteUrl}/#process`,
        })),
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
