"use client";

import {ThemeProvider as NextThemesProvider, ThemeProviderProps} from "next-themes";
import * as React from "react";

export function ThemeProvider({children, ...props}: ThemeProviderProps): React.JSX.Element {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
