# ARC WEB — Brand assets oficiais

## Marca escolhida

| Arquivo | Uso |
|---------|-----|
| `mark-a-core.jpg` / `.svg` | **Ícone** — favicon, avatar, app, sticker |
| `lockup-arc-web.jpg` / `.svg` | **Lockup** — header, proposta, LinkedIn, ads com nome |

**Conceitos de origem (sessão Grok):**
- Mark: `images/19.jpg` (A geométrico + core cyan)
- Lockup: `images/25.jpg` (mesmo mark + “ARC WEB”)

## Significado

- **A** = ARC  
- **Ponto cyan** (`#4db8ff`) = core / reator (assinatura do site)  
- Fundo dark `#0a0e14`  

## No código

- Favicon: `app/icon.svg`  
- Componente: `components/ui/Logo.tsx` (`variant="mark" | "lockup"`)  
- Navbar + Footer usam o Logo  

## WhatsApp banners

| Arquivo | Tamanho | Uso |
|---------|---------|-----|
| `wpp-banner-wide.png` | 1600×500 | Banner principal / capa canal |
| `wpp-banner-strip.png` | 1200×300 | Compacto / catalog |
| `wpp-banner-status.png` | 1080×1920 | Status / Stories |
| `wpp-banner-square.png` | 1080×1080 | Grupo / post / feed |
| `mark-a-core.jpg` | 1:1 | **Foto de perfil** |

Fonte editável: `wpp-banner.html`  
Regenerar: `node public/brand/export-wpp-banners.mjs`

## Cores

| Token | Hex |
|-------|-----|
| Carbon | `#0a0e14` |
| Chrome / traço | `#ffffff` / chrome do tema |
| Core | `#4db8ff` |
