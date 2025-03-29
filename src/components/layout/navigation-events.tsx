// app/components/navigation-events.tsx
'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

export function NavigationEvents(): null {
	const pathname = usePathname();

	useEffect(() => {
		console.log('Current Pathname:', pathname);
		// Lógica adicional basada en el pathname
	}, [pathname]);

	return null;
}
