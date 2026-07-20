"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { loadMutePreference, playHud } from "@/lib/audio";
import { storageGet, storageSet } from "@/lib/safe-storage";

const bootStages = [
  { label: "ARC WEB OS v3.0", detail: "kernel init" },
  { label: "CALIBRATING REPULSORS", detail: "thrusters" },
  { label: "SYNCING ARC REACTOR", detail: "core link" },
  { label: "LOADING HUD INTERFACE", detail: "viewport" },
  { label: "POWER CORE ONLINE", detail: "systems" },
  { label: "SYSTEM READY", detail: "standby" },
] as const;

function finishBoot(
  setBooted: (v: boolean) => void,
  unlockScroll: () => void
) {
  storageSet("arc_booted", "1");
  unlockScroll();
  setBooted(true);
}

export default function BootSequence() {
  const t = useTranslations("Boot");
  const [booted, setBooted] = useState(true); // default true to avoid SSR flash
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [statusText, setStatusText] = useState("INITIALIZING");

  const containerRef = useRef<HTMLDivElement>(null);
  const reactorRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const progressProxy = useRef({ value: 0 });
  const skippedRef = useRef(false);

  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  const skipBoot = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    timelineRef.current?.kill();
    gsap.killTweensOf(progressProxy.current);
    gsap.killTweensOf(containerRef.current);
    gsap.killTweensOf(reactorRef.current);
    finishBoot(setBooted, unlockScroll);
  }, [unlockScroll]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setBooted(true);
      return;
    }

    if (storageGet("arc_booted") === "1") {
      setBooted(true);
      return;
    }

    setBooted(false);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    loadMutePreference();
    playHud("boot");

    const stageCount = bootStages.length;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (skippedRef.current) return;
          finishBoot(setBooted, unlockScroll);
        },
      });
      timelineRef.current = tl;

      tl.fromTo(
        reactorRef.current,
        { scale: 0.55, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.6)" },
        0
      );

      progressProxy.current.value = 0;
      tl.to(
        progressProxy.current,
        {
          value: 100,
          duration: 3.4,
          ease: "power1.inOut",
          onUpdate: () => {
            if (skippedRef.current) return;
            const v = progressProxy.current.value;
            const pct = Math.round(v);
            setProgress(pct);

            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${v}%`;
            }

            const stageIdx = Math.min(
              Math.floor((v / 100) * stageCount),
              stageCount - 1
            );
            setActiveStage(stageIdx);
            setStatusText(bootStages[stageIdx].detail.toUpperCase());

            const done: number[] = [];
            for (let i = 0; i < stageIdx; i++) done.push(i);
            if (v >= 96) {
              for (let i = 0; i < stageCount; i++) {
                if (!done.includes(i)) done.push(i);
              }
            }
            setCompletedStages(done);
          },
        },
        0.15
      );

      tl.to({}, { duration: 0.45 });
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
      });
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        skipBoot();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      ctx.revert();
      timelineRef.current?.kill();
      unlockScroll();
    };
  }, [skipBoot, unlockScroll]);

  if (booted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-carbon"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={t("ariaLabel", { progress })}
    >
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 bg-hud-grid bg-[length:48px_48px] opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(0, 180, 255, 0.12) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.12) 2px, rgba(0, 212, 255, 0.12) 4px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-hud-cyan/50 to-transparent boot-scan-sweep"
        aria-hidden
      />

      {/* HUD frame corners */}
      <div className="pointer-events-none absolute inset-4 sm:inset-8" aria-hidden>
        <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-hud-cyan/40" />
        <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-hud-cyan/40" />
        <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-hud-cyan/40" />
        <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-hud-cyan/40" />
      </div>

      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between border-b border-hud-cyan/15 pb-3">
          <div>
            <p className="font-orbitron text-[10px] tracking-[0.35em] text-titan-gold/90 sm:text-xs">
              STARK INDUSTRIES
            </p>
            <h1 className="mt-1 font-orbitron text-sm tracking-[0.28em] text-arc-blue sm:text-base">
              ARC WEB OS
            </h1>
          </div>
          <div className="text-right">
            <p className="font-rajdhani text-[10px] uppercase tracking-[0.2em] text-hud-cyan/50">
              boot sequence
            </p>
            <p className="font-orbitron text-xs text-hud-cyan/70">v3.0</p>
          </div>
        </div>

        {/* Arc reactor core */}
        <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
          <div
            ref={reactorRef}
            className="relative h-full w-full opacity-0"
            aria-hidden
          >
            <div className="boot-reactor-glow absolute inset-0 rounded-full bg-hud-cyan/10 blur-2xl" />
            <div className="boot-ring-spin-slow absolute inset-0 rounded-full border border-hud-cyan/20" />
            <div className="boot-ring-spin absolute inset-2 rounded-full border border-dashed border-hud-cyan/35" />
            <div className="boot-ring-spin-reverse absolute inset-5 rounded-full border border-titan-gold/30" />
            <div className="absolute inset-8 rounded-full border-2 border-hud-cyan/50 shadow-[0_0_24px_rgba(0,212,255,0.35)]" />
            <div className="boot-ticks absolute inset-3 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="boot-core-pulse relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-hud-cyan/40 via-hud-cyan/20 to-transparent shadow-[0_0_30px_rgba(0,212,255,0.55)] sm:h-14 sm:w-14">
                <div className="h-5 w-5 rounded-full bg-arc-blue shadow-[0_0_16px_#4db8ff] sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Terminal lines */}
        <div className="mb-6 min-h-[9.5rem] space-y-1.5 font-rajdhani text-sm tracking-wide">
          {bootStages.map((stage, i) => {
            const isDone = completedStages.includes(i);
            const isActive = activeStage === i && !isDone;
            const isPending = i > activeStage;

            return (
              <div
                key={stage.label}
                className={`flex items-center justify-between gap-3 transition-all duration-300 ${
                  isPending
                    ? "opacity-25"
                    : isActive
                      ? "opacity-100"
                      : "opacity-80"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={
                      isActive
                        ? "text-titan-gold"
                        : isDone
                          ? "text-hud-cyan/70"
                          : "text-arc-blue/40"
                    }
                  >
                    {isActive ? "▸" : ">"}
                  </span>
                  <span
                    className={`truncate ${
                      isActive
                        ? "text-arc-blue text-glow-cyan"
                        : isDone
                          ? "text-arc-blue/75"
                          : "text-arc-blue/40"
                    }`}
                  >
                    {stage.label}
                    {isActive && (
                      <span className="ml-0.5 inline-block w-[0.55ch] animate-pulse text-hud-cyan">
                        ▌
                      </span>
                    )}
                  </span>
                </div>
                <span
                  className={`shrink-0 font-orbitron text-[10px] tracking-widest ${
                    isDone
                      ? "text-hud-cyan"
                      : isActive
                        ? "text-titan-gold/80"
                        : "text-arc-blue/20"
                  }`}
                >
                  {isDone ? "OK" : isActive ? "..." : "—"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-rajdhani text-[11px] tracking-[0.18em] text-arc-blue/55">
            <span className="uppercase">{statusText}</span>
            <span className="font-orbitron tabular-nums text-hud-cyan">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
          <div className="relative h-[3px] w-full overflow-hidden bg-hud-cyan/10">
            <div
              ref={progressBarRef}
              className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-titan-gold via-hud-cyan to-arc-blue shadow-[0_0_12px_rgba(0,212,255,0.55)]"
            />
            <div className="boot-bar-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="flex justify-between font-rajdhani text-[10px] uppercase tracking-[0.2em] text-arc-blue/35">
            <span>loading systems</span>
            <span className="text-hud-cyan/50">
              {completedStages.length}/{bootStages.length} modules
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={skipBoot}
        className="absolute bottom-6 right-6 z-20 border border-hud-cyan/20 bg-carbon/60 px-3 py-2 font-orbitron text-[10px] uppercase tracking-[0.25em] text-hud-cyan/80 backdrop-blur-sm transition-colors hover:border-titan-gold/40 hover:text-titan-gold sm:bottom-8 sm:right-8 sm:text-xs"
      >
        {t("skip")} ↵
      </button>

      <p className="absolute bottom-6 left-6 z-20 hidden font-rajdhani text-[10px] tracking-widest text-arc-blue/30 sm:block sm:bottom-8 sm:left-8">
        {t("skipHint")}
      </p>
    </div>
  );
}
