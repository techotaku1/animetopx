import {Home, Newspaper} from "lucide-react";
import Link from "next/link";

import {NewsCard} from "@/components/news/news-card";
import {Breadcrumbs} from "@/components/ui/breadcrumbs";
import {Button} from "@/components/ui/button";

// Simulación de datos de noticias
const newsItems = [
  {
    id: 3,
    title: "EL CONTINENTE OSCURO Y SUS 5 CALAMIDADES DE HUNTER X HUNTER",
    description:
      "Descubre las 5 calamidades del continente oscuro de HUNTER X HUNTER y lo que hace cada una de ellas.",
    category: "Curiosidades",
    imageUrl: "/HUNTERXHUNTER/coverhunter.webp",
    date: "8 noviembre 2024",
  },
  {
    id: 2,
    title: "RE:ZERO BRUJAS Y ARZOBISPOS",
    description: "Lista REAL de los arzobispos del pecado en Re:Zero, y sus respectivas brujas.",
    category: "Curiosidades",
    imageUrl: "/RE-ZERO/coverrezero.webp",
    date: "1 noviembre 2024",
  },
  {
    id: 1,
    title: "TOP ANIME OTOÑO 2024",
    description: "Top estrenos de la temporada de OTOÑO 2024",
    category: "Otoño",
    imageUrl: "/OTOÑO-2024/coverotoño.webp",
    date: "octubre 2024",
  },
  // Puedes agregar más noticias aquí
];

export default function NoticiasPage(): JSX.Element {
  // Definición de los breadcrumbs
  const breadcrumbItems = [
    {href: "/", label: "Inicio", icon: Home},
    {href: "/noticias", label: "Noticias", icon: Newspaper},
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <section>
        <h1 className="mb-4 text-4xl font-bold">Todas las Noticias de Anime</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Aquí encontrarás todas las noticias relacionadas con el mundo del anime.
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
