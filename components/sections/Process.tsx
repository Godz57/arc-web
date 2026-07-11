"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ModuleDock, { moduleStatus } from "@/components/sections/ModuleDock";
import { processSteps } from "@/lib/data";
import { markReactorAssembled } from "@/lib/reactor-bus";
import { playHud } from "@/lib/audio";

const MODULE_META = [
  { code: "01", label: "BRIEFING", short: "OBJETIVOS" },
  { code: "02", label: "DESIGN", short: "INTERFACE" },
  { code: "03", label: "BUILD", short: "CÓDIGO" },
  { code: "04", label: "LAUNCH", short: "DEPLOY" },
] as const;

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [assemblyProgress, setAssemblyProgress] = useState(
    shouldReduceMotion ? 1 : 0
  );

  const modules = useMemo(
    () =>
      processSteps.map((step, i) => ({
        code: MODULE_META[i]?.code ?? String(i + 1).padStart(2, "0"),
        label: (MODULE_META[i]?.label ?? step.title).toUpperCase(),
        short: MODULE_META[i]?.short ?? step.title,
        description: step.title,
      })),
    []
  );

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (shouldReduceMotion) {
          setAssemblyProgress(1);
          return;
        }

        gsap.fromTo(
          ".process-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          }
        );

        gsap.fromTo(
          ".process-step",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 0.2,
          onUpdate: (self) => {
            setAssemblyProgress(self.progress);
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] }
  );

  const activePiece = Math.min(
    processSteps.length - 1,
    Math.floor(assemblyProgress * processSteps.length)
  );
  const allLocked = assemblyProgress > 0.55;

  useEffect(() => {
    if (!allLocked) return;
    if (markReactorAssembled()) {
      playHud("power");
    }
  }, [allLocked]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label="Processo"
          title="Protocolo de Montagem"
          subtitle="Quatro etapas claras. À esquerda, a demo aparece em fade conforme você rola — sem confusão."
        />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Module dock — HTML fade-in demo */}
          <div className="order-2 overflow-hidden rounded-sm border border-hud-cyan/12 glass-panel lg:order-1">
            <ModuleDock
              progress={assemblyProgress}
              modules={modules}
              activeIndex={activePiece}
              allLocked={allLocked}
            />
          </div>

          {/* Timeline copy */}
          <div ref={timelineRef} className="relative order-1 lg:order-2">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-hud-cyan/10" />
            <div
              className="process-line absolute left-8 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-hud-cyan via-titan-gold to-hud-cyan/20 shadow-[0_0_8px_rgba(0,212,255,0.25)]"
              style={{
                transform: shouldReduceMotion ? "scaleY(1)" : "scaleY(0)",
              }}
            />

            <div className="space-y-10">
              {processSteps.map((step, index) => {
                const meta = MODULE_META[index];
                const number = meta?.code ?? String(index + 1).padStart(2, "0");
                const st = moduleStatus(assemblyProgress, index);
                const isActive = index === activePiece && !allLocked;
                const isDone = st === "LOCKED";

                return (
                  <div
                    key={step.id}
                    className="process-step relative flex items-start gap-8"
                    style={{ opacity: shouldReduceMotion ? 1 : undefined }}
                  >
                    <div
                      className={`absolute left-0 top-0 z-10 flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-sm border bg-carbon font-orbitron transition-colors ${
                        isDone
                          ? "border-hud-cyan text-hud-cyan"
                          : isActive
                            ? "border-titan-gold text-titan-gold"
                            : "border-hud-cyan/25 text-arc-blue/50"
                      }`}
                    >
                      <span className="text-[9px] tracking-widest opacity-70">
                        MOD
                      </span>
                      <span className="text-lg font-bold leading-none">
                        {number}
                      </span>
                    </div>

                    <div className="pl-24">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3
                          className={`font-orbitron text-xl font-semibold transition-colors ${
                            isDone || isActive
                              ? "text-hud-cyan"
                              : "text-hud-cyan/60"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <span
                          className={`rounded-sm border px-1.5 py-0.5 font-rajdhani text-[10px] uppercase tracking-wider ${
                            isDone
                              ? "border-hud-cyan/40 text-hud-cyan"
                              : isActive
                                ? "border-titan-gold/40 text-titan-gold"
                                : "border-arc-blue/15 text-arc-blue/40"
                          }`}
                        >
                          {st === "STANDBY"
                            ? "Aguardando"
                            : st === "REVEAL"
                              ? "Ativo"
                              : "Concluído"}
                        </span>
                      </div>
                      <p className="font-rajdhani text-arc-blue/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
