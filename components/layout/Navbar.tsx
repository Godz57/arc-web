"use client";

import { useState } from "react";


const navLinks = [
  { label: "Power Core", href: "#hero" },
  { label: "Capabilities", href: "#services" },
  { label: "Mission Log", href: "#portfolio" },
  { label: "Assembly", href: "#process" },
  { label: "Uplink", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 glass-panel border-b border-hud-cyan/10">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#hero");
          }}
          className="font-orbitron text-xl font-bold tracking-wider text-titan-gold text-glow-gold"
          data-cursor="hover"
        >
          ARC WEB
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="group relative font-rajdhani text-sm uppercase tracking-[0.2em] text-arc-blue/80 transition-colors duration-300 hover:text-hud-cyan"
                data-cursor="hover"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-hud-cyan to-transparent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* mobile hamburger */}
        <button
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-cursor="hover"
        >
          <span
            className={`h-[2px] w-6 bg-hud-cyan shadow-[0_0_6px_#00d4ff] transition-all duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-hud-cyan shadow-[0_0_6px_#00d4ff] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-hud-cyan shadow-[0_0_6px_#00d4ff] transition-all duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={`absolute left-0 right-0 top-16 overflow-hidden border-b border-hud-cyan/10 bg-carbon/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="block font-rajdhani text-sm uppercase tracking-[0.2em] text-arc-blue/80 transition-colors duration-300 hover:text-hud-cyan"
                data-cursor="hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
