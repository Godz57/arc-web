"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { loadMutePreference, playHud } from "@/lib/audio";
import { storageGet, storageSet } from "@/lib/safe-storage";

const bootLines = [
  "> ARC WEB OS v3.0 BOOTING...",
  "> CALIBRATING REPULSORS........ OK",
  "> SYNCING ARC REACTOR.......... OK",
  "> LOADING HUD INTERFACE........ OK",
  "> POWER CORE: ONLINE",
  "> SYSTEM READY",
];

export default function BootSequence() {
  const [booted, setBooted] = useState(true); // default true to avoid SSR flash
  const [skipByUser, setSkipByUser] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Check on client side
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setBooted(true);
      return;
    }

    const alreadyBooted = storageGet("arc_booted") === "1";
    if (alreadyBooted) {
      setBooted(true);
      return;
    }

    setBooted(false);
    loadMutePreference();
    playHud("boot");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          storageSet("arc_booted", "1");
          setBooted(true);
        },
      });

      timelineRef.current = tl;

      tl.fromTo(
        linesRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.25,
          ease: "power2.out",
        }
      );

      tl.to(
        progressRef.current,
        {
          width: "100%",
          duration: 2.2,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        linesRef.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
        },
        "+=0.3"
      );

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "+=0.1"
      );
    });

    return () => {
      ctx.revert();
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    if (skipByUser && timelineRef.current) {
      timelineRef.current.kill();
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(linesRef.current);
      gsap.killTweensOf(progressRef.current);
      storageSet("arc_booted", "1");
      setBooted(true);
    }
  }, [skipByUser]);

  if (booted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon"
      role="status"
      aria-live="polite"
      aria-label="Inicializando sistema"
    >
      <div className="w-full max-w-md px-6">
        <div className="mb-8 flex items-center justify-between">
          <span className="font-orbitron text-sm tracking-[0.3em] text-titan-gold">
            ARC WEB OS
          </span>
          <span className="font-rajdhani text-xs text-arc-blue/60">v3.0</span>
        </div>

        <div className="space-y-3 font-rajdhani text-sm tracking-wider text-arc-blue">
          {bootLines.map((line, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) linesRef.current[i] = el;
              }}
              className="opacity-0"
            >
              {line}
            </div>
          ))}
        </div>

        {/* HUD progress bar */}
        <div className="mt-8 h-[2px] w-full bg-hud-cyan/10">
          <div
            ref={progressRef}
            className="h-full w-0 bg-gradient-to-r from-titan-gold to-hud-cyan shadow-[0_0_10px_#00d4ff]"
          />
        </div>

        <div className="mt-3 flex justify-between font-rajdhani text-xs text-arc-blue/50">
          <span>LOADING SYSTEMS</span>
          <span>100%</span>
        </div>
      </div>

      <button
        onClick={() => setSkipByUser(true)}
        className="absolute bottom-8 right-8 font-orbitron text-xs uppercase tracking-[0.2em] text-hud-cyan transition-colors hover:text-titan-gold"
      >
        [ SKIP ]
      </button>
    </div>
  );
}
