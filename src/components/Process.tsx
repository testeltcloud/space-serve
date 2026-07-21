"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Workflow,
  FolderOpen,
  PenTool,
  Lock,
  Sparkles,
  Home,
  FolderKanban,
  FileSignature,
  StickyNote,
  Share2,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { BorderBeam } from "./magicui/border-beam";
import { SignatureFlowPanel } from "./SignatureFlowPanel";

type Solution = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const ecosystem: Solution[] = [
  {
    title: "Auditorias",
    description: "Logs detalhados de cada ação, para conformidade e transparência.",
    icon: ShieldCheck,
  },
  {
    title: "Workflow de Processos",
    description: "Esteiras de aprovação automatizadas, do jeito que seu time trabalha.",
    icon: Workflow,
  },
  {
    title: "Gestão Documental",
    description: "Contratos e documentos organizados num ambiente seguro.",
    icon: FolderOpen,
  },
  {
    title: "Assinaturas Digitais",
    description: "Assinatura eletrônica com validade jurídica, sem complicação.",
    icon: PenTool,
  },
  {
    title: "Controle de Acesso",
    description: "Permissões granulares por pasta e por arquivo.",
    icon: Lock,
  },
  {
    title: "Inteligência Artificial",
    description: "Chat integrado Ely: busque qualquer informação em segundos.",
    icon: Sparkles,
  },
  {
    title: "Home",
    description: "Aprovações, assinaturas e anotações recentes num painel só.",
    icon: Home,
  },
  {
    title: "Meus Arquivos",
    description: "Pastas por setor ou projeto — cada time vê só o que precisa.",
    icon: FolderKanban,
  },
  {
    title: "Documentos p/ Assinatura",
    description: "Visão consolidada do que está assinado, pendente ou em andamento.",
    icon: FileSignature,
  },
  {
    title: "Anotações",
    description: "Observações vinculadas direto à pasta ou documento certo.",
    icon: StickyNote,
  },
  {
    title: "Compartilhados",
    description: "Tudo que você compartilhou, e o que compartilharam com você.",
    icon: Share2,
  },
  {
    title: "Lixeira",
    description: "Excluiu por engano? Fica guardado, pronto pra restaurar.",
    icon: Trash2,
  },
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function FeatureCell({ item }: { item: Solution }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={cellVariants}
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 shadow-2xs dark:shadow-black/20 transition-shadow duration-200 hover:shadow-md"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1e60d1]/10 text-[#1e60d1] transition-colors duration-200 group-hover:bg-[#1e60d1] group-hover:text-white">
        <Icon size={17} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <h3 className="text-[13.5px] font-bold text-zinc-900 dark:text-white">{item.title}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">{item.description}</p>
      </div>
    </motion.div>
  );
}

export function Process() {
  return (
    <section id="processos" className="w-full flex flex-col font-sans">
      {/* --- Ecossistema Completo --- */}
      <div className="relative w-full overflow-hidden bg-white dark:bg-zinc-950 pt-28 pb-24 flex flex-col items-center">
        {/* Subtle brand-blue glow, no dark/purple background */}
        <div className="pointer-events-none absolute top-[-10%] left-1/2 h-150 w-225 -translate-x-1/2 rounded-full bg-[#1e60d1]/5 blur-[140px]" />

        {/* Section Header — um único bloco, cobrindo soluções + espaço de trabalho */}
        <div className="container relative z-10 mx-auto mb-12 flex max-w-7xl flex-col items-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
              Nossas <span className="text-[#1e60d1]">Soluções</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-light text-zinc-500 dark:text-zinc-400">
              Segurança, assinatura e gestão de arquivos — tudo no mesmo painel, sem trocar de
              ferramenta.
            </p>
          </motion.div>
        </div>

        {/* Grid único, compacto: mesma informação dos 12 itens */}
        <div className="container relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {ecosystem.map((item) => (
              <FeatureCell key={item.title} item={item} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- Contact Section --- */}
      <div className="relative z-10 w-full bg-[#fafafa] dark:bg-zinc-950 py-32 flex items-center justify-center">

        {/* Animated Floating Gradient Orbs Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {/* Large soft blue orb - drifts slowly */}
          <motion.div
            animate={{
              x: [0, 60, -30, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1e60d1]/8 blur-[100px]"
          />
          {/* Indigo orb - counter drift */}
          <motion.div
            animate={{
              x: [0, -50, 40, 0],
              y: [0, 30, -50, 0],
              scale: [1, 0.85, 1.15, 1],
            }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full bg-indigo-400/6 blur-[100px]"
          />
          {/* Small accent orb */}
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 40, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-blue-300/5 blur-[80px]"
          />

          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Duas "meias-luas" — uma atrás de cada coluna, se juntando no centro
              pra dar a impressão de dois espaços separados. */}
          <div className="absolute top-1/2 left-0 h-140 w-90 -translate-y-1/2 rounded-r-full bg-linear-to-r from-[#1e60d1]/15 via-[#1e60d1]/6 to-transparent blur-xl md:w-115" />
          <div className="absolute top-1/2 right-0 h-140 w-90 -translate-y-1/2 rounded-l-full bg-linear-to-l from-[#1e60d1]/15 via-[#1e60d1]/6 to-transparent blur-xl md:w-115" />
        </div>

        {/* Subtle top divider line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />

        <div className="container relative z-10 mx-auto grid grid-cols-1 items-start gap-16 px-6 md:px-12 lg:grid-cols-2 lg:gap-20">

          {/* Left Side: Fluxo de assinatura animado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col items-center gap-8 lg:items-start"
          >
            <div className="text-center lg:text-left">
              <span className="mb-4 block text-xs font-semibold tracking-widest text-[#1e60d1] uppercase">
                Assinaturas
              </span>
              <h2 className="text-3xl leading-[1.1] font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                Fluxos de assinatura e aprovação{" "}
                <span className="text-[#1e60d1]">
                  sob seu controle
                </span>
                .
              </h2>
            </div>

            <SignatureFlowPanel />
          </motion.div>

          {/* Right Side: Contato + Form Card */}
          <div className="flex flex-col items-center gap-10 lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-[1.05] tracking-tight">
                Fale com um de <br className="hidden lg:block" />
                nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e60d1] to-indigo-500">especialistas</span>
              </h2>
              <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-300 font-light italic">
                Não perca mais tempo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-8 md:p-10 flex flex-col gap-6 border border-zinc-100/80 dark:border-zinc-700/50"
            >
              <BorderBeam size={300} duration={12} delay={9} colorFrom="#1e60d1" colorTo="#818cf8" />

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Fale conosco
              </h3>

              <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E60D1]/30 focus:border-[#1E60D1] focus:bg-white dark:focus:bg-zinc-800 transition-all text-sm text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="dob" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Date of birth
                  </label>
                  <input
                    type="text"
                    id="dob"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E60D1]/30 focus:border-[#1E60D1] focus:bg-white dark:focus:bg-zinc-800 transition-all text-sm text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
                    placeholder="DD/MM/AAAA"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E60D1]/30 focus:border-[#1E60D1] focus:bg-white dark:focus:bg-zinc-800 transition-all text-sm text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
                    placeholder="seu@email.com"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-3 w-full bg-[#1e60d1] hover:bg-[#154bb3] active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(30,96,209,0.3)] hover:shadow-[0_6px_30px_rgba(30,96,209,0.45)] text-sm"
                >
                  Enviar
                </button>
              </form>

              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center mt-1 leading-tight">
                Seu nome de perfil no Canva será compartilhado. Nunca envie senhas.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
