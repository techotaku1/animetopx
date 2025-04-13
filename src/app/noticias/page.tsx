import { type JSX } from 'react';

import Link from 'next/link';

import { Home, Newspaper } from 'lucide-react';

import { NewsCard } from '@/components/layout/news-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';

import { getBlobUrl } from '@/lib/blobUtils';

// Simulación de datos de noticias
const newsItems = [
	{
		id: 5,
		title: 'NUEVAS AVENTURAS EN PRIMAVERA 2025',
		description:
			'Descubre las nuevas aventuras que nos esperan en la temporada de Primavera 2025.',
		category: 'Primavera',
		imageUrl: getBlobUrl('PRIMAVERA-2025/CoverPrimavera2025.webp'),
		date: '2025-04-12',
	},
	{
		id: 4,
		title: 'NUEVAS AVENTURAS EN INVIERNO 2025',
		description:
			'Descubre las nuevas aventuras que nos esperan en la temporada de Invierno 2025.',
		category: 'Invierno',
		imageUrl: getBlobUrl('INVIERNO-2025/coverinvierno2025.webp'),
		date: '2025-02-10',
	},
	{
		id: 3,
		title: 'EL CONTINENTE OSCURO Y SUS 5 CALAMIDADES DE HUNTER X HUNTER',
		description:
			'Descubre las 5 calamidades del continente oscuro de HUNTER X HUNTER y lo que hace cada una de ellas.',
		category: 'Curiosidades',
		imageUrl: getBlobUrl('HUNTERXHUNTER/coverhunter.webp'),
		date: '2024-11-08',
	},
	{
		id: 2,
		title: 'RE:ZERO BRUJAS Y ARZOBISPOS',
		description:
			'Lista REAL de los arzobispos del pecado en Re:Zero, y sus respectivas brujas.',
		category: 'Curiosidades',
		imageUrl: getBlobUrl('RE-ZERO/coverrezero.webp'),
		date: '2024-11-01',
	},
	{
		id: 1,
		title: 'TOP ANIME OTOÑO 2024',
		description: 'Top estrenos de la temporada de OTOÑO 2024',
		category: 'Otoño',
		imageUrl: getBlobUrl('OTOÑO-2024/coverotoño.webp'),
		date: '2024-10-01',
	},
	// Puedes agregar más noticias aquí
];

export default function NoticiasPage(): JSX.Element {
	// Definición de los breadcrumbs
	const breadcrumbItems = [
		{ href: '/', label: 'Inicio', icon: Home },
		{ href: '/noticias', label: 'Noticias', icon: Newspaper },
	];

	return (
		<div className="space-y-8">
			{/* Breadcrumbs */}
			<Breadcrumbs items={breadcrumbItems} />

			<section>
				<h1 className="mb-4 text-4xl font-bold">Todas las Noticias de Anime</h1>
				<p className="text-muted-foreground mb-8 text-xl">
					Aquí encontrarás todas las noticias relacionadas con el mundo del
					anime.
				</p>
			</section>

			<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{newsItems.map((item) => (
					<NewsCard key={item.id} item={item} />
				))}
			</section>
			<section className="text-center">
				<Button asChild size="lg">
					<Link href="/">Volver a la página principal</Link>
				</Button>
			</section>
		</div>
	);
}
