"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Rocket, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import HudCard from "@/components/ui/HudCard";
import { featuredMission, missions } from "@/lib/data";
import { playHud } from "@/lib/audio";

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

  const statusClass = (status: string) => {
    if (status === "LIVE")
      return "border-emerald-400/35 text-emerald-300/90 bg-emerald-400/10";
    if (status === "PROTOTYPE")
      return "border-hud-cyan/30 text-hud-cyan bg-hud-cyan/5";
    if (status === "IN ASSEMBLY")
      return "border-titan-gold/30 text-titan-gold bg-titan-gold/5";
    return "border-arc-blue/25 text-arc-blue/70 bg-arc-blue/5";
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
          title="Missões e prova de craft"
          subtitle="O case CORE é este site — ao vivo. Abaixo, protótipos de alta fidelidade que mostram o repertório. O seu projeto pode ser a próxima missão."
        />

        {/* Featured: ARC WEB live case */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65 }}
          className="mb-10"
          onMouseEnter={() => playHud("hover")}
        >
          <HudCard
            scanline
            className="relative overflow-hidden p-6 md:p-8"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-hud-cyan/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-12 left-1/3 h-32 w-32 rounded-full bg-titan-gold/10 blur-3xl"
              aria-hidden
            />

            <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-sm border border-hud-cyan/25 bg-hud-cyan/10 px-2.5 py-1 font-orbitron text-[10px] uppercase tracking-wider text-hud-cyan">
                    <Sparkles className="h-3 w-3" />
                    {featuredMission.mark}
                  </div>
                  <span
                    className={`rounded-sm border px-2 py-1 font-rajdhani text-[10px] uppercase tracking-wider ${statusClass(
                      featuredMission.status
                    )}`}
                  >
                    {featuredMission.status}
                  </span>
                  <span className="rounded-sm border border-titan-gold/25 bg-titan-gold/10 px-2 py-1 font-rajdhani text-[10px] uppercase tracking-wider text-titan-gold/90">
                    Case em produção
                  </span>
                </div>

                <h3 className="font-orbitron text-2xl font-semibold text-chrome md:text-3xl">
                  {featuredMission.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-hud-cyan/70">
                  {featuredMission.type}
                </p>
                <p className="mt-4 max-w-2xl font-rajdhani text-base leading-relaxed text-arc-blue/75">
                  {featuredMission.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {featuredMission.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-hud-cyan/20 bg-hud-cyan/5 px-2.5 py-0.5 font-rajdhani text-[11px] uppercase tracking-wider text-hud-cyan/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 md:items-end md:pt-2">
                <p className="max-w-[14rem] font-rajdhani text-xs leading-relaxed text-arc-blue/45 md:text-right">
                  Você já está dentro do case. Cada scroll é entrega real.
                </p>
                <a
                  href={featuredMission.href ?? "#hero"}
                  onClick={(e) => {
                    e.preventDefault();
                    playHud("click");
                    document
                      .querySelector(featuredMission.href ?? "#hero")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 border border-hud-cyan/35 bg-hud-cyan/10 px-4 py-2.5 font-orbitron text-[11px] uppercase tracking-[0.16em] text-hud-cyan transition-all hover:border-hud-cyan/60 hover:bg-hud-cyan/15 hover:shadow-[0_0_16px_rgba(0,212,255,0.15)]"
                >
                  Explorar o site
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </HudCard>
        </motion.div>

        <p className="mb-6 font-rajdhani text-xs uppercase tracking-[0.22em] text-arc-blue/40">
          Conceitos de missão · não são claims de clientes
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {missions.map((mission) => (
            <motion.div
              key={mission.id}
              variants={itemVariants}
              onMouseEnter={() => playHud("hover")}
            >
              <HudCard scanline className="h-full p-6">
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div className="inline-flex items-center gap-2 rounded-sm border border-hud-cyan/10 bg-hud-cyan/5 px-2 py-1 font-orbitron text-[10px] uppercase tracking-wider text-hud-cyan">
                    <Rocket className="h-3 w-3" />
                    {mission.mark}
                  </div>
                  <span
                    className={`rounded-sm border px-2 py-1 font-rajdhani text-[10px] uppercase tracking-wider ${statusClass(
                      mission.status
                    )}`}
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

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {mission.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-hud-cyan/15 bg-hud-cyan/5 px-2 py-0.5 font-rajdhani text-[10px] uppercase tracking-wider text-hud-cyan/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-arc-blue/40">
                  <span className="h-[1px] flex-1 bg-hud-cyan/10" />
                  <span>CONCEPT // NOT A CLIENT CLAIM</span>
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
