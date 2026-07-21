/**
 * Configuração central do site.
 * TROQUE `url` e `name` pelos dados reais quando tiver o domínio.
 * Tudo que é SEO/OpenGraph/Twitter puxa daqui.
 */
export const siteConfig = {
  name: "Nome do Site",
  // Domínio de produção — usado em metadataBase, canonical, OG e Twitter.
  // Ao publicar, troque só esta linha (ou defina NEXT_PUBLIC_SITE_URL no ambiente).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seusite.com.br",
  locale: "pt_BR",
  // Descrição padrão (fallback). Cada página deve ter a sua própria.
  description:
    "Descrição padrão do site. Personalize esta e a de cada página para ranquear melhor.",
  // Palavras-chave globais (cada página soma as suas).
  keywords: ["palavra-chave 1", "palavra-chave 2", "palavra-chave 3"],
  // Imagem OG padrão (1200x630). Coloque o arquivo em /public.
  ogImage: "/og/default.jpg",
  // Perfis sociais para JSON-LD / verificação.
  links: {
    twitter: "@seuhandle",
    instagram: "https://instagram.com/seuperfil",
  },
  // Autor / organização
  author: "Sua Empresa",
} as const;

export type SiteConfig = typeof siteConfig;
