import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { HeroPhone } from "@/components/HeroPhone";
import { ControleSection } from "@/components/ControleSection";
import { AnaliseSection } from "@/components/AnaliseSection";
import Register from "@/components/Register";

/**
 * METADATA DA HOME — único e personalizado (não genérico).
 * Cada página tem o seu próprio bloco assim.
 */
export const metadata: Metadata = buildMetadata({
  title: "Página inicial",
  description:
    "Descrição única e otimizada da home, com a proposta de valor e as principais palavras-chave do negócio.",
  keywords: ["palavra-chave home 1", "palavra-chave home 2"],
  path: "/",
});

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero right={<HeroPhone />} />

      {/* Ponte: Hero (bg adaptativo) → ControleSection (azul #155fcd) */}
      <div aria-hidden className="h-10 bg-gradient-to-b from-white dark:from-[#05060a] to-[#155fcd]" />

      <ControleSection />

      {/* Ponte: ControleSection (azul) → AnaliseSection (preto) */}
      <div aria-hidden className="h-10 bg-gradient-to-b from-[#155fcd] to-black" />

      <AnaliseSection />

      {/* Ponte: AnaliseSection (preto) → Process (branco / zinc-950) */}
      <div aria-hidden className="h-12 bg-gradient-to-b from-black to-white dark:to-zinc-950" />

      <Process />

      {/* Divisória sutil: Process → Register */}
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <Register />
    </main>
  );
}
