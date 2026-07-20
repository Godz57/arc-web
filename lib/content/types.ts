export type ServiceVariant = "landing" | "shop" | "system" | "wrench";

export interface Service {
  id: string;
  title: string;
  /** Glyph variant for ServiceIcon */
  mesh: ServiceVariant;
  description: string;
  features: string[];
}

export interface Mission {
  id: string;
  mark: string;
  name: string;
  type: string;
  status: "CONCEPT" | "PROTOTYPE" | "IN ASSEMBLY" | "LIVE";
  description: string;
  stack: string[];
  /** Highlighted as real proof (this site), not a conceptual claim */
  featured?: boolean;
  href?: string;
}

export type PrincipleIconId = "gauge" | "zap" | "layers";

export interface Principle {
  id: string;
  code: string;
  title: string;
  icon: PrincipleIconId;
  description: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  /** Piece index in the 3D suit assembly (0–3) */
  piece: number;
}

export interface AboutPillar {
  id: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteContent {
  services: Service[];
  featuredMission: Mission;
  missions: Mission[];
  principles: Principle[];
  processSteps: ProcessStep[];
  aboutPillars: AboutPillar[];
  stackTags: string[];
  aboutContent: {
    name: string;
    role: string;
    photo: string;
    lead: string;
    body: string;
  };
  faqItems: FaqItem[];
  footerNav: { label: string; href: string }[];
  footerServices: { label: string; href: string }[];
  defaultWhatsappMessage: string;
}
