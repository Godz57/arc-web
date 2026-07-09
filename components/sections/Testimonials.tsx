"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import HudCard from "@/components/ui/HudCard";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
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
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          label="Field Reports"
          title="Relatórios de Campo"
          subtitle="Depoimentos dos agentes que operaram ao lado do sistema ARC WEB."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((report) => (
            <motion.div key={report.id} variants={itemVariants}>
              <HudCard tilt={false} className="h-full p-6">
                <div className="mb-5 flex items-center justify-between">
                  <Quote className="h-6 w-6 text-hud-cyan/50" />
                  <span className="font-rajdhani text-[10px] uppercase tracking-widest text-arc-blue/40">
                    {report.missionId}
                  </span>
                </div>

                <blockquote className="min-h-[6rem] font-rajdhani text-base italic leading-relaxed text-arc-blue/80">
                  “{report.quote}”
                </blockquote>

                <div className="mt-6 border-t border-hud-cyan/10 pt-4">
                  <p className="font-orbitron text-sm font-semibold text-titan-gold">
                    {report.name}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-arc-blue/50">
                    {report.role}
                  </p>
                </div>
              </HudCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
