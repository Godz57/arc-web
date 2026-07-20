"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { playHud } from "@/lib/audio";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    playHud("click");
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className="flex items-center gap-1.5 font-rajdhani text-[11px] uppercase tracking-[0.16em]"
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((code, index) => {
        const active = code === locale;
        return (
          <span key={code} className="flex items-center gap-1.5">
            {index > 0 && (
              <span className="text-arc-blue/25 select-none" aria-hidden>
                |
              </span>
            )}
            <button
              type="button"
              onClick={() => switchTo(code)}
              className={
                active
                  ? "text-hud-cyan"
                  : "text-arc-blue/45 transition-colors hover:text-arc-blue/80"
              }
              aria-pressed={active}
            >
              {t(code)}
            </button>
          </span>
        );
      })}
    </div>
  );
}
