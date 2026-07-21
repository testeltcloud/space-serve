import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Imagens modernas por padrão (melhor LCP/PageSpeed).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Tree-shaking mais agressivo para libs de animação pesadas.
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
