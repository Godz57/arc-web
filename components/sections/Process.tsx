"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeader from "@/components/ui/SectionHeader";
import { processSteps } from "@/lib/data";

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
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
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          label="Assembly Protocol"
          title="Protocolo de Montagem"
          subtitle="Do briefing ao deploy, cada etapa é executada com precisão cirúrgica."
        />

        <div ref={timelineRef} className="relative">
          {/* vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-hud-cyan/10 md:left-1/2 md:-translate-x-1/2" />
          <div
            className="process-line absolute left-8 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-hud-cyan via-titan-gold to-hud-cyan/20 shadow-[0_0_8px_rgba(0,212,255,0.3)] md:left-1/2 md:-translate-x-1/2"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, index) => {
              const number = String(index + 1).padStart(2, "0");
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.id}
                  className={`process-step relative flex items-start gap-8 md:items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node */}
                  <div className="absolute left-0 top-0 z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-hud-cyan/30 bg-carbon font-orbitron text-xl font-bold text-titan-gold shadow-[0_0_18px_rgba(0,212,255,0.15)] md:left-1/2 md:-translate-x-1/2">
                    {number}
                  </div>

                  {/* spacer for desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* content */}
                  <div
                    className={`pl-24 md:w-1/2 ${
                      isEven ? "md:pr-16 md:pl-0 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <h3 className="font-orbitron text-xl font-semibold text-hud-cyan">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-rajdhani text-arc-blue/70">
                      {step.description}
                    </p>
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
