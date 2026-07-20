"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Gauge, Zap, Layers } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import HudCard from "@/components/ui/HudCard";
import { getContent } from "@/lib/content";
import type { PrincipleIconId } from "@/lib/content/types";
import type { Locale } from "@/i18n/routing";
import { playHud } from "@/lib/audio";

const ICONS = { gauge: Gauge, zap: Zap, layers: Layers } as const;

/** Design principles (honest conceptual content — no fake testimonials) */
export default function Testimonials() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Sections");
  const { principles } = getContent(locale);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="principles"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          label={t("principlesEyebrow")}
          title={t("principlesTitle")}
          subtitle={t("principlesSubtitle")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {principles.map((principle) => {
            const iconId = principle.icon as PrincipleIconId;
            const Icon = ICONS[iconId] ?? Gauge;
            return (
              <motion.div
                key={principle.id}
                variants={itemVariants}
                onMouseEnter={() => playHud("hover")}
              >
                <HudCard tilt={false} className="h-full p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="inline-flex rounded-sm border border-hud-cyan/20 bg-hud-cyan/5 p-2.5 text-hud-cyan">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-rajdhani text-[10px] uppercase tracking-widest text-arc-blue/40">
                      {principle.code}
                    </span>
                  </div>

                  <h3 className="font-orbitron text-lg font-semibold text-titan-gold">
                    {principle.title}
                  </h3>
                  <p className="mt-3 font-rajdhani text-base leading-relaxed text-arc-blue/80">
                    {principle.description}
                  </p>

                  <div className="mt-6 border-t border-hud-cyan/10 pt-4">
                    <p className="font-rajdhani text-[10px] uppercase tracking-[0.2em] text-hud-cyan/50">
                      ARC PROTOCOL · ACTIVE
                    </p>
                  </div>
                </HudCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
