"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { TextAnimate } from "@/registry/magicui/text-animate";
import { DashboardMock } from "@/components/DashboardMock";
/**
 * Hero da home.
 * - Coluna esquerda: título (Poppins, destaque azul), subtítulo e CTA.
 * - Coluna direita: SLOT para o visual, passado via prop `right`.
 *
 * Motion: entrada com stagger e curva ease-out; respeita prefers-reduced-motion
 * (useReducedMotion zera os deslocamentos e encurta a transição).
 *
 * RESPONSIVIDADE: o título mantém a cadência de 3 linhas via blocos; sem
 * `whitespace-nowrap`, para que em telas estreitas ele quebre em vez de vazar.
 */

// ease-out-quint — desacelera de forma exponencial (nada de bounce/elastic).
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero({ right }: { right?: ReactNode }) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.7, ease: EASE_OUT },
    },
  };

  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-[#fefefe] dark:bg-[#0d1526]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
        {/* Coluna esquerda — texto */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-left"
        >
          <motion.h1
            variants={item}
            style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.25rem)" }}
            className="text-balance font-poppins font-bold uppercase leading-[1.1] tracking-[-0.02em] text-foreground"
          >
            <span className="block">Processos, documentos</span>
            <span className="block">
              e assinaturas{" "}
              <span className="text-blue-600 dark:text-blue-500">sob</span>
            </span>
            <span className="block text-blue-600 dark:text-blue-500">
              controle.
            </span>
          </motion.h1>

          <TextAnimate animation="blurInUp" by="word" once className="mt-6 max-w-lg text-pretty leading-relaxed text-neutral-600 dark:text-neutral-300">
            O Space Server mantém seus arquivos, assinaturas e processos seguros.
          </TextAnimate>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3"
          >
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 font-poppins font-bold uppercase tracking-wide text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{
                fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
                padding:
                  "clamp(0.75rem, 1.4vw, 1rem) clamp(1.5rem, 2.6vw, 2rem)",
              }}
            >
              Comece agora
            </a>
          </motion.div>
        </motion.div>

        {/* Coluna direita — visual (via prop; cuida da própria animação) */}
        <div className="relative w-full">
          {/* {right ?? (
            <div className="mx-auto flex aspect-square w-full max-w-[600px] items-center justify-center rounded-2xl border border-dashed border-black/15 text-sm text-neutral-400 dark:border-white/15">
              Componente à direita
            </div>
          )} */}

          {/* Card flutuante do dashboard, sobreposto ao visual principal */}
          {/* <div className="absolute bottom-0 left-0 hidden lg:block"> */}
            <DashboardMock />
          {/* </div> */}
        </div>
      </div>

    </section>
  );
}
