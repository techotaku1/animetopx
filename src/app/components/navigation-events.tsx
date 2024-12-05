// app/components/navigation-events.tsx
"use client";

import {usePathname} from "next/navigation";
import {useEffect} from "react";

export function NavigationEvents(): null {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Current Pathname:", pathname);
    // Lógica adicional basada en el pathname
  }, [pathname]);

  return null;
}
