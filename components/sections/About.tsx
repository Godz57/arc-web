"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion, motion } from "framer-motion";
import { Code2, Palette, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import { getContent } from "@/lib/content";
import { getGeoDefinitions } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

const pillarIcons = {
  craft: Palette,
  engineering: Code2,
  experience: Sparkles,
} as const;

export default function About() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Sections");
  const content = getContent(locale);
  const { aboutContent, aboutPillars, stackTags } = content;
  const geoDefinitions = getGeoDefinitions(locale);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (shouldReduceMotion) return;

        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          ".about-pillar",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about-pillars",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] }
  );

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={t("aboutEyebrow")}
          title={t("aboutTitle")}
          subtitle={t("aboutSubtitle")}
        />

        <div
          ref={contentRef}
          className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
          style={{ opacity: shouldReduceMotion ? 1 : undefined }}
        >
          {/* Identity + narrative */}
          <div className="glass-panel relative overflow-hidden rounded-sm border border-hud-cyan/10 p-6 sm:p-8">
            <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-hud-cyan/25" />
            <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-hud-cyan/25" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-hud-cyan/25" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-hud-cyan/25" />

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <div className="relative h-[88px] w-[88px] shrink-0">
                {/* Social-style profile ring */}
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-hud-cyan/50 via-titan-gold/30 to-hud-cyan/20 p-[2px] shadow-[0_0_20px_rgba(0,212,255,0.25)]"
                  aria-hidden
                />
                <div className="absolute inset-[3px] overflow-hidden rounded-full border border-carbon/80 bg-carbon ring-2 ring-hud-cyan/15">
                  <Image
                    src={aboutContent.photo}
                    alt={t("aboutPhotoAlt", { name: aboutContent.name })}
                    width={168}
                    height={168}
                    className="h-full w-full object-cover object-center"
                    priority
                  />
                </div>
              </div>
              <div>
                <p className="font-orbitron text-[10px] uppercase tracking-[0.25em] text-hud-cyan/55">
                  {t("aboutFounder")}
                </p>
                <h3 className="mt-1 font-orbitron text-2xl font-semibold text-chrome">
                  {aboutContent.name}
                </h3>
                <p className="mt-1 font-rajdhani text-sm text-arc-blue/55">
                  {aboutContent.role}
                </p>
              </div>
            </div>

            <p className="mt-6 font-rajdhani text-base leading-relaxed text-arc-blue/75 sm:text-lg">
              {aboutContent.lead}
            </p>
            <p className="mt-4 font-rajdhani text-sm leading-relaxed text-arc-blue/55 sm:text-base">
              {aboutContent.body}
            </p>

            {/* GEO: standalone answer blocks for AI / organic extractability */}
            <div className="mt-8 space-y-4 border-t border-hud-cyan/10 pt-6">
              <p className="font-orbitron text-[10px] uppercase tracking-[0.22em] text-arc-blue/40">
                {t("aboutDefinitions")}
              </p>
              {geoDefinitions.map((item) => (
                <article key={item.term} className="space-y-1.5">
                  <h4 className="font-orbitron text-xs font-semibold tracking-wide text-chrome/90 sm:text-sm">
                    {item.question}
                  </h4>
                  <p className="font-rajdhani text-sm leading-relaxed text-arc-blue/65">
                    {item.definition}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 border-t border-hud-cyan/10 pt-6">
              <p className="mb-3 font-orbitron text-[10px] uppercase tracking-[0.22em] text-arc-blue/40">
                {t("aboutStack")}
              </p>
              <div className="flex flex-wrap gap-2">
                {stackTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-hud-cyan/12 bg-hud-cyan/[0.04] px-2.5 py-1 font-rajdhani text-xs tracking-wide text-arc-blue/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pillars — what you buy */}
          <div className="about-pillars space-y-4">
            {aboutPillars.map((pillar) => {
              const Icon =
                pillarIcons[pillar.id as keyof typeof pillarIcons] ?? Code2;
              return (
                <article
                  key={pillar.id}
                  className="about-pillar group glass-panel rounded-sm border border-hud-cyan/10 p-5 transition-colors hover:border-hud-cyan/20"
                  style={{ opacity: shouldReduceMotion ? 1 : undefined }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-hud-cyan/15 bg-hud-cyan/5 text-hud-cyan/80 transition-colors group-hover:border-hud-cyan/30 group-hover:text-hud-cyan">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-orbitron text-sm font-semibold tracking-wide text-chrome">
                        {pillar.title}
                      </h4>
                      <p className="mt-2 font-rajdhani text-sm leading-relaxed text-arc-blue/60">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-2 font-rajdhani text-xs leading-relaxed text-arc-blue/40"
            >
              {t("aboutHonesty")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
