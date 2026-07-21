"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

/**
 * Mockup animado do fluxo "Adicionar destinatários" — recriado a partir do
 * protótipo em SERVER.HTML (painel .panel + runCycle()). Em loop: liga a
 * ordem de assinatura, digita os dois signatários campo a campo, sobe os 3
 * arquivos (barras de progresso) e acende o botão "Próximo" no final, antes
 * de reiniciar o ciclo.
 */

type Signee = { name: string; email: string; phone: string };
type FileStatus = "Aguardando" | "Enviando" | "Completo";
type FileRow = { name: string; fill: number; status: FileStatus };

const EMPTY_SIGNEE: Signee = { name: "", email: "", phone: "" };

const SIGNEE_DATA: [Signee, Signee] = [
  { name: "Paulo Lopes", email: "lopeslopes@gmail.com", phone: "11 998632212" },
  { name: "Ana Marthins", email: "ana.m@gmail.com", phone: "11 987755453" },
];

const FILE_NAMES = [
  "Contrato — Fornecedor.pdf",
  "Documentos ativos space.pdf",
  "Proposta comercial Q3.pdf",
];
const FILE_DURATIONS = [1400, 1800, 1200];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function emptyFiles(): FileRow[] {
  return FILE_NAMES.map((name) => ({ name, fill: 0, status: "Aguardando" }));
}

export function SignatureFlowPanel() {
  const [order, setOrder] = useState(false);
  const [signees, setSignees] = useState<[Signee, Signee]>([EMPTY_SIGNEE, EMPTY_SIGNEE]);
  const [files, setFiles] = useState<FileRow[]>(emptyFiles);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function typeInto(index: 0 | 1, field: keyof Signee, text: string, speed: number) {
      for (let i = 1; i <= text.length; i++) {
        if (cancelled) return;
        await sleep(speed);
        if (cancelled) return;
        setSignees((prev) => {
          const next: [Signee, Signee] = [...prev];
          next[index] = { ...next[index], [field]: text.slice(0, i) };
          return next;
        });
      }
    }

    async function fillFile(index: number, duration: number) {
      setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, status: "Enviando" } : f)));
      await sleep(30);
      if (cancelled) return;
      setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, fill: 100 } : f)));
      await sleep(duration);
      if (cancelled) return;
      setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, status: "Completo" } : f)));
    }

    async function runCycle() {
      setOrder(false);
      setReady(false);
      setSignees([EMPTY_SIGNEE, EMPTY_SIGNEE]);
      setFiles(emptyFiles());

      await sleep(500);
      if (cancelled) return;
      setOrder(true);
      await sleep(400);
      if (cancelled) return;

      await typeInto(0, "name", SIGNEE_DATA[0].name, 55);
      await typeInto(0, "email", SIGNEE_DATA[0].email, 35);
      await typeInto(0, "phone", SIGNEE_DATA[0].phone, 45);
      if (cancelled) return;
      await sleep(300);
      if (cancelled) return;

      await typeInto(1, "name", SIGNEE_DATA[1].name, 55);
      await typeInto(1, "email", SIGNEE_DATA[1].email, 35);
      await typeInto(1, "phone", SIGNEE_DATA[1].phone, 45);
      if (cancelled) return;
      await sleep(500);
      if (cancelled) return;

      fillFile(0, FILE_DURATIONS[0]);
      await sleep(350);
      if (cancelled) return;
      fillFile(1, FILE_DURATIONS[1]);
      await sleep(350);
      if (cancelled) return;
      await fillFile(2, FILE_DURATIONS[2]);
      if (cancelled) return;

      await sleep(500);
      if (cancelled) return;
      setReady(true);
      await sleep(2600);
    }

    async function loop() {
      while (!cancelled) {
        await runCycle();
      }
    }
    loop();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full max-w-[520px] rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-[0_30px_60px_-30px_rgba(17,18,51,0.18)] dark:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-7">
      <h3 className="mb-5 font-poppins text-base font-bold text-zinc-900 dark:text-white">
        Adicionar destinatários (signatário)
      </h3>

      <div className="mb-4 flex items-center gap-2.5 text-[13px] text-zinc-500 dark:text-zinc-400">
        <span
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-300 ${
            order ? "bg-[#1e60d1]" : "bg-zinc-200 dark:bg-zinc-700"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
              order ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </span>
        Ordem de assinatura
      </div>

      {signees.map((signee, i) => (
        <SigneeBlock key={i} index={i as 0 | 1} signee={signee} />
      ))}

      <div className="mt-6">
        <h4 className="mb-3.5 font-poppins text-sm font-bold text-zinc-900 dark:text-white">Adicionar arquivos</h4>
        {files.map((file, i) => (
          <FileRowItem key={file.name} file={file} durationMs={FILE_DURATIONS[i]} />
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-2.5">
        <button
          type="button"
          className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-500"
        >
          Cancelar
        </button>
        <button
          type="button"
          className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors duration-300 ${
            ready ? "bg-[#1e60d1] text-white" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500"
          }`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

function SigneeBlock({ index, signee }: { index: 0 | 1; signee: Signee }) {
  return (
    <div className="mb-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-800/70 p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#1e60d1]/10 text-[11px] font-bold text-[#1e60d1]">
          {index + 1}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Signatário {index + 1}</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        <Field label="Nome" value={signee.name} />
        <Field label="E-mail" value={signee.email} />
        <Field label="Celular" value={signee.phone} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <label className="mb-1 block text-[10px] tracking-wide text-zinc-400 dark:text-zinc-500 uppercase">{label}</label>
      <div className="flex h-[34px] items-center overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 text-[12px] whitespace-nowrap text-zinc-800 dark:text-zinc-100">
        {value}
        <span className="ml-0.5 inline-block h-3.5 w-px shrink-0 animate-pulse bg-[#1e60d1]" />
      </div>
    </div>
  );
}

function FileRowItem({ file, durationMs }: { file: FileRow; durationMs: number }) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 py-2.5 last:border-b-0">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#1e60d1]/10">
        <FileText size={14} className="text-[#1e60d1]" />
      </span>
      <span className="flex-1 truncate text-[12.5px] font-medium text-zinc-700 dark:text-zinc-200">{file.name}</span>
      <span className="h-[5px] w-[90px] shrink-0 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <span
          className="block h-full rounded-full bg-[#1e60d1]"
          style={{
            width: `${file.fill}%`,
            transitionProperty: "width",
            transitionDuration: `${durationMs}ms`,
            transitionTimingFunction: "linear",
          }}
        />
      </span>
      <span
        className={`w-[68px] shrink-0 text-right text-[11px] font-semibold ${
          file.status === "Completo" ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"
        }`}
      >
        {file.status}
      </span>
    </div>
  );
}
