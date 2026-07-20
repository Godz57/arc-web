"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import HudCard from "@/components/ui/HudCard";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { getContent } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { playHud } from "@/lib/audio";

export default function Services() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Sections");
  const { services } = getContent(locale);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" },
    },
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          label={t("servicesEyebrow")}
          title={t("servicesTitle")}
          subtitle={t("servicesSubtitle")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onMouseEnter={() => playHud("hover")}
            >
              <HudCard className="group h-full p-5 sm:p-6">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <ServiceIcon variant={service.mesh} />
                  <span className="font-orbitron text-[9px] uppercase tracking-[0.2em] text-arc-blue/30 transition-colors group-hover:text-hud-cyan/50">
                    MOD
                  </span>
                </div>

                <h3 className="font-orbitron text-base font-semibold tracking-wide text-chrome sm:text-lg">
                  {service.title}
                </h3>
                <p className="mt-2.5 font-rajdhani text-sm leading-relaxed text-arc-blue/60">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-hud-cyan/10 pt-4">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 font-rajdhani text-sm text-arc-blue/70"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-hud-cyan/60"
                        strokeWidth={2}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </HudCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
