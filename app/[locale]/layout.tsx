import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import HUDOverlay from "@/components/layout/HUDOverlay";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CinematicAtmosphere from "@/components/layout/CinematicAtmosphere";
import JsonLd from "@/components/seo/JsonLd";
import Analytics, { GtmNoscript } from "@/components/seo/Analytics";
import {
  getLanguageAlternates,
  getSeoCopy,
  getSiteUrl,
  htmlLang,
} from "@/lib/seo";
import { isLocale, locales, type Locale } from "@/i18n/routing";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0e14" },
    { media: "(prefers-color-scheme: light)", color: "#0a0e14" },
  ],
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : "pt";
  const copy = getSeoCopy(locale);
  const siteUrl = getSiteUrl();
  const canonical = locale === "en" ? "/en" : "/";
  const ogLocale = locale === "pt" ? "pt_BR" : "en_US";
  const ogAlt =
    locale === "pt"
      ? "ARC WEB — Criação de sites premium e experiências web"
      : "ARC WEB — Premium website design & immersive web experiences";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: copy.title,
      template: "%s | ARC WEB",
    },
    description: copy.description,
    applicationName: "ARC WEB",
    keywords: [...copy.keywords],
    authors: [{ name: "Gabriel Almeida", url: siteUrl }],
    creator: "Gabriel Almeida",
    publisher: "ARC WEB",
    category: "technology",
    classification: "Web Design & Development",
    alternates: {
      canonical,
      languages: getLanguageAlternates("/"),
      types: {
        "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: canonical,
      siteName: "ARC WEB",
      title: copy.title,
      description: copy.socialDescription,
      images: [
        {
          url: "/og-preview.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.socialDescription,
      images: ["/og-preview.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    },
    other: {
      "geo.region": "BR-DF",
      "geo.placename": "Brasília",
      ICBM: "-15.793889, -47.882778",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale: raw } = params;

  if (!isLocale(raw)) {
    notFound();
  }

  const locale: Locale = raw;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={htmlLang(locale)}
      className={`${orbitron.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-carbon font-rajdhani text-arc-blue">
        <NextIntlClientProvider messages={messages}>
          {/* GTM noscript — first child of body (Google recommendation) */}
          <GtmNoscript />
          <JsonLd locale={locale} />

          {/* background grid */}
          <div
            className="fixed inset-0 -z-10 bg-hud-grid"
            aria-hidden="true"
          />

          {/* scanlines overlay */}
          <div
            className="fixed inset-0 -z-10 scanlines pointer-events-none"
            aria-hidden="true"
          />

          {/* vignette */}
          <div
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, rgba(10,14,20,0.4) 60%, rgba(10,14,20,0.95) 100%)",
            }}
            aria-hidden="true"
          />

          {/* top header readability fade */}
          <div
            className="fixed inset-x-0 top-0 z-30 h-32 pointer-events-none header-fade"
            aria-hidden="true"
          />

          {/* circuits + code streams on edges (non-interactive) */}
          <CinematicAtmosphere />

          <HUDOverlay />
          <Navbar />

          <main className="relative z-10 pt-20">{children}</main>

          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
