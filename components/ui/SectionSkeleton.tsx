"use client";

import { useTranslations } from "next-intl";

interface SectionSkeletonProps {
  id?: string;
  className?: string;
}

export default function SectionSkeleton({
  id,
  className = "",
}: SectionSkeletonProps) {
  const t = useTranslations("Common");

  return (
    <section
      id={id}
      className={`relative min-h-[50vh] animate-pulse py-24 md:min-h-[60vh] md:py-32 ${className}`}
      aria-busy="true"
      aria-label={t("loadingSection")}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mx-auto mb-4 h-3 w-24 rounded bg-hud-cyan/20" />
          <div className="mx-auto h-8 w-3/4 rounded bg-titan-gold/20 md:h-10" />
          <div className="mx-auto mt-4 h-4 w-2/3 rounded bg-arc-blue/10" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="relative h-64 rounded-sm border border-hud-cyan/10 bg-carbon/50 p-6"
            >
              <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-hud-cyan/30" />
              <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-hud-cyan/30" />
              <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-l-2 border-b-2 border-hud-cyan/30" />
              <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-hud-cyan/30" />
              <div className="h-10 w-10 rounded-sm bg-hud-cyan/10" />
              <div className="mt-5 h-5 w-1/2 rounded bg-titan-gold/15" />
              <div className="mt-4 h-3 w-full rounded bg-arc-blue/10" />
              <div className="mt-2 h-3 w-5/6 rounded bg-arc-blue/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
