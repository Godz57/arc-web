# ARC WEB

Site de captação de leads com estética de HUD holográfico inspirado na armadura do Homem de Ferro. Construído com **Next.js 14**, **React Three Fiber**, **Tailwind CSS**, **GSAP** e **Framer Motion**.

> Design imersivo. Interações vivas. Tecnologia de ponta.

---

## 🚀 Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **3D:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei) + [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
- **Animações:** [GSAP](https://gsap.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Estilo:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Formulário:** [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Fontes:** Orbitron + Rajdhani via `next/font/google`

---

## 📦 Instalação

```bash
# clone o repositório e entre na pasta
cd arc-web

# instale as dependências
npm install

# copie as variáveis de ambiente (opcional)
cp .env.example .env.local
# em .env.local: NEXT_PUBLIC_WEB3FORMS_KEY ou NEXT_PUBLIC_FORMSPREE_ID
```

---

## 🛠️ Scripts

```bash
npm run dev      # inicia o servidor de desenvolvimento (http://localhost:3000)
npm run build    # gera o build de produção
npm run start    # roda o build de produção localmente
npm run lint     # executa o ESLint
```

---

## 📁 Estrutura

```
arc-web/
├── app/                    # rotas e layout do Next.js App Router
│   ├── layout.tsx          # fontes, metadata, HUD global e background
│   ├── page.tsx            # montagem das 8 seções
│   ├── globals.css         # Tailwind + variáveis + scrollbar HUD
│   ├── icon.svg            # favicon do arc reactor
│   ├── opengraph-image.tsx # imagem OG gerada dinamicamente
│   ├── robots.ts           # regras do robots.txt
│   └── sitemap.ts          # sitemap.xml
├── components/
│   ├── three/              # Canvas 3D e ArcReactor
│   ├── layout/             # Navbar, Footer, HUDOverlay, CursorCustomizado
│   ├── sections/           # BootSequence, Hero, About, Services, Portfolio, Process, Testimonials, Contact
│   └── ui/                 # HudButton, HudCard, Scanlines, SectionHeader
├── lib/
│   └── data.ts             # conteúdo dos cards e seções
├── public/                 # assets estáticos
├── tailwind.config.ts      # paleta e fontes customizadas
├── .env.example            # template de variáveis de ambiente
└── README.md
```

---

## 🎨 Identidade Visual

| Token | Cor | Uso |
|---|---|---|
| `titan-gold` | `#d4af37` | logo, títulos, estruturas |
| `hud-cyan` | `#00d4ff` | glow, dados, bordas interativas |
| `arc-blue` | `#a8e6ff` | núcleo, CTAs, texto principal |
| `red-alert` | `#ff3b3b` | avisos, estados críticos |
| `carbon` | `#0a0e14` | fundo e profundidade |

---

## 🧩 Seções do Site

1. **BootSequence** — animação de inicialização (apenas na primeira visita)
2. **Hero / Power Core** — arc reactor 3D pulsante com Bloom
3. **About / Operator Profile** — ficha técnica do desenvolvedor
4. **Services / Capabilities** — 4 módulos de serviço
5. **Portfolio / Mission Log** — 6 missões conceituais MARK I–VI (protótipos, não claims de cliente)
6. **Process / Assembly Protocol** — timeline + suit-up 3D procedural no scroll
7. **System Directives** — princípios de design (sem depoimentos inventados)
8. **Contact / Establish Uplink** — formulário Zod + Web3Forms/Formspree (ou demo)

### Áudio HUD
Sons sintetizados via Web Audio API (zero MP3). Mute padrão **ON** — botão **AUDIO OFF/ON** no canto superior direito.

---

## ♿ Acessibilidade & Performance

- Respeita `prefers-reduced-motion` (boot pulado e animações pesadas desativadas)
- Cursor customizado desativado em telas touch/mobile
- Canvas 3D usa `dpr={[1, 1.5]}` e é carregado via `next/dynamic` sem SSR
- Seções possuem IDs para navegação por âncora

---

## 🌐 Deploy

O projeto está pronto para deploy na **Vercel**:

1. Faça push para o GitHub
2. Importe o repositório em [vercel.com/new](https://vercel.com/new)
3. O framework Next.js será detectado automaticamente
4. Defina `NEXT_PUBLIC_SITE_URL=https://arcweb.com.br` (e demais env de produção)

---

## 📝 Licença

© 2026 ARC WEB. Todos os direitos reservados.
