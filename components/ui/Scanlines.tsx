interface ScanlinesProps {
  className?: string;
  opacity?: number;
}

export default function Scanlines({
  className = "",
  opacity = 0.06,
}: ScanlinesProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.08) 2px, rgba(0, 212, 255, 0.08) 4px)",
        }}
      />
    </div>
  );
}
