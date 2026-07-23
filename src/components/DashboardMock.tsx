"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { CheckCircle2, FileSignature, FileText, Folder, Share2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const CHART_HEIGHT = 64;

const stats = [
  { label: "Aprovações", num: 3, icon: CheckCircle2, tint: "bg-[#DCE9FE] text-[#155fcd]" },
  { label: "Assinaturas", num: 2, icon: FileSignature, tint: "bg-[#EDE7FE] text-[#7C3AED]" },
  { label: "Compartilhados", num: 29, icon: Share2, tint: "bg-[#DCFCE7] text-[#16A34A]" },
] as const;

const activity = [38, 55, 48, 72, 62, 90, 68] as const;
const dayLabels = ["S", "T", "Q", "Q", "S", "S", "D"] as const;

const files = [
  { name: "Contrato — Fornecedor.pdf", meta: "Modificado 15/07/2026", badge: "assinado", icon: FileText },
  { name: "Proposta comercial Q3", meta: "Modificado 14/07/2026", badge: "pendente", icon: FileText },
  { name: "Pasta Financeiro / Notas", meta: "Modificado 14/07/2026", badge: "workflow", icon: Folder },
] as const;

const statsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
};

const filesContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 1.55 } },
};

const statVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

const rowVariants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

function CountUp({ value, reduce, delay = 0.95 }: { value: number; reduce: boolean | null; delay?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (reduce) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1, delay, ease: EASE });
    return controls.stop;
  }, [value, reduce, delay, count]);

  return <motion.span>{rounded}</motion.span>;
}

function ScrambleText({
  text,
  reduce,
  delay = 0,
}: {
  text: string;
  reduce: boolean | null;
  delay?: number;
}) {
  const [display, setDisplay] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }

    const totalFrames = 14;
    let frame = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;
        const revealCount = Math.floor((frame / totalFrames) * text.length);
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealCount) return char;
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );
        if (frame >= totalFrames) {
          if (interval) clearInterval(interval);
          setDisplay(text);
        }
      }, 32);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, reduce, delay]);

  return <span>{display}</span>;
}

export function DashboardMock() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduce ? 0.2 : 0.8, delay: 0.4, ease: EASE }}
      className="relative mx-auto w-full max-w-[440px]"
    >
      {/* Flutuação suave e contínua do card */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={reduce ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
        whileHover={reduce ? undefined : { scale: 1.015 }}
        className="relative box-border w-full rounded-[24px] border border-[#D9E4F5] bg-white p-5 shadow-[0_30px_70px_-25px_rgba(21,95,205,0.35)] sm:p-7"
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="font-poppins text-[18px] font-bold text-[#111233]">
            sp<span className="text-[#155fcd]">a</span>ce server
          </p>
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            {!reduce && (
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e]"
                animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
          </span>
        </div>

        <motion.div
          variants={statsContainer}
          initial="hidden"
          animate="show"
          className="mb-5 grid grid-cols-3 gap-2.5 sm:gap-3"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={statVariants}
                whileHover={reduce ? undefined : { y: -3 }}
                className="rounded-2xl border border-[#D9E4F5] bg-[#EAF1FB] px-2.5 py-3.5 sm:px-3.5"
              >
                <div className={cn("mb-2.5 flex h-7 w-7 items-center justify-center rounded-full", stat.tint)}>
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <p className="mb-1 truncate text-[9.5px] font-semibold uppercase leading-tight tracking-normal text-[#5d6368]">
                  {stat.label}
                </p>
                <p className="text-[22px] font-bold leading-none text-[#0f2247] sm:text-[24px]">
                  <CountUp value={stat.num} reduce={reduce} />
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Gráfico de atividade da semana */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.55, ease: EASE }}
          className="mb-5 rounded-2xl border border-[#D9E4F5] bg-[#F7FAFF] p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10.5px] font-semibold uppercase tracking-normal text-[#5d6368]">
              Atividade de arquivos
            </p>
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 1.1, ease: EASE }}
              className="flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10.5px] font-semibold text-[#16A34A]"
            >
              <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
              +18%
            </motion.span>
          </div>

          <div className="flex items-end justify-between gap-2" style={{ height: CHART_HEIGHT }}>
            {activity.map((value, i) => (
              <motion.div
                key={i}
                className={cn(
                  "w-full flex-1 rounded-t-[4px]",
                  i === activity.length - 1 ? "bg-[#155fcd]" : "bg-[#BFD6FA]"
                )}
                style={{ height: `${value}%`, transformOrigin: "bottom" }}
                initial={{ scaleY: reduce ? 1 : 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 0.65 + i * 0.06, ease: EASE }}
              />
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            {dayLabels.map((day, i) => (
              <span key={i} className="flex-1 text-center text-[9.5px] text-[#9aa3af]">
                {day}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={filesContainer}
          initial="hidden"
          animate="show"
          className="mt-1 border-t border-[#D9E4F5] pt-3"
        >
          {files.map((file, i) => {
            const Icon = file.icon;
            return (
              <motion.div
                key={file.name}
                variants={rowVariants}
                whileHover={reduce ? undefined : { x: 3 }}
                className="flex items-center gap-3 rounded-xl px-2.5 py-3"
              >
                <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#155fcd]">
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                  {file.badge === "pendente" && !reduce && (
                    <motion.span
                      className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#F59E0B]"
                      animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-[#111233]">
                    <ScrambleText text={file.name} reduce={reduce} delay={1.75 + i * 0.15} />
                  </p>
                  <p className="truncate text-[12px] text-[#5d6368]">{file.meta}</p>
                </div>
                <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-[#DCE9FE] px-3 py-1 text-[11px] font-semibold text-[#1D3FAE]">
                  {file.badge}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
