"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { TextAnimate } from "@/registry/magicui/text-animate";
import { MorphingText } from "@/registry/magicui/morphing-text";
/**
 * Hero da home.
 * - Coluna esquerda: título (Poppins, destaque azul), subtítulo, CTAs e uma
 *   faixa de sinais de confiança (recursos reais do produto, sem métricas falsas).
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

const trustSignals = [
  { label: "Seguro ponta a ponta", Icon: ShieldCheckIcon },
  { label: "Tudo num só painel", Icon: LayersIcon },
  { label: "Histórico completo", Icon: HistoryIcon },
];

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
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-[#c9e4fb] dark:bg-[#0d1526]">
      {/* Fundo — ondas azuis deliberadas (contidas no Hero, sem vazar pra outras seções) + brilho suave atrás do visual. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="hero-wave-drift absolute top-0 bottom-0 -left-[4%] h-full w-[108%]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M-100 260C160 140 420 420 700 420C980 420 1220 120 1540 260V960H-100V260Z"
            className="fill-blue-600 opacity-[0.12] dark:opacity-[0.22]"
          />
          <path
            d="M-100 460C200 560 460 320 760 340C1040 358 1260 560 1540 460V960H-100V460Z"
            className="fill-sky-400 opacity-[0.16] dark:opacity-[0.18]"
          />
        </svg>
        <div className="hero-drift-a absolute right-[-6%] top-[10%] h-[38vw] max-h-130 w-[38vw] max-w-130 rounded-full bg-blue-500/15 blur-[120px] dark:bg-blue-600/20" />
      </div>

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
            style={{ fontSize: "clamp(1.55rem, 5.4vw, 3.5rem)" }}
            className="text-balance font-poppins font-medium uppercase leading-[1.1] tracking-[-0.02em] text-foreground"
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

          {/* <motion.p
            variants={item}
            style={{ fontSize: "clamp(1rem, 1.7vw, 1.2rem)" }}
            className="mt-6 max-w-lg text-pretty leading-relaxed text-neutral-600 dark:text-neutral-300"
          > */}
           <TextAnimate animation="blurInUp" by="word" once  className="mt-6 max-w-lg text-pretty leading-relaxed text-neutral-600 dark:text-neutral-300">

            Arquivos, assinaturas e processos em um só painel, com controle,
            histórico e segurança do início ao fim.
           </TextAnimate>
          {/* </motion.p> */}

          <motion.p
            variants={item}
            style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.3rem)" }}
            className="mt-5 font-poppins font-semibold text-foreground"
          >
            Organize{" "}
            <MorphingText
              texts={["arquivos", "contratos", "assinaturas", "documentos", "processos"]}
              className="text-blue-600 dark:text-blue-500"
            />{" "}
            sem esforço.
          </motion.p>

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

            <a
              href="#controle"
              className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3.5 font-poppins text-sm font-medium text-foreground transition-colors hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/20 dark:hover:bg-white/[0.06]"
            >
              Ver como funciona
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            {trustSignals.map(({ label, Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                <Icon className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Coluna direita — visual (via prop; cuida da própria animação) */}
        <div className="relative w-full">
          {right ?? (
            <div className="mx-auto flex aspect-square w-full max-w-[600px] items-center justify-center rounded-2xl border border-dashed border-black/15 text-sm text-neutral-400 dark:border-white/15">
              Componente à direita
            </div>
          )}
        </div>
      </div>

    </section>
  );
}

/* Ícones inline (estilo Lucide, stroke) — sem emojis, sem dependência externa. */

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
