import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Termos de Uso",
  description:
    "Termos de Uso do Space Server: condições de utilização da plataforma, direitos e responsabilidades.",
  keywords: ["termos de uso", "termos e condições"],
  path: "/termos",
});

export default function TermosPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-20">
      <h1 className="font-poppins text-3xl font-semibold sm:text-4xl">
        Termos de Uso
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-300">
        Conteúdo dos termos de uso. Substitua por seu texto jurídico oficial.
      </p>
    </main>
  );
}
