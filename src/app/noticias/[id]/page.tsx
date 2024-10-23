// src/app/noticias/[id]/page.tsx
import { newsItems } from "../../lib/newsData"; // Asegúrate de la ruta correcta
import NewsDetailClient from "./NewsDetailClient";

// Genera parámetros estáticos para las rutas dinámicas
export async function generateStaticParams() {
  return newsItems.map((item) => ({
    id: item.id.toString(), // Convierte el id a string
  }));
}

// Componente principal que renderiza el cliente
export default function NewsDetail({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  return <NewsDetailClient id={id} />;
}
