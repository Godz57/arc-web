import type { LucideIcon } from "lucide-react";
import { Zap, Layers, Gauge } from "lucide-react";
import { getContent } from "@/lib/content";
import type {
  Service,
  Mission,
  Principle as ContentPrinciple,
  ProcessStep,
  AboutPillar,
  FaqItem,
  ServiceVariant,
  PrincipleIconId,
} from "@/lib/content/types";

export type {
  Service,
  Mission,
  ProcessStep,
  AboutPillar,
  FaqItem,
  ServiceVariant,
  PrincipleIconId,
};

/** UI-facing principle keeps Lucide icon for current consumers */
export interface Principle {
  id: string;
  code: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

const principleIconMap: Record<PrincipleIconId, LucideIcon> = {
  gauge: Gauge,
  zap: Zap,
  layers: Layers,
};

function mapPrinciple(p: ContentPrinciple): Principle {
  return {
    id: p.id,
    code: p.code,
    title: p.title,
    icon: principleIconMap[p.icon],
    description: p.description,
  };
}

// temporary bridge — remove in Task 6 after components migrate
const pt = getContent("pt");

export const services: Service[] = pt.services;
export const featuredMission: Mission = pt.featuredMission;
export const missions: Mission[] = pt.missions;
export const principles: Principle[] = pt.principles.map(mapPrinciple);
export const processSteps: ProcessStep[] = pt.processSteps;
export const aboutPillars: AboutPillar[] = pt.aboutPillars;
export const stackTags: string[] = pt.stackTags;
export const aboutContent = pt.aboutContent;
export const faqItems: FaqItem[] = pt.faqItems;
export const footerNav = pt.footerNav;
export const footerServices = pt.footerServices;
export const defaultWhatsappMessage = pt.defaultWhatsappMessage;

/**
 * Public site contact / social — override via NEXT_PUBLIC_* env vars.
 * Keys must be static (Next.js inlines process.env.NEXT_PUBLIC_* at build).
 */
export const whatsappNumber = (
  process.env.NEXT_PUBLIC_WHATSAPP ?? ""
).trim();

export const siteContact = {
  email: (
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contato@arcweb.com.br"
  ).trim(),
  whatsapp: whatsappNumber,
  github: (
    process.env.NEXT_PUBLIC_GITHUB ?? "https://github.com/Godz57"
  ).trim(),
  linkedin: (
    process.env.NEXT_PUBLIC_LINKEDIN ??
    "https://www.linkedin.com/in/gabriel-lucas-a2662b421"
  ).trim(),
};

export function whatsappUrl(message?: string): string | null {
  if (!whatsappNumber) return null;
  const base = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
