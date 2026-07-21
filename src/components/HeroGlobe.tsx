"use client";

import { useEffect, useRef } from "react";

/**
 * Globo de contornos (globe.gl / Three.js) para o slot direito do Hero.
 * - Sem esfera e sem atmosfera (só os polígonos dos continentes).
 * - Fundo transparente, auto-rotação, arrastar para girar.
 * Carregado 100% no cliente (globe.gl usa window/document) via import dinâmico.
 */
export function HeroGlobe({ color = "#155fcd" }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let world: any;
    let destroyed = false;
    let ro: ResizeObserver | undefined;

    (async () => {
      const [{ default: Globe }, THREE, topojson] = await Promise.all([
        import("globe.gl"),
        import("three"),
        import("topojson-client"),
      ]);
      if (destroyed) return;

      world = new Globe(el)
        .backgroundColor("rgba(0,0,0,0)")
        .showGlobe(false)
        .showAtmosphere(false);

      const size = () => world.width(el.clientWidth).height(el.clientHeight);
      size();
      ro = new ResizeObserver(size);
      ro.observe(el);

      // Interação / rotação
      const controls = world.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = false;

      const res = await fetch(
        "https://cdn.jsdelivr.net/npm/world-atlas/land-110m.json"
      );
      const landTopo = await res.json();
      if (destroyed) return;

      const land = topojson.feature(
        landTopo,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (landTopo as any).objects.land
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;

      world
        .polygonsData(land.features)
        .polygonCapMaterial(
          new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide })
        )
        .polygonSideColor(() => "rgba(0,0,0,0)");
    })();

    return () => {
      destroyed = true;
      ro?.disconnect();
      try {
        world?.pauseAnimation?.();
      } catch {
        /* noop */
      }
      if (el) el.innerHTML = "";
    };
  }, [color]);

  return <div ref={ref} className="h-full w-full" />;
}
