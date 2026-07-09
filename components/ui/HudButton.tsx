"use client";

import { ReactNode } from "react";

interface HudButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

export default function HudButton({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: HudButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor="hover"
      className={`
        group relative overflow-hidden
        border border-hud-cyan/50 bg-carbon/60
        px-8 py-3
        font-orbitron text-sm uppercase tracking-[0.2em] text-hud-cyan
        transition-all duration-300
        hover:border-hud-cyan hover:text-carbon
        hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      {/* sweep highlight */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-hud-cyan/80 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
      <span className="absolute inset-0 -translate-x-full bg-hud-cyan transition-transform duration-300 group-hover:translate-x-0" />
      <span className="relative z-10 group-hover:text-carbon">{children}</span>
    </button>
  );
}
