import { type JSX } from 'react'; // Importar el namespace JSX de React
import { type Metadata } from 'next'; // Importar tipo de Metadata
import { notFound } from 'next/navigation'; // Función de Next.js para manejar el error 404

import { newsItems } from '@/lib/newsData'; // Importar datos de noticias
import NewsDetailClient from './NewsDetailClient'; // Componente para mostrar los detalles de la noticia

// Generación de parámetros estáticos para las rutas dinámicas
export function generateStaticParams(): { id: string }[] {
	return newsItems.map((news) => ({
		id: news.id.toString(), // Se mapea cada noticia a una ruta dinámica usando el ID
	}));
}

// Función para generar metadatos de la página de manera asíncrona
export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params; // Esperar a que el parámetro 'id' esté resuelto

	const newsId = parseInt(id, 10); // Convertir el ID de string a número

	const newsItem = newsItems.find((item) => item.id === newsId); // Buscar la noticia por ID

	// Si no se encuentra la noticia, se generan metadatos alternativos
	if (!newsItem) {
		return {
			title: 'Noticia no encontrada',
			description: 'La noticia que buscas no existe',
		};
	}

	return {
		metadataBase: new URL('https://animetopx.vercel.app'), // Definir la URL base para la página
		title: newsItem.title, // Título de la noticia
		description: newsItem.content.substring(0, 160), // Descripción corta para SEO
		openGraph: {
			title: newsItem.title, // Título para Open Graph
			description: newsItem.content.substring(0, 160), // Descripción para Open Graph
			images: [
				{
					url: newsItem.backgroundImage, // Imagen relacionada con la noticia
					width: 1200,
					height: 630,
					alt: newsItem.title, // Descripción alternativa para la imagen
				},
			],
		},
	};
}

// Componente principal de la página
export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
	const { id } = await params; // Esperar a que el parámetro 'id' esté disponible

	const newsId = parseInt(id, 10); // Convertir el ID a un número

	const newsItem = newsItems.find((item) => item.id === newsId); // Buscar la noticia por ID

	// Si no se encuentra la noticia, se redirige a la página de error 404
	if (!newsItem) {
		notFound();
	}

	return (
		<div className="container mx-auto py-1">
			{/* Componente para mostrar los detalles de la noticia */}
			<NewsDetailClient id={newsId} />
		</div>
	);
}
