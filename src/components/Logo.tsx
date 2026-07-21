import Image from "next/image";
import { siteConfig } from "@/config/site";

/**
 * Logo padrão do sistema (/public/logotipo-3.png).
 * PNG estático com fundo transparente — funciona em tema claro e escuro.
 * Otimizado pelo next/image (serve em poucos KB). Passe `priority` nas
 * instâncias acima da dobra: gera o preload e evita o aviso de LCP.
 * Controle o tamanho pela className (altura).
 *
 * Uso: <Logo className="h-10 w-auto" priority />
 */
export function Logo({
  className = "h-10 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logotipo-3.png"
      alt={siteConfig.name}
      width={2000}
      height={566}
      sizes="64px"
      priority={priority}
      className={`rounded-xl ${className}`}
    />
  );
}
