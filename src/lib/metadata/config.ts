import { headers } from 'next/headers';

import type { Metadata } from 'next';

const sharedOpenGraph = {
	images: [
		{
			url: `/PORTADAPRINCIPAL.webp`,
			width: 1200,
			height: 630,
			alt: 'Descubre los mejores animes y noticias en AnimeTopX',
		},
	],
	locale: 'es_ES',
	type: 'website',
};

export async function getCurrentPath() {
	const headersList = await headers();
	const pathname =
		headersList.get('x-invoke-path') ??
		headersList.get('x-original-url') ??
		headersList.get('x-pathname') ??
		'/';
	return pathname;
}

const defaultMetadata: Metadata = {
	title: {
		template: '%s | AnimeTopX',
		default: 'AnimeTopX - Noticias y Tops de Anime',
	},
	description:
		'Descubre los mejores animes, tops y noticias de la temporada en AnimeTopX.',
	keywords: [
		'anime',
		'noticias anime',
		'top anime',
		'estrenos anime',
		'anime verano 2025',
		'anime primavera 2025',
		'animetopx',
	],
	metadataBase: new URL('https://animetopx.com'),
	openGraph: {
		title: 'AnimeTopX',
		description:
			'Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime',
		url: 'https://animetopx.com',
		siteName: 'AnimeTopX',
		images: [
			{
				url: '/PORTADAPRINCIPAL.webp',
				width: 1200,
				height: 630,
			},
		],
		locale: 'es_ES',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		site: '@animetopx',
		creator: '@animetopx',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export async function getMetadataForRoute(): Promise<Metadata> {
	const pathname = await getCurrentPath();

	const baseMetadata = {
		...defaultMetadata,
		openGraph: {
			...defaultMetadata.openGraph,
			...sharedOpenGraph,
		},
	};

	switch (pathname) {
		case '/':
			return {
				...baseMetadata,
				title: 'AnimeTopX - Noticias y Tops de Anime',
				description:
					'Descubre los mejores animes, tops y noticias de la temporada en AnimeTopX.',
				keywords: [
					'anime',
					'noticias anime',
					'top anime',
					'estrenos anime',
					'animetopx',
				],
				alternates: { canonical: 'https://animetopx.com' },
				openGraph: {
					...baseMetadata.openGraph,
					title: 'AnimeTopX - Noticias y Tops de Anime',
					url: 'https://animetopx.com',
				},
			};
		case '/noticias6':
			return {
				...baseMetadata,
				title: 'Top 10 Anime Verano 2025 | AnimeTopX',
				description:
					'Descubre el top 10 de animes más esperados para el verano 2025 en AnimeTopX.',
				keywords: [
					'anime verano 2025',
					'top anime verano',
					'estrenos anime verano',
					'noticias anime',
				],
				alternates: { canonical: 'https://animetopx.com/noticias6' },
				openGraph: {
					...baseMetadata.openGraph,
					title: 'Top 10 Anime Verano 2025',
					url: 'https://animetopx.com/noticias6',
				},
			};
		case '/noticias5':
			return {
				...baseMetadata,
				title: 'Anime Top 10 Primavera 2025 | AnimeTopX',
				description:
					'Conoce los 10 animes imprescindibles de la primavera 2025 en AnimeTopX.',
				keywords: [
					'anime primavera 2025',
					'top anime primavera',
					'estrenos anime primavera',
					'noticias anime',
				],
				alternates: { canonical: 'https://animetopx.com/noticias5' },
				openGraph: {
					...baseMetadata.openGraph,
					title: 'Anime Top 10 Primavera 2025',
					url: 'https://animetopx.com/noticias5',
				},
			};
		default:
			return baseMetadata;
	}
}

export { defaultMetadata };
