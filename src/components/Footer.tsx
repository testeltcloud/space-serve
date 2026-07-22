import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";

const legal = [
  { href: "/termos", label: "Termos de uso" },
  { href: "/politica-de-privacidade", label: "Política de privacidade" },
  { href: "/cookies", label: "Política de cookies" },
];

const info = ["O ecossistema Space", "Conheça o Space Server", "Space Re - CNPJ 2302130123"];

const social = [
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon, bg: "bg-white" },
  {
    href: siteConfig.links.instagram,
    label: "Instagram",
    Icon: InstagramIcon,
    bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
  },
  { href: siteConfig.links.facebook, label: "Facebook", Icon: FacebookIcon, bg: "bg-[#1877f2]" },
];

export function Footer() {
  return (
    <footer className="mt-auto w-full bg-[#1e60d1] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 sm:px-8 md:flex-row md:items-start md:justify-between">
        <Link href="/" aria-label="Página inicial" className="inline-flex shrink-0">
          <Logo className="h-10 w-auto" />
        </Link>

        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          <nav className="flex flex-col gap-3 text-sm text-white/80">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm text-white/80">
            {info.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {social.map(({ href, label, Icon, bg }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition-transform hover:scale-105 ${bg}`}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#1e60d1" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="white" aria-hidden className={className}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.56c0-.86.24-1.44 1.47-1.44h1.57V4.47C16.24 4.4 15.3 4.3 14.2 4.3c-2.3 0-3.87 1.4-3.87 3.97v2.17H7.77v2.96h2.56V21h3.17z" />
    </svg>
  );
}
