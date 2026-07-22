"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";

export default function Register() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[#155fcd] sm:h-64 lg:h-72"
      />

      <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ fontSize: "clamp(1.9rem, 4vw, 2.75rem)" }}
          className="pt-2 font-poppins font-normal leading-[1.1] tracking-tight text-white sm:pt-4"
        >
          <span className="block">Não deixe sua</span>
          <span className="block">empresa de fora</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center lg:justify-end"
        >
      <Image
  src="/doblePhone.png"
  alt="App Space Server, tela de arquivos"
  width={1631}
  height={1200}
  sizes="(min-width: 1024px) 480px, 380px"
  className="w-full max-w-90 scale-155 object-contain sm:max-w-100 lg:max-w-110 "
/>
        </motion.div>
      </div>
         <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-[17%] -z-20 h-[75%]  sm:w-[40%] lg:w-[12%] rounded-bl-[4rem] lg:rounded-bl-[6rem] bg-[#155fcd]"
      />
      <a
        href="#contato"
        aria-label="Fale conosco"
        className="absolute bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105"
      >
        <Logo className="h-7 w-auto" />
      </a>
    </section>
  );
}
