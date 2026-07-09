"use client";

import { useEffect, useState, useRef } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function HUDOverlay() {
  const [time, setTime] = useState("--:--:--");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [fps, setFps] = useState(0);
  const framesRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
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

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col items-end gap-2 pointer-events-none font-rajdhani text-xs uppercase tracking-widest text-arc-blue/80">
      <div className="glass-panel px-3 py-1.5">
        <span className="text-hud-cyan">TCR </span>
        <span>{time}</span>
      </div>

      <div className="glass-panel px-3 py-1.5">
        <span className="text-hud-cyan">POS </span>
        <span>
          X:{coords.x.toString().padStart(4, "0")} Y:
          {coords.y.toString().padStart(4, "0")}
        </span>
      </div>

      <div className="glass-panel px-3 py-1.5 animate-pulse-slow">
        <span className="inline-block h-2 w-2 rounded-full bg-hud-cyan shadow-[0_0_8px_#00d4ff] mr-2" />
        <span className="text-hud-cyan">SYSTEM ONLINE</span>
      </div>

      <div className="glass-panel px-3 py-1.5">
        <span className="text-titan-gold">FPS </span>
        <span>{fps}</span>
      </div>
    </div>
  );
}
