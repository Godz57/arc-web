"use client";

import { useEffect, useState } from "react";

export default function CursorCustomizado() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='hover']")) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='hover']")) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[9999] pointer-events-none mix-blend-screen"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <div
        className={`relative flex items-center justify-center transition-transform duration-200 ease-out ${
          hovering ? "scale-150" : "scale-100"
        }`}
      >
        {/* outer ring */}
        <div
          className={`absolute rounded-full border transition-all duration-200 ${
            hovering
              ? "h-10 w-10 border-hud-cyan shadow-[0_0_12px_rgba(0,212,255,0.6)]"
              : "h-8 w-8 border-arc-blue/70"
          }`}
        />
        {/* crosshair lines */}
        <div
          className={`absolute h-[1px] w-6 transition-colors duration-200 ${
            hovering ? "bg-hud-cyan" : "bg-arc-blue/70"
          }`}
        />
        <div
          className={`absolute h-6 w-[1px] transition-colors duration-200 ${
            hovering ? "bg-hud-cyan" : "bg-arc-blue/70"
          }`}
        />
        {/* center dot */}
        <div
          className={`rounded-full transition-all duration-200 ${
            hovering
              ? "h-1.5 w-1.5 bg-hud-cyan shadow-[0_0_8px_#00d4ff]"
              : "h-1 w-1 bg-arc-blue"
          }`}
        />
      </div>
    </div>
  );
}
