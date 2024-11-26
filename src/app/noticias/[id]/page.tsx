import { newsItems } from '@/lib/newsData';
import NewsDetailClient from './NewsDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Generar los parámetros estáticos para la ruta dinámica
export async function generateStaticParams() {
  return newsItems.map((news) => ({
    id: news.id.toString(),
  }));
}

// Función para generar los metadatos de la página de detalle
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params; // Await the params to resolve it
  const newsId = parseInt(resolvedParams.id, 10);

  const newsItem = newsItems.find((item) => item.id === newsId);

  if (!newsItem) {
    return {
      title: 'Noticia no encontrada',
      description: 'La noticia que buscas no existe',
    };
  }

  return {
    metadataBase: new URL('https://animetopx.vercel.app'), // Agregar la URL base del sitio
    title: newsItem.title,
    description: newsItem.content.substring(0, 160),
    openGraph: {
      title: newsItem.title,
      description: newsItem.content.substring(0, 160),
      images: [
        {
          url: newsItem.backgroundImage,
          width: 1200,
          height: 630,
          alt: newsItem.title,
        },
      ],
    },
  };
}

// Función para el componente de la página de noticias
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // Await the params to resolve it
  const newsId = parseInt(resolvedParams.id, 10);

  const newsItem = newsItems.find((item) => item.id === newsId);
  if (!newsItem) {
    notFound();
  }

  return <NewsDetailClient id={newsId} />;
}
