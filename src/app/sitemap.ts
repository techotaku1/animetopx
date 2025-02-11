// src/app/sitemap.ts
import { type MetadataRoute } from 'next';
import { newsItems } from '../lib/newsData';

export const dynamic = 'force-static'; // Fuerza la exportación estática

export default function sitemap(): MetadataRoute.Sitemap {
	// ✅ URLs dinámicas de noticias
	const newsUrls = newsItems.map((news) => ({
		url: `https://animetopx.com/noticias/${news.id}`,
		lastModified: new Date(news.publicationDate).toISOString(),
		changeFrequency: 'weekly' as const,
		priority: 0.7,
		images: news.imageUrls.map((image) => `https://animetopx.com${image.url}`),
	}));

	// ✅ Rutas estáticas que sí existen
	const staticUrls = [
		{
			url: 'https://animetopx.com',
			lastModified: new Date().toISOString(),
			changeFrequency: 'daily' as const,
			priority: 1,
		},
		{
			url: 'https://animetopx.com/noticias',
			lastModified: new Date().toISOString(),
			changeFrequency: 'daily' as const,
			priority: 0.8,
		},
	];

	return [...staticUrls, ...newsUrls];
}
