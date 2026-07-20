import type { Locale } from "@/i18n/routing";
import type { SiteContent } from "./types";
import { content as pt } from "./pt";
import { content as en } from "./en";

const byLocale: Record<Locale, SiteContent> = { pt, en };

export function getContent(locale: Locale): SiteContent {
  return byLocale[locale];
}

export type { SiteContent } from "./types";
