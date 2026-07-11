"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  loadMutePreference,
  setMuted,
  subscribeMute,
  playHud,
} from "@/lib/audio";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function HUDOverlay() {
  const [time, setTime] = useState("--:--:--");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [fps, setFps] = useState(0);
  const [muted, setMutedState] = useState(true);
  const framesRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setMutedState(loadMutePreference());
    return subscribeMute(setMutedState);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const handlePointerMove = (e: PointerEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);

    let rafId: number;
    const tick = (timestamp: number) => {
      framesRef.current += 1;
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      } else if (timestamp - lastTimeRef.current >= 500) {
        const elapsed = (timestamp - lastTimeRef.current) / 1000;
        setFps(Math.round(framesRef.current / elapsed));
        framesRef.current = 0;
        lastTimeRef.current = timestamp;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMuteToggle = () => {
    const next = !muted;
    setMuted(next);
    if (!next) {
      // brief confirm beep after unmute
      playHud("click");
    }
  };

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col items-end gap-1.5 font-rajdhani text-[11px] uppercase tracking-widest text-arc-blue/55 pointer-events-none">
      <div className="glass-panel px-2.5 py-1">
        <span className="text-hud-cyan/70">TCR </span>
        <span>{time}</span>
      </div>

      <div className="glass-panel hidden px-2.5 py-1 sm:block">
        <span className="text-hud-cyan/70">POS </span>
        <span>
          X:{coords.x.toString().padStart(4, "0")} Y:
          {coords.y.toString().padStart(4, "0")}
        </span>
      </div>

      <div className="glass-panel px-2.5 py-1">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-hud-cyan/80 shadow-[0_0_6px_rgba(77,184,255,0.5)]" />
        <span className="text-hud-cyan/70">ONLINE</span>
      </div>

      <div className="glass-panel hidden px-2.5 py-1 md:block">
        <span className="text-titan-gold/70">FPS </span>
        <span>{fps}</span>
      </div>

      <button
        type="button"
        onClick={handleMuteToggle}
        className="pointer-events-auto glass-panel flex items-center gap-1.5 px-2.5 py-1 transition-colors hover:border-hud-cyan/30 hover:text-hud-cyan/90"
        aria-label={muted ? "Ativar áudio HUD" : "Silenciar áudio HUD"}
      >
        {muted ? (
          <VolumeX className="h-3 w-3 text-titan-gold/80" />
        ) : (
          <Volume2 className="h-3 w-3 text-hud-cyan/80" />
        )}
        <span className="text-[10px]">{muted ? "MUTE" : "AUDIO"}</span>
      </button>
    </div>
  );
}
