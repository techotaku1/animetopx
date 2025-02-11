//src\app\layout.tsx
import './globals.css'; // Asegúrate de que aquí tienes los estilos globales
import React, { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata } from 'next';
import { Shantell_Sans, Grandstander } from 'next/font/google';
import Script from 'next/script';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { NavigationEvents } from '@/components/layout/navigation-events';
import CustomProgressBar from '@/components/layout/ProgressBar';
import { ThemeProvider } from '@/components/layout/theme-provider';

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
		'anime, noticias, manga, japón, otaku, top animes, animes verano, animes primavera, animes otoño, animes invierno',
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
				<meta
					content="tH_p7MCykvg5SmC6GyS_vdZkBAf8dYSqgRnAL6j88Wc"
					name="google-site-verification"
				/>
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
				<ThemeProvider enableSystem attribute="class" defaultTheme="system">
					<Header />
					<CustomProgressBar />
					<main className="container mx-auto grow px-4 py-8">
						{children}
						<Suspense fallback={null}>
							<NavigationEvents />
						</Suspense>
						<Analytics />
						<SpeedInsights />
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
