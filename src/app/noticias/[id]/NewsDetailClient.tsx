"use client"; // Asegúrate de que esto esté presente

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { newsItems } from "../newsData"; // Importa los datos aquí
import classNames from "classnames"; // Importa classNames para manejar clases condicionales
import { collection,  query, where, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/db/firebaseConfig"; // Importa tu configuración de Firebase
import { Star } from "lucide-react"; // Importa el icono de estrella

// Definimos la interfaz para los comentarios
interface Comment {
  comment: string;
  date: Date;
  rating: number; // Añadir la calificación al comentario
}

export default function NewsDetailClient({ id }: { id: number }) {
  const newsItem = newsItems.find((item) => item.id === id); // Encuentra el item basado en el ID

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>(""); // Estado para el nuevo comentario
  const [userRating, setUserRating] = useState<number>(0); // Estado para la calificación del usuario

  useEffect(() => {
    if (!newsItem) return;
    setCurrentIndex(0);
    setLoading(true);
  }, [newsItem]);

  useEffect(() => {
    if (!newsItem) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, newsItem]);

  // Función para recuperar comentarios y calificaciones desde Firestore
  const fetchCommentsAndRating = useCallback(() => {
    const commentsQuery = query(collection(db, "comments"), where("newsId", "==", id));
    onSnapshot(commentsQuery, (snapshot) => {
      const fetchedComments: Comment[] = [];
      let totalRating = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedComments.push({
          comment: data.comment,
          date: data.date.toDate(),
          rating: data.rating,
        });
        totalRating += data.rating; // Sumar las calificaciones
      });

      setComments(fetchedComments);
      const averageRating = fetchedComments.length > 0 ? totalRating / fetchedComments.length : 0;
      setRating(averageRating);
    });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchCommentsAndRating();
  }, [fetchCommentsAndRating, id]);

  const handlePrev = () => {
    setLoading(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (newsItem ? newsItem.imageUrls.length - 1 : 0) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setLoading(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === (newsItem ? newsItem.imageUrls.length - 1 : 0) ? 0 : prevIndex + 1
    );
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "" || userRating === 0) return;

    // Agregar el comentario y la calificación a Firebase
    await addDoc(collection(db, "comments"), {
      comment: newComment,
      date: new Date(),
      newsId: id,
      rating: userRating,
    });

    // Limpiar los campos
    setNewComment("");
    setUserRating(0); // Reiniciar la calificación del usuario
  };

  if (!newsItem) {
    return <p className="text-center">Noticia no encontrada</p>;
  }

  const imageContainerClasses = classNames(
    "relative w-full h-full transition-opacity duration-300",
    {
      "opacity-0": loading,
      "opacity-100": !loading,
    }
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 space-y-8">
      <div
        className="relative w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url('${newsItem.backgroundImage}')` }}
      ></div>

      <div className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center sm:text-4xl">
          {newsItem.title}
        </h1>

        <div className="flex flex-col sm:flex-row w-full">
          <div className="relative flex-shrink-0 w-full max-w-md aspect-[2/3] overflow-hidden sm:mr-4">
            <div className={imageContainerClasses}>
              <Image
                src={newsItem.imageUrls[currentIndex].url}
                alt={newsItem.imageUrls[currentIndex].title}
                fill
                className="rounded-lg border-4 border-gray-300"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onLoadingComplete={() => setLoading(false)}
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
                <Button
                  onClick={() =>
                    window.open(newsItem.imageUrls[currentIndex].malLink, "_blank")
                  }
                  className="mt-4"
                >
                  Ver en MyAnimeList
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <p className="text-base sm:text-lg mb-4 text-center">{newsItem.content}</p>
      <p className="text-xs sm:text-sm text-muted-foreground">Categoría: {newsItem.category}</p>
      <p className="text-xs sm:text-sm text-muted-foreground">
        Fecha:{" "}
        {new Date(newsItem.date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="flex flex-col items-center mb-4">
        <h3 className="text-xl font-semibold">Calificación promedio</h3>
        <p className="text-2xl font-bold">{rating.toFixed(1)} / 5</p>
      </div>

      {/* Sección de comentarios */}
      <div className="flex flex-col items-center w-full max-w-4xl space-y-4">
        <h3 className="text-xl font-semibold">Comentarios</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="p-4 border-b border-gray-300 w-full">
              <p className="text-base">{comment.comment}</p>
              <p className="text-xs text-gray-500">Calificación: {comment.rating} ⭐</p>
              <p className="text-xs text-gray-500">
                {new Date(comment.date).toLocaleString("es-ES")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay comentarios aún.</p>
        )}

        <h3 className="text-xl font-semibold">Deja tu comentario</h3>
        <form onSubmit={handleCommentSubmit} className="flex flex-col w-full">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            className="border rounded-lg p-2 mb-2"
            rows={3}
            required
          />
          <div className="flex items-center mb-2">
            <span className="mr-2">Calificación:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  userRating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setUserRating(star)}
              />
            ))}
          </div>
          <Button type="submit">Enviar</Button>
        </form>
      </div>

      <Button onClick={() => window.history.back()} className="mt-4">
        Volver a noticias
      </Button>
    </div>
  );
}
