import './globals.css';

import React, { Suspense } from 'react';

import { Shantell_Sans, Grandstander } from 'next/font/google';
import Script from 'next/script';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata } from 'next';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { NavigationEvents } from '@/components/layout/navigation-events';

import Providers from './providers';

const shantellSans = Shantell_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-shantell-sans',
	weight: ['700'],
});

const grandstander = Grandstander({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-grandstander',
	weight: ['400'],
});

export const metadata: Metadata = {
	title: 'AnimeTopX',
	description:
		'Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime',
	keywords:
		'anime, noticias, manga, japón, otaku, top animes, animes verano, animes primavera, animes otoño, animes invierno, Fire Force Season 3, Lazarus, Wind Breaker Season 2, The Beginning After the End, Boku no Hero Academia Vigilantes, Solo Leveling Season 2, Sakamoto Days, Kusuriya no Hitorigoto Season 2, Dr. Stone Science Future, temporada invierno 2025, temporada primavera 2025, estrenos anime 2025',
	openGraph: {
		title: 'AnimeTopX',
		description:
			'Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime',
		url: 'https://animetopx.com',
		siteName: 'AnimeTopX',
		images: [
			{
				url: 'https://animetopx.com/PORTADAPRINCIPAL.webp',
				width: 1200,
				height: 630,
			},
		],
		locale: 'es_ES',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'AnimeTopX',
		description:
			'Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime',
		images: ['https://animetopx.com/PORTADAPRINCIPAL.webp'],
	},
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): React.JSX.Element {
	return (
		<html
			suppressHydrationWarning
			className={`${shantellSans.variable} ${grandstander.variable}`}
			lang="es"
		>
			<head>
				<Script
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebSite',
							name: 'AnimeTopX',
							url: 'https://animetopx.com',
							description:
								'Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime',
							potentialAction: {
								'@type': 'SearchAction',
								target:
									'https://animetopx.vercel.app/search?q={search_term_string}',
								'query-input': 'required name=search_term_string',
							},
						}),
					}}
					id="json-ld"
					strategy="afterInteractive" // Ejecuta después de que la página se haya cargado
					type="application/ld+json"
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
