export const getWebsiteSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': 'https://animetopx.com/#website',
	url: 'https://animetopx.com',
	name: 'AnimeTopX',
	alternateName: ['AnimeTopX Noticias', 'AnimeTopX Tops'],
	description:
		'Descubre los mejores animes, tops y noticias de la temporada en AnimeTopX.',
	publisher: {
		'@type': 'Organization',
		name: 'AnimeTopX',
		logo: {
			'@type': 'ImageObject',
			url: 'https://animetopx.com/animetopx-icon.png',
		},
		sameAs: [
			'https://facebook.com/animetopx',
			'https://twitter.com/animetopx',
			'https://instagram.com/animetopx',
		],
	},
	mainEntity: {
		'@type': 'WebSite',
		name: 'AnimeTopX',
		description: 'Noticias y tops de anime actualizados.',
	},
});

export const getWebPagesSchema = () => [
	{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': 'https://animetopx.com/#homepage',
		url: 'https://animetopx.com',
		name: 'Inicio',
		hasPart: [
			{
				'@type': 'WebPage',
				'@id': 'https://animetopx.com/noticias6/#page',
				url: 'https://animetopx.com/noticias6',
				name: 'Top 10 Anime Verano 2025',
			},
			{
				'@type': 'WebPage',
				'@id': 'https://animetopx.com/noticias5/#page',
				url: 'https://animetopx.com/noticias5',
				name: 'Anime Top 10 Primavera 2025',
			},
		],
	},
	{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': 'https://animetopx.com/noticias6/#page',
		url: 'https://animetopx.com/noticias6',
		name: 'Top 10 Anime Verano 2025',
	},
	{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': 'https://animetopx.com/noticias5/#page',
		url: 'https://animetopx.com/noticias5',
		name: 'Anime Top 10 Primavera 2025',
	},
];
