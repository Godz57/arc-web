"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { playHud } from "@/lib/audio";
import Logo from "@/components/ui/Logo";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";

const SECTION_LINKS = [
  { key: "home" as const, href: "#hero", id: "hero" },
  { key: "services" as const, href: "#services", id: "services" },
  { key: "missions" as const, href: "#portfolio", id: "portfolio" },
  { key: "process" as const, href: "#process", id: "process" },
  { key: "faq" as const, href: "#faq", id: "faq" },
  { key: "contact" as const, href: "#contact", id: "contact" },
];

export default function Navbar() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  const navLinks = SECTION_LINKS.map((item) => ({
    ...item,
    label: t(item.key),
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = SECTION_LINKS.map((l) => l.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => {
    setOpen(false);
    playHud("click");
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-[background,border,box-shadow] duration-300 ${
        scrolled || open
          ? "border-b border-hud-cyan/10 bg-carbon/85 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-carbon/35 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#hero");
          }}
          className="group flex shrink-0 items-center"
          aria-label={t("ariaHome")}
        >
          <Logo variant="lockup" size={30} className="group-hover:opacity-95" />
        </a>

        {/* Desktop nav — centered cluster */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = activeId === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`relative rounded-sm px-3 py-2 font-rajdhani text-[12px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                    active
                      ? "text-hud-cyan"
                      : "text-arc-blue/50 hover:text-arc-blue/85"
                  }`}
                  aria-current={active ? "true" : undefined}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-px origin-center bg-hud-cyan/70 transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop: locale + CTA */}
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <LocaleSwitcher />
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#contact");
            }}
            className="inline-flex items-center gap-2 rounded-sm border border-hud-cyan/30 bg-hud-cyan/5 px-4 py-2 font-orbitron text-[10px] uppercase tracking-[0.18em] text-hud-cyan transition-all hover:border-hud-cyan/55 hover:bg-hud-cyan/10 hover:shadow-[0_0_20px_rgba(77,184,255,0.12)]"
          >
            {t("cta")}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
        >
          <span className="sr-only">
            {open ? t("closeMenu") : t("openMenu")}
          </span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-arc-blue/80 transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-full bg-arc-blue/80 transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-px w-full bg-arc-blue/80 transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-white/[0.04] transition-all duration-300 md:hidden ${
          open
            ? "max-h-[28rem] border-opacity-100 opacity-100"
            : "max-h-0 border-opacity-0 opacity-0"
        }`}
      >
        <div className="bg-carbon/95 px-5 pb-5 pt-2 backdrop-blur-xl">
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const active = activeId === link.id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`block border-b border-white/[0.04] py-3.5 font-rajdhani text-sm uppercase tracking-[0.16em] transition-colors ${
                      active
                        ? "text-hud-cyan"
                        : "text-arc-blue/70 hover:text-hud-cyan"
                    }`}
                    aria-current={active ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex items-center justify-center">
            <LocaleSwitcher />
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#contact");
            }}
            className="mt-3 flex w-full items-center justify-center border border-hud-cyan/35 bg-hud-cyan/10 py-3 font-orbitron text-[11px] uppercase tracking-[0.18em] text-hud-cyan"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
