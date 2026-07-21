"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { DiaTextReveal } from "@/registry/magicui/dia-text-reveal";
import { TypingAnimation } from "@/registry/magicui/typing-animation";

/**
 * Terceira seção — vídeo de fundo com overlay escuro.
 *
 * Layout em duas laterais (lg+): título grande à esquerda, subtítulo + chat
 * no topo da coluna direita — evita a coluna estreita centralizada de antes,
 * que desperdiçava toda a largura lateral da tela.
 *
 * O título revela palavra a palavra conforme a página rola (TextReveal,
 * mesma mecânica do Magic UI: scrollYProgress de uma pista — trackRef,
 * h-[160vh] — com o vídeo fixado via `sticky` dentro dela). A pista foi
 * encurtada de 200vh pra 160vh e o ritmo da conversa, apertado: pinar a tela
 * por 2 alturas inteiras de viewport lia como "travou" pra quem rolava.
 *
 * Ao passar de ~55% do scroll da pista, a conversa começa: a Ely abre com uma
 * saudação e a troca segue em CONVERSATION, alternando digitando → mensagem.
 * Sem card/caixa — só os balões, flutuando sobre o vídeo. IA à esquerda,
 * cliente à direita; a coluna cresce naturalmente pra baixo (sem mais
 * justify-end/min-h reservado, que sobrava espaço vazio).
 */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Role = "ely" | "user";
type ChatMessage = { role: Role; text: string; typed?: boolean };

/** Troca contextualizada nas funções do sistema (busca, assinatura, prazos, anotações). */
const CONVERSATION: ChatMessage[] = [
  { role: "ely", text: "Olá, sou a Ely. Como posso te ajudar?" },
  { role: "user", text: "Ei Ely, pode me ajudar com meus contratos?", typed: true },
  { role: "ely", text: "Claro! Encontrei 2 contratos aguardando assinatura e 1 vencendo em 5 dias." },
  { role: "user", text: "Me mostra qual vence primeiro?" },
  { role: "ely", text: "É o contrato de locação, na pasta Financeiro. Já deixei uma anotação pra você não esquecer." },
];

type Phase = "dots" | "typing" | null;

function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

/** Os 3 pontinhos de "digitando", pulsando em cadência. Escuros no balão claro da Ely. */
function TypingDots({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={`h-2 w-2 rounded-full ${dark ? "bg-neutral-400" : "bg-white/70"}`}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

/** Um balão de conversa — avatar da Ely à esquerda, ícone do cliente à direita. */
function ChatBubble({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={`flex items-end gap-2.5 ${isUser ? "justify-end self-end" : "self-start"}`}
    >
      {!isUser && (
        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full shadow-lg ring-2 ring-white/40">
          <Image
            src="/Inteligencia Artificial/logo-avatar-ia.png"
            alt="Ely"
            width={96}
            height={96}
            unoptimized
            className="h-full w-full object-cover"
          />
        </span>
      )}
      <div
        className={
          isUser
            ? "max-w-[80%] rounded-2xl rounded-br-md bg-white/15 px-4 py-2.5 text-left backdrop-blur-md"
            : "max-w-[80%] rounded-2xl rounded-bl-md bg-white/95 px-4 py-2.5 text-left shadow-lg"
        }
      >
        {children}
      </div>
      {isUser && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-lg">
          <UserIcon className="h-5 w-5" />
        </span>
      )}
    </motion.div>
  );
}

export function AnaliseSection() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  // `completed` = quantas mensagens de CONVERSATION já estão totalmente visíveis.
  // `phase` = estado da mensagem em CONVERSATION[completed] (dots/digitando) enquanto ela ainda não completou.
  const [completed, setCompleted] = useState(0);
  const [phase, setPhase] = useState<Phase>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Garantia extra pro autoplay: setar `.muted` na propriedade real do DOM
  // (não só no atributo JSX) e chamar `.play()` explicitamente — o
  // `autoPlay` declarativo pode silenciosamente não disparar dependendo do
  // timing da hidratação. Pausa se o usuário preferir menos movimento.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }
    video.muted = true;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, [reduce, isInView]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function startMessage(index: number) {
    if (index >= CONVERSATION.length) return;
    setPhase("dots");
    timeoutRef.current = setTimeout(
      () => {
        if (CONVERSATION[index].typed) {
          setPhase("typing");
        } else {
          setPhase(null);
          setCompleted(index + 1);
          timeoutRef.current = setTimeout(() => startMessage(index + 1), 650);
        }
      },
      index === 0 ? 600 : 800,
    );
  }

  function handleTypedComplete() {
    timeoutRef.current = setTimeout(() => {
      setPhase(null);
      setCompleted((c) => {
        const next = c + 1;
        timeoutRef.current = setTimeout(() => startMessage(next), 650);
        return next;
      });
    }, 300);
  }

  useEffect(() => {
    if (!isInView || completed > 0 || phase !== null) return;
    if (reduce) { setCompleted(CONVERSATION.length); return; }
    startMessage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const pendingMessage = phase ? CONVERSATION[completed] : null;

  return (
    <section ref={sectionRef} className="relative bg-black" aria-label="Conheça o chat integrado Ely">
      <div className="flex h-[80vh] min-h-140 w-full flex-col items-center justify-center overflow-hidden">
          {/* Vídeo de fundo — só monta (e baixa) ao entrar na viewport */}
          {isInView && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src="/214736_medium.mp4"
              autoPlay={!reduce}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            />
          )}

          {/* Filtro escuro por cima do vídeo (legibilidade do texto) */}
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/55 to-black/85" />
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 flex w-full max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-10 lg:pb-20">
            {/* Coluna esquerda: título — items-end no row ancora na base */}
            <h2 className="max-w-xl font-poppins text-4xl font-bold leading-[1.15] tracking-tight text-left lg:text-5xl xl:text-6xl">
              <DiaTextReveal
                text="Analise contratos, busque documentos e analise estratégicas."
                colors={["#ffffff"]}
                highlightWords={["contratos,", "documentos", "estratégicas."]}
                highlightColor="#60a5fa"
              />
            </h2>

            {/* Coluna direita: subtítulo + chat */}
            <div className="flex w-full flex-col items-end gap-6 lg:max-w-sm">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={completed > 0 || phase !== null ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="w-fit text-right font-poppins text-base font-medium text-white/80 sm:text-lg"
              >
                Conheça o chat
                <br className="sm:hidden" /> integrado Ely!
              </motion.p>

              {/* Conversa flutuante — sem card. IA à esquerda, cliente à direita. */}
              <div className="flex w-full flex-col items-end gap-3">
                {CONVERSATION.slice(0, completed).map((msg, i) => (
                  <ChatBubble key={i} role={msg.role}>
                    <span
                      className={
                        msg.role === "user" ? "text-sm text-white sm:text-base" : "text-sm text-neutral-800 sm:text-base"
                      }
                    >
                      {msg.text}
                    </span>
                  </ChatBubble>
                ))}

                {pendingMessage && (
                  <ChatBubble role={pendingMessage.role}>
                    {phase === "dots" && <TypingDots dark={pendingMessage.role === "ely"} />}
                    {phase === "typing" && (
                      <TypingAnimation
                        duration={55}
                        className={
                          pendingMessage.role === "user"
                            ? "text-sm text-white sm:text-base"
                            : "text-sm text-neutral-800 sm:text-base"
                        }
                        onComplete={handleTypedComplete}
                      >
                        {pendingMessage.text}
                      </TypingAnimation>
                    )}
                  </ChatBubble>
                )}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
