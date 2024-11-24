import { MetadataRoute } from 'next'
import { newsItems } from '../app/lib/newsData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://animetopx.vercel.app'

  // Rutas estáticas
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Rutas dinámicas de noticias con imágenes agrupadas
  const newsRoutes = newsItems.map((newsItem) => {
    const newsUrl = `${baseUrl}/noticias/${newsItem.id}`
    const lastModified = new Date(newsItem.date)

    // Entrada principal de la noticia con URLs de las imágenes
    return {
      url: newsUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: newsItem.imageUrls.map((image) => `${baseUrl}${image.url}`), // Solo URLs de las imágenes
    }
  })

  return [...staticRoutes, ...newsRoutes]
}
