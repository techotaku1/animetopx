import React, { type JSX } from 'react';

export default function Loading(): JSX.Element {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col items-center space-y-4">
				<div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-blue-500" />
				<span className="text-lg font-semibold text-gray-700">Cargando...</span>
			</div>
		</div>
	);
}
