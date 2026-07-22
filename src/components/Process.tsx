"use client";

import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";

type SolutionCard = {
  number: string;
  title: string;
  description: string;
  tone: "light" | "dark";
};

const solutions: SolutionCard[] = [
  {
    number: "1",
    title: "Auditorias",
    description: "Realize verificações sistemáticas e independentes.",
    tone: "dark",
  },
  {
    number: "2",
    title: "Gestão Documental",
    description: "Organize e armazene todos os documentos da sua empresa.",
    tone: "light",
  },
  {
    number: "3",
    title: "Assinaturas",
    description: "Formalize documentos com validade jurídica e segurança.",
    tone: "light",
  },
  {
    number: "4",
    title: "Workflow de Processos",
    description: "Automatize e controle o fluxo de trabalho.",
    tone: "dark",
  },
];

const checklist = ["Segurança", "Confiável", "Estratégico"];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function SolutionCell({ item }: { item: SolutionCard }) {
  return (
    <motion.div
      variants={cellVariants}
      className={`relative flex flex-col items-center gap-3 rounded-3xl p-6 text-center shadow-lg ${
        item.tone === "dark" ? "bg-[#25397a]" : "bg-[#7b93df]"
      }`}
    >
      <span className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#1e3170] text-base font-extrabold text-white shadow-sm">
        {item.number}
      </span>
      <h3 className="text-base font-bold tracking-tight text-white uppercase">{item.title}</h3>
      <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
    </motion.div>
  );
}

export function Process() {
  return (
    <section id="processos" className="w-full flex flex-col">
      {/* --- Nossas soluções --- */}
      <div id="solucoes" className="w-full bg-[#1e60d1] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <span className="inline-block rounded-full bg-[#3f7fe0] px-6 py-3 text-lg font-bold text-white">
            Nossas soluções
          </span>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2"
            >
              {solutions.map((item) => (
                <SolutionCell key={item.title} item={item} />
              ))}
            </motion.div>

            <div className="flex w-full max-w-xs flex-col justify-center gap-10 rounded-3xl bg-[#245cbc] p-8">
              {checklist.map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <CircleCheck className="h-6 w-6 shrink-0 text-white" strokeWidth={2} />
                  <span className="text-lg font-bold tracking-tight text-white uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-end">
            <a
              href="#contato"
              className="inline-flex rounded-full bg-white/10 px-10 py-5 text-lg font-bold text-white transition-colors hover:bg-white/20"
            >
              Fale com um especialista
            </a>
          </div>
        </div>
      </div>

      {/* --- Fale conosco --- */}
      <div id="contato" className="relative w-full h-[650px] bg-[#f7f8fb] overflow-hidden hidden md:block">
        
        {/* Background Stripes (Exatamente nas proporções da imagem) */}
        <div className="absolute inset-0 w-full h-full z-0 flex flex-col pointer-events-none">
          <div className="h-[95px] w-full bg-[#5978c4]"></div>
          <div className="h-[210px] w-full bg-[#7a9bd1]"></div>
          <div className="flex-1 w-full bg-[#f8f9fc]"></div>
        </div>

        {/* Container Centralizado alargado para max-w-7xl para alinhar com a seção superior */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-row px-6 sm:px-8">
          
          {/* Lado Esquerdo - Textos e Botão Principal */}
          <div className="relative flex w-[55%] flex-col h-full">
            {/* Logo */}
            <div className="absolute top-[28px] left-0">
               <span className="text-[34px] tracking-tight font-medium text-white font-sans">
                 space server
               </span>
            </div>
            
            {/* Título Principal na área intermediária azul claro */}
            <div className="absolute top-[150px] left-0">
              <h2 className="text-[46px] font-normal leading-[1.1] text-white">
                Fale com um de nossos<br/>especialistas
              </h2>
            </div>
            
            {/* Botão no canto inferior esquerdo */}
            <div className="absolute bottom-[60px] left-0">
               <a href="#contato" className="inline-flex rounded-xl bg-[#0351d9] px-10 py-5 text-[22px] font-bold text-white transition-colors hover:bg-[#0042a3]">
                 Não perca mais tempo.
               </a>
            </div>
          </div>

          {/* Lado Direito - Formulário Flutuante */}
          <div className="relative flex w-[45%] pt-[45px] pb-[45px]">
             <form className="flex w-full h-[530px] flex-col rounded-[20px] bg-white p-10 shadow-[0_15px_60px_rgba(0,0,0,0.15)]">
                <h3 className="mb-8 text-[28px] font-bold text-black tracking-tight">Fale conosco</h3>

                <div className="flex flex-col gap-6">
                  <label className="flex flex-col gap-2 text-[14px] font-bold text-black">
                    Full name
                    <input type="text" className="h-[44px] rounded-lg border border-gray-300 px-3 outline-none focus:border-blue-500 transition-colors" />
                  </label>

                  <label className="flex flex-col gap-2 text-[14px] font-bold text-black">
                    Date of birth
                    <input type="text" className="h-[44px] rounded-lg border border-gray-300 px-3 outline-none focus:border-blue-500 transition-colors" />
                  </label>

                  <label className="flex flex-col gap-2 text-[14px] font-bold text-black">
                    Email address
                    <input type="email" className="h-[44px] rounded-lg border border-gray-300 px-3 outline-none focus:border-blue-500 transition-colors" />
                  </label>
                </div>

                {/* Área final (Botão Enviar e descritivo minúsculo) */}
                <div className="mt-auto flex flex-col items-center">
                  <button type="submit" className="w-full rounded-[14px] bg-[#1e61e0] py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-[#1a54b8]">
                    Enviar
                  </button>
                  <p className="mt-2.5 text-center text-[10px] text-gray-500">
                    Seu nome de perfil no Canva será compartilhado. Nunca envie senhas.
                  </p>
                </div>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
}