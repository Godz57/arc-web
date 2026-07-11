"use client";

import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import {
  defaultWhatsappMessage,
  footerNav,
  footerServices,
  siteContact,
  whatsappUrl,
} from "@/lib/data";
import { playHud } from "@/lib/audio";

const year = new Date().getFullYear();

export default function Footer() {
  const wa = whatsappUrl(defaultWhatsappMessage);

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      href: siteContact.github,
      external: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: siteContact.linkedin,
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${siteContact.email}`,
      external: false,
    },
    ...(wa
      ? [
          {
            icon: MessageCircle,
            label: "WhatsApp",
            href: wa,
            external: true,
          },
        ]
      : []),
  ];

  const scrollTo = (href: string) => {
    playHud("click");
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-hud-cyan/10 bg-carbon">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#hero");
              }}
              className="inline-flex items-center gap-2.5"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-hud-cyan/25 bg-hud-cyan/5"
                aria-hidden
              >
                <span className="h-2 w-2 rounded-full bg-hud-cyan shadow-[0_0_10px_rgba(77,184,255,0.7)]" />
              </span>
              <span className="font-orbitron text-lg font-bold tracking-[0.18em] text-chrome text-glow-chrome">
                ARC WEB
              </span>
            </a>
            <p className="mt-4 max-w-xs font-rajdhani text-sm leading-relaxed text-arc-blue/60">
              Sites que parecem tecnologia do futuro. Design imersivo, código
              limpo e entrega com polish — do briefing ao deploy.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => playHud("click")}
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-hud-cyan/15 text-arc-blue/65 transition-all hover:border-hud-cyan/40 hover:text-hud-cyan hover:shadow-[0_0_12px_rgba(0,212,255,0.15)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-2">
            <h4 className="font-orbitron text-[11px] uppercase tracking-[0.22em] text-hud-cyan/70">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="font-rajdhani text-sm text-arc-blue/60 transition-colors hover:text-hud-cyan"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-orbitron text-[11px] uppercase tracking-[0.22em] text-hud-cyan/70">
              Serviços
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerServices.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="font-rajdhani text-sm text-arc-blue/60 transition-colors hover:text-hud-cyan"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-orbitron text-[11px] uppercase tracking-[0.22em] text-hud-cyan/70">
              Contato
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteContact.email}`}
                  onClick={() => playHud("click")}
                  className="group inline-flex items-center gap-2 font-rajdhani text-sm text-arc-blue/70 transition-colors hover:text-hud-cyan"
                >
                  <Mail className="h-4 w-4 shrink-0 text-hud-cyan/50" />
                  {siteContact.email}
                </a>
              </li>
              {wa && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playHud("click")}
                    className="group inline-flex items-center gap-2 font-rajdhani text-sm text-arc-blue/70 transition-colors hover:text-hud-cyan"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-hud-cyan/50" />
                    WhatsApp
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              )}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact");
                  }}
                  className="mt-1 inline-flex items-center gap-2 border border-hud-cyan/30 bg-hud-cyan/5 px-4 py-2.5 font-orbitron text-[10px] uppercase tracking-[0.16em] text-hud-cyan transition-all hover:border-hud-cyan/55 hover:bg-hud-cyan/10"
                >
                  Iniciar projeto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-hud-cyan/10 pt-8 sm:flex-row">
          <p className="font-rajdhani text-xs tracking-wider text-arc-blue/40">
            © {year} ARC WEB. ALL SYSTEMS OPERATIONAL.
          </p>
          <p className="font-rajdhani text-xs tracking-wider text-arc-blue/30">
            Built with intention · Next.js · R3F
          </p>
        </div>
      </div>
    </footer>
  );
}
