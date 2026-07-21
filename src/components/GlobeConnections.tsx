"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

/*
  Efeito de "conexão" sobre o globo do Hero (mesmo efeito do outro projeto):
  órbita tracejada com quatro tiles que orbitam o globo, periodicamente
  espiralam para dentro (se fundindo no centro, com um flash) e voltam a
  orbitar. Loop infinito. Respeita prefers-reduced-motion.
  Ícones: documento / assinatura / pasta (os mesmos de antes).
*/
type IconType = "doc" | "sign" | "folder";
const tiles: IconType[] = ["doc", "sign", "folder", "doc"];

function Icon({ type }: { type: IconType }) {
  if (type === "folder") {
    return (
      <svg viewBox="0 0 48 48" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden>
        <path d="M6 12h13l4 5h19a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z" fill="#155fcd" />
        <path d="M6 20h39v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V20z" fill="#3b82f6" />
      </svg>
    );
  }
  if (type === "sign") {
    return (
      <svg viewBox="0 0 48 48" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden>
        <rect x="8" y="4" width="32" height="40" rx="4" fill="#ffffff" stroke="#155fcd" strokeWidth="2" />
        <path d="M14 30c4-6 7-6 9-2s5 4 11-4" fill="none" stroke="#155fcd" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 37h20" stroke="#93b4e8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden>
      <path d="M12 4h16l10 10v30a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#ffffff" stroke="#155fcd" strokeWidth="2" />
      <path d="M28 4v10h10" fill="none" stroke="#155fcd" strokeWidth="2" />
      <path d="M16 24h16M16 30h16M16 36h10" stroke="#93b4e8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GlobeConnections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;
    const els = tileRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!container || els.length < tiles.length) return;

    const state = { angle: 0, radius: 1, scale: 1 };
    let R = 0;

    const measure = () => {
      R = container.clientWidth * 0.4;
    };

    const place = () => {
      els.forEach((el, i) => {
        const a = (state.angle + 45 + i * 90) * (Math.PI / 180);
        gsap.set(el, {
          x: Math.cos(a) * R * state.radius,
          y: Math.sin(a) * R * state.radius,
          scale: state.scale,
        });
      });
    };

    gsap.set(els, { xPercent: -50, yPercent: -50, filter: "blur(0px)" });
    gsap.set(flashRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.5 });
    gsap.set(cloudRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.4 });
    measure();

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(els, { opacity: 1 });
      place();
      const roStatic = new ResizeObserver(() => {
        measure();
        place();
      });
      roStatic.observe(container);
      return () => roStatic.disconnect();
    }

    gsap.ticker.add(place);
    const ro = new ResizeObserver(measure);
    ro.observe(container);

    // Órbita contínua.
    const spin = gsap.to(state, { angle: "+=360", duration: 7, ease: "none", repeat: -1 });

    // Intro: tiles surgem do centro.
    state.radius = 0.18;
    state.scale = 0.4;
    const intro = gsap.timeline();
    intro
      .to(state, { radius: 1, scale: 1, duration: 1.1, ease: "back.out(1.5)" })
      .fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.07 }, 0);

    // Converge → funde (flash) → expande, em loop.
    const loop = gsap.timeline({ repeat: -1, delay: 2.4 });
    loop.to(state, { radius: 0.05, scale: 0.5, duration: 0.95, ease: "power2.in" }, 0);
    loop.to(
      ringRef.current,
      { scale: 0.9, opacity: 0.5, duration: 0.6, ease: "power2.inOut", yoyo: true, repeat: 1 },
      0.25
    );
    loop.to(els, { filter: "blur(2.5px)", duration: 0.3, ease: "power1.in" }, 0.6);
    // nuvem cresce no centro enquanto os ícones agrupam/entram
    loop.fromTo(
      cloudRef.current,
      { opacity: 0, scale: 0.4 },
      { opacity: 1, scale: 1, duration: 0.85, ease: "back.out(1.4)" },
      0.1
    );
    loop.fromTo(
      flashRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 0.85, scale: 1.1, duration: 0.22, ease: "power2.out" },
      0.78
    );
    loop.to(flashRef.current, { opacity: 0, scale: 1.6, duration: 0.55, ease: "power2.out" }, 1.0);
    // leve pulso da nuvem ao receber os ícones (aumenta e diminui)
    loop.to(
      cloudRef.current,
      { scale: 1.14, duration: 0.28, ease: "power2.out", yoyo: true, repeat: 1 },
      0.9
    );
    loop.to(state, { radius: 1, scale: 1, duration: 1.0, ease: "back.out(1.6)" }, 1.3);
    loop.to(els, { filter: "blur(0px)", duration: 0.4, ease: "power1.out" }, 1.3);
    // nuvem some/encolhe quando os ícones voltam a orbitar
    loop.to(cloudRef.current, { opacity: 0, scale: 0.5, duration: 0.6, ease: "power2.in" }, 1.55);
    loop.to({}, { duration: 1.5 }, 2.3);

    return () => {
      gsap.ticker.remove(place);
      spin.kill();
      intro.kill();
      loop.kill();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0" aria-hidden>
      {/* órbita tracejada arredondada (dashes com pontas redondas) */}
      <div ref={ringRef} className="absolute inset-[15%]">
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
          <circle
            cx="50"
            cy="50"
            r="49"
            stroke="rgba(59,130,246,0.30)"
            strokeWidth="1.4"
            strokeDasharray="0.5 5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* flash de fusão (no centro do globo) */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(59,130,246,0.55) 38%, rgba(59,130,246,0) 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* tiles (boxes brancos arredondados com os ícones de antes) */}
      {tiles.map((type, i) => (
        <div
          key={i}
          ref={(el) => {
            tileRefs.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 grid h-[52px] w-[52px] place-items-center rounded-2xl bg-white opacity-0 shadow-lg will-change-transform sm:h-[58px] sm:w-[58px]"
        >
          <Icon type={type} />
        </div>
      ))}

      {/* nuvem no centro (recebe os ícones) — por cima dos tiles */}
      <div
        ref={cloudRef}
        className="pointer-events-none absolute left-1/2 top-1/2 opacity-0"
        style={{ width: "clamp(96px, 24vw, 180px)" }}
      >
        <Image
          src="/nuvem.png"
          alt=""
          width={2000}
          height={1100}
          className="h-auto w-full object-contain drop-shadow-[0_10px_24px_rgba(21,95,205,0.25)]"
        />
      </div>
    </div>
  );
}
