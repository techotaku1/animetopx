import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NewsCard } from "@/components/news/news-card";
import Image from "next/image";

// Simulación de datos de noticias
const newsItems = [
  {
    id: 3,
    title: "EL CONTINENTE OSCURO Y SUS 5 CALAMIDADES DE HUNTER X HUNTER",
    description:
      "Descubre las 5 calamidades del continente oscuro de HUNTER X HUNTER y lo que hace cada una de ellas.",
    category: "Curiosidades",
    imageUrl: "/HUNTERXHUNTER/portada-6.webp",
    date: "8 noviembre 2024",
  },
  {
    id: 2,
    title: "BRUJAS Y ARZOBISPOS EN RE:ZERO",
    description:
      "Lista REAL de los arzobispos del pecado en Re:Zero, y sus respectivas brujas.",
    category: "Curiosidades",
    imageUrl: "/RE-ZERO/COLLAGE3.webp",
    date: "1 noviembre 2024",
  },
  {
    id: 1,
    title: "TOP ANIME OTOÑO 2024",
    description: "Top estrenos de la temporada de OTOÑO 2024",
    category: "Otoño",
    imageUrl: "/OTOÑO-2024/COLLAGE.webp",
    date: "octubre 2024",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Banner de publicidad */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
        <Image
          src="/OTOÑO-2024/PORTADA1.webp"
          alt="Banner publicitario"
          fill // Esto hace que la imagen llene el contenedor
          style={{ objectFit: "cover" }} // 'cover' asegura que la imagen llene el contenedor sin recortar
          priority
        />
      </div>
      <section>
        <h1 className="text-4xl font-bold mb-4">Últimas Noticias de Anime</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Mantente al día con las últimas novedades del mundo del anime.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </section>
      <section className="text-center">
        <Button asChild size="lg">
          <Link href="/noticias">Ver todas las noticias</Link>
        </Button>
      </section>
    </div>
  );
}
