// src/app/noticias/newsData.ts

export interface ImageUrl {
  url: string;
  title: string;
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
  backgroundImage?: string;
}

// Datos de ejemplo
export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "TEMPORADA OTOÑO 2024",
    category: "Estrenos Otoño 2024",
    date: "2024-10-1",
    content: "Detalles sobre la temporada de otoño 2024",
    backgroundImage: "/OTOÑO-2024/PORTADA2.webp",
    imageUrls: [
      {
        url: "/OTOÑO-2024/ReZeroSeason3.webp",
        title: "Re:Zero Season 3",
        description:
          "Tercera temporada de Re:Zero kara Hajimeru Isekai Seikatsu.",
        malLink: "https://myanimelist.net/anime/54857/Re_Zero_kara_Hajimeru_Isekai_Seikatsu_3rd_Season", // Enlace específico para el perfil
      },
      {
        url: "/OTOÑO-2024/Dandadan.webp",
        title: "Dandadan",
        description:
          "Después de ser rechazada agresivamente, Momo Ayase se encuentra de mal humor cuando se topa con un niño que está siendo intimidado. Salvado por su imprudente amabilidad, el niño obsesionado con los extraterrestres intenta hablar con ella sobre los intereses extraterrestres que cree que comparten.",
          malLink: "https://myanimelist.net/anime/57334/Dandadan?q=dan&cat=anime", // Enlace específico para el perfil

      },
      {
        url: "/OTOÑO-2024/Uzumaki.webp",
        title: "Uzumaki",
        description:
          "En la ciudad de Kurouzu-cho, Kirie Goshima vive una vida bastante normal con su familia. Un día, mientras camina hacia la estación de tren para encontrarse con su novio, Shuuichi Saito, ve a su padre mirando fijamente una concha de caracol en un callejón. Sin pensarlo dos veces, le menciona el incidente a Shuuichi, quien le dice que su padre ha estado actuando de forma extraña últimamente. Shuuichi revela su creciente deseo de irse de la ciudad con Kirie, diciendo que la ciudad está infectada con espirales.",
          malLink: "https://myanimelist.net/anime/40333/Uzumaki?q=uzumaki&cat=anime"
      },
      {
        url: "/OTOÑO-2024/BlueLock2vsU20Japan.webp",
        title: "BlueLock vs U-20 Japan",
        description: "Segunda temporada de Blue Lock.",
        malLink: "https://myanimelist.net/anime/54865/Blue_Lock_vs_U-20_Japan"
      },
      {
        url: "/OTOÑO-2024/AoNoHako.webp",
        title: "Ao no Hako",
        description:
          "Taiki Inomata, un estudiante de tercer año de secundaria, asiste a la Academia Eimei, una escuela integrada con un importante programa deportivo. Tras unirse al equipo de bádminton de la escuela secundaria, Taiki intenta asistir a los entrenamientos abiertos lo antes posible. Pero no importa lo temprano que vaya, siempre llega segundo en el gimnasio.",
          malLink: "https://myanimelist.net/anime/57181/Ao_no_Hako?q=ao%20no%20hako&cat=anime"
      },
      {
        url: "/OTOÑO-2024/DanMachiHoujouNoMegamiHenV.webp",
        title: "Danmachi: Houjou no Megami-hen V",
        description:
          "Quinta temporada de Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka.",
          malLink: "https://myanimelist.net/anime/57066/Dungeon_ni_Deai_wo_Motomeru_no_wa_Machigatteiru_Darou_ka_V__Houjou_no_Megami-hen?q=no%20megami%20hen&cat=anime"
      },
      {
        url: "/OTOÑO-2024/DragonBallDaima.webp",
        title: "Dragon Ball Daima",
        description: "Nueva serie de Dragon Ball.",
        malLink: "https://myanimelist.net/anime/56894/Dragon_Ball_Daima?q=dragon%20ball%20daima&cat=anime"
      },
      {
        url: "/OTOÑO-2024/SAOGunGaleOnline2.webp",
        title: "SAO: Gun Gale Online II",
        description:
          "Segunda temporada de Sword Art Online Alternative: Gun Gale Online.",
          malLink: "https://myanimelist.net/anime/55994/Sword_Art_Online_Alternative__Gun_Gale_Online_II?q=gun%20gale&cat=anime"
      },
      {
        url: "/OTOÑO-2024/ShangriLaFrontier2.webp",
        title: "Shangri-La Frontier Season 2",
        description: "Segunda temporada de Shangri-La Frontier",
        malLink: "https://myanimelist.net/anime/58572/Shangri-La_Frontier__Kusoge_Hunter_Kamige_ni_Idoman_to_su_2nd_Season"
      },
      {
        url: "/OTOÑO-2024/NanatsuNoTaizaiMokushirokuNoYonkishi2.webp",
        title: "Nanatsu no Taizai: Mokushiroku no Yonkishi Season 2",
        description:
          "Segunda temporada de Nanatsu no Taizai: Mokushiroku no Yonkishi.",
          malLink: "https://myanimelist.net/anime/58511/Nanatsu_no_Taizai__Mokushiroku_no_Yonkishi_2nd_Season?q=Mokushiroku%20no%20Yonkishi&cat=anime"
      },
    ],
  },
];
