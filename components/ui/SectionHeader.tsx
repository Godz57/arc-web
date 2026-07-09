interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      {label && (
        <span className="mb-3 inline-block font-rajdhani text-xs uppercase tracking-[0.3em] text-hud-cyan/80">
          {label}
        </span>
      )}
      <h2 className="font-orbitron text-3xl font-bold text-chrome text-glow-chrome md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-rajdhani text-lg text-arc-blue/70">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-6 flex h-[1px] w-24 items-center justify-center bg-gradient-to-r from-transparent via-hud-cyan/50 to-transparent" />
    </div>
  );
}
