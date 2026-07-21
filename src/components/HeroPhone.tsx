"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Visual do Hero — dois celulares (doblePhone.png) como peça central.
 *
 * A imagem fica PARADA (sem flutuar). Movimento:
 *  - Entrada: fade-in único ao carregar.
 *  - Hover: leve zoom (desliga em prefers-reduced-motion).
 *
 * O próprio componente cuida da própria animação (o Hero só o posiciona).
 */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroPhone() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto flex w-full max-w-[740px] items-center justify-center">
      {/* Halo/brilho por trás dos celulares */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[90px] dark:bg-blue-500/30"
      />

      {/* Fade-in de entrada + leve zoom no hover (parado, sem subir/descer) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0.2 : 0.7, ease: EASE_OUT, delay: 0.1 }}
        whileHover={
          reduce ? undefined : { scale: 1.04, transition: { duration: 0.35, ease: EASE_OUT } }
        }
        className="relative z-10 w-full will-change-transform"
      >
        <Image
          src="/doblePhone.png"
          alt="App Space Server em dois celulares, mostrando arquivos, assinaturas e histórico"
          width={1280}
          height={1132}
          priority
          unoptimized
          className="h-auto w-full select-none object-contain drop-shadow-[0_44px_90px_rgba(21,95,205,0.30)]"
        />
      </motion.div>
    </div>
  );
}
