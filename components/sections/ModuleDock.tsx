"use client";

import { FileText, Layers, Boxes, Rocket } from "lucide-react";

export interface DockModule {
  code: string;
  label: string;
  short: string;
  description?: string;
}

interface ModuleDockProps {
  progress: number;
  modules: DockModule[];
  activeIndex: number;
  allLocked: boolean;
}

const ICONS = [FileText, Layers, Boxes, Rocket] as const;

/** Shared timing with Process.moduleStatus — fade-in, not fly-in */
export function moduleFade(progress: number, index: number) {
  const start = index * 0.1;
  const span = 0.22;
  const t = Math.min(1, Math.max(0, (progress - start) / span));
  // smoothstep
  return t * t * (3 - 2 * t);
}

export function moduleStatus(
  progress: number,
  index: number
): "STANDBY" | "REVEAL" | "LOCKED" {
  const e = moduleFade(progress, index);
  if (e < 0.08) return "STANDBY";
  if (e < 0.92) return "REVEAL";
  return "LOCKED";
}

export default function ModuleDock({
  progress,
  modules,
  activeIndex,
  allLocked,
}: ModuleDockProps) {
  return (
    <div className="relative flex min-h-[320px] flex-col p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-orbitron text-[10px] uppercase tracking-[0.22em] text-hud-cyan/60">
            Module dock
          </p>
          <p className="mt-1 font-rajdhani text-xs text-arc-blue/45">
            {allLocked
              ? "Todos os módulos ativos — sistema pronto"
              : "Os módulos aparecem conforme você rola"}
          </p>
        </div>
        <span className="shrink-0 font-orbitron text-[10px] tabular-nums text-hud-cyan/50">
          {Math.round(Math.min(100, progress * 100))}%
        </span>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {modules.map((mod, i) => {
          const ease = moduleFade(progress, i);
          const status = moduleStatus(progress, i);
          const Icon = ICONS[i] ?? FileText;
          const isActive = !allLocked && i === activeIndex && ease > 0.08;
          const isLocked = status === "LOCKED";
          const visible = ease > 0.02;

          return (
            <article
              key={mod.code}
              className={`relative rounded-sm border p-4 transition-[opacity,transform,border-color,box-shadow,background] duration-500 ease-out ${
                isLocked
                  ? "border-hud-cyan/35 bg-hud-cyan/[0.07] shadow-[0_0_24px_rgba(77,184,255,0.06)]"
                  : isActive
                    ? "border-titan-gold/35 bg-titan-gold/[0.05]"
                    : "border-hud-cyan/12 bg-black/25"
              }`}
              style={{
                opacity: visible ? 0.25 + ease * 0.75 : 0,
                transform: visible
                  ? `scale(${0.97 + ease * 0.03})`
                  : "scale(0.96)",
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-sm border ${
                      isLocked
                        ? "border-hud-cyan/30 bg-hud-cyan/10 text-hud-cyan"
                        : isActive
                          ? "border-titan-gold/30 bg-titan-gold/10 text-titan-gold"
                          : "border-white/10 bg-white/[0.03] text-arc-blue/40"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-orbitron text-[10px] tracking-[0.18em] text-arc-blue/40">
                      MOD {mod.code}
                    </p>
                    <h3
                      className={`font-orbitron text-sm font-semibold tracking-wide ${
                        isLocked || isActive ? "text-chrome" : "text-chrome/50"
                      }`}
                    >
                      {mod.label}
                    </h3>
                  </div>
                </div>
                <span
                  className={`font-orbitron text-[9px] uppercase tracking-wider ${
                    isLocked
                      ? "text-hud-cyan"
                      : isActive
                        ? "text-titan-gold"
                        : "text-arc-blue/30"
                  }`}
                >
                  {status === "STANDBY"
                    ? "—"
                    : status === "REVEAL"
                      ? "ON"
                      : "OK"}
                </span>
              </div>

              <p className="mt-3 font-rajdhani text-xs leading-relaxed text-arc-blue/50">
                {mod.short}
                {mod.description ? ` · ${mod.description}` : ""}
              </p>

              {/* Progress bar per card */}
              <div className="mt-3 h-0.5 overflow-hidden bg-hud-cyan/10">
                <div
                  className={`h-full transition-[width] duration-300 ${
                    isLocked ? "bg-hud-cyan/70" : "bg-titan-gold/60"
                  }`}
                  style={{ width: `${ease * 100}%` }}
                />
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 h-1 overflow-hidden rounded-sm bg-hud-cyan/10">
        <div
          className="h-full bg-gradient-to-r from-titan-gold/80 to-hud-cyan/80 transition-[width] duration-200"
          style={{ width: `${Math.min(100, progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
