"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Scene from "@/components/three/Scene";
import HudButton from "@/components/ui/HudButton";

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

      {/* vignette overlay for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(10,14,20,0.2) 0%, rgba(10,14,20,0.6) 50%, rgba(10,14,20,0.95) 100%)",
        }}
      />

      {/* content */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="font-orbitron text-4xl font-bold leading-tight text-titan-gold text-glow-gold md:text-6xl lg:text-7xl"
        >
          Construo sites que parecem tecnologia do futuro
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl font-rajdhani text-lg text-arc-blue/80 md:text-xl"
        >
          Design imersivo. Interações vivas. Tecnologia de ponta.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <HudButton onClick={scrollToContact}>Establish Uplink</HudButton>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-xs text-arc-blue/40"
        >
          Clique no reactor para power-up
        </motion.p>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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
