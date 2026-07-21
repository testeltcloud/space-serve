"use client";

import { type RefObject, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * TextReveal (Magic UI) — recriado com framer-motion (dependência já no projeto).
 * Cada palavra vai de opacidade baixa (0.15) a 1, conforme a página rola pela
 * "pista" de scroll (containerRef, tipicamente um wrapper alto — ex.: h-[200vh]
 * — com o texto fixado via `sticky` dentro dele). Uma cópia fantasma de cada
 * palavra (opacidade fixa) ocupa o espaço por baixo, então o layout nunca pula.
 *
 * Uso:
 *   const trackRef = useRef<HTMLDivElement>(null);
 *   <div ref={trackRef} className="relative h-[200vh]">
 *     <div className="sticky top-0 h-screen ...">
 *       <TextReveal containerRef={trackRef}>Seu texto aqui.</TextReveal>
 *     </div>
 *   </div>
 */

interface TextRevealProps {
  children: string;
  className?: string;
  /** Ref da pista de scroll externa (o wrapper alto). Se omitido, mede a si mesmo. */
  containerRef?: RefObject<HTMLElement | null>;
  /** Início/fim do progresso de scroll considerado (0–1) dentro da pista. */
  range?: [number, number];
  /** Alinhamento das linhas de texto (o wrap continua fazendo flex-wrap). */
  align?: "left" | "center" | "right";
}

export function TextReveal({
  children,
  className,
  containerRef,
  range = [0, 1],
  align = "center",
}: TextRevealProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const targetRef = containerRef ?? localRef;
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const words = children.split(" ");
  const [rangeStart, rangeEnd] = range;
  const span = rangeEnd - rangeStart;
  const justify =
    align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";

  return (
    <div ref={containerRef ? undefined : localRef} className={className}>
      <p className={`flex flex-wrap gap-x-[0.3em] ${justify}`}>
        {words.map((word, i) => {
          const start = rangeStart + (i / words.length) * span;
          const end = rangeStart + ((i + 1) / words.length) * span;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]} reduce={!!reduce}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative">
      <span aria-hidden className="opacity-[0.15]">
        {children}
      </span>
      <motion.span
        style={reduce ? undefined : { opacity }}
        className="absolute inset-0"
      >
        {children}
      </motion.span>
    </span>
  );
}
