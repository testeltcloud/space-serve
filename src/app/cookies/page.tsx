import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de Cookies",
  description:
    "Política de Cookies do Space Server e gerenciamento de consentimento conforme LGPD e GDPR.",
  keywords: ["cookies", "consentimento", "LGPD", "GDPR"],
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-20">
      <h1 className="font-poppins text-3xl font-semibold sm:text-4xl">
        Política de Cookies
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-300">
        Explique os tipos de cookies (essenciais, analíticos, marketing,
        funcionais) e como o usuário gerencia o consentimento. Aqui também
        entrará o gerenciador de consentimento (banner + modal por categoria),
        com validade de 12 meses, conforme LGPD/GDPR.
      </p>
    </main>
  );
}
