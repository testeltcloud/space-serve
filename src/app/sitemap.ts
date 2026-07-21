import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Sitemap dinâmico. Adicione novas rotas aqui (ou gere a partir do CMS).
 * Servido em /sitemap.xml automaticamente.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/sobre",
    "/termos",
    "/politica-de-privacidade",
    "/cookies",
  ];

  return routes.map((path) => ({
    url: new URL(path || "/", siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
