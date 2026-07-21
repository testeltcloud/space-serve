"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

interface DiaTextRevealProps {
  text: string;
  colors?: string[];
  highlightWords?: string[];
  highlightColor?: string;
  className?: string;
}

export function DiaTextReveal({
  text,
  colors = ["#ffffff"],
  highlightWords = [],
  highlightColor = "#60a5fa",
  className = "",
}: DiaTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const words = useMemo(
    () =>
      text.split(" ").map((word, wi) => ({
        wi,
        word,
        isHighlight: highlightWords.includes(word),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, highlightWords.join(",")]
  );

  // Palavra a palavra (não por caractere): mesmo efeito de blur-in em cascata,
  // sem centenas de spans com `filter` animado (não composto pela GPU).
  const perWordDelay = Math.min(0.12, 1.8 / Math.max(words.length, 1));

  return (
    <span ref={ref} className={`inline ${className}`} role="text" aria-label={text}>
      {words.map(({ wi, word, isHighlight }) => (
        <motion.span
          key={wi}
          aria-hidden
          className="mr-[0.3em] inline-block whitespace-nowrap last:mr-0"
          style={{ color: isHighlight ? highlightColor : colors[wi % colors.length] }}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.45,
            delay: wi * perWordDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
