"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav: { href: string; label: string }[] = [
  // { href: "/", label: "Início" },
  // { href: "/sobre", label: "Sobre" },
];

// ease-out-quint — mesma curva usada no Hero (sem bounce/elastic).
const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Header fixo do site: logo (esquerda), navegação (centro/direita)
 * e alternância de tema. Fundo com blur, tema-aware.
 *
 * Encolhe e perde opacidade ao passar da sentinela no topo da página,
 * voltando ao normal ao topo. Um IntersectionObserver decide o estado
 * (não um listener de scroll por pixel), então height/opacity/shadow
 * transicionam uma única vez por cruzamento, não a cada frame de scroll.
 */
export function Header() {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: EASE_OUT_QUINT };

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="absolute top-0 h-10 w-px pointer-events-none" />
      <motion.header
        initial={false}
        animate={{
          height: isScrolled ? 56 : 80,
          opacity: isScrolled ? 1 : 1,
          marginTop: isScrolled ? 12 : 0,
          marginLeft: isScrolled ? "20%" : "0%",
          marginRight: isScrolled ? "20%" : "0%",
          borderRadius: isScrolled ? 9999 : 0,
          borderTopWidth: isScrolled ? 1 : 0,
          borderLeftWidth: isScrolled ? 1 : 0,
          borderRightWidth: isScrolled ? 1 : 0,
          borderBottomWidth: 1,
          boxShadow: isScrolled
            ? "0px 16px 40px rgba(15, 23, 42, 0.18)"
            : "0px 1px 0px rgba(15, 23, 42, 0)",
        }}
        transition={transition}
        className="sticky top-0 z-50 border-black/10 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-[#05060a]/70"
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 font-poppins">
          <Link href="/" aria-label="Página inicial" className="flex items-center">
            <motion.div
              initial={false}
              animate={{ scale: isScrolled ? 0.8 : 1, marginLeft: isScrolled ? 0 : 40 }}
              transition={transition}
              className="origin-left"
            >
              <Logo className="h-12 w-auto sm:h-16" priority />
            </motion.div>
          </Link>

          <nav className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 sm:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </nav>
        </div>
      </motion.header>
    </>
  );
}
