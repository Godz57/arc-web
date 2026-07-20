import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  getLanguageAlternates,
  getSiteUrl,
} from "@/lib/seo";
import { getContent } from "@/lib/content";
import { siteContact } from "@/lib/data";
import { isLocale, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : "pt";
  const privacy = getContent(locale).privacy;
  const canonical = locale === "en" ? "/en/privacy" : "/privacidade";

  return {
    title: privacy.metaTitle,
    description: privacy.metaDescription,
    alternates: {
      canonical,
      languages: getLanguageAlternates("/privacidade"),
    },
    openGraph: {
      title: `${privacy.metaTitle} | ARC WEB`,
      description: privacy.metaDescription,
      url: canonical,
    },
  };
}

/** Replace {{email}} / {{siteHost}} / {{siteUrl}} with linked nodes */
function renderRichParagraph(
  text: string,
  vars: { email: string; siteUrl: string; siteHost: string }
) {
  const tokenRe = /(\{\{email\}\}|\{\{siteHost\}\}|\{\{siteUrl\}\})/g;
  const parts = text.split(tokenRe);

  return parts.map((part, i) => {
    if (part === "{{email}}") {
      return (
        <a
          key={i}
          href={`mailto:${vars.email}`}
          className="text-hud-cyan underline-offset-2 hover:underline"
        >
          {vars.email}
        </a>
      );
    }
    if (part === "{{siteHost}}" || part === "{{siteUrl}}") {
      return (
        <a
          key={i}
          href={vars.siteUrl}
          className="text-hud-cyan underline-offset-2 hover:underline"
        >
          {part === "{{siteHost}}" ? vars.siteHost : vars.siteUrl}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function SectionBody({
  paragraphs,
  vars,
}: {
  paragraphs: string[];
  vars: { email: string; siteUrl: string; siteHost: string };
}) {
  const nodes: ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = (keyBase: number) => {
    if (bulletBuffer.length === 0) return;
    nodes.push(
      <ul key={`ul-${keyBase}`} className="list-disc space-y-2 pl-5">
        {bulletBuffer.map((item, j) => (
          <li key={j}>{renderRichParagraph(item, vars)}</li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  paragraphs.forEach((p, i) => {
    if (p.startsWith("• ")) {
      bulletBuffer.push(p.slice(2));
      return;
    }
    flushBullets(i);
    nodes.push(
      <p key={`p-${i}`}>{renderRichParagraph(p, vars)}</p>
    );
  });
  flushBullets(paragraphs.length);

  return <div className="space-y-3">{nodes}</div>;
}

export default async function PrivacidadePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "pt";
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Privacy" });
  const privacy = getContent(locale).privacy;
  const siteUrl = getSiteUrl();
  const siteHost = siteUrl.replace(/^https?:\/\//, "");
  const vars = {
    email: siteContact.email,
    siteUrl,
    siteHost,
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="font-orbitron text-[10px] uppercase tracking-[0.28em] text-hud-cyan/70">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 font-orbitron text-3xl font-bold text-chrome text-glow-chrome md:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 font-rajdhani text-sm text-arc-blue/50">
        {t("updatedPrefix")} {privacy.updated}
      </p>

      <div className="mt-10 space-y-8 font-rajdhani text-base leading-relaxed text-arc-blue/75">
        {privacy.sections.map((section) => (
          <section key={section.id} className="space-y-3">
            <h2 className="font-orbitron text-lg font-semibold text-chrome">
              {section.title}
            </h2>
            <SectionBody paragraphs={section.paragraphs} vars={vars} />
          </section>
        ))}
      </div>

      <p className="mt-14 border-t border-hud-cyan/10 pt-8 font-rajdhani text-sm text-arc-blue/45">
        <a
          href={locale === "en" ? "/en#contact" : "/#contact"}
          className="text-hud-cyan transition-colors hover:text-chrome"
        >
          {t("backToContact")}
        </a>
      </p>
    </article>
  );
}
