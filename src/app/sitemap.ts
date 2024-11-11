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

    // Entrada principal de la noticia con todas las imágenes
    return {
      url: newsUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: newsItem.imageUrls.map((image) => ({
        loc: `${baseUrl}${image.url}`,  // Asegúrate de que la URL sea completa
        title: image.title || 'Imagen sin título',  // Proveer un título por defecto
        caption: image.description || 'Descripción no disponible',  // Proveer una descripción por defecto
        alt: image.description || image.title || 'Imagen de noticia',  // Asignar un valor alternativo si no existe
      })),
    }
  })

  return [...staticRoutes, ...newsRoutes]
}
