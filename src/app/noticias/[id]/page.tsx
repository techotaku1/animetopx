import { newsItems } from "../../lib/newsData"; // Asegúrate de la ruta correcta
import NewsDetailClient from "./NewsDetailClient";
import Script from 'next/script';

// Genera parámetros estáticos para las rutas dinámicas
export async function generateStaticParams() {
  return newsItems.map((item) => ({
    id: item.id.toString(), // Convierte el id a string
  }));
}

// Componente principal que renderiza el cliente
export default function NewsDetail({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const newsItem = newsItems.find(item => item.id === id);

  if (!newsItem) {
    return <div>Noticia no encontrada</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": newsItem.title,
    "datePublished": newsItem.date,
    "dateModified": newsItem.date, // Asume que la fecha de modificación es la misma que la de publicación
    "author": {
      "@type": "Organization",
      "name": "AnimeTopX"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AnimeTopX",
      "logo": {
        "@type": "ImageObject",
        "url": "https://animetopx.vercel.app/logo.png" // Asegúrate de tener un logo y ajusta la URL
      }
    },
    "image": newsItem.imageUrls.map(image => ({
      "@type": "ImageObject",
      "url": `https://animetopx.vercel.app${image.url}`,
      "width": "1200", // Ajusta según el tamaño real de tus imágenes
      "height": "630", // Ajusta según el tamaño real de tus imágenes
      "caption": image.description,
      "name": image.title
    })),
    "articleSection": newsItem.category,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://animetopx.vercel.app/noticias/${id}`
    }
  };

  return (
    <>
      <Script
        id={`json-ld-news-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsDetailClient id={id} />
    </>
  );
}