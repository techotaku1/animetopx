"use client";

import Image from "next/image";
import Link from "next/link";
import {Suspense, useState, useEffect} from "react";

import {NewsCard} from "@/components/news/news-card";
import {Button} from "@/components/ui/button";
import {carouselData} from "@/lib/carouselData"; // Importar los datos del carrusel
import Loading from "@/loading"; // Ajusta la ruta si es necesario

export default function Home() {
  const portadaItems = carouselData.filter((item) => item.isCover);
  const newsItems = carouselData.filter((item) => !item.isCover);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portadaItems.length); // Ajustar a portadaItems
    }, 5000);
    return () => clearInterval(interval);
  }, [portadaItems.length]);

  return (
    <div className="space-y-8">
      {/* Sección de Portada */}
      <Suspense fallback={<Loading />}>
        <div className="space-y-4">
          {/* Contenedor del carrusel existente */}
          <div className="relative w-full" style={{aspectRatio: "1920/600"}}>
            {portadaItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1920px) 1920px, 100vw"
                  priority={index === 0}
                  quality={85}
                  style={{objectFit: "cover"}} // Ajusta la imagen sin recortar
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {/* Navegación de puntos */}
          <div className="absolute left-1/2 mt-4 flex -translate-x-1/2 transform space-x-3">
            {portadaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-4 w-4 rounded-full ${currentSlide === index ? "bg-red-500" : "bg-black"} disabled={currentSlide === index} transition-all duration-300`}
                aria-label={`Ir a la diapositiva ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </Suspense>

      {/* Sección de Noticias */}
      <section>
        <h1 className="mb-4 text-4xl font-bold">Últimas Noticias de Anime</h1>
        <p className="text-xl text-muted-foreground">
          Mantente al día con las últimas novedades del mundo del anime.
        </p>
      </section>

      <Suspense fallback={<Loading />}>
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </section>
      </Suspense>

      <section className="text-center">
        <Button asChild size="lg">
          <Link href="/noticias">Ver todas las noticias</Link>
        </Button>
      </section>
    </div>
  );
}
