"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import HudButton from "@/components/ui/HudButton";

const contactSchema = z.object({
  name: z.string().min(2, "Identificação mínima: 2 caracteres"),
  email: z.string().email("Endereço de uplink inválido"),
  project: z.string().min(2, "Descreva o tipo de missão"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    // Simulate uplink transmission without backend
    await new Promise((resolve) => setTimeout(resolve, 1200));
    // eslint-disable-next-line no-console
    console.log("TRANSMISSION RECEIVED:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputBase =
    "w-full border-b border-hud-cyan/20 bg-transparent px-0 py-3 font-rajdhani text-arc-blue placeholder-arc-blue/25 outline-none transition-colors focus:border-hud-cyan";

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          label="Establish Uplink"
          title="Abrir Canal de Comunicação"
          subtitle="Preencha os campos do terminal. Sua transmissão será recebida e respondida em até 24 horas."
        />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel mx-auto max-w-lg rounded-sm border border-hud-cyan/30 p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-hud-cyan/10 text-hud-cyan shadow-[0_0_16px_rgba(0,212,255,0.25)]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-orbitron text-xl font-bold text-titan-gold">
                TRANSMISSION SENT
              </h3>
              <p className="mt-2 font-rajdhani text-arc-blue/70">
                Uplink estabelecido com sucesso. Aguarde confirmação no canal de
                e-mail informado.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
              onSubmit={handleSubmit(onSubmit)}
              className="glass-panel rounded-sm border border-hud-cyan/15 p-6 md:p-10"
              noValidate
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block font-rajdhani text-xs uppercase tracking-[0.2em] text-hud-cyan/80"
                  >
                    {`> NOME:`}
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Digite seu nome operacional"
                    className={inputBase}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block font-rajdhani text-xs uppercase tracking-[0.2em] text-hud-cyan/80"
                  >
                    {`> EMAIL:`}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="canal@dominio.com"
                    className={inputBase}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="project"
                    className="mb-1 block font-rajdhani text-xs uppercase tracking-[0.2em] text-hud-cyan/80"
                  >
                    {`> PROJETO:`}
                  </label>
                  <input
                    id="project"
                    type="text"
                    placeholder="Landing page, e-commerce, sistema..."
                    className={inputBase}
                    {...register("project")}
                  />
                  {errors.project && (
                    <p className="mt-1 text-xs text-red-alert">
                      {errors.project.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block font-rajdhani text-xs uppercase tracking-[0.2em] text-hud-cyan/80"
                  >
                    {`> MENSAGEM:`}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Descreva a missão, objetivos e prazo..."
                    className={`${inputBase} resize-none`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="hidden text-xs text-arc-blue/40 sm:block">
                  Todos os campos são obrigatórios.
                </p>
                <HudButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-arc-blue/30 border-t-hud-cyan" />
                        ENVIANDO...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        ENVIAR
                      </>
                    )}
                  </span>
                </HudButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
