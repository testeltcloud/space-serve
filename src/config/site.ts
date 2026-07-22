/**
 * Configuração central do site.
 * TROQUE `url` e `name` pelos dados reais quando tiver o domínio.
 * Tudo que é SEO/OpenGraph/Twitter puxa daqui.
 */
export const siteConfig = {
  name: "Space Server",
  // Domínio de produção — usado em metadataBase, canonical, OG e Twitter.
  // Ao publicar, troque só esta linha (ou defina NEXT_PUBLIC_SITE_URL no ambiente).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seusite.com.br",
  locale: "pt_BR",
  // Descrição padrão (fallback). Cada página deve ter a sua própria.
  description:
    "O Space Server mantém seus arquivos, assinaturas e processos seguros — tudo em um só painel.",
  // Palavras-chave globais (cada página soma as suas).
  keywords: ["gestão documental", "assinatura eletrônica", "workflow de aprovação"],
  // Imagem OG padrão (1200x630). Coloque o arquivo em /public.
  ogImage: "/og/default.jpg",
  // Perfis sociais para JSON-LD / verificação.
  links: {
    twitter: "@seuhandle",
    instagram: "https://instagram.com/seuperfil",
    linkedin: "https://linkedin.com/company/seuperfil",
    facebook: "https://facebook.com/seuperfil",
  },
  // Autor / organização
  author: "Space Server",
} as const;

export type SiteConfig = typeof siteConfig;
