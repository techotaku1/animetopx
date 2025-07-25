import { type JSX } from 'react';

import Link from 'next/link';

import { Home, Newspaper } from 'lucide-react';

import { NewsCard } from '@/components/layout/news-card';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { getBlobUrl } from '@/lib/blobUtils';

// Simulación de datos de noticias
const newsItems = [
	{
		id: 6,
		title: 'TOP 10 ANIMES VERANO 2025',
		description: 'Top estrenos de la temporada de VERANO 2025',
		category: 'Verano',
		imageUrl: getBlobUrl('VERANO-2025/CoverVerano2025.webp'),
		date: '2025-07-07T00:56:00-05:00', // Fecha y hora exacta de publicación (Bogotá)
	},
	{
		id: 5,
		title: 'TOP 10 ANIMES PRIMAVERA 2025',
		description:
			'Descubre las nuevas aventuras que nos esperan en la temporada de Primavera 2025.',
		category: 'Primavera',
		imageUrl: getBlobUrl('PRIMAVERA-2025/CoverPrimavera2025.webp'),
		date: '2025-04-12T00:56:00-05:00',
	},
	{
		id: 4,
		title: 'TOP 10 ANIMES INVIERNO 2025',
		description:
			'Descubre las nuevas aventuras que nos esperan en la temporada de Invierno 2025.',
		category: 'Invierno',
		imageUrl: getBlobUrl('INVIERNO-2025/coverinvierno2025.webp'),
		date: '2025-02-10T00:56:00-05:00',
	},
	{
		id: 3,
		title: 'EL CONTINENTE OSCURO Y SUS 5 CALAMIDADES EN HUNTER X HUNTER',
		description:
			'Descubre las 5 calamidades del continente oscuro de HUNTER X HUNTER y lo que hace cada una de ellas.',
		category: 'Curiosidades',
		imageUrl: getBlobUrl('HUNTERXHUNTER/coverhunter.webp'),
		date: '2024-11-08T00:56:00-05:00',
	},
	{
		id: 2,
		title: 'BRUJAS Y ARZOBISPOS EN RE:ZERO',
		description:
			'Lista REAL de los arzobispos del pecado en Re:Zero, y sus respectivas brujas.',
		category: 'Curiosidades',
		imageUrl: getBlobUrl('RE-ZERO/coverrezero.webp'),
		date: '2024-11-01T00:56:00-05:00',
	},
	{
		id: 1,
		title: 'TOP 10 ANIMES OTOÑO 2024',
		description: 'Top estrenos de la temporada de OTOÑO 2024',
		category: 'Otoño',
		imageUrl: getBlobUrl('OTOÑO-2024/coverotoño.webp'),
		date: '2024-10-01T00:56:00-05:00',
	},
	// Puedes agregar más noticias aquí
];

export default function NoticiasPage(): JSX.Element {
	// Función para mostrar tiempo relativo en español
	function getRelativeTime(dateString: string) {
		const now = new Date();
		const date = new Date(dateString);

		const nowMidnight = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate()
		);
		const dateMidnight = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);

		const diffTime = nowMidnight.getTime() - dateMidnight.getTime();
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) {
			return 'Publicado hoy';
		}
		if (diffDays === 1) {
			return 'Publicado ayer';
		}

		if (diffDays > 60) {
			const nowY = now.getFullYear();
			const nowM = now.getMonth();
			const dateY = date.getFullYear();
			const dateM = date.getMonth();
			let diffMonths = (nowY - dateY) * 12 + (nowM - dateM);

			if (now.getDate() < date.getDate()) {
				diffMonths -= 1;
			}

			if (diffMonths <= 0) {
				return 'Publicado hoy';
			}
			if (diffMonths === 1) {
				return 'Publicado hace 1 mes';
			}
			if (diffMonths < 12) {
				return `Publicado hace ${diffMonths} meses`;
			}
			return 'Publicado hace más de un año';
		}
		if (diffDays > 1) {
			return `Publicado hace ${diffDays} días`;
		}

		return 'Publicado hoy';
	}

	return (
		<div className="space-y-8">
			{/* Breadcrumbs */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<Home className="mr-1 inline-block size-4 align-text-bottom" />
						<BreadcrumbLink asChild>
							<Link href="/">Inicio</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<Newspaper className="mr-1 inline-block size-4 align-text-bottom" />
						<BreadcrumbPage>Noticias</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<section>
				<h1 className="mb-4 text-4xl font-bold">Todas las Noticias de Anime</h1>
				<p className="text-muted-foreground mb-8 text-xl">
					Aquí encontrarás todas las noticias relacionadas con el mundo del
					anime.
				</p>
			</section>

			<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{newsItems.map((item) => (
					<NewsCard
						key={item.id}
						item={{
							...item,
							relativeTime: getRelativeTime(item.date),
						}}
					/>
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
