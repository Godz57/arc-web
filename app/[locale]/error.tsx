"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error("[ARC WEB]", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-orbitron text-sm uppercase tracking-[0.2em] text-hud-cyan">
        {t("eyebrow")}
      </p>
      <h2 className="font-orbitron text-xl text-chrome">{t("title")}</h2>
      <p className="max-w-md font-rajdhani text-sm text-arc-blue/70">
        {t("body")}
      </p>
      <button
        type="button"
        onClick={reset}
        className="border border-hud-cyan/40 bg-hud-cyan/10 px-5 py-2.5 font-orbitron text-xs uppercase tracking-wider text-hud-cyan"
      >
        {t("retry")}
      </button>
    </div>
  );
}
