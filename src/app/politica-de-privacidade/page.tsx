import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do Space Server em conformidade com a LGPD (Lei 13.709/2018) e a GDPR.",
  keywords: ["política de privacidade", "LGPD", "GDPR", "proteção de dados"],
  path: "/politica-de-privacidade",
});

export default function PoliticaPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-20">
      <h1 className="font-poppins text-3xl font-semibold sm:text-4xl">
        Política de Privacidade
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-300">
        Descreva aqui como os dados são coletados, tratados e protegidos, em
        conformidade com a LGPD e a GDPR. Substitua por seu texto oficial.
      </p>
    </main>
  );
}
