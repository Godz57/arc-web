"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { faqItems } from "@/lib/data";
import { playHud } from "@/lib/audio";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (id: string) => {
    playHud("click");
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          label="FAQ"
          title="Perguntas frequentes"
          subtitle="Respostas diretas antes do briefing. Se faltar algo, o WhatsApp ou o formulário resolvem."
        />

        <ul className="space-y-3">
          {faqItems.map((item, index) => {
            const open = openId === item.id;
            return (
              <li key={item.id}>
                <div
                  className={`overflow-hidden rounded-sm border transition-colors duration-300 ${
                    open
                      ? "border-hud-cyan/35 bg-hud-cyan/[0.04]"
                      : "border-hud-cyan/12 bg-carbon/50 hover:border-hud-cyan/25"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6"
                  >
                    <span className="shrink-0 font-orbitron text-[10px] tracking-wider text-hud-cyan/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-orbitron text-sm font-medium tracking-wide text-chrome sm:text-base">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-hud-cyan/70 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${item.id}`}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 0, height: 0 }
                        }
                        animate={{ opacity: 1, height: "auto" }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, height: 0 }
                        }
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.28,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-hud-cyan/10 px-5 pb-5 pt-3 font-rajdhani text-sm leading-relaxed text-arc-blue/70 md:px-6 md:pl-[3.25rem]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
