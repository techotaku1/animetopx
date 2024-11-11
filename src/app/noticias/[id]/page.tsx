import { newsItems } from "../../lib/newsData"; // Asegúrate de que esta ruta sea correcta
import NewsDetailClient from "./NewsDetailClient";
import Script from "next/script";

// Genera parámetros estáticos para las rutas dinámicas
export async function generateStaticParams() {
  return newsItems.map((item) => ({
    id: item.id.toString(),
  }));
}

// Componente principal que renderiza el cliente
export default function NewsDetail({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const newsItem = newsItems.find((item) => item.id === id);

  if (!newsItem) {
    return <div>Noticia no encontrada</div>;
  }

  // Formato de fecha ISO para la propiedad "datePublished"
  const publicationDate = new Date(newsItem.date).toISOString();

  // Estructura JSON-LD para Google News
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": newsItem.title,
    "datePublished": publicationDate,
    "dateModified": publicationDate,
    "author": {
      "@type": "Organization",
      "name": "AnimeTopX",
    },
    "publisher": {
      "@type": "Organization",
      "name": "AnimeTopX",
      "logo": {
        "@type": "ImageObject",
        "url": "https://animetopx.vercel.app/logo.png", // Ruta al logo de la organización
        "width": 60,
        "height": 60,
      },
    },
    "image": newsItem.imageUrls.map((image) => ({
      "@type": "ImageObject",
      "url": `https://animetopx.vercel.app${image.url}`,
      "contentUrl": `https://animetopx.vercel.app${image.url}`,
      "width": "800",
      "height": "1200",
      "caption": image.description,
      "name": image.title,
      "thumbnailUrl": `https://animetopx.vercel.app${image.url}`,
    })),
    "articleSection": newsItem.category,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://animetopx.vercel.app/noticias/${id}`,
    },
  };

  return (
    <>
      {/* Script JSON-LD */}
      <Script
        id={`json-ld-news-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Detalles de la noticia */}
      <NewsDetailClient id={id} />
    </>
  );
}
