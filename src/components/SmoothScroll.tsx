"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Scroll suave global via Lenis.
 * É client-side e envolve o conteúdo no layout raiz.
 * Sincronizado com o ticker do GSAP no componente que usar ScrollTrigger.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        // duração/easing padrão já bons para performance
      }}
    >
      {children}
    </ReactLenis>
  );
}
