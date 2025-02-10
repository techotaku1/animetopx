// src/app/robots.ts
import { type MetadataRoute } from 'next';

export const dynamic = 'force-static'; // Fuerza la exportación estática

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/private/',
		},
		sitemap: 'https://animetopx.vercel.app/sitemap.xml',
	};
}
