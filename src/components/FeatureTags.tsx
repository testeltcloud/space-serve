"use client";

import { motion } from "framer-motion";

const tags = ["Assinatura", "Workflow", "Agente Ely", "Gestão de acesso"];

export function FeatureTags() {
  return (
    <section className="w-full bg-white px-6 py-16 dark:bg-zinc-950 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
        <h2 className="text-3xl font-normal leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Sua empresa na era <strong className="font-bold">digital.</strong>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid w-full grid-cols-2 gap-4 sm:max-w-md"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-200 px-6 py-3 text-sm font-medium text-neutral-600 dark:bg-zinc-800 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
