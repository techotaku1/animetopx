"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";

// Define los tipos para las imágenes del carrusel
interface ImageUrl {
  url: string;
  title: string;
  description: string;
}

// Define los tipos para el item de noticias
interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrls: ImageUrl[];
  date: string;
  content: string;
}

const newsItems: NewsItem[] = [
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

// Componente para el Carrusel de Imágenes
interface ImageCarouselProps {
  imageUrls: ImageUrl[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls, currentIndex, onPrev, onNext }) => {
  const currentImage = imageUrls[currentIndex];

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={currentImage.url}
          alt={currentImage.title}
          fill
          className="rounded-lg"
          quality={85}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="absolute inset-0 flex justify-between items-center">
        <Button
          onClick={onPrev}
          variant="secondary"
          size="icon"
          className="rounded-full"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          onClick={onNext}
          variant="secondary"
          size="icon"
          className="rounded-full"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

// Componente principal para la página de detalles de noticias
export default function NewsDetail() {
  const { id } = useParams();
  const newsItem = newsItems.find((item) => item.id === parseInt(id as string));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsItem!.imageUrls.length - 1 : prevIndex - 1
    );
  }, [newsItem]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === newsItem!.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  }, [newsItem]);

  if (!newsItem) {
    return <p className="text-center">Noticia no encontrada</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 space-y-8">
      <h1 className="text-4xl font-bold mb-4 text-center">{newsItem.title}</h1>
      <div className="w-full max-w-md">
        <Card className="flex flex-col shadow-2xl transform translate-y-2">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-semibold">{newsItem.imageUrls[currentIndex].title}</h2>
            <div className="flex justify-center mt-4">
              <span className="bg-red-500 text-white text-3xl font-bold rounded px-2">
                TOP {currentIndex + 1}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <ImageCarousel 
              imageUrls={newsItem.imageUrls} 
              currentIndex={currentIndex} 
              onPrev={handlePrev} 
              onNext={handleNext} 
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-left">
            <p className="text-sm text-muted-foreground">
              {newsItem.imageUrls[currentIndex].description}
            </p>
          </CardFooter>
        </Card>
      </div>

      <p className="text-lg mb-4 text-center">{newsItem.content}</p>
      <p className="text-sm text-muted-foreground">
        Categoría: {newsItem.category}
      </p>
      <p className="text-sm text-muted-foreground">
        Fecha:{" "}
        {new Date(newsItem.date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <Button onClick={() => window.history.back()} className="mt-4">
        Volver a noticias
      </Button>
    </div>
  );
}
