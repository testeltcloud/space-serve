import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type BuildMetadataInput = {
  /** Título da página (sem o nome do site — ele é adicionado pelo template). */
  title: string;
  /** Descrição única da página. Essencial para ranqueamento. */
  description: string;
  /** Palavras-chave específicas da página (somadas às globais). */
  keywords?: string[];
  /** Caminho relativo da página, ex: "/servicos/criacao-de-sites". */
  path?: string;
  /** Imagem OG específica (1200x630). Usa a padrão se omitida. */
  ogImage?: string;
  /** Tipo OpenGraph. */
  type?: "website" | "article";
  /** Impedir indexação desta página. */
  noindex?: boolean;
};

/**
 * Gera o objeto Metadata completo de uma página:
 * title, description, keywords, canonical (alternates),
 * OpenGraph e Twitter — tudo consistente e por página.
 *
 * Uso em qualquer page.tsx:
 *   export const metadata = buildMetadata({
 *     title: "Criação de Sites",
 *     description: "...",
 *     keywords: ["criação de sites", "landing page"],
 *     path: "/servicos/criacao-de-sites",
 *   });
 */
export function buildMetadata({
  title,
  description,
  keywords = [],
  path = "/",
  ogImage,
  type = "website",
  noindex = false,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const image = ogImage ?? siteConfig.ogImage;
  const absoluteImage = new URL(image, siteConfig.url).toString();
  const allKeywords = Array.from(new Set([...keywords, ...siteConfig.keywords]));

  return {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    // Canonical + idiomas alternativos.
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": url,
      },
    },
    // Controle de indexação dos buscadores (Google/Bing) e de IA.
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.links.twitter,
      creator: siteConfig.links.twitter,
      images: [absoluteImage],
    },
  };
}
