import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
];

/**
 * Header fixo do site: logo (esquerda), navegação (centro/direita)
 * e alternância de tema. Fundo com blur, tema-aware.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-[#05060a]/70">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 font-poppins">
        <Link href="/" aria-label="Página inicial" className="flex items-center">
          <Logo className="h-12 w-auto sm:h-16 ml-10" priority />
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
