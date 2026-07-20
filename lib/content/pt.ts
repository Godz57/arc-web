import type { SiteContent } from "./types";

export const content: SiteContent = {
  services: [
    {
      id: "landing-pages",
      title: "Landing Pages",
      mesh: "landing",
      description:
        "Páginas de alta conversão com carregamento rápido, SEO afiado e micro‑interações que guiam o usuário até a ação.",
      features: [
        "Copy e layout orientados à conversão",
        "Performance Core Web Vitals",
        "Analytics e tags de rastreamento",
        "Entrega ágil com polish visual",
      ],
    },
    {
      id: "ecommerce",
      title: "E-commerce",
      mesh: "shop",
      description:
        "Lojas virtuais robustas, seguras e escaláveis, integradas aos principais gateways e fluxos de checkout.",
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
      mesh: "system",
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
      mesh: "wrench",
      description:
        "Suporte contínuo, atualizações de segurança, backups e pequenas evoluções para manter seu site sempre online.",
      features: [
        "Monitoramento contínuo",
        "Backups automatizados",
        "Correções e ajustes mensais",
        "Relatório de saúde do projeto",
      ],
    },
  ],

  featuredMission: {
    id: "arc-web",
    mark: "CORE",
    name: "ARC WEB",
    type: "Site do estúdio · prova viva",
    status: "LIVE",
    featured: true,
    href: "#hero",
    description:
      "O próprio site que você está vendo. Boot sequence cinematográfico, reator 3D interativo, sistema HUD, seções com motion e formulário de contato real — performance e polish de ponta a ponta. Não é mockup: é o produto rodando.",
    stack: ["Next.js", "React Three Fiber", "Framer Motion", "Tailwind", "TypeScript"],
  },

  missions: [
    {
      id: "mark-i",
      mark: "MARK I",
      name: "First Light",
      type: "Landing de Produto",
      status: "CONCEPT",
      description:
        "Protótipo de vitrine com hero imersivo, CTA calibrado e micro‑interações que guiam a conversão.",
      stack: ["Next.js", "Framer Motion", "SEO"],
    },
    {
      id: "mark-ii",
      mark: "MARK II",
      name: "Command Deck",
      type: "Site Institucional",
      status: "CONCEPT",
      description:
        "Estrutura leve e aerodinâmica: navegação por seções, brand system e narrativa de marca em camadas HUD.",
      stack: ["Next.js", "Tailwind", "GSAP"],
    },
    {
      id: "mark-iii",
      mark: "MARK III",
      name: "Supply Line",
      type: "E-commerce Conceito",
      status: "PROTOTYPE",
      description:
        "Armadura de combate digital: grid de produtos, fluxo de cart e checkout enxuto em interface sci‑fi.",
      stack: ["Next.js", "Stripe UI", "R3F"],
    },
    {
      id: "mark-iv",
      mark: "MARK IV",
      name: "Ops Console",
      type: "Dashboard / SaaS",
      status: "PROTOTYPE",
      description:
        "Sistema modular: painel com autenticação mock, métricas em tempo real e componentes de dados densos.",
      stack: ["React", "Charts", "Auth mock"],
    },
    {
      id: "mark-v",
      mark: "MARK V",
      name: "Field Unit",
      type: "PWA Mobile‑First",
      status: "CONCEPT",
      description:
        "Unidade de campo: layout responsivo extremo, gestos e sensação nativa em browser.",
      stack: ["PWA", "Touch UX", "Offline"],
    },
    {
      id: "mark-vi",
      mark: "MARK VI",
      name: "New Element",
      type: "Plataforma",
      status: "IN ASSEMBLY",
      description:
        "Próxima geração: visão de plataforma com IA assistiva, integrações e escala — em montagem ativa.",
      stack: ["Next.js", "3D", "AI UX"],
    },
  ],

  principles: [
    {
      id: "principle-01",
      code: "DIR‑01",
      title: "Performance First",
      icon: "gauge",
      description:
        "Beleza sem FPS é só render morto. Cada animação e modelo 3D é calibrado para rodar limpo em dispositivos reais.",
    },
    {
      id: "principle-02",
      code: "DIR‑02",
      title: "Interaction as Product",
      icon: "zap",
      description:
        "O site não é um PDF animado. Hover, scroll e feedback tátil fazem parte da proposta de valor — e da prova de skill.",
    },
    {
      id: "principle-03",
      code: "DIR‑03",
      title: "Ship with Polish",
      icon: "layers",
      description:
        "Do boot sequence ao formulário: cantos HUD, estados de erro e empty states. O detalhe é o diferencial que fecha o deal.",
    },
  ],

  processSteps: [
    {
      id: "briefing",
      title: "Briefing",
      description:
        "Mapeamos objetivos, público e métricas de sucesso para garantir que cada pixel tenha propósito.",
      piece: 0,
    },
    {
      id: "design",
      title: "Design",
      description:
        "Criamos wireframes e interfaces de alta fidelidade com foco em identidade, usabilidade e impacto visual.",
      piece: 1,
    },
    {
      id: "build",
      title: "Build",
      description:
        "Desenvolvimento com código limpo, componentizado e otimizado para performance, SEO e acessibilidade.",
      piece: 2,
    },
    {
      id: "launch",
      title: "Launch",
      description:
        "Deploy, testes finais, integrações e acompanhamento pós‑publicação para uma entrada em campo impecável.",
      piece: 3,
    },
  ],

  aboutPillars: [
    {
      id: "craft",
      title: "Design com intenção",
      description:
        "Cada tela tem hierarquia, ritmo e um objetivo. Visual forte sem sacrificar clareza ou conversão.",
    },
    {
      id: "engineering",
      title: "Código que escala",
      description:
        "Next.js, componentes reutilizáveis e performance real — o site precisa carregar bem no celular do cliente.",
    },
    {
      id: "experience",
      title: "Interação memorável",
      description:
        "Microanimações, 3D quando faz sentido e detalhes que fazem a marca parecer de outro nível.",
    },
  ],

  stackTags: [
    "Next.js",
    "React",
    "TypeScript",
    "Three.js",
    "GSAP",
    "Tailwind",
    "Node",
    "SEO",
  ],

  aboutContent: {
    name: "Gabriel Almeida",
    role: "Desenvolvedor front‑end & interfaces imersivas",
    photo: "/gabriel-almeida.jpg",
    lead:
      "Crio sites e produtos digitais que unem estética de cinema com engenharia séria. A ARC WEB é o estúdio — este site é a prova de conceito.",
    body:
      "Trabalho do briefing ao deploy: estrutura, design, desenvolvimento e polish. Sem template genérico, sem jargão vazio — resultado que impressiona e performa.",
  },

  faqItems: [
    {
      id: "faq-01",
      question: "Quanto tempo leva um projeto de criação de site?",
      answer:
        "Depende do escopo. Uma landing focada costuma sair em 1–3 semanas. Sites institucionais e sistemas sob medida levam de 4 a 10+ semanas. No briefing alinhamos prazo realista antes de qualquer linha de código.",
    },
    {
      id: "faq-02",
      question: "Como funciona o investimento em desenvolvimento web?",
      answer:
        "Cada projeto é orçado sob medida — não há tabela fixa genérica. Depois do briefing você recebe escopo, prazo e valor claros. Sem surpresa no meio do caminho; mudanças de escopo são conversadas e re‑orçadas.",
    },
    {
      id: "faq-03",
      question: "Só fazem sites com visual sci‑fi / 3D?",
      answer:
        "Não. O visual da ARC WEB é a identidade do estúdio e a prova técnica. O seu projeto pode ser clean, corporativo, e‑commerce ou dashboard — o que importa é intenção de design, performance e conversão, no estilo que a marca precisa.",
    },
    {
      id: "faq-04",
      question: "Preciso ter textos, logo e conteúdo prontos?",
      answer:
        "Ajuda, mas não é bloqueio. Podemos partir de um brief e construir a estrutura com copy de placeholder, ou orientar o que falta. Quanto mais material no início, mais rápido o go‑live.",
    },
    {
      id: "faq-05",
      question: "E depois do lançamento do site?",
      answer:
        "Deploy, checklist de SEO básico e handoff. Se quiser, há plano de manutenção: segurança, pequenos ajustes e evolução contínua. O site não precisa virar um arquivo morto no ar.",
    },
    {
      id: "faq-06",
      question: "A ARC WEB atende só em Brasília?",
      answer:
        "Não. A base é o Distrito Federal, mas o atendimento é remoto em todo o Brasil. Briefing, design e desenvolvimento rodam online; o que importa é clareza de escopo e comunicação, não o CEP.",
    },
    {
      id: "faq-07",
      question: "O site inclui SEO e performance?",
      answer:
        "Sim, como base do craft: estrutura indexável, meta tags, Core Web Vitals e código limpo em Next.js. SEO avançado (conteúdo em escala, link building, Search Console contínuo) pode entrar no escopo ou em manutenção mensal.",
    },
  ],

  footerNav: [
    { label: "Início", href: "#hero" },
    { label: "Serviços", href: "#services" },
    { label: "Missões", href: "#portfolio" },
    { label: "Processo", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contact" },
  ],

  footerServices: [
    { label: "Landing Pages", href: "#services" },
    { label: "E-commerce", href: "#services" },
    { label: "Sistemas Web", href: "#services" },
    { label: "Manutenção", href: "#services" },
  ],

  defaultWhatsappMessage: "Olá! Quero iniciar um projeto com a ARC WEB.",

  privacy: {
    updated: "11 de julho de 2026",
    metaTitle: "Política de Privacidade",
    metaDescription:
      "Como a ARC WEB trata dados pessoais coletados pelo site, formulário de contato e analytics.",
    sections: [
      {
        id: "who",
        title: "1. Quem somos",
        paragraphs: [
          "A ARC WEB ({{siteHost}}) é um estúdio de desenvolvimento web. Responsável pelo tratamento: Gabriel Almeida — contato: {{email}}.",
        ],
      },
      {
        id: "data",
        title: "2. Quais dados coletamos",
        paragraphs: [
          "• Formulário de contato: nome, e-mail, tipo de projeto e mensagem que você envia.",
          "• WhatsApp: se você clicar para conversar, a conversa ocorre no app da Meta; não armazenamos o histórico no site.",
          "• Dados de navegação: páginas visitadas, dispositivo, origem aproximada do tráfego e eventos (ex.: envio de formulário), via Google Analytics 4 e Google Tag Manager.",
          "• Publicidade (quando ativa): se você chega por anúncios Google Ads, cookies/identificadores podem ser usados para medir conversões e otimizar campanhas.",
        ],
      },
      {
        id: "purpose",
        title: "3. Para que usamos",
        paragraphs: [
          "• Responder pedidos de briefing e orçamento",
          "• Entregar e melhorar serviços de desenvolvimento web",
          "• Medir desempenho do site e campanhas de marketing",
          "• Cumprir obrigações legais quando aplicável",
          "Base legal principal (LGPD): execução de medidas pré-contratuais a pedido do titular e legítimo interesse em analytics/segurança, com minimização de dados.",
        ],
      },
      {
        id: "cookies",
        title: "4. Cookies e ferramentas de terceiros",
        paragraphs: [
          "Utilizamos, entre outras:",
          "• Google Analytics 4 (medição de audiência e eventos)",
          "• Google Tag Manager (gestão de tags)",
          "• Google Ads (quando houver campanhas ativas)",
          "• Web3Forms / provedor de formulário (envio da mensagem)",
          "Você pode bloquear cookies no navegador; isso pode limitar funcionalidades de medição. Políticas dos provedores: Google Privacy (https://policies.google.com/privacy).",
        ],
      },
      {
        id: "sharing",
        title: "5. Compartilhamento",
        paragraphs: [
          "Não vendemos dados pessoais. Compartilhamos apenas com processadores necessários (hospedagem, e-mail/formulário, analytics/ads) sob obrigação de confidencialidade e conforme a finalidade acima.",
        ],
      },
      {
        id: "retention",
        title: "6. Retenção e segurança",
        paragraphs: [
          "Mensagens de contato são mantidas pelo tempo necessário para atendimento e eventual relação comercial. Dados de analytics seguem as retenções configuradas no Google Analytics. Adotamos medidas razoáveis de segurança (HTTPS, controle de acesso).",
        ],
      },
      {
        id: "rights",
        title: "7. Seus direitos (LGPD)",
        paragraphs: [
          "Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade ou eliminação dos dados, quando cabível, pelo e-mail {{email}}. Também pode reclamar à ANPD.",
        ],
      },
      {
        id: "contact",
        title: "8. Contato",
        paragraphs: [
          "Dúvidas sobre privacidade: {{email}}. Site: {{siteHost}}.",
        ],
      },
    ],
  },
};
