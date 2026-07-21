import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";

/**
 * Footer do site com navegação e links legais (Termos, Política de
 * Privacidade e Cookies) — exigidos por LGPD/GDPR. O link "Gerenciar
 * cookies" leva à página de cookies (onde ficará o gerenciador de consentimento).
 */
const nav = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

const legal = [
  { href: "/termos", label: "Termos de Uso" },
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/cookies", label: "Cookies" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-black/10 bg-neutral-50 font-poppins text-neutral-600 dark:border-white/10 dark:bg-[#0b1220] dark:text-neutral-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Página inicial" className="inline-flex">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {siteConfig.description}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Navegação</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/cookies"
                  className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Gerenciar cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-black/10 pt-6 text-sm text-neutral-500 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-neutral-900 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
