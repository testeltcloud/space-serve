"use client";

import type { CSSProperties } from "react";

/**
 * Efeito sobre o globo do Hero:
 * - Ícones grandes de arquivos / assinaturas / pastas distribuídos em ANEL
 *   ao redor do globo, com o anel girando lentamente.
 * - Cada arquivo entra (do anel) espiralando e se une ao centro do globo.
 * Decorativo (pointer-events-none), leve (CSS transforms) e respeita
 * prefers-reduced-motion.
 */

type IconType = "doc" | "sign" | "folder";

const COUNT = 8;
const TYPES: IconType[] = ["doc", "sign", "folder"];

// Um item por posição do anel (ângulos igualmente espaçados).
// Todos com o MESMO tempo/atraso: orbitam juntos e entram juntos (unificando).
const items = Array.from({ length: COUNT }, (_, i) => ({
  angle: (360 / COUNT) * i,
  type: TYPES[i % TYPES.length],
  delay: 0,
  duration: 7,
}));

function Icon({ type }: { type: IconType }) {
  const shadow = "drop-shadow-[0_8px_18px_rgba(21,95,205,0.30)]";
  if (type === "folder") {
    return (
      <svg viewBox="0 0 48 48" width="100%" height="100%" className={shadow} aria-hidden>
        <path d="M6 12h13l4 5h19a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z" fill="#155fcd" />
        <path d="M6 20h39v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V20z" fill="#3b82f6" />
      </svg>
    );
  }
  if (type === "sign") {
    return (
      <svg viewBox="0 0 48 48" width="100%" height="100%" className={shadow} aria-hidden>
        <rect x="8" y="4" width="32" height="40" rx="4" fill="#ffffff" stroke="#155fcd" strokeWidth="2" />
        <path d="M14 30c4-6 7-6 9-2s5 4 11-4" fill="none" stroke="#155fcd" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 37h20" stroke="#93b4e8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" className={shadow} aria-hidden>
      <path d="M12 4h16l10 10v30a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#ffffff" stroke="#155fcd" strokeWidth="2" />
      <path d="M28 4v10h10" fill="none" stroke="#155fcd" strokeWidth="2" />
      <path d="M16 24h16M16 30h16M16 36h10" stroke="#93b4e8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GlobeFiles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Anel que gira lentamente */}
      <div
        className="globe-ring absolute inset-0"
        style={{ animation: "globeRingSpin 44s linear infinite" }}
      >
        {items.map((it, i) => (
          // Raio/direção do arquivo (rotaciona o eixo radial)
          <span
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{ width: 0, height: 0, transform: `rotate(${it.angle}deg)` }}
          >
            {/* Entra do anel até o centro (translateX ao longo do eixo radial) */}
            <span
              className="file-into-globe block"
              style={
                {
                  "--radius": "clamp(95px, 24vw, 190px)",
                  marginTop: "clamp(-29px, -3vw, -17px)",
                  marginLeft: "clamp(-29px, -3vw, -17px)",
                  animation: `fileIntoGlobe ${it.duration}s ease-in ${it.delay}s infinite`,
                } as CSSProperties
              }
            >
              {/* Mantém o ícone "de pé" em relação ao anel */}
              <span
                className="block"
                style={{
                  width: "clamp(34px, 6vw, 58px)",
                  height: "clamp(34px, 6vw, 58px)",
                  transform: `rotate(${-it.angle}deg)`,
                }}
              >
                <Icon type={it.type} />
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
