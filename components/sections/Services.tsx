"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import HudCard from "@/components/ui/HudCard";
import { services } from "@/lib/data";

export default function Services() {
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
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          label="Capabilities"
          title="Módulos Holográficos"
          subtitle="Cada serviço é uma peça da armadura, calibrada para resolver um desafio real do seu negócio."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <HudCard className="h-full p-6">
                  <div className="mb-5 inline-flex rounded-sm border border-hud-cyan/20 bg-hud-cyan/5 p-3 text-hud-cyan shadow-[0_0_12px_rgba(0,212,255,0.1)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-orbitron text-lg font-semibold text-titan-gold">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-arc-blue/70">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-arc-blue/80"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-hud-cyan/70" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </HudCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
