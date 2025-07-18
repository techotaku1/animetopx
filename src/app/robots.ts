// src/app/robots.ts
import { type MetadataRoute } from 'next';

export const dynamic = 'force-static'; // Fuerza la exportación estática

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/private/', '/search', '/calendario'],
		},
		sitemap: 'https://animetopx.com/sitemap.xml',
	};
}
