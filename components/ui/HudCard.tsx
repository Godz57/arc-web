"use client";

import { useRef, useState, ReactNode } from "react";
import Scanlines from "./Scanlines";

interface HudCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  scanline?: boolean;
  glow?: boolean;
}

export default function HudCard({
  children,
  className = "",
  tilt = true,
  scanline = true,
  glow = true,
}: HudCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("");
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      data-cursor="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative overflow-hidden rounded-sm
        border border-hud-cyan/15 bg-carbon/70
        backdrop-blur-md transition-all duration-300
        ${glow ? "hover:border-hud-cyan/40 hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]" : ""}
        ${className}
      `}
      style={{
        transform: transform || undefined,
        transition: isHovering
          ? "box-shadow 0.3s ease, border-color 0.3s ease"
          : "transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* HUD corner brackets */}
      <span className="pointer-events-none absolute left-0 top-0 z-10 h-4 w-4 border-l-2 border-t-2 border-hud-cyan/60" />
      <span className="pointer-events-none absolute right-0 top-0 z-10 h-4 w-4 border-r-2 border-t-2 border-hud-cyan/60" />
      <span className="pointer-events-none absolute bottom-0 left-0 z-10 h-4 w-4 border-l-2 border-b-2 border-hud-cyan/60" />
      <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-4 w-4 border-r-2 border-b-2 border-hud-cyan/60" />

      {scanline && <Scanlines opacity={0.05} />}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
