"use client";

import Image from "next/image";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { Logo } from "@/components/Logo";

/*
  Visual do Hero com OrbitingCircles (Magic UI).
  Ícones de arquivos (sem box) orbitando a logo da Space no centro.
  Troque os caminhos abaixo se quiser outros ícones (em /public/…).
*/
const outerIcons = [
  "/iconsArquivos/arq-1.png",
  "/iconsArquivos/arq-2.png",
  "/iconsArquivos/arq-3.png",
  "/iconsArquivos/arq-4.png",
  "/iconsArquivos/arq-5.png",
];

const innerIcons = [
  "/iconsArquivos/arq-6.png",
  "/iconsArquivos/arq-7.png",
  "/iconsArquivos/arq-8.png",
  "/iconsArquivos/arq-9.png",
];

function Icon({ src, size }: { src: string; size: number }) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className="h-full w-full object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
    />
  );
}

export function HeroOrbit() {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden">
      {/* centro — logo da Space (sem box) */}
      <div className="z-10 flex items-center justify-center">
        <Logo className="h-12 w-auto sm:h-14" />
      </div>

      {/* anel externo */}
      <OrbitingCircles iconSize={46} radius={150} duration={24}>
        {outerIcons.map((s, i) => (
          <Icon key={i} src={s} size={46} />
        ))}
      </OrbitingCircles>

      {/* anel interno (sentido inverso, mais rápido) */}
      <OrbitingCircles iconSize={38} radius={92} duration={24} reverse speed={2}>
        {innerIcons.map((s, i) => (
          <Icon key={i} src={s} size={38} />
        ))}
      </OrbitingCircles>
    </div>
  );
}
