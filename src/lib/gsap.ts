"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registro central do GSAP + ScrollTrigger.
 * Importe daqui em qualquer componente client que anime com scroll:
 *   import { gsap, ScrollTrigger } from "@/lib/gsap";
 *
 * Dica: para sincronizar com o Lenis, chame ScrollTrigger.update()
 * no callback do Lenis (lenis.on("scroll", ScrollTrigger.update)).
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
