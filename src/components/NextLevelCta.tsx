"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";

export function NextLevelCta() {
  return (
    <section id="precos" className="relative flex w-full flex-col items-center overflow-hidden bg-[#e8effa] py-[160px]">
      
      {/* --- Tag Superior Esquerda (Planos e ofertas) --- */}
      <div className="absolute left-0 top-0 flex items-center gap-5 rounded-br-[60px] bg-[#0351d9] py-5 pl-8 pr-14 shadow-[10px_15px_30px_rgba(0,0,0,0.35)]">
        <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-white text-[#0351d9]">
          <Logo className="h-8 w-8" />
        </span>
        <span className="text-[40px] font-normal tracking-wide text-white">
          Planos e ofertas
        </span>
      </div>

      {/* --- Card Central Principal --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-[20px] flex w-[1200px] max-w-[90%] flex-col items-center justify-center rounded-[80px] bg-[#0351d9] py-[90px] shadow-[0_25px_60px_rgba(0,0,0,0.25)]"
      >
        <h2 className="text-[52px] font-normal leading-[1.1] text-white md:text-[56px]">
          Vamos alcançar o próximo <strong className="font-extrabold">nível?</strong>
        </h2>
        
        <p className="mt-3 text-[28px] font-light text-white md:text-[30px]">
          Conheça as soluções
        </p>
        
        <a
          href="#solucoes"
          className="mt-12 rounded-full bg-white/30 px-14 py-3.5 text-[32px] text-white backdrop-blur-sm transition-colors hover:bg-white/40"
        >
          <span className="font-sans text-white">space server</span>
        </a>
      </motion.div>
      
    </section>
  );
}