"use client";

import type { ServiceVariant } from "@/lib/content/types";

interface ServiceIconProps {
  variant: ServiceVariant;
  className?: string;
}

/**
 * Custom HUD-style glyphs — clearer and more on-brand than the old 3D blobs.
 */
function Glyph({ variant }: { variant: ServiceVariant }) {
  const stroke = "currentColor";
  const common = {
    fill: "none" as const,
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (variant === "landing") {
    // Conversion target / focused page
    return (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
        <rect x="8" y="6" width="32" height="36" rx="2" {...common} />
        <path d="M8 14h32" {...common} />
        <circle cx="12.5" cy="10" r="1" fill={stroke} stroke="none" />
        <circle cx="16.5" cy="10" r="1" fill={stroke} stroke="none" />
        <path d="M14 22h20M14 28h14" {...common} strokeWidth={1.4} />
        <path
          d="M24 34l3 6h-6l3-6z"
          fill={stroke}
          fillOpacity={0.2}
          stroke={stroke}
          strokeWidth={1.4}
        />
        <path d="M24 20v8" {...common} strokeWidth={1.4} />
      </svg>
    );
  }

  if (variant === "shop") {
    // Storefront + bag
    return (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
        <path d="M10 18h28l-2 20H12L10 18z" {...common} />
        <path d="M16 18V14a8 8 0 0 1 16 0v4" {...common} />
        <path d="M18 28h12" {...common} strokeWidth={1.4} />
        <circle cx="20" cy="34" r="1.2" fill={stroke} stroke="none" />
        <circle cx="28" cy="34" r="1.2" fill={stroke} stroke="none" />
      </svg>
    );
  }

  if (variant === "system") {
    // Connected nodes / system graph
    return (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
        <rect x="18" y="6" width="12" height="10" rx="1.5" {...common} />
        <rect x="6" y="30" width="12" height="10" rx="1.5" {...common} />
        <rect x="30" y="30" width="12" height="10" rx="1.5" {...common} />
        <path d="M24 16v6M24 22L12 30M24 22l12 8" {...common} />
        <circle cx="24" cy="24" r="2.2" fill={stroke} stroke="none" />
      </svg>
    );
  }

  // maintenance — shield + pulse
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
      <path
        d="M24 6l14 5v11c0 9.5-6.2 16.2-14 19-7.8-2.8-14-9.5-14-19V11l14-5z"
        {...common}
      />
      <path d="M16 24h4l3-6 4 12 3-6h2" {...common} strokeWidth={1.6} />
    </svg>
  );
}

export default function ServiceIcon({
  variant,
  className = "",
}: ServiceIconProps) {
  return (
    <div
      className={`service-icon group relative flex h-14 w-14 items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Outer HUD frame */}
      <span className="pointer-events-none absolute inset-0 rounded-sm border border-hud-cyan/20 bg-gradient-to-br from-hud-cyan/[0.08] to-transparent transition-colors duration-300 group-hover:border-hud-cyan/40 group-hover:from-hud-cyan/[0.14]" />
      {/* Corner ticks */}
      <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-hud-cyan/50" />
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-hud-cyan/50" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-hud-cyan/50" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-hud-cyan/50" />
      {/* Soft glow */}
      <span className="pointer-events-none absolute inset-1 rounded-sm bg-hud-cyan/5 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

      <span className="relative text-hud-cyan transition-transform duration-300 group-hover:scale-105 group-hover:text-arc-blue">
        <Glyph variant={variant} />
      </span>
    </div>
  );
}
