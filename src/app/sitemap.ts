import { MetadataRoute } from 'next';

// Simulación de un array de noticias con IDs y fechas
const newsItems = [
  { id: 1, date: new Date() },
  { id: 2, date: new Date() },
  { id: 3, date: new Date() },
  // Agrega más noticias según sea necesario
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://animetopx.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly', // Cambia esto a un valor válido
      priority: 1,
    },
    ...newsItems.map((item) => ({
      url: `${baseUrl}/noticias/${item.id}`,
      lastModified: item.date,
      changeFrequency: 'monthly' as const, // Asegúrate de que sea un valor literal
      priority: 0.8,
    })),
  ];
}
