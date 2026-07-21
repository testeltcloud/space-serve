"use client";

import { HeroGlobe } from "@/components/HeroGlobe";
import { GlobeConnections } from "@/components/GlobeConnections";

/**
 * Visual do slot direito do Hero: o globo (globe.gl) como hub central, com os
 * tiles de plataformas orbitando e se fundindo no centro (efeito de conexão).
 */
export function HeroVisual() {
  return (
    <div className="relative h-full w-full">
      <HeroGlobe />
      <GlobeConnections />
    </div>
  );
}
