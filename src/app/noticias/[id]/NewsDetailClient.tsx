// src/app/noticias/[id]/NewsDetailClient.tsx
"use client"; // Asegúrate de que esto esté presente

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { newsItems } from "../newsData"; // Importa los datos aquí

export default function NewsDetailClient({ id }: { id: number }) {
  const newsItem = newsItems.find((item) => item.id === id); // Encuentra el item basado en el ID

  const [currentIndex, setCurrentIndex] = useState(0); // Inicializa el estado aquí

  useEffect(() => {
    if (!newsItem) return; // Asegúrate de que existe newsItem
    setCurrentIndex(0); // Resetea el índice al cargar un nuevo item
  }, [newsItem]);

  if (!newsItem) {
    return <p className="text-center">Noticia no encontrada</p>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsItem.imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === newsItem.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

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
            <div className="relative flex flex-col items-center">
              <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
                <Image
                  src={newsItem.imageUrls[currentIndex].url}
                  alt={newsItem.imageUrls[currentIndex].title}
                  fill
                  className="rounded-lg"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 flex justify-between items-center">
                <Button
                  onClick={handlePrev}
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  onClick={handleNext}
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>
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
