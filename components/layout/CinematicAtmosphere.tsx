"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Site-wide cinematic atmosphere — circuit traces + soft code stream.
 * Fixed, non-interactive, low opacity, edges only so reading stays clear.
 */
const CODE_LINES = [
  "const uplink = await establish();",
  "reactor.calibrate({ core: 'arc' });",
  "if (mission.ready) deploy();",
  "hud.render(frames / delta);",
  "export function assemble(suit) {",
  "  return suit.mount(protocol);",
  "}",
  "system.status = 'ONLINE';",
  "// ARC WEB · build target",
  "mesh.emissive.set('#00d4ff');",
  "scroll.trigger('suit-up');",
  "return <PowerCore active />;",
  "telemetry.push(packet);",
  "npm run launch -- --prod",
  "guard: performance > 90",
];

function CircuitPanel({ side }: { side: "left" | "right" }) {
  const flip = side === "right";
  return (
    <svg
      className={`circuit-panel circuit-panel--${side}`}
      viewBox="0 0 120 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        transform={flip ? "translate(120,0) scale(-1,1)" : undefined}
      >
        {/* vertical spine */}
        <path d="M28 0 V800" opacity="0.5" />
        <path d="M52 40 V760" opacity="0.35" />

        {/* branches */}
        <path d="M28 80 H70 V110 H95" />
        <path d="M28 160 H55 V200 H88" />
        <path d="M52 240 H90" />
        <path d="M28 300 H75 V340 H48 V380" />
        <path d="M52 420 H100 V460" />
        <path d="M28 500 H60 V540 H92" />
        <path d="M52 580 H78 V640 H40" />
        <path d="M28 680 H85 V720 H55" />
        <path d="M52 740 H98" />

        {/* nodes */}
        {[80, 160, 240, 300, 420, 500, 580, 680, 740].map((y) => (
          <circle key={y} cx="28" cy={y} r="2.2" fill="currentColor" stroke="none" />
        ))}
        {[110, 200, 340, 460, 540, 640, 720].map((y, i) => (
          <rect
            key={`pad-${y}`}
            x={88 + (i % 2) * 4}
            y={y - 3}
            width="6"
            height="6"
            fill="currentColor"
            stroke="none"
            opacity="0.7"
          />
        ))}

        {/* pulse dots travel via CSS on these paths as separate circles */}
      </g>

      {/* animated energy packets */}
      <g className="circuit-pulse" transform={flip ? "translate(120,0) scale(-1,1)" : undefined}>
        <circle r="2.5" fill="currentColor">
          <animateMotion
            dur="9s"
            repeatCount="indefinite"
            path="M28 40 V300 H75 V380"
          />
        </circle>
        <circle r="2" fill="currentColor" opacity="0.8">
          <animateMotion
            dur="12s"
            begin="2s"
            repeatCount="indefinite"
            path="M52 100 V500 H60 V540 H92"
          />
        </circle>
        <circle r="2" fill="currentColor" opacity="0.7">
          <animateMotion
            dur="14s"
            begin="5s"
            repeatCount="indefinite"
            path="M28 600 V680 H85 V720"
          />
        </circle>
      </g>
    </svg>
  );
}

export default function CinematicAtmosphere() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stream = useMemo(() => {
    // duplicate for seamless loop
    return [...CODE_LINES, ...CODE_LINES];
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="cinematic-atmosphere"
      aria-hidden="true"
    >
      {/* edge circuit boards */}
      <div className="cinematic-atmosphere__circuits">
        <CircuitPanel side="left" />
        <CircuitPanel side="right" />
      </div>

      {/* soft code streams — far edges only */}
      <div
        className={`cinematic-atmosphere__code cinematic-atmosphere__code--left ${
          shouldReduceMotion ? "is-static" : ""
        }`}
      >
        <div className="cinematic-atmosphere__code-track">
          {stream.map((line, i) => (
            <div key={`L-${i}`} className="cinematic-atmosphere__code-line">
              {line}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`cinematic-atmosphere__code cinematic-atmosphere__code--right ${
          shouldReduceMotion ? "is-static" : ""
        }`}
      >
        <div className="cinematic-atmosphere__code-track cinematic-atmosphere__code-track--reverse">
          {stream.map((line, i) => (
            <div key={`R-${i}`} className="cinematic-atmosphere__code-line">
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* slow horizontal scan sweep */}
      {!shouldReduceMotion && <div className="cinematic-atmosphere__scan" />}

      {/* corner HUD brackets */}
      <div className="cinematic-atmosphere__corner cinematic-atmosphere__corner--tl" />
      <div className="cinematic-atmosphere__corner cinematic-atmosphere__corner--tr" />
      <div className="cinematic-atmosphere__corner cinematic-atmosphere__corner--bl" />
      <div className="cinematic-atmosphere__corner cinematic-atmosphere__corner--br" />
    </div>
  );
}
