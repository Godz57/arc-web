import type { SiteContent } from "./types";

export const content: SiteContent = {
  services: [
    {
      id: "landing-pages",
      title: "Landing Pages",
      mesh: "landing",
      description:
        "High-conversion pages with fast load, sharp SEO, and micro-interactions that guide users to action.",
      features: [
        "Conversion-oriented copy and layout",
        "Core Web Vitals performance",
        "Analytics and tracking tags",
        "Fast delivery with visual polish",
      ],
    },
    {
      id: "ecommerce",
      title: "E-commerce",
      mesh: "shop",
      description:
        "Robust, secure, and scalable online stores integrated with major payment gateways and checkout flows.",
      features: [
        "Smart catalog and inventory",
        "Optimized checkout",
        "Stripe / Mercado Pago integration",
        "Custom admin panel",
      ],
    },
    {
      id: "sistemas-web",
      title: "Web Systems",
      mesh: "system",
      description:
        "Custom applications: dashboards, CRMs, lightweight ERPs, and internal tools that automate real processes.",
      features: [
        "Authentication and permissions",
        "Databases and REST/GraphQL APIs",
        "Reports and exports",
        "Scalable architecture",
      ],
    },
    {
      id: "manutencao",
      title: "Maintenance",
      mesh: "wrench",
      description:
        "Ongoing support, security updates, backups, and small improvements to keep your site always online.",
      features: [
        "Continuous monitoring",
        "Automated backups",
        "Monthly fixes and tweaks",
        "Project health report",
      ],
    },
  ],

  featuredMission: {
    id: "arc-web",
    mark: "CORE",
    name: "ARC WEB",
    type: "Studio site · living proof",
    status: "LIVE",
    featured: true,
    href: "#hero",
    description:
      "The very site you are viewing. Cinematic boot sequence, interactive 3D reactor, HUD system, motion-driven sections, and a real contact form — end-to-end performance and polish. Not a mockup: the product running live.",
    stack: ["Next.js", "React Three Fiber", "Framer Motion", "Tailwind", "TypeScript"],
  },

  missions: [
    {
      id: "mark-i",
      mark: "MARK I",
      name: "First Light",
      type: "Product Landing",
      status: "CONCEPT",
      description:
        "Showcase prototype with an immersive hero, calibrated CTAs, and micro-interactions that guide conversion.",
      stack: ["Next.js", "Framer Motion", "SEO"],
    },
    {
      id: "mark-ii",
      mark: "MARK II",
      name: "Command Deck",
      type: "Institutional Site",
      status: "CONCEPT",
      description:
        "Light, aerodynamic structure: section navigation, brand system, and layered HUD brand storytelling.",
      stack: ["Next.js", "Tailwind", "GSAP"],
    },
    {
      id: "mark-iii",
      mark: "MARK III",
      name: "Supply Line",
      type: "E-commerce Concept",
      status: "PROTOTYPE",
      description:
        "Digital combat armor: product grid, cart flow, and lean checkout in a sci-fi interface.",
      stack: ["Next.js", "Stripe UI", "R3F"],
    },
    {
      id: "mark-iv",
      mark: "MARK IV",
      name: "Ops Console",
      type: "Dashboard / SaaS",
      status: "PROTOTYPE",
      description:
        "Modular system: panel with mock auth, real-time metrics, and dense data components.",
      stack: ["React", "Charts", "Auth mock"],
    },
    {
      id: "mark-v",
      mark: "MARK V",
      name: "Field Unit",
      type: "PWA Mobile-First",
      status: "CONCEPT",
      description:
        "Field unit: extreme responsive layout, gestures, and native feel in the browser.",
      stack: ["PWA", "Touch UX", "Offline"],
    },
    {
      id: "mark-vi",
      mark: "MARK VI",
      name: "New Element",
      type: "Platform",
      status: "IN ASSEMBLY",
      description:
        "Next generation: platform vision with assistive AI, integrations, and scale — actively in assembly.",
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
        "Beauty without FPS is just a dead render. Every animation and 3D model is tuned to run clean on real devices.",
    },
    {
      id: "principle-02",
      code: "DIR‑02",
      title: "Interaction as Product",
      icon: "zap",
      description:
        "The site is not an animated PDF. Hover, scroll, and tactile feedback are part of the value prop — and the skill proof.",
    },
    {
      id: "principle-03",
      code: "DIR‑03",
      title: "Ship with Polish",
      icon: "layers",
      description:
        "From boot sequence to form: HUD corners, error states, and empty states. Detail is the differentiator that closes the deal.",
    },
  ],

  processSteps: [
    {
      id: "briefing",
      title: "Briefing",
      description:
        "We map goals, audience, and success metrics so every pixel has a purpose.",
      piece: 0,
    },
    {
      id: "design",
      title: "Design",
      description:
        "We create high-fidelity wireframes and interfaces focused on identity, usability, and visual impact.",
      piece: 1,
    },
    {
      id: "build",
      title: "Build",
      description:
        "Development with clean, componentized code optimized for performance, SEO, and accessibility.",
      piece: 2,
    },
    {
      id: "launch",
      title: "Launch",
      description:
        "Deploy, final tests, integrations, and post-launch support for a flawless field entry.",
      piece: 3,
    },
  ],

  aboutPillars: [
    {
      id: "craft",
      title: "Intentional design",
      description:
        "Every screen has hierarchy, rhythm, and a goal. Strong visuals without sacrificing clarity or conversion.",
    },
    {
      id: "engineering",
      title: "Code that scales",
      description:
        "Next.js, reusable components, and real performance — the site must load well on the client's phone.",
    },
    {
      id: "experience",
      title: "Memorable interaction",
      description:
        "Micro-animations, 3D when it makes sense, and details that make the brand feel next-level.",
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
    role: "Front-end developer & immersive interfaces",
    photo: "/gabriel-almeida.jpg",
    lead:
      "I build sites and digital products that combine cinematic aesthetics with serious engineering. ARC WEB is the studio — this site is the proof.",
    body:
      "I work from briefing to deploy: structure, design, development, and polish. No generic templates, no empty jargon — results that impress and perform.",
  },

  faqItems: [
    {
      id: "faq-01",
      question: "How long does a website project take?",
      answer:
        "It depends on scope. A focused landing page usually ships in 1–3 weeks. Institutional sites and custom systems take 4 to 10+ weeks. In the briefing we align on a realistic timeline before any line of code.",
    },
    {
      id: "faq-02",
      question: "How does web development investment work?",
      answer:
        "Every project is quoted to fit — there is no generic fixed price list. After the briefing you get clear scope, timeline, and cost. No mid-project surprises; scope changes are discussed and re-quoted.",
    },
    {
      id: "faq-03",
      question: "Do you only build sci-fi / 3D sites?",
      answer:
        "No. ARC WEB's look is the studio identity and technical proof. Your project can be clean, corporate, e-commerce, or a dashboard — what matters is design intention, performance, and conversion, in the style the brand needs.",
    },
    {
      id: "faq-04",
      question: "Do I need texts, logo, and content ready?",
      answer:
        "It helps, but it is not a blocker. We can start from a brief and build structure with placeholder copy, or guide what is missing. The more material up front, the faster go-live.",
    },
    {
      id: "faq-05",
      question: "What happens after launch?",
      answer:
        "Deploy, basic SEO checklist, and handoff. If you want, there is a maintenance plan: security, small tweaks, and continuous evolution. The site does not have to become a dead file in the air.",
    },
    {
      id: "faq-06",
      question: "Does ARC WEB only serve Brasília?",
      answer:
        "No. The base is Brazil's Federal District, but service is remote Brazil-wide. Briefing, design, and development run online; what matters is scope clarity and communication, not the ZIP code. International projects are evaluated case by case.",
    },
    {
      id: "faq-07",
      question: "Does the site include SEO and performance?",
      answer:
        "Yes, as a craft baseline: indexable structure, meta tags, Core Web Vitals, and clean Next.js code. Advanced SEO (scaled content, link building, ongoing Search Console) can be part of scope or monthly maintenance.",
    },
  ],

  footerNav: [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Missions", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],

  footerServices: [
    { label: "Landing Pages", href: "#services" },
    { label: "E-commerce", href: "#services" },
    { label: "Web Systems", href: "#services" },
    { label: "Maintenance", href: "#services" },
  ],

  defaultWhatsappMessage: "Hello! I want to start a project with ARC WEB.",
};
