"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { motion } from "framer-motion";

/**
 * TypingAnimation (Magic UI) — recriado com framer-motion (dependência já no projeto).
 * Revela o texto caractere a caractere, como se estivesse sendo digitado.
 *
 * Uso: <TypingAnimation duration={50}>Hello World! 👋</TypingAnimation>
 */

interface TypingAnimationProps {
  /** Texto a digitar (precisa ser string). */
  children: string;
  className?: string;
  as?: ElementType;
  /** Intervalo entre caracteres, em ms. Quanto maior, mais devagar. */
  duration?: number;
  /** Atraso antes de começar, em ms. */
  delay?: number;
  /** Inicia quando entra na viewport (senão, inicia ao montar + delay). */
  startOnView?: boolean;
  /** Mostra um cursor piscando enquanto digita. */
  cursor?: boolean;
  /** Chamado quando termina de digitar todo o texto. */
  onComplete?: () => void;
}

export function TypingAnimation({
  children,
  className,
  as: Component = "span",
  duration = 50,
  delay = 0,
  startOnView = false,
  cursor = false,
  onComplete,
}: TypingAnimationProps) {
  // Proxy pré-criado e cacheado por tag (estável entre renders; sem motion.create).
  const MotionComponent = motion[
    (typeof Component === "string" ? Component : "span") as keyof typeof motion
  ] as ElementType;

  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLElement>(null);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCount((c) => {
          const next = Math.min(c + 1, children.length);
          if (next >= children.length && intervalId) {
            clearInterval(intervalId);
            queueMicrotask(() => onCompleteRef.current?.());
          }
          return next;
        });
      }, duration);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [started, children, duration, delay]);

  const done = count >= children.length;

  return (
    <MotionComponent ref={ref} className={className}>
      {children.slice(0, count)}
      {cursor && (
        <motion.span
          aria-hidden
          className="ml-0.5 inline-block w-0.5 translate-y-[0.1em] bg-current align-middle"
          style={{ height: "0.9em" }}
          animate={done ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }}
          transition={
            done
              ? { duration: 0.3 }
              : { duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }
          }
        />
      )}
    </MotionComponent>
  );
}
