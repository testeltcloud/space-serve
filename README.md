# Site — Next.js + Animações + SEO

Projeto base em **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, com foco em **performance (PageSpeed)**, **SEO** e **descoberta por buscadores e IAs**. Estrutura montada para escalar com muitas animações e conteúdo, mantendo cada página com metadata próprio (nada genérico).

---

## Stack

| Área | Biblioteca | Uso |
|------|-----------|-----|
| Framework | **Next.js 16** (App Router) | SSR/SSG, metadata API, rotas |
| Estilo | **Tailwind CSS v4** | utilitários, design system |
| Animação UI | **Framer Motion** | entrada de elementos, gestos, layout |
| Animação avançada | **GSAP + ScrollTrigger** | timelines, animações por scroll |
| Scroll suave | **Lenis** | smooth scroll global (sincroniza com GSAP) |
| Tema claro/escuro | **next-themes** | toggle dark/light por classe, inicia no claro |

Por que essas: Framer Motion cobre 90% das animações de UI em React com API declarativa; GSAP entra onde precisa de timeline/scroll com controle fino; Lenis dá o scroll suave que valoriza as animações. É o conjunto mais relevante e usado no mercado para sites "animation-heavy" sem sacrificar performance.

> Precisa de 3D depois? É só instalar `three` (`npm i three @types/three`) e criar o componente client.

---

## Requisitos

- Node.js 18.18+ (recomendado 20+)
- npm

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # sobe o build
npm run lint
```

---

## Estrutura

```
src/
  app/
    layout.tsx        # metadata GLOBAL + ThemeProvider (inicia light) + SmoothScroll
    page.tsx          # HOME: metadata próprio + <Hero/>
    sobre/page.tsx    # exemplo de página com metadata próprio
    sitemap.ts        # /sitemap.xml dinâmico
    robots.ts         # /robots.txt (libera buscadores e IAs)
    globals.css       # tema por classe (.dark) via @custom-variant
  components/
    Hero.tsx          # hero da home (Framer Motion)
    ThemeProvider.tsx # provider next-themes (claro/escuro)
    ThemeToggle.tsx   # botão de alternância de tema
    SmoothScroll.tsx  # provider do Lenis (scroll suave global)
  lib/
    seo.ts            # buildMetadata(): gera title/description/keywords/OG/Twitter/canonical
    gsap.ts           # registra GSAP + ScrollTrigger
  config/
    site.ts           # config central: url, nome, keywords globais, OG padrão
```

---

## SEO / Metadata — o padrão

**Regra de ouro:** cada página define o seu próprio metadata. Nunca reaproveitar um bloco genérico.

O `layout.tsx` define só os *defaults* globais (`metadataBase`, `title.template`, description fallback). Cada `page.tsx` chama o helper `buildMetadata()`:

```ts
// src/app/servicos/criacao-de-sites/page.tsx
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Criação de Sites",                 // vira "Criação de Sites | Nome do Site"
  description: "Descrição única desta página, com proposta e palavras-chave.",
  keywords: ["criação de sites", "landing page", "site profissional"],
  path: "/servicos/criacao-de-sites",        // usado no canonical e OG url
  // ogImage: "/og/criacao-de-sites.jpg",     // opcional (1200x630)
});
```

O `buildMetadata()` já preenche automaticamente:

- **title** (com template do nome do site) e **description**
- **keywords** (as da página + as globais de `config/site.ts`, sem duplicar)
- **alternates.canonical** — URL canônica absoluta + `languages` (pt-BR)
- **openGraph** — `title, description, type, url, siteName, locale, images[1200x630]` (pré-visualização em WhatsApp, Facebook, LinkedIn)
- **twitter** — bloco separado: `card: summary_large_image, title, description, site, creator, images`
- **robots** — index/follow + `googleBot` com `max-image-preview: large` e `max-snippet: -1` (melhor no Google/Discover)

### Descoberta por IA e buscadores
- `robots.ts` libera todos os agentes (`*`), incluindo crawlers de IA (GPTBot, ClaudeBot, PerplexityBot). Para bloquear algum, adicione uma regra `userAgent` específica.
- `sitemap.ts` lista as rotas — **adicione cada nova página lá**.
- Recomendado adicionar **JSON-LD** (Schema.org) por página para rich results — dá pra evoluir o `seo.ts` para injetar via `<script type="application/ld+json">`.

### Antes de publicar (checklist)
1. Em `src/config/site.ts`: trocar `url`, `name`, `keywords`, `ogImage`, `links`. (Ou definir `NEXT_PUBLIC_SITE_URL`.)
2. Colocar a imagem OG padrão em `public/og/default.jpg` (1200x630).
3. Preencher os tokens de verificação em `layout.tsx` (`verification`) após cadastrar no Google Search Console / Bing.
4. Revisar `sitemap.ts` com todas as rotas reais.

---

## Performance (PageSpeed)

Já configurado em `next.config.ts`:

- `images.formats`: AVIF/WebP automático — use sempre `next/image`.
- `optimizePackageImports` para Framer Motion (tree-shaking).
- `compress`, `poweredByHeader: false`, `reactStrictMode`.
- Fontes via `next/font` com `display: "swap"` (sem layout shift).

Boas práticas ao adicionar conteúdo:
- Componentes de animação/3D devem ser **client components** isolados (`"use client"`), para não pesar o server bundle.
- Carregue efeitos 3D/pesados com `next/dynamic` e `{ ssr: false }` quando estiverem abaixo da dobra.
- Prefira `transform`/`opacity` nas animações (compositor da GPU).
- Respeite `prefers-reduced-motion` para acessibilidade.

---

## Animações — como usar

**Framer Motion** (UI):
```tsx
"use client";
import { motion } from "framer-motion";
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} />
```

**GSAP + ScrollTrigger** (scroll/timeline):
```tsx
"use client";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 200, scrollTrigger: { trigger: ".box", scrub: true } });
  });
  return () => ctx.revert();
}, []);
```
Sincronizar Lenis + ScrollTrigger: no provider, `lenis.on("scroll", ScrollTrigger.update)`.

---

## Tema claro/escuro

- Gerenciado pelo **next-themes** (`ThemeProvider` no layout), estratégia por classe `.dark` no `<html>`.
- **Inicia no tema claro** (`defaultTheme="light"`, `enableSystem={false}`).
- Cores base em `globals.css` (variáveis `--background`/`--foreground` em `:root` e `.dark`).
- Botão de alternância: `ThemeToggle` (canto superior direito).
- Nos componentes, use classes utilitárias tema-aware: `text-neutral-600 dark:text-neutral-300`, `border-black/10 dark:border-white/10`, ou `bg-background text-foreground`.
- Para seguir a preferência do sistema, troque para `enableSystem` no `ThemeProvider`.

---

## Próximos passos
Estrutura, tema e SEO prontos. A partir daqui: montar o conteúdo real das seções, criar as demais páginas (cada uma com seu `buildMetadata`) e adicioná-las ao `sitemap.ts`.
