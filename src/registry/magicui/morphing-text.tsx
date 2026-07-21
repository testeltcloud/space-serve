"use client";

import { useEffect, useState, type ElementType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * MorphingText (Magic UI) — recriado com framer-motion (dependência já no projeto).
 * Alterna entre as palavras de `texts` com um cross-fade borrado (blur morph);
 * a largura do texto acompanha suavemente via layout animation (sem medir
 * manualmente — o `layout` do wrapper faz o tween do tamanho sozinho).
 *
 * Uso: <MorphingText texts={["Hello", "World"]} />
 */

interface MorphingTextProps {
  texts: string[];
  className?: string;
  as?: ElementType;
  /** Tempo que cada palavra fica visível, em ms. */
  interval?: number;
  /** Duração da transição de morph, em segundos. */
  duration?: number;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MorphingText({
  texts,
  className,
  as: Component = "span",
  interval = 2600,
  duration = 0.6,
}: MorphingTextProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  // Proxy pré-criado e cacheado por tag (estável entre renders; sem motion.create).
  const MotionComponent = motion[
    (typeof Component === "string" ? Component : "span") as keyof typeof motion
  ] as ElementType;

  useEffect(() => {
    if (reduce || texts.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, interval);
    return () => clearInterval(id);
  }, [reduce, texts.length, interval]);

  if (reduce) {
    return <MotionComponent className={className}>{texts[0]}</MotionComponent>;
  }

  return (
    <MotionComponent layout className={`relative inline-block align-bottom ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(10px)", y: 4 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -4 }}
          transition={{ duration, ease: EASE_OUT }}
          className="inline-block"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </MotionComponent>
  );
}
