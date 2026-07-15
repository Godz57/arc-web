/**
 * Wordmark unificado: o monograma É o "A" de ARC WEB → [mark]RC WEB
 * Mark: transparent PNG. Tipo: Outfit light (mesma pegada geométrica).
 */
import Image from "next/image";
import { Outfit } from "next/font/google";

const wordmarkFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

type LogoProps = {
  /** mark = monogram only; lockup = monogram-as-A + "RC WEB" */
  variant?: "mark" | "lockup";
  className?: string;
  /** Height of the mark in px */
  size?: number;
  title?: string;
};

const MARK_SRC = "/brand/mark-a-core.png";

export default function Logo({
  variant = "lockup",
  className = "",
  size = 28,
  title = "ARC WEB",
}: LogoProps) {
  const markBox = size;

  const mark = (
    <span
      className="relative shrink-0 overflow-hidden"
      style={{ width: markBox, height: markBox }}
      aria-hidden={variant === "lockup" ? true : undefined}
    >
      <Image
        src={MARK_SRC}
        alt={variant === "mark" ? title : ""}
        width={markBox * 2}
        height={markBox * 2}
        className="h-full w-full scale-[1.55] object-contain object-center"
        priority
        unoptimized
      />
    </span>
  );

  if (variant === "mark") {
    return (
      <span className={`inline-flex items-center ${className}`} title={title}>
        {mark}
      </span>
    );
  }

  // Monogram = "A" → rest of wordmark is "RC WEB"
  const typeSize = Math.max(13, size * 0.58);
  const gapPull = Math.round(size * 0.12);

  return (
    <span
      className={`inline-flex items-center ${className}`}
      aria-label={title}
      title={title}
    >
      {mark}
      <span
        className={`${wordmarkFont.className} text-chrome/90 transition-colors group-hover:text-chrome`}
        style={{
          fontSize: typeSize,
          fontWeight: 300,
          letterSpacing: "0.22em",
          marginLeft: -gapPull,
          lineHeight: 1,
          paddingBottom: 1,
        }}
      >
        RC&nbsp;WEB
      </span>
    </span>
  );
}
