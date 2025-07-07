import { getBlobUrl } from '@/lib/blobUtils';

// src/app/lib/newsData.ts

export interface ImageUrl {
	url: string;
	title: string;
	description: string;
	malLink?: string;
	aspectRatio?: string; // Add aspectRatio property
}

export interface NewsItem {
	id: number;
	title: string;
	category: string;
	imageUrls: ImageUrl[];
	date: string;
	content: string;
	backgroundImage: string; // Asegúrate de que esto no sea undefined
	publicationDate: Date;
}

// Datos de ejemplo
export const newsItems: NewsItem[] = [
	{
		id: 5, // ID de Primavera 2025
		title: 'ANIMES PRIMAVERA 2025',
		category: 'Estrenos Primavera 2025',
		date: '2025-04-12',
		content: 'Detalles sobre la temporada de primavera 2025',
		backgroundImage: getBlobUrl('PRIMAVERA-2025/portadaprimavera2025.webp'),
		publicationDate: new Date('2025-04-1'),
		imageUrls: [
			{
				url: getBlobUrl('PRIMAVERA-2025/Fire_Force_Season_3.webp'),
				title: 'Fire Force Season 3',
				description:
					'La tercera temporada del anime de acción y fantasía sobre bomberos con poderes especiales.',
				malLink:
					'https://myanimelist.net/anime/51818/Enen_no_Shouboutai__San_no_Shou',
			},
			{
				url: getBlobUrl('PRIMAVERA-2025/Lazarus.webp'),
				title: 'Lazarus',
				description:
					'Una nueva serie original sobre seres inmortales en un mundo post-apocalíptico.',
				malLink: 'https://myanimelist.net/anime/56038/Lazarus',
			},
			{
				url: getBlobUrl('PRIMAVERA-2025/Wind_Breaker_Season_2.webp'),
				title: 'Wind Breaker Season 2',
				description:
					'La continuación de la historia de pandillas callejeras y peleas escolares.',
				malLink: 'https://myanimelist.net/anime/59160/Wind_Breaker_Season_2',
			},
			{
				url: getBlobUrl('PRIMAVERA-2025/The_Beginning_After_the_End.webp'),
				title: 'The Beginning After the End',
				description:
					'Adaptación del popular webtoon sobre reencarnación y magia.',
				malLink:
					'https://myanimelist.net/anime/60146/Saikyou_no_Ousama_Nidome_no_Jinsei_wa_Nani_wo_Suru',
			},
			{
				url: getBlobUrl('PRIMAVERA-2025/Boku_no_Hero_Academia_Vigilantes.webp'),
				title: 'Boku no Hero Academia Vigilantes',
				description:
					'Serie spin-off centrada en los vigilantes del universo de My Hero Academia.',
				malLink:
					'https://myanimelist.net/anime/60593/Vigilante__Boku_no_Hero_Academia_Illegals',
			},
			{
				url: getBlobUrl('PRIMAVERA-2025/Haite_Kudasai,_Takamine-san.webp'),
				title: 'Haite Kudasai, Takamine-san',
				description:
					'Una comedia romántica sobre una estudiante con un secreto peculiar.',
				malLink:
					'https://myanimelist.net/anime/59457/Haite_Kudasai_Takamine-san',
			},
			{
				url: getBlobUrl('PRIMAVERA-2025/Witch_Watch.webp'),
				title: 'Witch Watch',
				description:
					'Una historia mágica sobre una bruja y su familiar humano.',
				malLink: 'https://myanimelist.net/anime/59597/Witch_Watch',
			},
			{
				url: getBlobUrl(
					'PRIMAVERA-2025/Can_a_Boy-Girl_Friendship_Survive.webp'
				),
				title: 'Can a Boy-Girl Friendship Survive?',
				description:
					'Una comedia romántica sobre la amistad entre chicos y chicas.',
				malLink:
					'https://myanimelist.net/anime/52709/Danjo_no_Yuujou_wa_Seiritsu_suru_Iya_Shinai',
			},
			{
				url: getBlobUrl('PRIMAVERA-2025/Kowloon_Generic_Romance.webp'),
				title: 'Kowloon Generic Romance',
				description:
					'Un romance ambientado en la misteriosa ciudad amurallada de Kowloon.',
				malLink: 'https://myanimelist.net/anime/60083/Kowloon_Generic_Romance',
			},
			{
				url: getBlobUrl('PRIMAVERA-2025/Aharen-san_wa_Hakarenai_Season_2.webp'),
				title: 'Aharen-san wa Hakarenai Season 2',
				description:
					'La segunda temporada de la comedia escolar sobre una chica con problemas de proximidad.',
				malLink:
					'https://myanimelist.net/anime/59466/Aharen-san_wa_Hakarenai_Season_2',
			},
		],
	},
	{
		id: 4, // ID de Invierno 2025
		title: 'ANIMES INVIERNO 2025',
		category: 'Estrenos Invierno 2025',
		date: '2025-02-10',
		content: 'Detalles sobre la temporada de invierno 2025',
		backgroundImage: getBlobUrl('INVIERNO-2025/portadainvierno2025.webp'),
		publicationDate: new Date('2025-02-10'),
		imageUrls: [
			{
				url: getBlobUrl('INVIERNO-2025/Solo_Leveling_Season_2.webp'),
				title: 'Solo Leveling Season 2',
				description:
					'La segunda temporada de la popular serie de acción y fantasía.',
				malLink:
					'https://myanimelist.net/anime/58567/Ore_dake_Level_Up_na_Ken_Season_2__Arise_from_the_Shadow',
			},
			{
				url: getBlobUrl('INVIERNO-2025/Sakamoto_Days.webp'),
				title: 'Sakamoto Days',
				description:
					'Las aventuras de un ex-asesino que ahora lleva una vida tranquila como tendero.',
				malLink: 'https://myanimelist.net/anime/58939/Sakamoto_Days',
			},
			{
				url: getBlobUrl('INVIERNO-2025/Kusuriya_no_Hitorigoto_Season_2.webp'),
				title: 'Kusuriya no Hitorigoto Season 2',
				description:
					'La segunda temporada de la historia de una farmacéutica en la corte imperial.',
				malLink:
					'https://myanimelist.net/anime/58514/Kusuriya_no_Hitorigoto_2nd_Season',
			},
			{
				url: getBlobUrl('INVIERNO-2025/Dr._Stone_Science_Future.webp'),
				title: 'Dr. Stone: Science Future',
				description:
					'La continuación de las aventuras científicas en un mundo post-apocalíptico.',
				malLink: 'https://myanimelist.net/anime/57592/Dr_Stone__Science_Future',
			},
			{
				url: getBlobUrl(
					'INVIERNO-2025/Watashi_no_Shiawase_na_Kekkon_Season_2.png'
				),
				title: 'Watashi no Shiawase na Kekkon Season 2',
				description:
					'La segunda temporada de la historia de un matrimonio feliz.',
				malLink:
					'https://myanimelist.net/anime/56701/Watashi_no_Shiawase_na_Kekkon_2nd_Season',
			},
			{
				url: getBlobUrl(
					'INVIERNO-2025/Kimi_no_Koto_ga_Daidaidaidaidaisuki_na_100-nin_no_Kanojo_Season_2.webp'
				),
				title:
					'Kimi no Koto ga Daidaidaidaidaisuki na 100-nin no Kanojo Season 2',
				description:
					'La segunda temporada de la comedia romántica sobre un chico con 100 novias.',
				malLink:
					'https://myanimelist.net/anime/57616/Kimi_no_Koto_ga_Daidaidaidaidaisuki_na_100-nin_no_Kanojo_2nd_Season',
			},
			{
				url: getBlobUrl(
					'INVIERNO-2025/Class_no_Daikirai_na_Joshi_to_Kekkon_suru_Koto_ni_Natta.webp'
				),
				title: 'Class no Daikirai na Joshi to Kekkon suru Koto ni Natta',
				description:
					'Una historia romántica sobre un chico que se casa con la chica más odiada de su clase.',
				malLink:
					'https://myanimelist.net/anime/59135/Class_no_Daikirai_na_Joshi_to_Kekkon_suru_Koto_ni_Natta',
			},
			{
				url: getBlobUrl('INVIERNO-2025/Zenshuu.png'),
				title: 'Zenshuu',
				description:
					'Una serie sobre la búsqueda de la perfección en las artes marciales.',
				malLink: 'https://myanimelist.net/anime/58502/Zenshuu',
			},
			{
				url: getBlobUrl('INVIERNO-2025/Honey_Lemon_Soda.webp'),
				title: 'Honey Lemon Soda',
				description:
					'Una dulce historia de amor entre una chica tímida y un chico popular.',
				malLink: 'https://myanimelist.net/anime/58271/Honey_Lemon_Soda',
			},
			{
				url: getBlobUrl(
					'INVIERNO-2025/Guild_no_Uketsukejou_desu_ga_Zangyou_wa_Iya_nanode_Boss_wo_Solo_Toubatsu_Shiyou_to_Omoimasu.webp'
				),
				title:
					'Guild no Uketsukejou desu ga, Zangyou wa Iya nanode Boss wo Solo Toubatsu Shiyou to Omoimasu',
				description:
					'Una recepcionista de gremio decide derrotar a los jefes por su cuenta para evitar horas extras.',
				malLink:
					'https://myanimelist.net/anime/55997/Guild_no_Uketsukejou_desu_ga_Zangyou_wa_Iya_nanode_Boss_wo_Solo_Toubatsu_Shiyou_to_Omoimasu',
			},
		],
	},
	{
		id: 3, // ID de Hunter x Hunter
		title: '5 CALAMIDADES DEL CONTINENTE OSCURO',
		category: 'HUNTER X HUNTER',
		date: '2024-12-1',
		content: 'Las 5 calamidades del continente oscuro',
		backgroundImage: getBlobUrl('HUNTERXHUNTER/portadahunter.webp'),
		publicationDate: new Date('2024-12-1'),
		imageUrls: [
			{
				url: getBlobUrl('HUNTERXHUNTER/calamidad-pap.webp'),
				title: 'PAP',
				description:
					'Es una bestia carnívora que se alimenta de humanos. Se encuentra en una cadena montañosa en el Continente Oscuro. Su existencia representa una amenaza constante para los viajeros que se adentran en esa región​.',
				malLink: 'https://myanimelist.net/manga/26/Hunter_x_Hunter',
			},
			{
				url: getBlobUrl('HUNTERXHUNTER/calamidad-ai.webp'),
				title: 'AI',
				description:
					'Una forma de vida gaseosa con apéndices extendidos que parece influir en el comportamiento de otros seres. Promueve conductas autodestructivas, causando que los individuos bajo su influencia actúen de manera peligrosa.',
				malLink: 'https://myanimelist.net/manga/26/Hunter_x_Hunter',
			},
			{
				url: getBlobUrl('HUNTERXHUNTER/calamidad-brion.webp'),
				title: 'BRION',
				description:
					'Un ser misterioso que posee una apariencia humanoide con una enorme esfera como cabeza. Se encuentra en un laberinto dentro de unas antiguas ruinas en el norte del Lago Mobius. Brion es conocido por ser un ser y un arma a la vez​.',
				malLink: 'https://myanimelist.net/manga/26/Hunter_x_Hunter',
			},
			{
				url: getBlobUrl('HUNTERXHUNTER/calamidad-hellbell.webp'),
				title: 'HELLBELL',
				description:
					'Una serpiente peligrosa que habita en los pantanos del sur del Continente Oscuro. Su presencia tiene la capacidad de infectar a las personas con un deseo homicida, convirtiéndola en una amenaza psicológica y física.',
				malLink: 'https://myanimelist.net/manga/26/Hunter_x_Hunter',
			},
			{
				url: getBlobUrl('HUNTERXHUNTER/calamidad-zobae.webp'),
				title: 'ZOBAE',
				description:
					'Conocida como la enfermedad inmortal, Zobae es una enfermedad extremadamente peligrosa que afecta a quienes la contraen, causando que su piel se vuelva oscura y llevando a la muerte a la mayoría de las víctimas. Se encuentra en el sureste del Continente Oscuro.',
				malLink: 'https://myanimelist.net/manga/26/Hunter_x_Hunter',
			},
		],
	},
	{
		id: 2, // ID de Re:Zero
		title: 'LAS BRUJAS Y SUS ARZOBISPOS',
		category: 'RE:ZERO',
		date: '2024-11-1',
		content: 'Las brujas y sus arzobispos',
		backgroundImage: getBlobUrl('RE-ZERO/portadarezero.webp'),
		publicationDate: new Date('2024-11-1'),
		imageUrls: [
			{
				url: getBlobUrl('RE-ZERO/PEREZA.webp'),
				title: 'Pecado De La Pereza (Sekhmet - Petelgeuse Romanee)',
				description:
					'Este poder otorga una fuerza invisible y descomunal que puede ser usada a distancia, y permite que el portador de Pereza manipule a otros como extensiones de sí mismo. Es una fuerza implacable y brutal que se impone sobre la voluntad ajena.',
				malLink:
					'https://myanimelist.net/character/149519/Sekhmet?q=Sekhmet%20&cat=character',
			},
			{
				url: getBlobUrl('RE-ZERO/CODICIA.webp'),
				title: 'Pecado De La Codicia (Echidna - Regulus Corneas)',
				description:
					'La codicia permite al portador adueñarse de la experiencia o vida de otros, anulando su independencia y dominando cada aspecto de su existencia.',
				malLink:
					'https://myanimelist.net/character/145877/Echidna?q=echidna&cat=character',
			},
			{
				url: getBlobUrl('RE-ZERO/GULA.webp'),
				title: 'Pecado De La Gula (Daphne - Ley Batenkaitos)',
				description:
					'El portador de Gula tiene la habilidad de devorar la esencia de otros, consumiendo sus recuerdos, identidad y existencia misma.',
				malLink:
					'https://myanimelist.net/character/147409/Daphne?q=Daphne&cat=character',
			},
			{
				url: getBlobUrl('RE-ZERO/LUJURIA.webp'),
				title: 'Pecado De La Lujuria (Carmilla - Capella Emerada)',
				description:
					'Lujuria otorga el poder de manipular y distorsionar el cuerpo de otros.',
				malLink:
					'https://myanimelist.net/character/149021/Carmilla?q=Carmilla%20luju&cat=character',
			},
			{
				url: getBlobUrl('RE-ZERO/IRA.webp'),
				title: 'Pecado De La Ira (Minerva - Sirius)',
				description:
					'Ira otorga la habilidad de sanar heridas y restaurar la vitalidad de otros, aunque también puede manifestarse de formas destructivas.',
				malLink:
					'https://myanimelist.net/character/147408/Minerva?q=Minerva&cat=character',
			},
			{
				url: getBlobUrl('RE-ZERO/ENVIDIA.webp'),
				title: 'Pecado De La Envidia (Satella - ?)',
				description:
					'El poder de la Envidia permite al portador manipular sombras que consumen todo a su paso.',
				malLink:
					'https://myanimelist.net/character/144319/Satella?q=satella&cat=character',
			},
			{
				url: getBlobUrl('RE-ZERO/ORGULLO.webp'),
				title: 'Pecado Del Orgullo (Typhon - ?)',
				description:
					'Orgullo permite al portador ejercer una influencia total sobre aquellos que considera inferiores.',
				malLink:
					'https://myanimelist.net/character/147407/Typhon?q=Typhon&cat=character',
			},
		],
	},
	{
		id: 1, // ID de Otoño 2024
		title: 'TEMPORADA OTOÑO 2024',
		category: 'Estrenos Otoño 2024',
		date: '2024-10-1',
		content: 'Detalles sobre la temporada de otoño 2024',
		backgroundImage: getBlobUrl('OTOÑO-2024/portadaotoño.webp'),
		publicationDate: new Date('2024-10-1'),
		imageUrls: [
			{
				url: getBlobUrl('OTOÑO-2024/ReZeroSeason3.webp'),
				title: 'Re:Zero Season 3',
				description:
					"La tercera temporada de Re:Zero kara Hajimeru Isekai Seikatsu sigue a Subaru Natsuki, quien enfrenta nuevas pruebas en un mundo alternativo, mientras desentraña más secretos sobre su capacidad de 'Regreso por Muerte'. La serie promete mantener su característico enfoque psicológico y emocional, con más personajes y dilemas que desafían las decisiones de Subaru.",
				malLink:
					'https://myanimelist.net/anime/54857/Re_Zero_kara_Hajimeru_Isekai_Seikatsu_3rd_Season',
				aspectRatio: '9/16', // Add aspectRatio
			},
			{
				url: getBlobUrl('OTOÑO-2024/Dandadan.webp'),
				title: 'Dandadan',
				description:
					'Momo Ayase, una joven con habilidades psíquicas, se ve envuelta en un extraño mundo sobrenatural al encontrarse con un chico llamado Ken Takakura, mientras ambos luchan contra espíritus y entidades paranormales. La serie mezcla acción, comedia y elementos del terror, explorando la relación entre los protagonistas mientras enfrentan fuerzas más allá de su comprensión.',
				malLink: 'https://myanimelist.net/anime/57334/Dandadan?q=dan&cat=anime',
				aspectRatio: '9/16', // Add aspectRatio
			},
			{
				url: getBlobUrl('OTOÑO-2024/Uzumaki.webp'),
				title: 'Uzumaki',
				description:
					'Basada en el manga de Junji Ito, Uzumaki es una adaptación de terror psicológico que sigue la historia de Kirie Goshima, una joven que vive en una ciudad donde extrañas ocurrencias relacionadas con espirales comienzan a alterar la vida diaria de los habitantes. A medida que la ciudad se ve atrapada en esta espiral de locura, Kirie debe enfrentarse a lo inimaginable.',
				malLink:
					'https://myanimelist.net/anime/40333/Uzumaki?q=uzumaki&cat=anime',
			},
			{
				url: getBlobUrl('OTOÑO-2024/BlueLock2vsU20Japan.webp'),
				title: 'BlueLock vs U-20 Japan',
				description:
					'La segunda temporada de Blue Lock sigue el desarrollo de los jugadores en el programa de entrenamiento de élite para crear al mejor delantero de fútbol. En esta nueva entrega, el equipo se enfrenta a Japón Sub-20 en una serie de desafíos que pondrán a prueba sus habilidades, tácticas y voluntad de ganar en el escenario internacional.',
				malLink: 'https://myanimelist.net/anime/54865/Blue_Lock_vs_U-20_Japan',
			},
			{
				url: getBlobUrl('OTOÑO-2024/AoNoHako.webp'),
				title: 'Ao no Hako',
				description:
					'Taiki Inomata, un talentoso jugador de voleibol de secundaria, se une a la Academia Eimei, donde enfrenta una competencia feroz en su camino hacia el éxito. La serie explora la dinámica del deporte, el esfuerzo y las relaciones humanas mientras Taiki busca su lugar entre los mejores jugadores.',
				malLink:
					'https://myanimelist.net/anime/57181/Ao_no_Hako?q=ao%20no%20hako&cat=anime',
			},
			{
				url: getBlobUrl('OTOÑO-2024/DanMachiHoujouNoMegamiHenV.webp'),
				title: 'Danmachi: Houjou no Megami-hen V',
				description:
					'La quinta temporada de Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka lleva a los protagonistas a enfrentar nuevas amenazas en las profundidades del Dungeon. Bell Cranel continúa su viaje with nuevos aliados y enemigos mientras explora su destino en un mundo lleno de divinidades, monstruos y batallas épicas.',
				malLink:
					'https://myanimelist.net/anime/57066/Dungeon_ni_Deai_wo_Motomeru_no_wa_Machigatteiru_Darou_ka_V__Houjou_no_Megami-hen?q=no%20megami%20hen&cat=anime',
			},
			{
				url: getBlobUrl('OTOÑO-2024/DragonBallDaima.webp'),
				title: 'Dragon Ball Daima',
				description:
					'Dragon Ball Daima es una nueva serie que expande el universo de Dragon Ball. La historia promete un enfoque fresco y nuevos personajes mientras se sigue la tradición de las aventuras épicas de Goku y sus amigos. Los fanáticos pueden esperar batallas espectaculares y nuevos giros en el universo que ha cautivado a millones.',
				malLink:
					'https://myanimelist.net/anime/56894/Dragon_Ball_Daima?q=dragon%20ball%20daima&cat=anime',
			},
			{
				url: getBlobUrl('OTOÑO-2024/SAOGunGaleOnline2.webp'),
				title: 'SAO: Gun Gale Online II',
				description:
					'La segunda temporada de Sword Art Online Alternative: Gun Gale Online continúa la historia de Karen Aijou, quien se adentra en el juego virtual de disparos para enfrentarse a nuevos desafíos. Esta temporada promete más acción, estrategias de combate y la evolución de los personajes en un ambiente futurista lleno de riesgos y adrenalina.',
				malLink:
					'https://myanimelist.net/anime/55994/Sword_Art_Online_Alternative__Gun_Gale_Online_II?q=gun%20gale&cat=anime',
			},
			{
				url: getBlobUrl('OTOÑO-2024/ShangriLaFrontier2.webp'),
				title: 'Shangri-La Frontier Season 2',
				description:
					'En la segunda temporada de Shangri-La Frontier, el protagonista, Rin, regresa al mundo virtual de Shangri-La, un juego de realidad virtual que es conocido por sus errores y glitches. En esta nueva entrega, Rin se enfrentará a nuevos y complejos desafíos mientras explora más de los secretos del juego y su relación con otros jugadores.',
				malLink:
					'https://myanimelist.net/anime/58572/Shangri-La_Frontier__Kusoge_Hunter_Kamige_ni_Idoman_to_su_2nd_Season',
			},
			{
				url: getBlobUrl(
					'OTOÑO-2024/NanatsuNoTaizaiMokushirokuNoYonkishi2.webp'
				),
				title: 'Nanatsu no Taizai: Mokushiroku no Yonkishi Season 2',
				description:
					'La segunda temporada de Nanatsu no Taizai: Mokushiroku no Yonkishi continúa la saga de los Siete Pecados Capitales, quienes se enfrentan a nuevos enemigos y desvelan más secretos sobre su mundo. Esta entrega promete más batallas épicas y un mayor desarrollo de los personajes mientras se profundiza en la historia detrás de los Cuatro Caballeros del Apocalipsis.',
				malLink:
					'https://myanimelist.net/anime/58511/Nanatsu_no_Taizai__Mokushiroku_no_Yonkishi_2nd_Season?q=Mokushiroku%20no%20Yonkishi&cat=anime',
			},
		],
	},
	{
		id: 6,
		title: 'ANIMES VERANO 2025',
		category: 'Estrenos Verano 2025',
		date: '2025-07-10',
		content: 'Top 10 animes más esperados de la temporada de verano 2025',
		backgroundImage: getBlobUrl('VERANO-2025/portadaverano2025.jpg'),
		publicationDate: new Date('2025-07-10'),
		imageUrls: [
			{
				url: getBlobUrl('VERANO-2025/1-SonoBisqueDollSeason2.jpg'),
				title: 'Sono Bisque Doll Season 2',
				description: 'Segunda temporada de Sono Bisque Doll wa Koi wo Suru.',
				malLink:
					'https://myanimelist.net/anime/52991/Sono_Bisque_Doll_wa_Koi_wo_Suru_2nd_Season',
			},
			{
				url: getBlobUrl('VERANO-2025/2-DandadanSeason2.jpg'),
				title: 'Dandadan Season 2',
				description: 'Segunda temporada de Dandadan.',
				malLink: 'https://myanimelist.net/anime/57334/Dandadan',
			},
			{
				url: getBlobUrl('VERANO-2025/3-KaijuNo.8Season2.jpg'),
				title: 'Kaiju No. 8 Season 2',
				description: 'Segunda temporada de Kaijuu 8-gou.',
				malLink: 'https://myanimelist.net/anime/50399/Kaijuu_8-gou',
			},
			{
				url: getBlobUrl('VERANO-2025/4-YofukashinoUtaSeason2.jpg'),
				title: 'Yofukashi no Uta Season 2',
				description: 'Segunda temporada de Yofukashi no Uta.',
				malLink:
					'https://myanimelist.net/anime/52991/Yofukashi_no_Uta_2nd_Season',
			},
			{
				url: getBlobUrl('VERANO-2025/5-KaoruHanawaRintoSaku.jpg'),
				title: 'Kaoru Hana wa Rin to Saku',
				description:
					'A pesar de estar adyacentes, la Escuela Secundaria Pública de Chidori y la Academia Privada Kikyo, solo para chicas, parecen vivir en mundos diferentes.',
				malLink:
					'https://myanimelist.net/anime/54741/Kaoru_Hana_wa_Rin_to_Saku',
			},
			{
				url: getBlobUrl(
					'VERANO-2025/6-SeishunButaYarouwaSantaClausnoYumewoMinai.jpg'
				),
				title: 'Seishun Buta Yarou wa Santa Claus no Yume wo Minai',
				description:
					'Secuela de Seishun Buta Yarou wa Randoseru Girl no Yume wo Minai.',
				malLink:
					'https://myanimelist.net/anime/54714/Seishun_Buta_Yarou_wa_Santa_Claus_no_Yume_wo_Minai',
			},
			{
				url: getBlobUrl('VERANO-2025/7-SakamotoDaysPart2.jpg'),
				title: 'Sakamoto Days Part 2',
				description: 'Segunda parte de Sakamoto Days.',
				malLink: 'https://myanimelist.net/anime/58939/Sakamoto_Days',
			},
			{
				url: getBlobUrl('VERANO-2025/8-TatenoYuushanoNariagariSeason4.jpg'),
				title: 'Tate no Yuusha no Nariagari Season 4',
				description: 'Cuarta temporada de Tate no Yuusha no Nariagari.',
				malLink:
					'https://myanimelist.net/anime/50847/Tate_no_Yuusha_no_Nariagari_Season_4',
			},
			{
				url: getBlobUrl('VERANO-2025/9-Gachiakuta.jpg'),
				title: 'Gachiakuta',
				description:
					'Viviendo en los barrios bajos de un pueblo adinerado, Rudo y su padre adoptivo, Regto, intentan coexistir con el resto de los habitantes, pero Rudo desprecia el despilfarro de la clase alta.',
				malLink: 'https://myanimelist.net/anime/56101/Gachiakuta',
			},
			{
				url: getBlobUrl('VERANO-2025/10-HikarugaShindaNatsu.jpg'),
				title: 'Hikaru ga Shinda Natsu',
				description:
					'Los mejores amigos Yoshiki y Hikaru han estado unidos como una lapa durante la mayor parte de sus vidas. Viviendo en un pequeño pueblo y siendo los únicos hijos de su edad, los dos chicos encuentran consuelo en la compañía mutua.',
				malLink: 'https://myanimelist.net/anime/54740/Hikaru_ga_Shinda_Natsu',
			},
		],
	},
];
