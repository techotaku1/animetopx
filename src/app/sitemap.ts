// src/app/sitemap.ts
import { type MetadataRoute } from 'next';

import { newsItems } from '../lib/newsData';

export const dynamic = 'force-static'; // Fuerza la exportación estática

export default function sitemap(): MetadataRoute.Sitemap {
	const newsUrls = newsItems.map((news) => ({
		url: `https://animetopx.com/noticias/${news.id}`,
		lastModified: new Date(news.publicationDate),
		changeFrequency: 'weekly' as const,
		priority: 0.7,
		images: news.imageUrls.map(
			(image) => `https://animetopx.com${image.url}`
		), // Solo URLs
	}));

	return [
		{
			url: 'https://animetopx.com',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: 'https://animetopx.com/noticias',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		...newsUrls,
	];
}
