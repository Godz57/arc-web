# ARC WEB — Plano Mestre de Implementação

> Site de captação de leads para agência/dev freelance. Estética da armadura do Homem de Ferro (HUD holográfico). Nível Awwwards: interativo, "vivo", 3D real.

---

## 📌 DECISÕES APROVADAS

| Item | Decisão |
|---|---|
| **Marca** | ARC WEB |
| **Objetivo** | Captar clientes pra contratarem você pra fazer sites |
| **Stack** | Next.js 14 + React Three Fiber + Drei + postprocessing (Bloom) + GSAP + Tailwind + Framer Motion |
| **Coder** | Kimi K2.7 Code (peer `agent-PBACHT`) |
| **Planner** | MiniMax M3 (este terminal) |
| **Portfólio** | Placeholders holográficos (missões MARK I-VI) |
| **Domínio** | Ainda não → build local, deploy-ready Vercel |
| **Diretório** | `C:/Users/Gabriel/Desktop/Projetos/arc-web` |

---

## 🎨 IDENTIDADE VISUAL

### Paleta (Tailwind custom keys)
- `titan-gold` #d4af37 → estruturas, logo, bordas
- `hud-cyan` #00d4ff → glow, dados, interativo
- `arc-blue` #a8e6ff → núcleo pulsante, CTAs
- `red-alert` #ff3b3b → avisos, hover crítico
- `carbon` #0a0e14 → fundo, profundidade

### Tipografia
- **Orbitron** → títulos HUD (next/font)
- **Rajdhani** → corpo de texto (next/font)

### Padrões visuais OBRIGATÓRIOS (nível sênior)
- Canvas 3D com `ACESFilmic` tone mapping + **Bloom** (intensity ~1.5, luminanceThreshold ~0.2) → glow REAL, não box-shadow fake
- Cantos HUD nos cards: 4 marcações em L nos cantos (pseudo-elementos) em `hud-cyan`
- Scanlines sutis (`repeating-linear-gradient`) em overlays
- Grid de fundo tipo blueprint, bem sutil
- Glassmorphism moderado (backdrop-blur + borda cyan 10% opacity)
- Micro-animações em TODO elemento hover (scale, glow, border sweep)
- Responsivo: mobile desativa cursor custom + reduz canvas 3D
- Acessibilidade: `prefers-reduced-motion` → pular boot + animações pesadas

---

## 🏗️ ESTRUTURA DO SITE (8 seções)

1. **BootSequence** — tela preta → diagnóstico rolando → arc reactor "liga" → HUD monta peça por peça. Só na 1ª visita (`localStorage` flag `arc_booted`).
2. **Hero / "Power Core"** — arc reactor 3D pulsante central (Three.js + Bloom), reage ao mouse (parallax) e clique (power-up). Tagline: *"Construo sites que parecem tecnologia do futuro"*. CTA "Establish Uplink" → scroll contato.
3. **About / "Operator Profile"** — ficha técnica estilo armadura: stats (anos, projetos, stack) com barras animadas HUD.
4. **Services / "Capabilities"** — 4 módulos holográficos: Landing Pages, E-commerce, Sistemas Web, Manutenção. Cards tilt + glow + bordas HUD.
5. **Portfolio / "Mission Log"** — 6 placeholders holográficos (MARK I..VI). Tilt no hover, scanline overlay.
6. **Process / "Assembly Protocol"** — 4 etapas com animação suit-up ao scroll: Briefing → Design → Build → Launch.
7. **Testimonials / "Field Reports"** — 3 depoimentos placeholder estilo relatório de missão.
8. **Contact / "Establish Uplink"** — formulário (nome, email, projeto, mensagem) estilizado terminal. Validação zod. Submit → "TRANSMISSION SENT" (sem backend, só UX state).

### Componentes globais
- `HUDOverlay` fixo: horas em tempo real, coords cursor, "SYSTEM ONLINE", FPS-like badge
- `CursorCustomizado`: retículo (mira) que cresce sobre elementos interativos
- `Navbar` HUD com logo ARC WEB em Titan Gold
- `Footer` minimalista (copyright + links sociais placeholder)
- Botão **mute** (sons HUD opcionais via Web Audio API, começa mutado)

---

## 📂 ESTRUTURA DE PASTAS

```
arc-web/
├── app/
│   ├── layout.tsx          # raiz: fontes, HUDOverlay, Navbar, Footer, bg
│   ├── page.tsx            # monta todas as seções em ordem
│   └── globals.css         # tailwind + vars + scrollbar HUD
├── components/
│   ├── three/
│   │   ├── ArcReactor.tsx  # 3D reactor + bloom
│   │   └── Scene.tsx       # Canvas wrapper, lights, postprocessing
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HUDOverlay.tsx
│   │   └── CursorCustomizado.tsx
│   ├── sections/
│   │   ├── BootSequence.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Process.tsx
│   │   ├── Testimonials.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── HudCard.tsx     # card com cantos L + tilt
│       ├── HudButton.tsx   # botão com sweep
│       └── Scanlines.tsx   # overlay reutilizável
├── lib/
│   └── data.ts             # conteúdo (services, portfolio, testimonials)
├── public/
│   └── favicon.ico         # arc reactor
├── tailwind.config.ts      # paleta + fontes
└── package.json
```

---

## 🪜 FASES PASSO-A-PASSO

### FASE 1 — Setup & Fundação
**Passos:**
1. `cd C:/Users/Gabriel/Desktop/Projetos`
2. `npx create-next-app@latest arc-web` (TS, Tailwind, App Router, ESLint, src/ = NÃO, import alias `@/*`)
3. `cd arc-web`
4. Instalar deps: `npm i three @react-three/fiber @react-three/drei @react-three/postprocessing gsap @gsap/react framer-motion lucide-react react-hook-form zod @hookform/resolvers`
5. Configurar `tailwind.config.ts` com a paleta (5 cores) + fontes Orbitron/Rajdhani
6. Adicionar fontes via `next/font/google` em `app/layout.tsx` (Orbitron weight 400-900, Rajdhani 300-700)
7. Criar estrutura de pastas (`components/three`, `components/layout`, `components/sections`, `components/ui`, `lib`)
8. Setar `globals.css`: variáveis CSS da paleta, body bg `#0a0e14`, color `#a8e6ff`, font Rajdhani, scrollbar customizada HUD
9. Commit base

**Validação:** `npm run build` passa. `npm run dev` sobe localhost:3000 com tela carbon black sem erros.

---

### FASE 2 — Layout Shell + HUD Global
**Passos:**
1. `CursorCustomizado.tsx` — retículo div que segue mouse via `pointermove`, cresce em elementos `[data-cursor="hover"]`. Desativar em mobile (`window.innerWidth < 768`).
2. `HUDOverlay.tsx` — fixed top-right: relógio real-time (`setInterval` 1s), coords cursor (X/Y), badge "SYSTEM ONLINE" piscando, FPS badge (requestAnimationFrame frame counter).
3. `Navbar.tsx` — fixed top, glassmorphism, logo "ARC WEB" em titan-gold com glow, links HUD: Power Core, Capabilities, Mission Log, Assembly, Uplink. Mobile: menu hambúrguer HUD.
4. `Footer.tsx` — carbon bg, "ARC WEB © 2026" + links sociais placeholder (GitHub, LinkedIn, Email) com ícones lucide.
5. Background global em `layout.tsx`: grid blueprint (CSS) + scanlines sutis + vignette radial.
6. Montar `app/layout.tsx` com: `<CursorCustomizado>`, `<HUDOverlay>`, `<Navbar>`, `<main>{children}</main>`, `<Footer>`.

**Validação:** Dev sobe, cursor é retículo, HUD mostra hora atual, navbar fixa com logo glow, scroll suave.

---

### FASE 3 — Boot Sequence + Hero (Power Core 3D)
**Passos:**
1. `components/three/ArcReactor.tsx`:
   - `<Canvas>` com `gl={{ antialias: true }}`, `camera={{ position: [0,0,5] }}`
   - Geometria: torus principal + 2 anéis rotativos (diferentes eixos) + núcleo esférico emissivo (`meshStandardMaterial` emissive `#a8e6ff`, emissiveIntensity 2)
   - Lights: ambient + 2 point lights cyan/gold
   - `useFrame`: anéis rotam, núcleo pulsa (sin), parallax com mouse (`useThree` pointer)
   - `<EffectComposer>` + `<Bloom intensity={1.5} luminanceThreshold={0.2} mipmapBlur />`
   - Tone mapping `ACESFilmic` no gl
2. `BootSequence.tsx`:
   - Tela preta fullscreen, linhas de "diagnóstico" rolando (texto fake tipo `> CALIBRATING REPULSORS... OK`)
   - Timeline GSAP: linhas aparecem → arc reactor fade-in → HUD monta peça por peça (cantos, navbar, overlay)
   - Duração ~4s. Botão "SKIP" canto inferior.
   - Só roda se `localStorage.getItem('arc_booted')` !== '1'. Ao fim seta = '1'.
   - `prefers-reduced-motion` → pula direto.
3. `Hero.tsx`:
   - `<Scene>` (Canvas + ArcReactor) como background
   - Overlay: tagline "Construo sites que parecem tecnologia do futuro" (Orbitron, titan-gold glow)
   - Subtagline + CTA "Establish Uplink" (HudButton) → scroll suave pra `#contact`
   - Click no reactor → "power-up" (núcleo expande + flash bloom)

**Validação:** 1ª visita mostra boot ~4s, 2ª visita pula. Arc reactor pulsante com bloom visível, reage mouse, tagline legível. Console limpo.

---

### FASE 4 — Seções de Conteúdo (3 a 8)
**Passos:**
1. `lib/data.ts` — exportar arrays: `services` (4), `missions` (6 MARK I-VI), `testimonials` (3), `processSteps` (4), `operatorStats`.
2. `ui/HudCard.tsx` — card reutilizável: glassmorphism, 4 cantos L em pseudo-elementos, tilt no hover (mousemove → rotateX/Y), scanline overlay opcional.
3. `ui/HudButton.tsx` — botão com border sweep animation no hover, glow titan-gold.
4. `About.tsx` — "Operator Profile": avatar placeholder circular com borda HUD, stats com barras animadas (GSAP scrub ao entrar viewport).
5. `Services.tsx` — grid 4 HudCards (Landing Pages, E-commerce, Sistemas Web, Manutenção), cada um com ícone lucide + descrição + lista de features.
6. `Portfolio.tsx` — grid 6 HudCards (MARK I-VI), cada um com nome missão, tipo, "status: DEPLOYED", hover tilt + scanline.
7. `Process.tsx` — 4 etapas verticais/horizontais com timeline HUD, GSAP ScrollTrigger anima "assembly" (peças aparecem em sequência ao scroll).
8. `Testimonials.tsx` — 3 cards estilo relatório de missão: aspas + nome + "MISSION ID" + depoimento placeholder.
9. `Contact.tsx` — formulário estilizado terminal: inputs com borda cyan + label tipo prompt `> NAME:`. react-hook-form + zod (nome min 2, email válido, mensagem min 10). Submit → estado "TRANSMISSION SENT" com animação. Sem backend.
10. Montar tudo em `app/page.tsx` na ordem das 8 seções com `<section id="...">`.

**Validação:** Todas seções renderizam, scroll navega, cards tiltam, form valida, sem erros TS/build.

---

### FASE 5 — Polimento & Deploy-Ready
**Passos:**
1. Responsividade: revisar cada seção em breakpoint mobile (375px), tablet (768px). Desativar cursor custom + tilt no mobile. Reduzir canvas 3D (dpr `[1, 1.5]`).
2. Performance: `<Suspense>` no Canvas, `dynamic(() => import(...), { ssr: false })` no Scene, lazy load seções pesadas.
3. `prefers-reduced-motion` global: pular boot + desativar GSAP scroll animations.
4. SEO: `metadata` em `layout.tsx` (title, description, og:image placeholder), `robots.txt`, `sitemap.ts`.
5. Favicon: gerar SVG arc reactor simples em `app/icon.svg`.
6. `.env.example` vazio (placeholder p/ futura API de contato).
7. `README.md` com: setup, scripts, estrutura, como deployar na Vercel.
8. `npm run build` final limpo + `npm run start` confirma.

**Validação:** Lighthouse mobile 90+ em performance (dentro do possível com 3D), build passa, `npm run start` funciona, mobile não quebra.

---

## ✅ CHECKLIST DE VALIDAÇÃO DO PLANNER

Antes de aprovar cada fase, o planner (eu) valida via **inspeção em disco** (read/ls/grep), não só no relato do coder:
- [ ] FASE 1: `package.json` tem todas deps, `tailwind.config.ts` tem 5 cores, build passa
- [ ] FASE 2: componentes existem, cursor + HUD + navbar funcionais
- [ ] FASE 3: Bloom no código, arc reactor reage mouse, boot usa localStorage
- [ ] FASE 4: 8 seções em `page.tsx`, form com zod, placeholders em `data.ts`
- [ ] FASE 5: mobile ok, reduced-motion ok, SEO metadata presente, build final limpo

---

## 🔄 PROTOCOLO PLANNER ↔ CODER

- Planner envia UMA fase por vez via `coms_send`
- Coder implementa, valida localmente, reporta: arquivos criados/editados, comandos rodados, resultado validação, riscos, próximos passos
- Planner inspeciona disco (read/ls/grep) e aprova OU pede ajuste
- Só após aprovação → próxima fase
- Coder NÃO edita fora do escopo da fase atual
