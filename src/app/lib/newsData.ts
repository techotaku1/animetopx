// src/app/noticias/newsData.ts

export interface ImageUrl {
  url: string;
  title: string;
  description: string;
  malLink?: string;
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
    id: 1,
    title: "TEMPORADA OTOÑO 2024",
    category: "Estrenos Otoño 2024",
    date: "2024-10-1",
    content: "Detalles sobre la temporada de otoño 2024",
    backgroundImage: "/OTOÑO-2024/portada-otoño.webp",
    publicationDate: new Date("2024-10-1"),
    imageUrls: [
      {
        url: "/OTOÑO-2024/ReZeroSeason3.webp",
        title: "Re:Zero Season 3",
        description: "La tercera temporada de Re:Zero kara Hajimeru Isekai Seikatsu sigue a Subaru Natsuki, quien enfrenta nuevas pruebas en un mundo alternativo, mientras desentraña más secretos sobre su capacidad de 'Regreso por Muerte'. La serie promete mantener su característico enfoque psicológico y emocional, con más personajes y dilemas que desafían las decisiones de Subaru.",
        malLink: "https://myanimelist.net/anime/54857/Re_Zero_kara_Hajimeru_Isekai_Seikatsu_3rd_Season"
      },
      {
        url: "/OTOÑO-2024/Dandadan.webp",
        title: "Dandadan",
        description: "Momo Ayase, una joven con habilidades psíquicas, se ve envuelta en un extraño mundo sobrenatural al encontrarse con un chico llamado Ken Takakura, mientras ambos luchan contra espíritus y entidades paranormales. La serie mezcla acción, comedia y elementos del terror, explorando la relación entre los protagonistas mientras enfrentan fuerzas más allá de su comprensión.",
        malLink: "https://myanimelist.net/anime/57334/Dandadan?q=dan&cat=anime"
      },
      {
        url: "/OTOÑO-2024/Uzumaki.webp",
        title: "Uzumaki",
        description: "Basada en el manga de Junji Ito, Uzumaki es una adaptación de terror psicológico que sigue la historia de Kirie Goshima, una joven que vive en una ciudad donde extrañas ocurrencias relacionadas con espirales comienzan a alterar la vida diaria de los habitantes. A medida que la ciudad se ve atrapada en esta espiral de locura, Kirie debe enfrentarse a lo inimaginable.",
        malLink: "https://myanimelist.net/anime/40333/Uzumaki?q=uzumaki&cat=anime"
      },
      {
        url: "/OTOÑO-2024/BlueLock2vsU20Japan.webp",
        title: "BlueLock vs U-20 Japan",
        description: "La segunda temporada de Blue Lock sigue el desarrollo de los jugadores en el programa de entrenamiento de élite para crear al mejor delantero de fútbol. En esta nueva entrega, el equipo se enfrenta a Japón Sub-20 en una serie de desafíos que pondrán a prueba sus habilidades, tácticas y voluntad de ganar en el escenario internacional.",
        malLink: "https://myanimelist.net/anime/54865/Blue_Lock_vs_U-20_Japan"
      },
      {
        url: "/OTOÑO-2024/AoNoHako.webp",
        title: "Ao no Hako",
        description: "Taiki Inomata, un talentoso jugador de voleibol de secundaria, se une a la Academia Eimei, donde enfrenta una competencia feroz en su camino hacia el éxito. La serie explora la dinámica del deporte, el esfuerzo y las relaciones humanas mientras Taiki busca su lugar entre los mejores jugadores.",
        malLink: "https://myanimelist.net/anime/57181/Ao_no_Hako?q=ao%20no%20hako&cat=anime"
      },
      {
        url: "/OTOÑO-2024/DanMachiHoujouNoMegamiHenV.webp",
        title: "Danmachi: Houjou no Megami-hen V",
        description: "La quinta temporada de Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka lleva a los protagonistas a enfrentar nuevas amenazas en las profundidades del Dungeon. Bell Cranel continúa su viaje con nuevos aliados y enemigos mientras explora su destino en un mundo lleno de divinidades, monstruos y batallas épicas.",
        malLink: "https://myanimelist.net/anime/57066/Dungeon_ni_Deai_wo_Motomeru_no_wa_Machigatteiru_Darou_ka_V__Houjou_no_Megami-hen?q=no%20megami%20hen&cat=anime"
      },
      {
        url: "/OTOÑO-2024/DragonBallDaima.webp",
        title: "Dragon Ball Daima",
        description: "Dragon Ball Daima es una nueva serie que expande el universo de Dragon Ball. La historia promete un enfoque fresco y nuevos personajes mientras se sigue la tradición de las aventuras épicas de Goku y sus amigos. Los fanáticos pueden esperar batallas espectaculares y nuevos giros en el universo que ha cautivado a millones.",
        malLink: "https://myanimelist.net/anime/56894/Dragon_Ball_Daima?q=dragon%20ball%20daima&cat=anime"
      },
      {
        url: "/OTOÑO-2024/SAOGunGaleOnline2.webp",
        title: "SAO: Gun Gale Online II",
        description: "La segunda temporada de Sword Art Online Alternative: Gun Gale Online continúa la historia de Karen Aijou, quien se adentra en el juego virtual de disparos para enfrentarse a nuevos desafíos. Esta temporada promete más acción, estrategias de combate y la evolución de los personajes en un ambiente futurista lleno de riesgos y adrenalina.",
        malLink: "https://myanimelist.net/anime/55994/Sword_Art_Online_Alternative__Gun_Gale_Online_II?q=gun%20gale&cat=anime"
      },
      {
        url: "/OTOÑO-2024/ShangriLaFrontier2.webp",
        title: "Shangri-La Frontier Season 2",
        description: "En la segunda temporada de Shangri-La Frontier, el protagonista, Rin, regresa al mundo virtual de Shangri-La, un juego de realidad virtual que es conocido por sus errores y glitches. En esta nueva entrega, Rin se enfrentará a nuevos y complejos desafíos mientras explora más de los secretos del juego y su relación con otros jugadores.",
        malLink: "https://myanimelist.net/anime/58572/Shangri-La_Frontier__Kusoge_Hunter_Kamige_ni_Idoman_to_su_2nd_Season"
      },
      {
        url: "/OTOÑO-2024/NanatsuNoTaizaiMokushirokuNoYonkishi2.webp",
        title: "Nanatsu no Taizai: Mokushiroku no Yonkishi Season 2",
        description: "La segunda temporada de Nanatsu no Taizai: Mokushiroku no Yonkishi continúa la saga de los Siete Pecados Capitales, quienes se enfrentan a nuevos enemigos y desvelan más secretos sobre su mundo. Esta entrega promete más batallas épicas y un mayor desarrollo de los personajes mientras se profundiza en la historia detrás de los Cuatro Caballeros del Apocalipsis.",
        malLink: "https://myanimelist.net/anime/58511/Nanatsu_no_Taizai__Mokushiroku_no_Yonkishi_2nd_Season?q=Mokushiroku%20no%20Yonkishi&cat=anime"
      }
    ]
  },
  
  {
    id: 2,
    title: "LAS BRUJAS Y SUS ARZOBISPOS",
    category: "RE:ZERO",
    date: "2024-11-1",
    content: "Las brujas y sus arzobispos",
    backgroundImage: "/RE-ZERO/portada-rezero.webp",
    publicationDate: new Date("2024-11-1"),
    imageUrls: [
      {
        url: "/RE-ZERO/PEREZA.webp",
        title: "Pecado De La Pereza (Sekhmet - Petelgeuse Romanee)",
        description:
          "Este poder otorga una fuerza invisible y descomunal que puede ser usada a distancia, y permite que el portador de Pereza manipule a otros como extensiones de sí mismo. Es una fuerza implacable y brutal que se impone sobre la voluntad ajena.",
        malLink:
          "https://myanimelist.net/character/149519/Sekhmet?q=Sekhmet%20&cat=character",
      },
      {
        url: "/RE-ZERO/CODICIA.webp",
        title: "Pecado De La Codicia (Echidna - Regulus Corneas)",
        description:
          "La codicia permite al portador adueñarse de la experiencia o vida de otros, anulando su independencia y dominando cada aspecto de su existencia.",
        malLink:
          "https://myanimelist.net/character/145877/Echidna?q=echidna&cat=character",
      },
      {
        url: "/RE-ZERO/GULA.webp",
        title: "Pecado De La Gula (Daphne - Ley Batenkaitos)",
        description:
          "El portador de Gula tiene la habilidad de devorar la esencia de otros, consumiendo sus recuerdos, identidad y existencia misma.",
        malLink:
          "https://myanimelist.net/character/147409/Daphne?q=Daphne&cat=character",
      },
      {
        url: "/RE-ZERO/LUJURIA.webp",
        title: "Pecado De La Lujuria (Carmilla - Capella Emerada)",
        description:
          "Lujuria otorga el poder de manipular y distorsionar el cuerpo de otros.",
        malLink:
          "https://myanimelist.net/character/149021/Carmilla?q=Carmilla%20luju&cat=character",
      },
      {
        url: "/RE-ZERO/IRA.webp",
        title: "Pecado De La Ira (Minerva - Sirius)",
        description:
          "Ira otorga la habilidad de sanar heridas y restaurar la vitalidad de otros, aunque también puede manifestarse de formas destructivas.",
        malLink:
          "https://myanimelist.net/character/147408/Minerva?q=Minerva&cat=character",
      },
      {
        url: "/RE-ZERO/ENVIDIA.webp",
        title: "Pecado De La Envidia (Satella - ?)",
        description:
          "El poder de la Envidia permite al portador manipular sombras que consumen todo a su paso.",
        malLink:
          "https://myanimelist.net/character/144319/Satella?q=satella&cat=character",
      },
      {
        url: "/RE-ZERO/ORGULLO.webp",
        title: "Pecado Del Orgullo (Typhon - ?)",
        description:
          "Orgullo permite al portador ejercer una influencia total sobre aquellos que considera inferiores.",
        malLink:
          "https://myanimelist.net/character/147407/Typhon?q=Typhon&cat=character",
      },
    ],
  },
  {
    id: 3,
    title: "5 CALAMIDADES DEL CONTINENTE OSCURO",
    category: "HUNTER X HUNTER",
    date: "2024-12-1",
    content: "Las 5 calamidades del continente oscuro",
    backgroundImage: "/HUNTERXHUNTER/portada-hunter.webp",
    publicationDate: new Date("2024-12-1"),
    imageUrls: [
      {
        url: "/HUNTERXHUNTER/calamidad-pap.webp",
        title: "PAP",
        description:
          "Es una bestia carnívora que se alimenta de humanos. Se encuentra en una cadena montañosa en el Continente Oscuro. Su existencia representa una amenaza constante para los viajeros que se adentran en esa región​.",
          malLink: "https://myanimelist.net/manga/26/Hunter_x_Hunter"
      },
      {
        url: "/HUNTERXHUNTER/calamidad-ai.webp",
        title: "AI",
        description: "Una forma de vida gaseosa con apéndices extendidos que parece influir en el comportamiento de otros seres. Promueve conductas autodestructivas, causando que los individuos bajo su influencia actúen de manera peligrosa.",
        malLink: "https://myanimelist.net/manga/26/Hunter_x_Hunter"
      },
      {
        url: "/HUNTERXHUNTER/calamidad-brion.webp",
        title: "BRION",
        description:
          "Un ser misterioso que posee una apariencia humanoide con una enorme esfera como cabeza. Se encuentra en un laberinto dentro de unas antiguas ruinas en el norte del Lago Mobius. Brion es conocido por ser un ser y un arma a la vez​.",
          malLink: "https://myanimelist.net/manga/26/Hunter_x_Hunter"
      },
      {
        url: "/HUNTERXHUNTER/calamidad-hellbell.webp",
        title: "HELLBELL",
        description:
          "Una serpiente peligrosa que habita en los pantanos del sur del Continente Oscuro. Su presencia tiene la capacidad de infectar a las personas con un deseo homicida, convirtiéndola en una amenaza psicológica y física.",
          malLink: "https://myanimelist.net/manga/26/Hunter_x_Hunter"
      },
      {
        url: "/HUNTERXHUNTER/calamidad-zobae.webp",
        title: "ZOBAE",
        description:
          "Conocida como la enfermedad inmortal, Zobae es una enfermedad extremadamente peligrosa que afecta a quienes la contraen, causando que su piel se vuelva oscura y llevando a la muerte a la mayoría de las víctimas. Se encuentra en el sureste del Continente Oscuro.",
          malLink: "https://myanimelist.net/manga/26/Hunter_x_Hunter"
      },
    ],
  },
];
