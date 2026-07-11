# ARC WEB — Launch SEO / GEO (checklist operacional)

Site canônico: **https://arcweb.com.br**  
Sitemap: **https://arcweb.com.br/sitemap.xml**  
Agents: **https://arcweb.com.br/llms.txt**

---

## 1. Google Search Console (você no browser — 5 min)

Não dá para logar na sua conta Google daqui. Faça:

1. Abra [Google Search Console](https://search.google.com/search-console)
2. **Adicionar propriedade** → tipo **Domínio** → `arcweb.com.br`
   - Prefira **Domínio** (cobre www + apex + http/https)
3. Verificação **DNS** (recomendada, já usa nameservers Vercel):
   - Copie o registro TXT que o Google mostrar
   - Em [Vercel → Domains → arcweb.com.br → DNS](https://vercel.com/gabrieitous/arc-web/settings/domains)
   - Adicione TXT no apex (`@` / `arcweb.com.br`) com o valor do Google
   - Aguarde propagação (minutos a poucas horas) → **Verificar**
4. Alternativa **tag HTML** (se preferir):
   - No GSC escolha “Tag HTML”
   - Copie só o `content="..."`
   - Na Vercel → Project **arc-web** → Settings → Environment Variables:
     ```
     NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<valor do content>
     ```
   - Redeploy → Verifique no GSC  
   - O código já lê essa env em `app/layout.tsx`
5. Depois de verificado:
   - **Sitemaps** → Adicionar → `https://arcweb.com.br/sitemap.xml` → Enviar
   - **Inspeção de URL** → `https://arcweb.com.br` → Solicitar indexação

### Bing (opcional, 2 min)
- [Bing Webmaster Tools](https://www.bing.com/webmasters) → importar do GSC ou verificar domínio

---

## 2. Vercel Domains — www → apex (301)

### Feito no código
`vercel.json` redireciona permanentemente:

`https://www.arcweb.com.br/*` → `https://arcweb.com.br/*` (301)

### Confirmar no dashboard (recomendado)
1. [Project Domains](https://vercel.com/gabrieitous/arc-web/settings/domains)
2. Domínio primário: **arcweb.com.br**
3. Em **www.arcweb.com.br** → Redirect to **arcweb.com.br** (301)

Teste após o deploy:

```bash
curl -sI https://www.arcweb.com.br
# esperado: 301/308 + Location: https://arcweb.com.br/
```

---

## 3. Rich Results / Schema

### Validado (2026-07-11)
- **Schema.org Validator** (`validator.schema.org`): **0 errors**
- Tipos no HTML: Organization, Person, WebSite, WebPage, ProfessionalService, HowTo, FAQPage
- Warnings menores (campos não usados pelo SPORE) limpos no último commit

### Você no browser
1. [Rich Results Test](https://search.google.com/test/rich-results?url=https://arcweb.com.br)
2. [Schema Markup Validator](https://validator.schema.org/#url=https://arcweb.com.br)

**Nota:** FAQ e HowTo ajudam **AEO/GEO** e entendimento de entidade. Google **não** mostra mais FAQ rich result para a maioria dos sites (mudança 2026). Isso é esperado — schema continua válido.

---

## 4. Backlinks — primeiros links reais (domínio novo)

Perfil atual (estimado, sem Ahrefs): **~0 referring domains** → prioridade é **links limpos e relevantes**, não volume.

### 4.1 LinkedIn (hoje — dofollow social signal / brand)
Perfil: https://www.linkedin.com/in/gabriel-lucas-a2662b421

**Post sugerido (cole e publique):**

> Lancei a ARC WEB — estúdio de criação de sites premium, landing pages e sistemas com design imersivo e performance real.  
> O site é a prova viva (Next.js + craft de ponta a ponta): https://arcweb.com.br  
> Se você precisa de site que conversa e performa, chame no DM ou no site.

Checklist LinkedIn:
- [ ] Site em **Experiência / Sobre** → `https://arcweb.com.br`
- [ ] Featured link → arcweb.com.br
- [ ] Post acima + comentar com `#webdev #nextjs #sites`
- [ ] Atualizar banner (já existe `public/linkedin-cover.png`)

### 4.2 GitHub
Repo: https://github.com/Godz57/arc-web  
User: https://github.com/Godz57

- [ ] README do repo com link canônico `https://arcweb.com.br`
- [ ] GitHub Profile README (`Godz57/Godz57`) com linha “Studio: https://arcweb.com.br”
- [ ] Website field do perfil GitHub = `https://arcweb.com.br`
- [ ] sameAs no schema já aponta para LinkedIn + GitHub (após env/deploy)

### 4.3 Diretórios / listagens (prioridade Brasil / tech)

| Destino | URL | Ação | Qualidade |
|---------|-----|------|-----------|
| Google Business Profile | https://business.google.com | Criar perfil serviço (remoto / DF) se aplicável | Alta |
| Bing Places | https://www.bingplaces.com | Espelhar NAP | Média |
| Product Hunt (Launch) | https://www.producthunt.com | Quando tiver narrativa de produto | Média–Alta |
| Wellfound / AngelList | https://wellfound.com | Perfil founder + company | Média |
| Dev.to | https://dev.to | Artigo técnico + link no bio | Média |
| Hashnode | https://hashnode.com | Idem | Média |
| TabNews | https://www.tabnews.com.br | Post técnico PT-BR + bio | Média (BR) |
| Indie Hackers | https://www.indiehackers.com | Showcase | Média |
| Orra / Catalogos freela BR | busca “diretório freelancers Brasil” | Listar com site | Baixa–Média |

**Evite:** PBNs, “100 backlinks por R$29”, diretórios spam (toxic).

### 4.4 Parcerias / unlinked mentions
- Ofereça guest post ou case em blogs de marketing digital / startups DF
- Peça menção a clientes futuros no case study
- Responda threads no Reddit r/webdev, r/brdev com valor real + link no perfil (não spam no post)

### 4.5 Template de outreach (e-mail)

**Assunto:** Parceria de conteúdo — desenvolvimento web / Next.js  

**Corpo:**
```
Oi [Nome],

Sou Gabriel da ARC WEB (https://arcweb.com.br) — faço sites premium e experiências web com Next.js.

Vi o artigo de vocês sobre [tema]. Posso contribuir com um guest post prático sobre [ângulo: performance, 3D web, landing de conversão], sem pitch agressivo — só craft + exemplos reais.

Se fizer sentido, mando outline em 1 página.

Abs,
Gabriel Almeida
contato@arcweb.com.br
```

---

## 5. Env vars de produção (Vercel)

Confirme em Production:

| Key | Valor |
|-----|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://arcweb.com.br` |
| `NEXT_PUBLIC_GITHUB` | `https://github.com/Godz57` |
| `NEXT_PUBLIC_LINKEDIN` | `https://www.linkedin.com/in/gabriel-lucas-a2662b421` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | (após GSC, se usar tag HTML) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` (GA4 Measurement ID) |

---

## 6. Ordem sugerida (hoje)

1. Deploy deste commit (www redirect + GitHub sameAs + schema limpo)
2. Confirmar `curl -sI https://www.arcweb.com.br` → 301
3. Search Console domínio + DNS TXT + sitemap
4. Rich Results Test (sanity check visual)
5. LinkedIn post + GitHub profile website
6. 1–2 diretórios de qualidade (GMB / Dev.to bio)
