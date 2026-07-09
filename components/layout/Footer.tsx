"use client";

import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-hud-cyan/10 bg-carbon py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="text-center md:text-left">
          <h3 className="font-orbitron text-lg font-bold tracking-wider text-chrome text-glow-chrome">
            ARC WEB
          </h3>
          <p className="mt-1 text-sm text-arc-blue/60">
            Sites que parecem tecnologia do futuro
          </p>
        </div>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="group flex items-center gap-2 text-arc-blue/70 transition-colors duration-300 hover:text-hud-cyan"
                data-cursor="hover"
              >
                <Icon className="h-5 w-5 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(0,212,255,0.8)]" />
                <span className="hidden font-rajdhani text-sm uppercase tracking-wider sm:inline">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>

        <p className="font-rajdhani text-xs tracking-wider text-arc-blue/40">
          © 2026 ARC WEB. ALL SYSTEMS OPERATIONAL.
        </p>
      </div>
    </footer>
  );
}
