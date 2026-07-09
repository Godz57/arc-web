"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HudButton from "@/components/ui/HudButton";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <div className="h-32 w-32 rounded-full bg-hud-cyan/10 shadow-[0_0_60px_rgba(0,212,255,0.15)]" />
    </div>
  ),
});

export default function Hero() {
  const [powerUp, setPowerUp] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handlePowerUp = () => {
    setPowerUp(true);
    setTimeout(() => setPowerUp(false), 600);
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const diagnostics = [
    { label: "POWER CORE", value: "ONLINE", ok: true },
    { label: "OUTPUT", value: "8.0 GJ/s", ok: true },
    { label: "REPULSORS", value: "STANDBY", ok: false },
    { label: "TEMP", value: "42°C", ok: true },
  ];
  const metrics = [
    { label: "DESIGN", pct: 99 },
    { label: "BUILD", pct: 97 },
    { label: "DEPLOY", pct: 95 },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D reactor background */}
      <div
        className="absolute inset-0 z-0 cursor-crosshair"
        onClick={handlePowerUp}
        aria-label="Arc reactor 3D interativo"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handlePowerUp();
        }}
      >
        <Scene powerUp={powerUp} className="h-full w-full" />
      </div>

      {/* vignette overlay — stronger on sides so side panels pop */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(10,14,20,0.85) 0%, rgba(10,14,20,0.15) 22%, rgba(10,14,20,0.15) 78%, rgba(10,14,20,0.85) 100%), radial-gradient(circle at center, rgba(10,14,20,0.05) 0%, rgba(10,14,20,0.5) 60%, rgba(10,14,20,0.9) 100%)",
        }}
      />

      {/* JARVIS-style layout: HUD left | reactor center (free) | HUD right */}
      <div className="relative z-10 grid w-full min-h-screen grid-cols-1 items-stretch gap-4 px-4 py-24 md:grid-cols-[1fr_minmax(320px,2fr)_1fr] md:px-8 md:py-16">

        {/* LEFT — diagnostics / terminal */}
        <motion.aside
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden flex-col justify-center gap-3 md:flex"
          aria-hidden="true"
        >
          <motion.div variants={itemVariants} className="glass-panel scanlines relative px-4 py-3">
            <div className="flex items-center gap-2 border-b border-hud-cyan/20 pb-2">
              <span className="h-1.5 w-1.5 animate-pulse bg-titan-gold shadow-[0_0_6px_#b91c1c]" />
              <span className="font-orbitron text-[10px] uppercase tracking-[0.25em] text-hud-cyan/80">
                System Diagnostics
              </span>
            </div>
            <ul className="mt-2 space-y-1.5 font-rajdhani text-sm">
              {diagnostics.map((d) => (
                <motion.li key={d.label} variants={itemVariants} className="flex items-center justify-between gap-3">
                  <span className="text-arc-blue/50 text-[11px] uppercase tracking-wider">{d.label}</span>
                  <span className={d.ok ? "text-hud-cyan/90" : "text-titan-gold/90"}>
                    {d.value}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel relative px-4 py-3">
            <span className="font-orbitron text-[10px] uppercase tracking-[0.25em] text-hud-cyan/80">
              Performance Metrics
            </span>
            <ul className="mt-2 space-y-2 font-rajdhani text-xs text-arc-blue/70">
              {metrics.map((m) => (
                <li key={m.label}>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-wider">{m.label}</span>
                    <span className="text-hud-cyan/70">{m.pct}%</span>
                  </div>
                  <div className="mt-1 h-[3px] w-full overflow-hidden bg-hud-cyan/10">
                    <motion.div
                      className="h-full bg-hud-cyan/70 shadow-[0_0_6px_rgba(77,184,255,0.6)]"
                      initial={{ width: 0 }}
                      animate={{ width: shouldReduceMotion ? `${m.pct}%` : `${m.pct}%` }}
                      transition={{ delay: 1, duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.aside>

        {/* CENTER — reactor only (free for 3D, no text on top) */}
        <div className="pointer-events-none relative col-span-1 md:col-start-2 md:col-end-3" aria-hidden="true" />

        {/* RIGHT — identity + CTA (replaces centered title) */}
        <motion.aside
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start justify-center gap-4"
        >
          <motion.span
            variants={itemVariants}
            className="font-rajdhani text-[11px] uppercase tracking-[0.4em] text-hud-cyan/60"
          >
            ARC WEB // FREELANCE DEV
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-orbitron text-3xl font-bold leading-tight text-chrome text-glow-chrome md:text-5xl"
          >
            Construo sites que parecem tecnologia do futuro
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-sm font-rajdhani text-lg text-arc-blue/80"
          >
            Design imersivo. Interações vivas. Tecnologia de ponta.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start gap-3 sm:flex-row"
          >
            <HudButton onClick={scrollToContact}>Establish Uplink</HudButton>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xs text-arc-blue/40"
          >
            Clique no reactor para power-up
          </motion.p>
        </motion.aside>
      </div>

      {/* scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <div className="flex flex-col items-center gap-2 text-arc-blue/50">
          <span className="font-rajdhani text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </motion.div>
    </section>
  );
}
