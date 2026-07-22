"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";

const nav: { href: string; label: string }[] = [
  { href: "#controle", label: "Sobre nós" },
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#precos", label: "Preços" },
  { href: "#solucoes", label: "Soluções" },
];

/**
 * Header fixo do site: logo (esquerda), navegação (centro) e CTA "Fale
 * conosco" (direita). Barra estática azul clara, sem animação de encolher
 * no scroll — layout 1:1 com o design.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#e4eafc] dark:border-white/10 dark:bg-[#0d1526]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 font-poppins">
        <Link href="/" aria-label="Página inicial" className="flex items-center">
          <Logo className="h-10 w-auto sm:h-12" priority />
        </Link>

        <nav className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-[#2952d9] transition-colors hover:text-blue-800 dark:text-neutral-200 dark:hover:text-blue-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#contato"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Fale conosco
          </Link>
        </nav>
      </div>
    </header>
  );
}
