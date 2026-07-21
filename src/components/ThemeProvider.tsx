"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Provider de tema (claro/escuro) via next-themes.
 * Usa classe `.dark` no <html>, sem flash na carga.
 * Padrão inicia no tema CLARO.
 */
export function ThemeProvider(
  props: ComponentProps<typeof NextThemesProvider>
) {
  return <NextThemesProvider {...props}>{props.children}</NextThemesProvider>;
}
