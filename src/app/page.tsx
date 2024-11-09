// pages/page.tsx

"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NewsCard } from "@/components/news/news-card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { carouselData } from "@/lib/carouselData";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cambia de slide automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Portada Principal con Carousel */}
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
        {carouselData.map((item, index) => (
          <Link href={`/noticias/${item.id}`} key={item.id}>
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
                priority={index === currentSlide}
              />
              
            </div>
          </Link>
        ))}
        {/* Navegación de puntos */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Sección de noticias */}
      <section>
        <h1 className="text-4xl font-bold mb-4">Últimas Noticias de Anime</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Mantente al día con las últimas novedades del mundo del anime.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {carouselData.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </section>

      {/* Botón para ver todas las noticias */}
      <section className="text-center">
        <Button asChild size="lg">
          <Link href="/noticias">Ver todas las noticias</Link>
        </Button>
      </section>
    </div>
  );
}
