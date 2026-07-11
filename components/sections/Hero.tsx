"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import HudButton from "@/components/ui/HudButton";
import ClientErrorBoundary from "@/components/ui/ClientErrorBoundary";
import { playHud } from "@/lib/audio";
import {
  defaultWhatsappMessage,
  whatsappUrl,
} from "@/lib/data";
import {
  pulseReactor,
  subscribeReactorPulse,
  subscribeReactorStatus,
  type ReactorSiteStatus,
} from "@/lib/reactor-bus";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => null,
});

const STATUS_LABEL: Record<ReactorSiteStatus, string> = {
  online: "Core online",
  overdrive: "Core overdrive",
  assembled: "Sistema montado",
  uplink: "Canal aberto",
};

export default function Hero() {
  const [powerUp, setPowerUp] = useState(false);
  const [panelPulse, setPanelPulse] = useState(false);
  const [status, setStatus] = useState<ReactorSiteStatus>("online");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const unsubPulse = subscribeReactorPulse((kind) => {
      setPowerUp(true);
      setPanelPulse(true);
      const hold = kind === "transmit" ? 2200 : kind === "assemble" ? 1400 : 900;
      window.setTimeout(() => setPowerUp(false), Math.min(hold, 1000));
      window.setTimeout(() => setPanelPulse(false), hold);
    });
    const unsubStatus = subscribeReactorStatus(setStatus);
    return () => {
      unsubPulse();
      unsubStatus();
    };
  }, []);

  const handlePowerUp = () => {
    playHud("power");
    pulseReactor("power");
  };

  const scrollToContact = () => {
    playHud("click");
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProcess = () => {
    playHud("click");
    document.querySelector("#process")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWork = () => {
    playHud("click");
    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.8, delay: 0.4 },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      {/* Reactor as discreet full-bleed backdrop */}
      <div
        className="absolute inset-0 z-0 opacity-[0.4] sm:opacity-[0.45]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 scale-110 sm:translate-x-[14%] sm:scale-100 lg:translate-x-[20%]">
          <ClientErrorBoundary name="HeroScene" fallback={null}>
            <Scene
              variant="background"
              powerUp={powerUp}
              onPowerUp={handlePowerUp}
              className="h-full w-full"
            />
          </ClientErrorBoundary>
        </div>
      </div>

      {/* Readability scrim — stronger on the left only, keep reactor clear on the right */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(90deg,
              rgba(10,14,20,0.94) 0%,
              rgba(10,14,20,0.82) 32%,
              rgba(10,14,20,0.28) 58%,
              rgba(10,14,20,0.2) 78%,
              rgba(10,14,20,0.45) 100%),
            radial-gradient(ellipse 50% 55% at 70% 48%,
              rgba(0,180,255,0.05) 0%,
              transparent 60%),
            linear-gradient(to top, rgba(10,14,20,0.7) 0%, transparent 26%)
          `,
        }}
      />

      {/* Labels floating around the reactor (right half) — no card covering it */}
      <motion.div
        variants={labelVariants}
        initial="hidden"
        animate="visible"
        className="pointer-events-none absolute inset-0 z-[2] hidden md:block"
        aria-hidden="true"
      >
        {/* Top-right of reactor zone */}
        <div className="absolute right-[7%] top-[20%] max-w-[14rem] text-right lg:right-[11%] lg:top-[18%]">
          <p className="font-orbitron text-[11px] uppercase tracking-[0.26em] text-hud-cyan/70 drop-shadow-[0_1px_8px_rgba(10,14,20,0.9)]">
            Protótipo vivo
          </p>
          <p
            className={`mt-1.5 inline-flex items-center gap-2 font-orbitron text-xs uppercase tracking-[0.14em] text-hud-cyan drop-shadow-[0_1px_10px_rgba(10,14,20,0.95)] sm:text-sm ${
              panelPulse ? "drop-shadow-[0_0_12px_rgba(77,184,255,0.55)]" : ""
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full bg-hud-cyan shadow-[0_0_8px_rgba(77,184,255,0.7)] ${
                panelPulse ? "animate-pulse shadow-[0_0_12px_#4db8ff]" : ""
              }`}
            />
            {STATUS_LABEL[status]}
          </p>
        </div>

        {/* Mid-right */}
        <div className="absolute right-[4%] top-[46%] max-w-[11rem] text-right lg:right-[7%]">
          <p className="font-rajdhani text-xs uppercase tracking-[0.22em] text-arc-blue/55 drop-shadow-[0_1px_8px_rgba(10,14,20,0.9)]">
            Stack
          </p>
          <p className="mt-1 font-orbitron text-sm tracking-wide text-arc-blue/85 drop-shadow-[0_1px_10px_rgba(10,14,20,0.95)] sm:text-base">
            Next · R3F
          </p>
        </div>

        {/* Lower-right */}
        <div className="absolute bottom-[27%] right-[9%] max-w-[12rem] text-right lg:bottom-[25%] lg:right-[12%]">
          <p className="font-rajdhani text-xs uppercase tracking-[0.22em] text-arc-blue/55 drop-shadow-[0_1px_8px_rgba(10,14,20,0.9)]">
            Papel
          </p>
          <p className="mt-1 font-orbitron text-sm tracking-wide text-arc-blue/85 drop-shadow-[0_1px_10px_rgba(10,14,20,0.95)] sm:text-base">
            Ambiente vivo
          </p>
        </div>

        {/* Lower-center near core */}
        <div className="absolute bottom-[16%] left-[50%] max-w-[14rem] lg:left-[54%]">
          <p className="font-rajdhani text-xs leading-relaxed text-arc-blue/55 drop-shadow-[0_1px_8px_rgba(10,14,20,0.9)] sm:text-sm">
            Clique no núcleo para power-up
          </p>
          <button
            type="button"
            onClick={scrollToProcess}
            className="pointer-events-auto mt-2.5 inline-flex items-center gap-1.5 font-orbitron text-[11px] uppercase tracking-[0.16em] text-hud-cyan/85 transition-colors hover:text-hud-cyan drop-shadow-[0_1px_8px_rgba(10,14,20,0.9)]"
          >
            Ver processo
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Thin orbital frame marks around reactor zone */}
        <span className="absolute right-[18%] top-[30%] h-5 w-5 border-l border-t border-hud-cyan/25 lg:right-[22%]" />
        <span className="absolute bottom-[32%] right-[16%] h-5 w-5 border-b border-r border-hud-cyan/25 lg:right-[20%]" />
      </motion.div>

      {/* Mobile-only compact status */}
      <div className="pointer-events-none absolute bottom-20 right-6 z-[2] text-right md:hidden">
        <p className="inline-flex items-center gap-2 font-orbitron text-[11px] uppercase tracking-wider text-hud-cyan/85 drop-shadow-[0_1px_8px_rgba(10,14,20,0.95)]">
          <span className="h-2 w-2 rounded-full bg-hud-cyan shadow-[0_0_8px_rgba(77,184,255,0.7)]" />
          {STATUS_LABEL[status]}
        </p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex max-w-xl flex-col items-start"
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-sm border border-hud-cyan/15 bg-carbon/40 px-3 py-1 backdrop-blur-sm"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                panelPulse
                  ? "bg-hud-cyan shadow-[0_0_12px_rgba(0,212,255,0.9)]"
                  : "bg-hud-cyan/80"
              }`}
            />
            <span className="font-rajdhani text-[11px] uppercase tracking-[0.28em] text-hud-cyan/70">
              ARC WEB · Sites premium
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-orbitron text-3xl font-semibold leading-[1.15] tracking-tight text-chrome sm:text-4xl lg:text-[2.75rem]"
          >
            Construo sites que parecem tecnologia do futuro
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 font-rajdhani text-base leading-relaxed text-arc-blue/70 sm:text-lg"
          >
            Design imersivo, código limpo e interações memoráveis. O brilho ao
            fundo é o mesmo cuidado técnico que levo para o seu projeto —
            presente, sem roubar a cena.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <HudButton onClick={scrollToContact}>Iniciar projeto</HudButton>
            {whatsappUrl(defaultWhatsappMessage) ? (
              <HudButton
                variant="secondary"
                href={whatsappUrl(defaultWhatsappMessage)!}
                target="_blank"
                onClick={() => playHud("click")}
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </span>
              </HudButton>
            ) : (
              <button
                type="button"
                onClick={scrollToWork}
                className="inline-flex items-center gap-2 border border-transparent px-4 py-3 font-orbitron text-xs uppercase tracking-[0.16em] text-arc-blue/55 transition-colors hover:text-hud-cyan"
              >
                Ver trabalhos
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-rajdhani text-xs uppercase tracking-[0.18em] text-arc-blue/40"
          >
            <li>Landing pages</li>
            <li className="text-hud-cyan/25">·</li>
            <li>Sistemas web</li>
            <li className="text-hud-cyan/25">·</li>
            <li>Experiências 3D</li>
          </motion.ul>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div className="flex flex-col items-center gap-1.5 text-arc-blue/35">
          <span className="font-rajdhani text-[10px] uppercase tracking-[0.28em]">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </motion.div>
    </section>
  );
}
