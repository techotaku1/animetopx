'use client';

import type { ReactNode } from 'react';

import { type ThemeProviderProps as NextThemeProviderProps, ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeProviderProps extends NextThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps): ReactNode {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
