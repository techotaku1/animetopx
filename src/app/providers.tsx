'use client';

import { type ReactNode } from 'react';

import { ProgressProvider } from '@bprogress/next/app';

interface ProvidersProps {
	children: ReactNode;
}

const Providers = ({ children }: ProvidersProps): ReactNode => {
	return (
		<ProgressProvider
			height="4px"
			color="#ef4444"
			options={{ showSpinner: true }}
			shallowRouting
		>
			{children}
		</ProgressProvider>
	);
};

export default Providers;
