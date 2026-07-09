"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Rocket } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import HudCard from "@/components/ui/HudCard";
import { missions } from "@/lib/data";

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
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
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          label="Mission Log"
          title="Registro de Missões"
          subtitle="Projetos reais e prototipos de alta fidelidade. Cada marca representa uma evolução do sistema."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {missions.map((mission) => (
            <motion.div key={mission.id} variants={itemVariants}>
              <HudCard scanline className="h-full p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="inline-flex items-center gap-2 rounded-sm bg-hud-cyan/5 px-2 py-1 font-orbitron text-[10px] uppercase tracking-wider text-hud-cyan border border-hud-cyan/10">
                    <Rocket className="h-3 w-3" />
                    {mission.mark}
                  </div>
                  <span
                    className={`rounded-sm px-2 py-1 font-rajdhani text-[10px] uppercase tracking-wider border ${
                      mission.status === "DEPLOYED"
                        ? "border-hud-cyan/30 text-hud-cyan bg-hud-cyan/5"
                        : mission.status === "IN DEVELOPMENT"
                        ? "border-titan-gold/30 text-titan-gold bg-titan-gold/5"
                        : "border-arc-blue/20 text-arc-blue/60 bg-arc-blue/5"
                    }`}
                  >
                    {mission.status}
                  </span>
                </div>

                <h3 className="font-orbitron text-lg font-semibold text-titan-gold">
                  {mission.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-arc-blue/50">
                  {mission.type}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-arc-blue/70">
                  {mission.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs text-arc-blue/40">
                  <span className="h-[1px] flex-1 bg-hud-cyan/10" />
                  <span>CLASSIFIED // EYES ONLY</span>
                  <span className="h-[1px] flex-1 bg-hud-cyan/10" />
                </div>
              </HudCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
