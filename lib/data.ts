import {
  LucideIcon,
  LayoutTemplate,
  ShoppingCart,
  Code2,
  Wrench,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "landing-pages",
    title: "Landing Pages",
    icon: LayoutTemplate,
    description:
      "Páginas de alta conversão com carregamento rápido, SEO afiado e micro‑interações que guiam o usuário até a ação.",
    features: [
      "Copy e layout orientados à conversão",
      "Performance Core Web Vitals",
      "Analytics e tags de rastreamento",
      "Entrega em até 7 dias",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    icon: ShoppingCart,
    description:
      "Lojas virtuais robustas, seguras e escaláveis, integradas aos principais gateways e marketplaces do mercado.",
    features: [
      "Catálogo e estoque inteligente",
      "Checkout otimizado",
      "Integração com Stripe / Mercado Pago",
      "Painel administrativo customizado",
    ],
  },
  {
    id: "sistemas-web",
    title: "Sistemas Web",
    icon: Code2,
    description:
      "Aplicações sob medida: dashboards, CRMs, ERPs leves e ferramentas internas que automatizam processos reais.",
    features: [
      "Autenticação e permissões",
      "Banco de dados e APIs REST/GraphQL",
      "Relatórios e exportações",
      "Arquitetura escalável",
    ],
  },
  {
    id: "manutencao",
    title: "Manutenção",
    icon: Wrench,
    description:
      "Suporte contínuo, atualizações de segurança, backups e pequenas evoluções para manter seu site sempre online.",
    features: [
      "Monitoramento 24/7",
      "Backups automatizados",
      "Correções e ajustes mensais",
      "Relatório de saúde do projeto",
    ],
  },
];

export interface Mission {
  id: string;
  mark: string;
  name: string;
  type: string;
  status: "DEPLOYED" | "IN DEVELOPMENT" | "ARCHIVED";
  description: string;
}

export const missions: Mission[] = [
  {
    id: "mark-i",
    mark: "MARK I",
    name: "Primeira Armadura",
    type: "Landing Page",
    status: "DEPLOYED",
    description:
      "Protótipo de alta resistência: primeira vitrine digital, forjada sob pressão e entregue no prazo.",
  },
  {
    id: "mark-ii",
    mark: "MARK II",
    name: "Voo Estável",
    type: "Site Institucional",
    status: "DEPLOYED",
    description:
      "Estrutura leve e aerodinâmica: site corporativo com animações refinadas e navegação fluida.",
  },
  {
    id: "mark-iii",
    mark: "MARK III",
    name: "Batalha Real",
    type: "E-commerce",
    status: "DEPLOYED",
    description:
      "Armadura de combate: loja virtual com checkout enxuto e conversão acima da média do setor.",
  },
  {
    id: "mark-iv",
    mark: "MARK IV",
    name: "Suitcase Protocol",
    type: "SaaS",
    status: "DEPLOYED",
    description:
      "Sistema portátil e modular: dashboard administrativo com autenticação e relatórios em tempo real.",
  },
  {
    id: "mark-v",
    mark: "MARK V",
    name: "Red Snapper",
    type: "App Web",
    status: "DEPLOYED",
    description:
      "Design compacto e responsivo: PWA com notificações push e experiência mobile nativa.",
  },
  {
    id: "mark-vi",
    mark: "MARK VI",
    name: "New Element",
    type: "Plataforma",
    status: "IN DEVELOPMENT",
    description:
      "Próxima geração: plataforma completa com IA assistiva, integrações e escala enterprise.",
  },
];

export interface Testimonial {
  id: string;
  missionId: string;
  name: string;
  role: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "report-01",
    missionId: "FIELD REPORT #042",
    name: "Ana Costa",
    role: "Product Manager",
    quote:
      "O site entregue superou todas as expectativas. A atenção aos detalhes de interação fez nossa marca parecer de verdade do futuro.",
  },
  {
    id: "report-02",
    missionId: "FIELD REPORT #118",
    name: "Ricardo Lima",
    role: "CEO, Startup Tech",
    quote:
      "Profissionalismo, velocidade e um olhar impecável para UX. O resultado foi um sistema que nossos clientes adoram usar.",
  },
  {
    id: "report-03",
    missionId: "FIELD REPORT #207",
    name: "Marina Souza",
    role: "Diretora de Marketing",
    quote:
      "Desde o briefing até o deploy, tudo foi transparente. O novo e-commerce elevou nossa conversão em 40% no primeiro mês.",
  },
];

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "briefing",
    title: "Briefing",
    description:
      "Mapeamos objetivos, público e métricas de sucesso para garantir que cada pixel tenha propósito.",
  },
  {
    id: "design",
    title: "Design",
    description:
      "Criamos wireframes e interfaces de alta fidelidade com foco em identidade, usabilidade e impacto visual.",
  },
  {
    id: "build",
    title: "Build",
    description:
      "Desenvolvimento com código limpo, componentizado e otimizado para performance, SEO e acessibilidade.",
  },
  {
    id: "launch",
    title: "Launch",
    description:
      "Deploy, testes finais, integrações e acompanhamento pós‑publicação para uma entrada em campo impecável.",
  },
];

export interface OperatorStat {
  label: string;
  value: number;
  max: number;
  unit?: string;
}

export const operatorStats: OperatorStat[] = [
  { label: "Anos de experiência", value: 8, max: 10 },
  { label: "Projetos entregues", value: 47, max: 60 },
  { label: "Tecnologias dominadas", value: 23, max: 30 },
  { label: "Clientes satisfeitos", value: 36, max: 50 },
];
