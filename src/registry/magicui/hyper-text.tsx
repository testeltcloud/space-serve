"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";
import { motion } from "framer-motion";

/**
 * HyperText (Magic UI) — recriado com framer-motion (dependência já no projeto).
 * Efeito "decode/scramble": embaralha as letras e revela o texto da esquerda p/ direita.
 *
 * `children` precisa ser uma string. Dispara ao entrar na viewport (startOnView)
 * e/ou ao passar o mouse (animateOnHover).
 *
 * Uso: <HyperText as="h2" startOnView className="...">Meu título</HyperText>
 */

const DEFAULT_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomInt = (max: number) => Math.floor(Math.random() * max);

interface HyperTextProps {
  /** Texto a animar (precisa ser string). */
  children: string;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  /** Duração do embaralhamento, em ms. */
  duration?: number;
  /** Atraso antes de iniciar, em ms. */
  delay?: number;
  /** Inicia quando entra na viewport (senão, inicia ao montar). */
  startOnView?: boolean;
  /** Reinicia o efeito ao passar o mouse. */
  animateOnHover?: boolean;
  /** Conjunto de caracteres usados no embaralhamento. */
  characterSet?: string;
}

export function HyperText({
  children,
  className,
  style,
  as: Component = "div",
  duration = 800,
  delay = 0,
  startOnView = true,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
}: HyperTextProps) {
  // Proxy pré-criado e cacheado por tag (estável entre renders; sem motion.create).
  const MotionComponent = motion[
    (typeof Component === "string" ? Component : "div") as keyof typeof motion
  ] as ElementType;

  const [display, setDisplay] = useState<string[]>(() => children.split(""));
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Gatilho de início: ao montar (com delay) ou ao entrar na viewport.
  useEffect(() => {
    if (!startOnView) {
      const t = setTimeout(() => setAnimating(true), delay);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimating(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-20% 0px -20% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, startOnView]);

  // Embaralhamento por requestAnimationFrame.
  useEffect(() => {
    if (!animating) return;
    const maxIterations = children.length;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const progress = Math.min((performance.now() - start) / duration, 1);
      const revealed = progress * maxIterations;
      setDisplay(
        children
          .split("")
          .map((ch, i) =>
            ch === " "
              ? " "
              : i <= revealed
                ? ch
                : characterSet[randomInt(characterSet.length)],
          ),
      );
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(children.split(""));
        setAnimating(false);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animating, children, duration, characterSet]);

  const handleHover = () => {
    if (animateOnHover && !animating) setAnimating(true);
  };

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={style}
      onMouseEnter={handleHover}
    >
      {display.join("")}
    </MotionComponent>
  );
}
