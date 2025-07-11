import React, { Suspense } from 'react';

import { Grandstander, Shantell_Sans } from 'next/font/google';
import Script from 'next/script';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { NavigationEvents } from '@/components/layout/navigation-events';
import { getMetadataForRoute } from '@/lib/metadata/config';
import {
	getWebPagesSchema,
	getWebsiteSchema,
} from '@/lib/metadata/structured-data';

import Providers from './providers';

import './globals.css';

const shantellSans = Shantell_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-shantell-sans',
	weight: ['400', '500', '600', '700', '800'],
});

const grandstander = Grandstander({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-grandstander',
	weight: ['400', '500', '600', '700', '800', '900'],
});

export async function generateMetadata() {
	return await getMetadataForRoute();
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): React.JSX.Element {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [getWebsiteSchema(), ...getWebPagesSchema()],
	};

	return (
		<html
			suppressHydrationWarning
			className={`${shantellSans.variable} ${grandstander.variable}`}
			lang="es"
		>
			<head>
				<link rel="canonical" href="https://animetopx.com/" />
				<Script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLd, null, 2).replace(/</g, '\\u003c'),
					}}
				/>
			</head>
			<body className="bg-background text-foreground flex min-h-screen flex-col">
				<Providers>
					<Header />
					<main className="container mx-auto grow px-4 py-8">
						{children}
						<Suspense fallback={null}>
							<NavigationEvents />
						</Suspense>
						<Analytics />
						<SpeedInsights />
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
