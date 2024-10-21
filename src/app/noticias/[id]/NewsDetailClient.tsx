"use client"; // Asegúrate de que esto esté presente

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
      <div
        className="relative w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url('${newsItem.backgroundImage}')` }}
      >
      </div>

      {/* Aquí cambiamos la disposición del título y la descripción */}
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center sm:text-4xl">
          {newsItem.title}
        </h1>

        <div className="flex flex-col sm:flex-row w-full">
          {/* Card para la imagen */}
          <div className="relative flex-shrink-0 w-full max-w-md aspect-[2/3] overflow-hidden sm:mr-4">
            <Image
              src={newsItem.imageUrls[currentIndex].url}
              alt={newsItem.imageUrls[currentIndex].title}
              fill
              className="rounded-lg border-4 border-gray-300"
              quality={100}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
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

          {/* Card para el texto al lado derecho de la imagen */}
          <div className="flex flex-col ml-0 sm:ml-4">
            <Card className="flex flex-col shadow-2xl transform translate-y-2">
              <CardHeader className="text-left">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {newsItem.imageUrls[currentIndex].title}
                </h2>
                <div className="flex justify-start mt-4">
                  <span className="bg-red-500 text-white text-xl sm:text-3xl font-bold rounded px-2">
                    TOP {currentIndex + 1}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {newsItem.imageUrls[currentIndex].description}
                </p>
                {/* Botón para enlazar a MyAnimeList específico para cada imagen */}
                <Button
                  onClick={() => window.open(newsItem.imageUrls[currentIndex].malLink, "_blank")}
                  className="mt-4"
                >
                  Ver en MyAnimeList
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <p className="text-base sm:text-lg mb-4 text-center">
        {newsItem.content}
      </p>
      <p className="text-xs sm:text-sm text-muted-foreground">
        Categoría: {newsItem.category}
      </p>
      <p className="text-xs sm:text-sm text-muted-foreground">
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
