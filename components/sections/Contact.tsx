"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, CheckCircle2, AlertTriangle, MessageCircle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import HudButton from "@/components/ui/HudButton";
import { playHud } from "@/lib/audio";
import { trackContactSubmit, trackWhatsAppClick } from "@/lib/analytics";
import { pulseReactor } from "@/lib/reactor-bus";
import {
  defaultWhatsappMessage,
  whatsappUrl,
} from "@/lib/data";

const contactSchema = z.object({
  name: z.string().min(2, "Identificação mínima: 2 caracteres"),
  email: z.string().email("Endereço de uplink inválido"),
  whatsapp: z
    .string()
    .optional()
    .refine((val) => {
      if (!val?.trim()) return true;
      const digits = val.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 13;
    }, "WhatsApp inválido (use DDD + número)"),
  project: z.string().min(2, "Descreva o tipo de missão"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

/**
 * Web3Forms is submitted from the browser (key is public by design).
 * Cloudflare often challenges server-side Node IPs → client path is reliable.
 * Other providers still go through /api/contact.
 */
async function transmitUplink(data: ContactForm): Promise<void> {
  const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim();

  if (web3Key) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3Key,
        subject: `[ARC WEB] Uplink — ${data.project}`,
        from_name: data.name,
        name: data.name,
        email: data.email,
        replyto: data.email,
        whatsapp: data.whatsapp,
        project: data.project,
        message: data.message,
        botcheck: "",
      }),
    });

    const text = await res.text();
    let json: { success?: boolean; message?: string } = {};
    try {
      json = JSON.parse(text) as { success?: boolean; message?: string };
    } catch {
      throw new Error(
        "Web3Forms retornou resposta inválida. Confira a access key e o e-mail no dashboard."
      );
    }

    if (!res.ok || !json.success) {
      throw new Error(json.message || `Web3Forms HTTP ${res.status}`);
    }
    return;
  }

  // Fallback: server API (Formspree / FormSubmit / server Web3Forms)
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (!res.ok || !json.success) {
    throw new Error(
      json.message || `Falha no uplink (HTTP ${res.status}).`
    );
  }
}

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const configured = useMemo(
    () => Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim()),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setSubmitError(null);
    playHud("click");
    try {
      await transmitUplink(data);
      playHud("transmit");
      pulseReactor("transmit");
      trackContactSubmit(data.project);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Canal instável. Tente novamente."
      );
    }
  };

  const inputBase =
    "w-full border-b border-hud-cyan/20 bg-transparent px-0 py-3 font-rajdhani text-arc-blue placeholder-arc-blue/25 outline-none transition-colors focus:border-hud-cyan";

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          label="Contato"
          title="Vamos construir o seu próximo site"
          subtitle="Conte o objetivo, o prazo e o tipo de projeto. Resposta em até 24 horas."
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
              <h3 className="font-orbitron text-xl font-bold text-chrome">
                Mensagem enviada
              </h3>
              <p className="mt-2 font-rajdhani text-arc-blue/70">
                Recebi seu contato. Em breve retorno no e-mail ou WhatsApp
                informado.
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
              {!configured && (
                <div className="mb-6 flex items-start gap-2 rounded-sm border border-titan-gold/25 bg-titan-gold/5 px-3 py-2 text-xs text-titan-gold/90">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    UPLINK OFFLINE — defina{" "}
                    <code className="text-hud-cyan">
                      NEXT_PUBLIC_WEB3FORMS_KEY
                    </code>{" "}
                    em <code className="text-hud-cyan">.env.local</code> e
                    reinicie o servidor.
                  </span>
                </div>
              )}

              {configured && (
                <div className="mb-6 flex items-center gap-2 rounded-sm border border-hud-cyan/20 bg-hud-cyan/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-hud-cyan/80">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hud-cyan shadow-[0_0_6px_#4db8ff]" />
                  Canal ativo · web3forms
                </div>
              )}

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
                    htmlFor="whatsapp"
                    className="mb-1 block font-rajdhani text-xs uppercase tracking-[0.2em] text-hud-cyan/80"
                  >
                    {`> WHATSAPP:`}{" "}
                    <span className="normal-case tracking-normal text-arc-blue/40">
                      (opcional)
                    </span>
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="(61) 99999-9999"
                    className={inputBase}
                    {...register("whatsapp")}
                  />
                  {errors.whatsapp && (
                    <p className="mt-1 text-xs text-red-alert">
                      {errors.whatsapp.message}
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

              {submitError && (
                <p className="mt-4 text-sm text-red-alert">{submitError}</p>
              )}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-arc-blue/40">
                  Campos obrigatórios, exceto WhatsApp.
                </p>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                  {whatsappUrl(defaultWhatsappMessage) && (
                    <HudButton
                      variant="secondary"
                      href={whatsappUrl(defaultWhatsappMessage)!}
                      target="_blank"
                      onClick={() => {
                        playHud("click");
                        trackWhatsAppClick("contact");
                      }}
                      className="w-full sm:w-auto"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </span>
                    </HudButton>
                  )}
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
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
