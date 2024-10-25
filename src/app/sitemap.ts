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

    // Entrada principal de la noticia con todas las imágenes incluidas
    return {
      url: newsUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: newsItem.imageUrls.map((image) => ({
        loc: `${baseUrl}${image.url}`,
        title: image.title,
        caption: image.description,
        alt: image.alt || image.description,
      })),
    }
  })

  return [...staticRoutes, ...newsRoutes]
}
