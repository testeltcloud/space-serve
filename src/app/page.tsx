import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { HeroSphere } from "@/components/HeroSphere";
import { ControleSection } from "@/components/ControleSection";
import { AnaliseSection } from "@/components/AnaliseSection";
import Register from "@/components/Register";
import { NextLevelCta } from "@/components/NextLevelCta";
import { FeatureTags } from "@/components/FeatureTags";

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
      <Hero right={<HeroSphere />} />

      <ControleSection />

      <AnaliseSection />

      <Process />

      {/* Divisória sutil: Process → Register */}
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <Register />

      <NextLevelCta />

      <FeatureTags />
    </main>
  );
}
