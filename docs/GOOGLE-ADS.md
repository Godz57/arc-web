# Google Ads — ARC WEB (setup operacional)

**Landing principal:** https://arcweb.com.br  
**Landing com CTA:** https://arcweb.com.br/#contact  
**Privacidade (política):** https://arcweb.com.br/privacidade  

**GA4:** `G-CGLHP3YJXN`  
**GTM:** `GTM-KN4DLJ2W`

---

## 0. O que o site já envia (conversões)

| Evento GA4 | Quando | Usar no Ads como |
|------------|--------|------------------|
| `generate_lead` | Formulário de contato enviado com sucesso | **Conversão principal** |
| `contact` / `whatsapp_click` | Clique em WhatsApp | Conversão secundária (opcional) |
| `page_view` | Visita | Só métrica, não conversão |

**Recomendação:** importar conversões do **GA4 → Google Ads** (sem segundo pixel de conversão).

---

## 1. Criar / acessar a conta Google Ads

1. Abra [ads.google.com](https://ads.google.com) com a **mesma conta Google** do Analytics (ideal).
2. Crie conta se necessário (país: Brasil, fuso: Brasília, moeda: **BRL**).
3. Ignore o “assistente” de campanha no começo se quiser — configure conversões **antes** de gastar.

---

## 2. Vincular Google Ads ↔ Google Analytics 4

### No GA4
1. **Admin** (engrenagem) → em **Propriedade** → **Links de produtos** → **Links do Google Ads**
2. **Vincular** → selecione a conta Ads → confirme
3. Ative **dados personalizados** / auto-tagging quando oferecido

### No Google Ads
1. **Ferramentas e configurações** → **Configuração** → **Contas vinculadas**
2. Confirme o link com **Google Analytics 4** (`G-CGLHP3YJXN`)

### Auto-tagging
**Configurações da conta** → **Auto-tagging** → **Marcar a URL** = **Ativado**  
(Isso adiciona `gclid` e liga cliques ↔ conversões.)

---

## 3. Importar conversões do GA4

No **Google Ads**:

1. **Metas** → **Conversões** → **Resumo** → **+ Nova conversão**
2. Escolha **Importar** → **Google Analytics 4**
3. Selecione:
   - ✅ `generate_lead` → **Primária** / incluir em “Conversões”
   - ⬜ `contact` ou `whatsapp_click` → **Secundária** (opcional)
4. Salve e aguarde (pode levar horas para o status “Registrando conversões”).

**Valor da conversão (opcional):**  
Se souber o valor médio de um lead (ex.: R$ 50–200 de “valor interno”), edite a conversão e defina valor fixo ou dinâmico. Não invente valor irreal.

---

## 4. NÃO faça (evita double counting)

- ❌ Colar de novo o snippet gtag `G-CGLHP3YJXN` no site (já está)
- ❌ Criar tag de conversão de site **e** importar o mesmo evento do GA4
- ❌ Configurar GA4 outra vez dentro do GTM **e** manter o gtag direto (sem desligar um deles)

**GTM** use para tags extras (remarketing, etc.), não para duplicar o GA4.

---

## 5. Primeira campanha (Search — recomendado)

### Tipo
**Pesquisa** (Search) — intenção alta (“criação de sites”, “landing page”, etc.)

### Objetivo
**Leads** / Conversões (com `generate_lead` importada)

### Rede
- ✅ Pesquisa Google  
- ⬜ Desative Display “Parceiros” no começo (melhor controle de custo)

### Orçamento (sugestão inicial)
- R$ 20–40/dia para teste  
- Bid strategy: **Maximizar conversões** (com conversão importada) **ou** Maximizar cliques por 3–7 dias se ainda não houver conversões

### Localização
- Brasil inteiro **ou** começar por **DF + entorno** / principais capitais se quiser CAC menor

### Idioma
Português

### Palavras-chave (exatas / frase primeiro)

```
"criação de sites"
"criar site profissional"
"desenvolvimento de sites"
"landing page"
"fazer landing page"
"desenvolvedor next.js"
"agência de sites"
"site institucional"
```

**Negativas úteis:**
```
grátis, free, curso, vaga, emprego, template, wordpress gratis, baixar
```

### Anúncios RSA (texto)

**Títulos (mix):**
- Criação de Sites Premium | ARC WEB  
- Landing Pages que Convertem  
- Sites Rápidos em Next.js  
- Design Imersivo + Performance  
- Briefing em até 24h  
- Do Zero ao Deploy  

**Descrições:**
- Desenvolvimento de sites, landing pages e sistemas com design imersivo e código limpo. Peça um briefing.  
- Performance real, SEO técnico e polish de ponta a ponta. Fale no site ou WhatsApp.  

**URL final:** `https://arcweb.com.br`  
**Caminho de exibição:** `arcweb.com.br` / `Sites` / `Premium`  
**URL final com âncora (opcional):** `https://arcweb.com.br/#contact`

### Extensões
- **Sitelinks:** Serviços, Processo, FAQ, Contato  
  - https://arcweb.com.br/#services  
  - https://arcweb.com.br/#process  
  - https://arcweb.com.br/#faq  
  - https://arcweb.com.br/#contact  
- **Callouts:** Resposta em 24h · Next.js · Design imersivo · Orçamento sob medida  
- **Snippet estruturado:** Serviços → Landing Pages, E-commerce, Sistemas Web, Manutenção  

---

## 6. UTMs (quando o link não for auto-tagged)

Padrão:

```
https://arcweb.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=search_sites&utm_content=rsa_v1
```

Com auto-tagging do Ads, o `gclid` já basta para o Google; UTMs ajudam no GA e em relatórios mistos.

---

## 7. Checklist de aprovação / política

- [x] HTTPS  
- [x] Contato visível (form + e-mail + WhatsApp)  
- [x] Página de privacidade: `/privacidade`  
- [x] Oferta clara (serviços, processo, FAQ)  
- [ ] Não prometa resultados garantidos (“1º no Google”, “riqueza”)  
- [ ] Landing carrega bem no mobile (teste real)  

---

## 8. Após publicar a campanha

1. **GA4 → Tempo real** — abra o anúncio / clique de teste (gasto mínimo) e veja sessão com origem google  
2. Envie um **formulário de teste** e confira evento `generate_lead`  
3. No Ads → Conversões: status deve ir para “Registrando” / “Conversões recentes”  
4. Revise Search terms a cada 2–3 dias e adicione negativas  

---

## 9. Se o Google pedir “tag do Google Ads” (AW-)

Só se o assistente insistir em tag `AW-XXXXXXXXX`:

1. Copie o ID `AW-...`
2. Me envie **ou** defina na Vercel:
   ```
   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
   ```
3. Redeploy — o site já aceita esse env e faz `gtag('config', 'AW-...')` **sem** remover o GA4.

Ainda assim, **conversões preferencialmente via import GA4**, não via segundo contador manual.

---

## 10. Contato rápido se travar

| Problema | O que checar |
|----------|----------------|
| 0 conversões | Event `generate_lead` importado? Auto-tagging on? Clique de teste + form? |
| Muitas impressões, 0 cliques | Título/desc fracos ou CPC baixo demais |
| Cliques caros sem lead | Negativas, match types, landing #contact |
| Doubled conversions | Tag duplicada Ads + GA4 no mesmo evento |
