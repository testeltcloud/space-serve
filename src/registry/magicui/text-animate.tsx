"use client";

import { type ElementType } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

/**
 * TextAnimate (Magic UI) — recriado com framer-motion (dependência já no projeto).
 * Divide o texto por caractere/palavra/linha e anima cada segmento.
 *
 * No modo `character`, as letras são agrupadas por palavra (a palavra não quebra
 * no meio); o stagger vem de delays explícitos por índice, então funciona mesmo
 * com o agrupamento.
 *
 * Uso: <TextAnimate animation="blurInUp" by="character" once>texto</TextAnimate>
 */

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

interface TextAnimateProps {
  /** O texto a animar (precisa ser string). */
  children: string;
  className?: string;
  segmentClassName?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: ElementType;
  by?: AnimationType;
  startOnView?: boolean;
  once?: boolean;
  animation?: AnimationVariant;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const presets: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.3 } },
    exit: { opacity: 0, filter: "blur(10px)", transition: { duration: 0.3 } },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        y: { duration: 0.3 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.3 },
      },
    },
    exit: { opacity: 0, filter: "blur(10px)", y: 20 },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        y: { duration: 0.3 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.3 },
      },
    },
  },
  slideUp: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
  },
  slideDown: {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: 20, opacity: 0 },
  },
  slideLeft: {
    hidden: { x: 20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -20, opacity: 0 },
  },
  slideRight: {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: 20, opacity: 0 },
  },
  scaleUp: {
    hidden: { scale: 0.5, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, scale: { type: "spring", damping: 15, stiffness: 300 } },
    },
  },
  scaleDown: {
    hidden: { scale: 1.5, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, scale: { type: "spring", damping: 15, stiffness: 300 } },
    },
  },
};

export function TextAnimate({
  children,
  delay = 0,
  duration = 0.3,
  variants,
  className,
  segmentClassName,
  as: Component = "p",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
}: TextAnimateProps) {
  // Proxy pré-criado e cacheado por tag (estável entre renders; sem motion.create).
  const MotionComponent = motion[
    (typeof Component === "string" ? Component : "p") as keyof typeof motion
  ] as ElementType;

  const baseItem = variants ?? presets[animation] ?? defaultItemVariants;
  const step = staggerTimings[by];
  const showTarget = (baseItem.show ?? {}) as Record<string, unknown>;
  const showTransition = (showTarget.transition as Record<string, unknown>) ?? {};

  // Cada segmento anima com delay explícito (idx * step); assim o stagger
  // funciona mesmo com letras aninhadas dentro do wrapper da palavra.
  const itemVariants: Variants = {
    hidden: baseItem.hidden,
    show: (i: number) => ({
      ...showTarget,
      transition: { duration, ...showTransition, delay: delay + i * step },
    }),
    exit: baseItem.exit,
  };

  const containerVariants: Variants = { hidden: {}, show: {}, exit: {} };

  const stateProps = startOnView
    ? { whileInView: "show" as const, viewport: { once, amount: 0.3 } }
    : { animate: "show" as const };

  let idx = 0;
  const seg = (content: string, key: string, extra?: string) => (
    <motion.span
      key={key}
      custom={idx++}
      variants={itemVariants}
      className={cn(extra ?? "inline-block whitespace-pre", segmentClassName)}
    >
      {content}
    </motion.span>
  );

  let content: React.ReactNode;
  if (by === "character") {
    // Agrupa por palavra: quebra só entre palavras, nunca no meio.
    content = children.split(/(\s+)/).map((token, ti) => {
      if (token === "") return null;
      if (/^\s+$/.test(token)) return seg(token, `s-${ti}`);
      return (
        <span key={`w-${ti}`} className="inline-block whitespace-nowrap">
          {Array.from(token).map((ch, ci) => seg(ch, `c-${ti}-${ci}`, "inline-block"))}
        </span>
      );
    });
  } else if (by === "word") {
    content = children
      .split(/(\s+)/)
      .map((w, i) => (w === "" ? null : seg(w, `w-${i}`)));
  } else if (by === "line") {
    content = children
      .split("\n")
      .map((l, i) => seg(l, `l-${i}`, "block"));
  } else {
    content = seg(children, "t-0");
  }

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        initial="hidden"
        exit="exit"
        variants={containerVariants}
        className={cn("whitespace-pre-wrap", className)}
        {...stateProps}
      >
        {content}
      </MotionComponent>
    </AnimatePresence>
  );
}
