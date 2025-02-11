import { getBlobUrl } from '@/lib/blobUtils';

export const carouselData = [
	{
		id: 0,
		title: 'PORTADA PRINCIPAL',
		description: 'portada principal de mi pagina web.',
		category: 'Portada',
		imageUrl: getBlobUrl('PORTADAPRINCIPAL.webp'),
		date: 'N/A',
		isCover: true,
	},
	{
		id: 3,
		title: 'EL CONTINENTE OSCURO Y SUS 5 CALAMIDADES EN HUNTER X HUNTER',
		description:
			'Descubre las 5 calamidades del continente oscuro, un tema central de Hunter X Hunter.',
		category: 'Portada',
		imageUrl: getBlobUrl('HUNTERXHUNTER/portadahunter.webp'),
		date: 'N/A',
		isCover: true,
	},
	{
		id: 2,
		title: 'BRUJAS Y ARZOBISPOS EN RE:ZERO',
		description:
			'Conoce a los arzobispos del pecado en Re:Zero, una parte esencial de la trama.',
		category: 'Portada',
		imageUrl: getBlobUrl('RE-ZERO/portadarezero.webp'),
		date: 'N/A',
		isCover: true,
	},
	{
		id: 1,
		title: 'TOP ANIME OTOÑO 2024',
		description:
			'Los mejores estrenos de anime para la temporada de otoño 2024.',
		category: 'Portada',
		imageUrl: getBlobUrl('OTOÑO-2024/portadaotoño.webp'),
		date: 'N/A',
		isCover: true,
	},
	{
		id: 4,
		title: 'TOP ANIMES INVIERNO 2025',
		description:
			'Los mejores estrenos de anime para la temporada de invierno 2025.',
		category: 'Portada',
		imageUrl: getBlobUrl('INVIERNO-2025/portadainvierno2025.webp'),
		date: 'N/A',
		isCover: true,
	},
	{
		id: 3,
		title: 'EL CONTINENTE OSCURO Y SUS 5 CALAMIDADES EN HUNTER X HUNTER',
		description: 'Descubre las 5 calamidades del continente oscuro.',
		category: 'Curiosidades',
		imageUrl: getBlobUrl('HUNTERXHUNTER/coverhunter.webp'),
		date: '2024-11-08',
		isCover: false,
	},
	{
		id: 2,
		title: 'BRUJAS Y ARZOBISPOS EN RE:ZERO',
		description:
			'Lista REAL de los arzobispos del pecado y sus respectivas brujas.',
		category: 'Curiosidades',
		imageUrl: getBlobUrl('RE-ZERO/coverrezero.webp'),
		date: '2024-11-01',
		isCover: false,
	},
	{
		id: 1,
		title: 'TOP ANIME OTOÑO 2024',
		description: 'Los Mejores ESTRENOS de la temporada de OTOÑO 2024.',
		category: 'Otoño',
		imageUrl: getBlobUrl('OTOÑO-2024/coverotoño.webp'),
		date: '2024-10-01',
		isCover: false,
	},
	{
		id: 4,
		title: 'TOP ANIMES INVIERNO 2025',
		description: 'Los Mejores ESTRENOS de la temporada de INVIERNO 2025.',
		category: 'Invierno',
		imageUrl: getBlobUrl('INVIERNO-2025/coverinvierno2025.webp'),
		date: '2025-02-10',
		isCover: false,
	},
];
