// src/app/noticias/newsData.ts

export interface ImageUrl {
    url: string;
    title: string;
    description: string;
  }
  
  export interface NewsItem {
    id: number;
    title: string;
    description: string;
    category: string;
    imageUrls: ImageUrl[];
    date: string;
    content: string;
  }
  
  // Datos de ejemplo
  export const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "TEMPORADA OTOÑO 2024",
      description: "La sexta temporada del popular anime llegará este otoño",
      category: "TOP Estrenos de Otoño 2024",
      imageUrls: [
        {
          url: "/OTOÑO-2024/ReZeroSeason3.webp",
          title: "Re:Zero Season 3",
          description: "Póster oficial de la sexta temporada",
        },
        {
          url: "/OTOÑO-2024/Dandadan.webp",
          title: "Dandadan",
          description: "Escena clave de la nueva temporada",
        },
        {
          url: "/OTOÑO-2024/Uzumaki.webp",
          title: "Uzumaki",
          description: "Personajes principales de la sexta temporada",
        },
      ],
      date: "2024-10-1",
      content: "Detalles sobre la temporada de otoño 2024",
    },
  ];
  