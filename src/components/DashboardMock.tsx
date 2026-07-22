"use client";

import { motion, useReducedMotion } from "framer-motion";

const stats = [
  { label: "Aprovações", num: 3 },
  { label: "P/ assinatura", num: 2 },
  { label: "Compartilhados", num: 29 },
] as const;

const files = [
  { name: "Contrato — Fornecedor.pdf", meta: "Modificado 15/07/2026", badge: "assinado" },
  { name: "Proposta comercial Q3", meta: "Modificado 14/07/2026", badge: "pendente" },
  { name: "Pasta Financeiro / Notas", meta: "Modificado 14/07/2026", badge: "workflow" },
] as const;

export function DashboardMock() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduce ? 0.2 : 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-[320px] rounded-[18px] border border-[#D9E4F5] bg-white p-[22px] shadow-[0_30px_60px_-30px_rgba(21,95,205,0.35)] sm:w-[350px]"
    >
      <div className="mb-[18px] flex items-center justify-between">
        <p className="font-poppins text-[15px] font-bold text-[#111233]">
          sp<span className="text-[#155fcd]">a</span>ce server
        </p>
      </div>

      <div className="mb-[14px] grid grid-cols-3 gap-[10px]">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#D9E4F5] bg-[#EAF1FB] px-3 py-[14px]"
          >
            <p className="mb-[10px] text-[10.5px] uppercase leading-tight tracking-wide text-[#5d6368]">
              {stat.label}
            </p>
            <p className="text-[22px] font-bold text-[#0f2247]">{stat.num}</p>
          </div>
        ))}
      </div>

      <div className="mt-[6px] border-t border-[#D9E4F5] pt-2">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-3 rounded-lg px-2 py-[11px]"
          >
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#155fcd]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#111233]">{file.name}</p>
              <p className="text-[11.5px] text-[#5d6368]">{file.meta}</p>
            </div>
            <span className="flex-shrink-0 rounded-full bg-[#DCE9FE] px-[9px] py-[3px] text-[10px] font-semibold text-[#1D3FAE]">
              {file.badge}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
