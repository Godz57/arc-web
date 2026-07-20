import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { siteContact, whatsappNumber } from "@/lib/data";

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

export function htmlLang(locale: Locale): "pt-BR" | "en" {
  return locale === "pt" ? "pt-BR" : "en";
}

type SeoCopy = {
  title: string;
  description: string;
  socialDescription: string;
  keywords: string[];
  h1: string;
  h1Support: string;
};

const seoCopyByLocale: Record<Locale, SeoCopy> = {
  pt: {
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
  },
  en: {
    title: "ARC WEB | Premium website design & immersive web experiences",
    /** ~155 chars — keyword front + CTA */
    description:
      "Website design, landing pages and web systems with immersive UI and real performance. Request a briefing — reply within 24h.",
    socialDescription:
      "Premium websites, landing pages and web systems with immersive design, Next.js and real performance. Briefing in 24h.",
    keywords: [
      "web development",
      "website design",
      "premium website design",
      "landing pages",
      "premium websites",
      "e-commerce",
      "web systems",
      "front-end developer",
      "Next.js",
      "React Three Fiber",
      "interactive websites",
      "freelance web development",
      "Brasilia",
      "Distrito Federal",
    ],
    h1: "Premium website design with immersive experiences",
    h1Support:
      "High-impact design, clean code and memorable interactions. Landing pages, systems and web experiences that perform on mobile and impress on the first scroll.",
  },
};

/** Shared SEO/GEO copy used in metadata, social tags, and answer engines */
export function getSeoCopy(locale: Locale): SeoCopy {
  return seoCopyByLocale[locale];
}

/** PT default — kept for call sites not yet locale-aware (manifest, Hero bridge). */
export const seoCopy = getSeoCopy("pt");

type GeoDefinition = {
  term: string;
  question: string;
  definition: string;
};

const geoDefinitionsByLocale: Record<Locale, readonly GeoDefinition[]> = {
  pt: [
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
  ],
  en: [
    {
      term: "ARC WEB",
      question: "What is ARC WEB?",
      definition:
        "ARC WEB is a web development studio focused on premium websites, landing pages and custom systems. It combines immersive design, Next.js engineering and real performance — from briefing to deploy.",
    },
    {
      term: "premium website",
      question: "What is a premium website?",
      definition:
        "A premium website is a digital presence with intentional design, scalable code and performance metrics (Core Web Vitals). Not a generic template: an interface built for conversion, brand and a memorable experience.",
    },
    {
      term: "immersive web development",
      question: "What is immersive web development?",
      definition:
        "Immersive web development combines cinematic interfaces, micro-interactions and, when it makes sense, real-time 3D — without sacrificing speed, SEO or usability on real devices.",
    },
  ],
};

/**
 * Standalone definitions (25–60 words) for GEO / AI citation.
 * Each block answers a common query without needing page context.
 */
export function getGeoDefinitions(locale: Locale): readonly GeoDefinition[] {
  return geoDefinitionsByLocale[locale];
}

/** PT default — kept for About until sections go locale-aware. */
export const geoDefinitions = getGeoDefinitions("pt");

export function getLanguageAlternates(
  pathKey: "/" | "/privacidade" = "/"
): Record<string, string> {
  const site = getSiteUrl();
  if (pathKey === "/") {
    return {
      "pt-BR": `${site}/`,
      en: `${site}/en`,
      "x-default": `${site}/`,
    };
  }
  return {
    "pt-BR": `${site}/privacidade`,
    en: `${site}/en/privacy`,
    "x-default": `${site}/privacidade`,
  };
}

const jsonLdCopyByLocale: Record<
  Locale,
  {
    orgKnowsAbout: string[];
    personKnowsAbout: string[];
    serviceName: string;
    offerCatalogName: string;
    howtoName: string;
    howtoDescription: string;
    areaCountry: string;
    areaAdmin: string;
  }
> = {
  pt: {
    orgKnowsAbout: [
      "Desenvolvimento web",
      "Next.js",
      "Landing pages",
      "E-commerce",
      "Sistemas web",
      "React Three Fiber",
      "Design de interfaces",
      "SEO técnico",
    ],
    personKnowsAbout: [
      "Front-end",
      "Next.js",
      "TypeScript",
      "Three.js",
      "Interfaces imersivas",
    ],
    serviceName: "ARC WEB — Desenvolvimento de sites premium",
    offerCatalogName: "Serviços de desenvolvimento web ARC WEB",
    howtoName: "Como a ARC WEB entrega um projeto de site",
    howtoDescription:
      "Protocolo em quatro etapas: briefing, design, build e launch — do objetivo de negócio ao site no ar.",
    areaCountry: "Brasil",
    areaAdmin: "Distrito Federal",
  },
  en: {
    orgKnowsAbout: [
      "Web development",
      "Next.js",
      "Landing pages",
      "E-commerce",
      "Web systems",
      "React Three Fiber",
      "Interface design",
      "Technical SEO",
    ],
    personKnowsAbout: [
      "Front-end",
      "Next.js",
      "TypeScript",
      "Three.js",
      "Immersive interfaces",
    ],
    serviceName: "ARC WEB — Premium website development",
    offerCatalogName: "ARC WEB web development services",
    howtoName: "How ARC WEB delivers a website project",
    howtoDescription:
      "Four-step protocol: briefing, design, build and launch — from business goal to a live site.",
    areaCountry: "Brazil",
    areaAdmin: "Federal District",
  },
};

/**
 * JSON-LD graph for entity clarity (SEO + GEO / answer engines).
 * FAQPage still helps AEO even after Google limited FAQ rich results (2026).
 */
export function buildJsonLd(
  siteUrl: string = getSiteUrl(),
  locale: Locale = "pt"
) {
  const copy = getSeoCopy(locale);
  const content = getContent(locale);
  const labels = jsonLdCopyByLocale[locale];
  const language = htmlLang(locale);
  const pageUrl = locale === "en" ? `${siteUrl}/en` : siteUrl;

  const logoUrl = `${siteUrl}/icon.svg`;
  const imageUrl = `${siteUrl}/og-preview.png`;
  const orgId = `${siteUrl}/#organization`;
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const webpageId = `${pageUrl}/#webpage`;
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
        description: copy.description,
        knowsAbout: labels.orgKnowsAbout,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteContact.email,
            ...(telephone ? { telephone } : {}),
            availableLanguage: ["Portuguese", "English", "pt-BR", "en"],
            areaServed: "BR",
          },
        ],
      },
      {
        "@type": "Person",
        "@id": personId,
        name: content.aboutContent.name,
        jobTitle: content.aboutContent.role,
        url: siteUrl,
        image: `${siteUrl}${content.aboutContent.photo}`,
        worksFor: { "@id": orgId },
        sameAs,
        description: content.aboutContent.lead,
        knowsAbout: labels.personKnowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: pageUrl,
        name: "ARC WEB",
        alternateName: ["ARCWEB", "Arc Web"],
        description: copy.description,
        inLanguage: language,
        publisher: { "@id": orgId },
        copyrightHolder: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: pageUrl,
        name: copy.title,
        description: copy.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
        },
        inLanguage: language,
        dateModified: new Date().toISOString().slice(0, 10),
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: labels.serviceName,
        url: pageUrl,
        image: imageUrl,
        description: copy.description,
        // brand / parent org (schema.org ProfessionalService → Organization)
        brand: { "@id": orgId },
        founder: { "@id": personId },
        areaServed: [
          {
            "@type": "Country",
            name: labels.areaCountry,
          },
          {
            "@type": "AdministrativeArea",
            name: labels.areaAdmin,
          },
        ],
        priceRange: "$$",
        ...(telephone ? { telephone } : {}),
        email: siteContact.email,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: labels.offerCatalogName,
          itemListElement: content.services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: `${pageUrl}/#services`,
              provider: { "@id": orgId },
            },
          })),
        },
      },
      {
        "@type": "HowTo",
        "@id": howtoId,
        name: labels.howtoName,
        description: labels.howtoDescription,
        totalTime: "P21D",
        step: content.processSteps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.description,
          url: `${pageUrl}/#process`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: content.faqItems.map((item) => ({
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
