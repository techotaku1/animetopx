import { newsItems } from "../../lib/newsData"; // Asegúrate de que esta ruta sea correcta
import NewsDetailClient from "./NewsDetailClient";
import Script from "next/script";

// Genera parámetros estáticos para las rutas dinámicas
export async function generateStaticParams() {
  return newsItems.map((item) => ({
    id: item.id.toString(), // Convierte el id a string
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
    "dateModified": publicationDate, // Se usa la misma fecha para la modificación
    "author": {
      "@type": "Organization",
      "name": "AnimeTopX",
    },
    "publisher": {
      "@type": "Organization",
      "name": "AnimeTopX",
    },
    "image": newsItem.imageUrls.map((image) => ({
      "@type": "ImageObject",
      "url": `https://animetopx.vercel.app${image.url}`, // URL completa para la imagen
      "contentUrl": `https://animetopx.vercel.app${image.url}`, // Asegura que Google pueda acceder al contenido
      "width": "800", // Ajuste a tamaño estándar
      "height": "1200", // Ajuste a tamaño estándar
      "caption": image.description,
      "name": image.title,
      "thumbnailUrl": `https://animetopx.vercel.app${image.url}`, // URL del thumbnail si tienes una versión más pequeña
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
