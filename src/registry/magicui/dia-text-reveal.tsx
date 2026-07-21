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

  const segments = useMemo(() => {
    let ci = 0;
    return text.split(" ").map((word, wi) => ({
      wi,
      word,
      isHighlight: highlightWords.includes(word),
      chars: word.split("").map((char) => ({ char, ci: ci++ })),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, highlightWords.join(",")]);

  const totalChars = segments.reduce((sum, s) => sum + s.chars.length, 0);
  const perCharDelay = Math.min(0.04, 1.8 / Math.max(totalChars, 1));

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {segments.map(({ wi, chars, isHighlight }) => (
        <span key={wi} className="mr-[0.3em] inline-block whitespace-nowrap last:mr-0">
          {chars.map(({ char, ci }) => (
            <motion.span
              key={ci}
              aria-hidden
              className="inline-block"
              style={{ color: isHighlight ? highlightColor : colors[ci % colors.length] }}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.45,
                delay: ci * perCharDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
