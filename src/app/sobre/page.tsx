import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

/**
 * Exemplo de página secundária com metadata PRÓPRIO.
 * Copie este padrão para cada nova rota (serviços, contato, blog, etc.).
 */
export const metadata: Metadata = buildMetadata({
  title: "Sobre",
  description:
    "Descrição única da página Sobre, com contexto e palavras-chave específicas dela.",
  keywords: ["sobre a empresa", "quem somos"],
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Sobre</h1>
      <p className="mt-4 text-lg text-white/70">
        Cada página tem seu próprio H1, subtítulos e metadata. Nada de layout
        genérico para tudo.
      </p>
    </main>
  );
}
