"use client";

import Image from "next/image";

export default function Register() {
  return (
    <div className="relative w-full overflow-x-hidden bg-white dark:bg-zinc-950">

      {/* Onda decorativa de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 480C240 560 480 400 720 400C960 400 1200 560 1440 480V800H0V480Z"
            fill="#8f7fe8"
            fillOpacity="0.45"
          />
        </svg>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-8 px-6 py-6 md:flex-row md:gap-12 md:px-12 md:py-8">

        {/* Imagem do celular */}
        <div className="flex w-full justify-center overflow-visible md:w-[62%]">
          <Image
            src="/doble.png"
            alt="App Space Server no celular"
            width={2280}
            height={1710}
            sizes="(min-width: 768px) 81vw, 130vw"
            loading="eager"
            className="w-[130%] object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* Texto */}
        <div className="flex w-full flex-col items-start gap-5 text-left md:w-1/2">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            Não deixe sua empresa de fora
          </h2>

          <p className="max-w-md text-lg font-light text-neutral-600 dark:text-neutral-300 md:text-xl">
            Tenha todos os processos sob controle na palma da sua mão com um design feito para o seu dia a dia.
          </p>

          <button className="mt-2 rounded-full bg-[#1e60d1] px-8 py-3 text-base font-bold text-white shadow-lg transition-colors hover:bg-[#155fcd]">
            Começar Agora
          </button>
        </div>

      </div>
    </div>
  );
}
