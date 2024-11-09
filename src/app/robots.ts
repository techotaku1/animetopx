import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/noticias/',
        disallow: '/admin/',
      },
    ],
    sitemap: 'https://animetopx.vercel.app/sitemap.xml', // Asegúrate de poner la URL completa del sitemap
  }
}
