// src/app/noticias/newsData.ts

export interface ImageUrl {
  url: string;
  title: string;
  alt: string;
  description: string;
  malLink?: string; // Añade esta línea
  
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
    date: "2024-10-01",
    content: "Detalles sobre la temporada de otoño 2024",
    backgroundImage: "/OTOÑO-2024/PORTADA2.webp",
    publicationDate: new Date("2024-10-01"),
    imageUrls: [
      {
        url: "/OTOÑO-2024/ReZeroSeason3.webp",
        title: "Re:Zero Season 3",
        description:
          "Tercera temporada de Re:Zero kara Hajimeru Isekai Seikatsu.",
        alt: "Poster de la tercera temporada de Re:Zero, mostrando a los personajes principales en una nueva aventura",
        malLink:
          "https://myanimelist.net/anime/54857/Re_Zero_kara_Hajimeru_Isekai_Seikatsu_3rd_Season"
      },
      {
        url: "/OTOÑO-2024/Dandadan.webp",
        title: "Dandadan",
        description:
          "Después de ser rechazada agresivamente, Momo Ayase se encuentra de mal humor cuando se topa con un niño que está siendo intimidado.",
        alt: "Imagen promocional de Dandadan, mostrando a Momo Ayase y el niño obsesionado con extraterrestres en una situación cómica",
        malLink: "https://myanimelist.net/anime/57334/Dandadan?q=dan&cat=anime",
       
      },
      {
        url: "/OTOÑO-2024/Uzumaki.webp",
        title: "Uzumaki",
        description:
          "En la ciudad de Kurouzu-cho, Kirie Goshima vive una vida bastante normal con su familia...",
        alt: "Imagen promocional de Uzumaki, con Kirie Goshima en un fondo oscuro y espiralado que sugiere terror psicológico",
        malLink:
          "https://myanimelist.net/anime/40333/Uzumaki?q=uzumaki&cat=anime",
       
      },
      {
        url: "/OTOÑO-2024/BlueLock2vsU20Japan.webp",
        title: "BlueLock vs U-20 Japan",
        description: "Segunda temporada de Blue Lock.",
        alt: "Poster promocional de BlueLock vs U-20 Japan, mostrando a los personajes en una intensa competición de fútbol",
        malLink: "https://myanimelist.net/anime/54865/Blue_Lock_vs_U-20_Japan",
       
      },
      {
        url: "/OTOÑO-2024/AoNoHako.webp",
        title: "Ao no Hako",
        description:
          "Taiki Inomata, un estudiante de tercer año de secundaria, asiste a la Academia Eimei...",
        alt: "Imagen promocional de Ao no Hako, mostrando a Taiki Inomata en el gimnasio preparándose para el entrenamiento",
        malLink:
          "https://myanimelist.net/anime/57181/Ao_no_Hako?q=ao%20no%20hako&cat=anime",
        
      },
      {
        url: "/OTOÑO-2024/DanMachiHoujouNoMegamiHenV.webp",
        title: "Danmachi: Houjou no Megami-hen V",
        description:
          "Quinta temporada de Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka.",
        alt: "Poster promocional de Danmachi: Houjou no Megami-hen V, con Bell Cranel y personajes en un escenario de fantasía",
        malLink:
          "https://myanimelist.net/anime/57066/Dungeon_ni_Deai_wo_Motomeru_no_wa_Machigatteiru_Darou_ka_V__Houjou_no_Megami-hen?q=no%20megami%20hen&cat=anime",
        
      },
      {
        url: "/OTOÑO-2024/DragonBallDaima.webp",
        title: "Dragon Ball Daima",
        description: "Nueva serie de Dragon Ball.",
        alt: "Imagen de la serie Dragon Ball Daima, con Goku y personajes clásicos en un nuevo escenario",
        malLink:
          "https://myanimelist.net/anime/56894/Dragon_Ball_Daima?q=dragon%20ball%20daima&cat=anime",
        
      },
      {
        url: "/OTOÑO-2024/SAOGunGaleOnline2.webp",
        title: "SAO: Gun Gale Online II",
        description:
          "Segunda temporada de Sword Art Online Alternative: Gun Gale Online.",
        alt: "Imagen de SAO: Gun Gale Online II, mostrando a los personajes listos para una nueva misión",
        malLink:
          "https://myanimelist.net/anime/55994/Sword_Art_Online_Alternative__Gun_Gale_Online_II?q=gun%20gale&cat=anime",
        
      },
      {
        url: "/OTOÑO-2024/ShangriLaFrontier2.webp",
        title: "Shangri-La Frontier Season 2",
        description: "Segunda temporada de Shangri-La Frontier",
        alt: "Imagen de Shangri-La Frontier Season 2, con el protagonista en un escenario de aventura épica",
        malLink:
          "https://myanimelist.net/anime/58572/Shangri-La_Frontier__Kusoge_Hunter_Kamige_ni_Idoman_to_su_2nd_Season",
       
      },
      {
        url: "/OTOÑO-2024/NanatsuNoTaizaiMokushirokuNoYonkishi2.webp",
        title: "Nanatsu no Taizai: Mokushiroku no Yonkishi Season 2",
        description:
          "Segunda temporada de Nanatsu no Taizai: Mokushiroku no Yonkishi.",
        alt: "Poster de Nanatsu no Taizai: Mokushiroku no Yonkishi Season 2, mostrando a los personajes en una batalla intensa",
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
    backgroundImage: "/RE-ZERO/PORTADA4.webp",
    publicationDate: new Date("2024-11-1"),
    imageUrls: [
      {
        url: "/RE-ZERO/PEREZA.webp",
        title: "Pecado De La Pereza (Sekhmet - Petelgeuse Romanee)",
        description: "Este poder otorga una fuerza invisible y descomunal que puede ser usada a distancia, y permite que el portador de Pereza manipule a otros como extensiones de sí mismo. Es una fuerza implacable y brutal que se impone sobre la voluntad ajena.",
        alt: "Imagen de re:zero, mostrando la bruja de la pereza y su arzobispo.",
        malLink: "https://myanimelist.net/character/149519/Sekhmet?q=Sekhmet%20&cat=character",
       
      },
      {
        url: "/RE-ZERO/CODICIA.webp",
        title: "Pecado De La Codicia (Echidna - Regulus Corneas)",
        description: "La codicia permite al portador adueñarse de la experiencia o vida de otros, anulando su independencia y dominando cada aspecto de su existencia. Este poder convierte a los demás en posesiones de la persona que lo controla, sin capacidad de escapar.",
        alt: "Imagen de re:zero, mostrando la bruja de la codicia y su arzobispo.",
        malLink: "https://myanimelist.net/character/145877/Echidna?q=echidna&cat=character",
        
      },
      {
        url: "/RE-ZERO/GULA.webp",
        title: "Pecado De La Gula (Daphne - Ley Batenkaitos)",
        description:
          "El portador de Gula tiene la habilidad de devorar la esencia de otros, consumiendo sus recuerdos, identidad y existencia misma. Aquellos devorados caen en el olvido absoluto.",
        alt: "Imagen de Re:Zero, mostrando a la Bruja de la Gula y su arzobispo.",
        malLink: "https://myanimelist.net/character/147409/Daphne?q=Daphne&cat=character",
        
      },
      {
        url: "/RE-ZERO/LUJURIA.webp",
        title: "Pecado De La Lujuria (Carmilla - Capella Emerada)",
        description:
          "Lujuria otorga el poder de manipular y distorsionar el cuerpo de otros. Con esta habilidad, el portador puede modificar su apariencia y asumir la forma de otras personas.",
        alt: "Imagen de Re:Zero, mostrando a la Bruja de la Lujuria y su arzobispo.",
        malLink: "https://myanimelist.net/character/149021/Carmilla?q=Carmilla%20luju&cat=character",
        
      },
      {
        url: "/RE-ZERO/IRA.webp",
        title: "Pecado De La Ira (Minerva - Sirius)",
        description:
          "Ira otorga la habilidad de sanar heridas y restaurar la vitalidad de otros, aunque también puede manifestarse de formas destructivas cuando el portador es consumido por una furia desbordante.",
        alt: "Imagen de Re:Zero, mostrando a la Bruja de la Ira y su arzobispo.",
        malLink: "https://myanimelist.net/character/147408/Minerva?q=Minerva&cat=character",
        
      },
      {
        url: "/RE-ZERO/ENVIDIA.webp",
        title: "Pecado De La Envidia (Satella - ?)",
        description:
          "El poder de la Envidia permite al portador manipular sombras que consumen todo a su paso. Es una fuerza destructiva que busca apoderarse de lo que desea, sin dejar rastro.",
        alt: "Imagen de Re:Zero, mostrando a la Bruja de la Envidia.",
        malLink: "https://myanimelist.net/character/144319/Satella?q=satella&cat=character",
       
      },
      {
        url: "/RE-ZERO/ORGULLO.webp",
        title: "Pecado Del Orgullo (Typhon - ?)",
        description:
          "Orgullo permite al portador ejercer una influencia total sobre aquellos que considera inferiores. Este poder incrementa con la autopercepción, siendo tanto un arma como una carga para el portador.",
        alt: "Imagen de Re:Zero, mostrando a la Bruja de Orgullo y su arzobispo.",
        malLink: "https://myanimelist.net/character/147407/Typhon?q=Typhon&cat=character",
       
      }
    ]
  },
];