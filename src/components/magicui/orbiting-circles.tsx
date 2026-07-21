import { Children, type CSSProperties, type ReactNode } from "react";

/**
 * OrbitingCircles (Magic UI) — recriado manualmente (equivalente ao
 * `npx shadcn add @magicui/orbiting-circles`).
 *
 * IMPORTANTE: deve ser usado dentro de um container
 * `relative flex items-center justify-center`, pois os itens são `absolute`
 * e usam a posição estática central do flex como âncora da órbita.
 */
export interface OrbitingCirclesProps {
  className?: string;
  children?: ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className = "",
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  const count = Children.count(children);

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      {Children.map(children, (child, index) => {
        const angle = (360 / count) * index;
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as CSSProperties
            }
            className={`absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full ${
              reverse ? "[animation-direction:reverse]" : ""
            } ${className}`}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
