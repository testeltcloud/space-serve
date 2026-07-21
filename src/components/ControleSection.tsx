"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";

/**
 * Seção "Os seus processos sob controle." (faixa azul, celular à esquerda,
 * texto à direita). Antes era a segunda seção; agora entra como terceira.
 */
export function ControleSection() {
  return (
    <section
      id="controle"
      className="relative isolate overflow-hidden text-white"
      style={{ backgroundColor: "#155fcd" }}
    >
      {/* Barra decorativa mais clara, ponta arredondada (tipo "C") */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-[44%] -z-10 h-32 w-[36%] rounded-r-full bg-white/10 sm:h-40 lg:w-[30%]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-28">
        {/* Esquerda — celular */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center lg:justify-start"
        >
          <Image
            src="/PhoneOne.png"
            alt="App Space Server no celular, com os processos sob controle"
            width={1280}
            height={808}
            unoptimized
            loading="eager"
            className="w-full max-w-125 object-contain sm:max-w-150 lg:max-w-175"
          />
        </motion.div>

        {/* Direita — textos */}
        <div className="flex flex-col items-end">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ fontSize: "clamp(1.9rem, 4.6vw, 3.5rem)" }}
            className="text-right font-poppins font-normal leading-[1.1] tracking-tight"
          >
            <span className="block sm:whitespace-nowrap">
              Os seus processos sob
            </span>
            <span className="block">controle.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)" }}
            className="mt-8 max-w-md text-justify leading-relaxed text-white/90"
          >
            O Space Server resolve isso reunindo tudo em um único painel, com
            controle, histórico e segurança do início ao fim.
          </motion.p>
        </div>
      </div>

      {/* Botão flutuante com a logo */}
      <a
        href="#contato"
        aria-label="Fale conosco"
        className="absolute bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full  shadow-lg transition-transform hover:scale-105"
      >
        <Logo priority />
      </a>
    </section>
  );
}
