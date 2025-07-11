import { newsItems } from '@/lib/newsData';

import NewsDetailClient from './NewsDetailClient';

export function generateStaticParams() {
	const paths = newsItems.map((item) => ({
		id: item.id.toString(),
	}));
	return paths;
}

export default function NewsDetailPage({
	params,
}: {
	params: { id: string }; // <-- Fix: params is a plain object, not a Promise
}) {
	const { id } = params; // <-- Remove await
	const newsItem = newsItems.find((item) => item.id === Number(id));

	if (!newsItem) {
		return <p className="text-center">Noticia no encontrada</p>;
	}

	return <NewsDetailClient id={Number(id)} />;
}
