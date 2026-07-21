import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * robots.txt dinâmico. Servido em /robots.txt.
 * Libera buscadores e crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, etc.).
 * Restrinja/bloqueie algum agente adicionando uma regra específica.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url,
  };
}
