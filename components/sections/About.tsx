"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { operatorStats } from "@/lib/data";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (shouldReduceMotion) return;

        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        barsRef.current.forEach((bar) => {
          if (!bar) return;
          const target = Number(bar.dataset.target ?? 0);
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: target / 100,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label="Operator Profile"
          title="Ficha Técnica do Piloto"
          subtitle="Especialista em transformar ideias complexas em experiências digitais premium."
        />

        <div
          ref={contentRef}
          className="grid items-start gap-12 md:grid-cols-2"
          style={{ opacity: shouldReduceMotion ? 1 : undefined }}
        >
          {/* avatar / identity */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="relative mb-8 h-40 w-40">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-hud-cyan/30 animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-chrome/40" />
              <div className="flex h-full w-full items-center justify-center rounded-full bg-carbon font-orbitron text-4xl font-bold text-chrome text-glow-chrome shadow-[0_0_30px_rgba(184,192,208,0.15)]">
                OP
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded bg-carbon px-3 py-1 font-rajdhani text-[10px] uppercase tracking-widest text-hud-cyan border border-hud-cyan/20">
                ARC PILOT
              </div>
            </div>

            <h3 className="font-orbitron text-xl font-semibold text-chrome">
              Gabriel
            </h3>
            <p className="mt-2 max-w-sm font-rajdhani text-arc-blue/70">
              Desenvolvedor full‑stack e designer de interfaces imersivas. Construo sistemas que unem estética de cinema, performance real e usabilidade sólida.
            </p>
          </div>

          {/* stats */}
          <div className="space-y-8">
            {operatorStats.map((stat, i) => {
              const percent = Math.min(
                100,
                Math.round((stat.value / stat.max) * 100)
              );
              return (
                <div key={stat.label}>
                  <div className="mb-2 flex items-end justify-between font-rajdhani">
                    <span className="text-sm uppercase tracking-wider text-arc-blue/90">
                      {stat.label}
                    </span>
                    <span className="font-orbitron text-lg text-titan-gold">
                      {stat.value}
                      {stat.unit || ""}
                      <span className="ml-1 text-xs text-arc-blue/40">
                        / {stat.max}
                      </span>
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden bg-hud-cyan/10">
                    <div
                      ref={(el) => {
                        if (el) barsRef.current[i] = el;
                      }}
                      data-target={percent}
                      className="h-full origin-left bg-gradient-to-r from-titan-gold via-hud-cyan to-arc-blue shadow-[0_0_10px_rgba(0,212,255,0.4)]"
                      style={{
                        transform: shouldReduceMotion
                          ? `scaleX(${percent / 100})`
                          : "scaleX(0)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
