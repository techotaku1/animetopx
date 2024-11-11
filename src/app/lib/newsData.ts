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
        description:
          "Tercera temporada de Re:Zero kara Hajimeru Isekai Seikatsu.",
        malLink:
          "https://myanimelist.net/anime/54857/Re_Zero_kara_Hajimeru_Isekai_Seikatsu_3rd_Season",
      },
      {
        url: "/OTOÑO-2024/Dandadan.webp",
        title: "Dandadan",
        description:
          "Después de ser rechazada agresivamente, Momo Ayase se encuentra de mal humor cuando se topa con un niño que está siendo intimidado.",
        malLink: "https://myanimelist.net/anime/57334/Dandadan?q=dan&cat=anime",
      },
      {
        url: "/OTOÑO-2024/Uzumaki.webp",
        title: "Uzumaki",
        description:
          "En la ciudad de Kurouzu-cho, Kirie Goshima vive una vida bastante normal con su familia...",
        malLink:
          "https://myanimelist.net/anime/40333/Uzumaki?q=uzumaki&cat=anime",
      },
      {
        url: "/OTOÑO-2024/BlueLock2vsU20Japan.webp",
        title: "BlueLock vs U-20 Japan",
        description: "Segunda temporada de Blue Lock.",
        malLink: "https://myanimelist.net/anime/54865/Blue_Lock_vs_U-20_Japan",
      },
      {
        url: "/OTOÑO-2024/AoNoHako.webp",
        title: "Ao no Hako",
        description:
          "Taiki Inomata, un estudiante de tercer año de secundaria, asiste a la Academia Eimei...",
        malLink:
          "https://myanimelist.net/anime/57181/Ao_no_Hako?q=ao%20no%20hako&cat=anime",
      },
      {
        url: "/OTOÑO-2024/DanMachiHoujouNoMegamiHenV.webp",
        title: "Danmachi: Houjou no Megami-hen V",
        description:
          "Quinta temporada de Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka.",
        malLink:
          "https://myanimelist.net/anime/57066/Dungeon_ni_Deai_wo_Motomeru_no_wa_Machigatteiru_Darou_ka_V__Houjou_no_Megami-hen?q=no%20megami%20hen&cat=anime",
      },
      {
        url: "/OTOÑO-2024/DragonBallDaima.webp",
        title: "Dragon Ball Daima",
        description: "Nueva serie de Dragon Ball.",
        malLink:
          "https://myanimelist.net/anime/56894/Dragon_Ball_Daima?q=dragon%20ball%20daima&cat=anime",
      },
      {
        url: "/OTOÑO-2024/SAOGunGaleOnline2.webp",
        title: "SAO: Gun Gale Online II",
        description:
          "Segunda temporada de Sword Art Online Alternative: Gun Gale Online.",
        malLink:
          "https://myanimelist.net/anime/55994/Sword_Art_Online_Alternative__Gun_Gale_Online_II?q=gun%20gale&cat=anime",
      },
      {
        url: "/OTOÑO-2024/ShangriLaFrontier2.webp",
        title: "Shangri-La Frontier Season 2",
        description: "Segunda temporada de Shangri-La Frontier",
        malLink:
          "https://myanimelist.net/anime/58572/Shangri-La_Frontier__Kusoge_Hunter_Kamige_ni_Idoman_to_su_2nd_Season",
      },
      {
        url: "/OTOÑO-2024/NanatsuNoTaizaiMokushirokuNoYonkishi2.webp",
        title: "Nanatsu no Taizai: Mokushiroku no Yonkishi Season 2",
        description:
          "Segunda temporada de Nanatsu no Taizai: Mokushiroku no Yonkishi.",
        malLink:
          "https://myanimelist.net/anime/58511/Nanatsu_no_Taizai__Mokushiroku_no_Yonkishi_2nd_Season?q=Mokushiroku%20no%20Yonkishi&cat=anime",
      },
    ],
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
      },
      {
        url: "/HUNTERXHUNTER/calamidad-ai.webp",
        title: "AI",
        description: "Una forma de vida gaseosa con apéndices extendidos que parece influir en el comportamiento de otros seres. Promueve conductas autodestructivas, causando que los individuos bajo su influencia actúen de manera peligrosa.",
      },
      {
        url: "/HUNTERXHUNTER/calamidad-brion.webp",
        title: "BRION",
        description:
          "Un ser misterioso que posee una apariencia humanoide con una enorme esfera como cabeza. Se encuentra en un laberinto dentro de unas antiguas ruinas en el norte del Lago Mobius. Brion es conocido por ser un ser y un arma a la vez​.",
      },
      {
        url: "/HUNTERXHUNTER/calamidad-hellbell.webp",
        title: "HELLBELL",
        description:
          "Una serpiente peligrosa que habita en los pantanos del sur del Continente Oscuro. Su presencia tiene la capacidad de infectar a las personas con un deseo homicida, convirtiéndola en una amenaza psicológica y física.",
      },
      {
        url: "/HUNTERXHUNTER/calamidad-zobae.webp",
        title: "ZOBAE",
        description:
          "Conocida como la enfermedad inmortal, Zobae es una enfermedad extremadamente peligrosa que afecta a quienes la contraen, causando que su piel se vuelva oscura y llevando a la muerte a la mayoría de las víctimas. Se encuentra en el sureste del Continente Oscuro.",
      },
    ],
  },
];
