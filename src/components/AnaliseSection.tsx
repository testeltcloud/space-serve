"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AnaliseSection() {
  return (
    <section id="tecnologia" className="w-full bg-[#fdfdfd] dark:bg-zinc-950 overflow-hidden">
      
      {/* TÍTULO */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl text-4xl font-normal leading-[1.1] tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-[54px]"
        >
          Analise contratos, busque
          <br />
          documentos e analise estratégicas.
        </motion.h2>
      </div>

      {/* BANNER DE GRADIENTE */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="w-full bg-gradient-to-r from-[#d6cef7] to-[#e8e4fb] dark:from-[#241f3d] dark:to-[#2c2650]"
      >
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between px-6 sm:px-8 md:flex-row">
          
          {/* ESQUERDA: Ícone com efeito VIBRAÇÃO e Texto */}
          <div className="flex w-full items-center gap-6 py-6 md:w-auto md:py-8">

            {/* Container do Ícone: círculo externo claro + selo com o logo */}
            <div className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full">

              {/* Efeito de Vibração sutil */}
              <motion.div
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-white/50"
              />

              {/* Selo interno com o logo (círculo branco + marca azul já contidos na imagem) */}
              <div className="relative z-10 h-[50px] w-[50px] overflow-hidden rounded-full">
                <Image
                  src="/logotipo-3.png"
                  alt="Logotipo Ely"
                  width={50}
                  height={50}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <p className="text-[22px] font-bold leading-snug text-white drop-shadow-sm">
              Conheça o chat
              <br />
              integrado Ely!
            </p>
          </div>

          {/* DIREITA: Caixa de Chat "Flutuante" */}
          <div className="w-full max-w-[750px] pb-10 md:pb-0 md:translate-y-24 md:mr-[calc(50%-50vw)] md:pr-0 relative z-10">
            <div className="flex w-full flex-row items-center justify-between gap-4 rounded-2xl bg-white p-4 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:bg-zinc-900 border border-white dark:border-zinc-800">

              {/* Balão 1 (Esquerda - Ely) -> AJUSTADO PARA BRANCO, MENOR E COM SHADOWBOX */}
              <div className="shrink-0">
                <span className="inline-flex items-center rounded-full bg-[#dce7fb] px-5 py-1.5 text-[14px] font-semibold tracking-wide text-[#4660ae] shadow-[0_4px_12px_-2px_rgba(90,113,225,0.15)] border border-[#f0f2fd]">
                  Olá, sou a Ely
                </span>
              </div>

              {/* Balão 2 (Direita - Interação) */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-[#00000] bg-[#f1effa] px-6 py-3.5 text-[15px] font-medium text-gray-600 shadow-[0_4px_20px_-4px_rgba(106,76,241,0.12)] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#6a4cf1] text-[15px] font-semibold text-white shadow-sm mr-3">
                  ic
                </span>
                  Olá, sou a <strong className="text-[#6a4cf1] mx-1.5">Ely.</strong> Como posso te ajudar?
                </span>
              </div>

            </div>
          </div>
        </div>
      </motion.div>

      {/* Espaçador final */}
      <div className="w-full h-24 md:h-32 bg-[#fdfdfd] dark:bg-zinc-950"></div>
    </section>
  );
}