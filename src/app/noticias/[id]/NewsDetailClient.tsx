"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { newsItems } from "@/lib/newsData"; // Asegúrate de que esta ruta sea correcta
import Link from "next/link";
import {
  collection,
  Timestamp,
  query,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/db/firebaseConfig";

interface Comment {
  id: string;
  comment: string;
  date: Date;
  rating: number;
  userName: string;
}

export default function NewsDetailClient({ id }: { id: number }) {
  const newsItem = newsItems.find((item) => item.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingImage, setLoadingImage] = useState(false); // Estado para cargar imagen
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (!newsItem) return;
    setCurrentIndex(0);
  }, [newsItem]);

  const fetchComments = useCallback(() => {
    const commentsQuery = query(
      collection(db, "comments"),
      where("newsId", "==", id)
    );
    onSnapshot(commentsQuery, (snapshot) => {
      const fetchedComments: Comment[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedComments.push({
          id: doc.id,
          comment: data.comment,
          date:
            data.date instanceof Timestamp
              ? data.date.toDate()
              : new Date(data.date),
          rating: data.rating,
          userName: data.userName,
        });
      });
      setComments(fetchedComments);
    });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchComments();
  }, [fetchComments, id]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsItem!.imageUrls.length - 1 : prevIndex - 1
    );
    setLoadingImage(true); // Inicia la carga de la nueva imagen
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === newsItem!.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
    setLoadingImage(true); // Inicia la carga de la nueva imagen
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "" || userRating === 0 || userName.trim() === "")
      return;

    await addDoc(collection(db, "comments"), {
      comment: newComment,
      date: Timestamp.fromDate(new Date()),
      newsId: id,
      rating: userRating,
      userName: userName,
    });

    setNewComment("");
    setUserRating(0);
    setUserName("");
  };

  if (!newsItem) {
    return <p className="text-center">Noticia no encontrada</p>;
  }

  const totalStars = comments.reduce((acc, comment) => acc + comment.rating, 0);
  const averageStars = comments.length > 0 ? totalStars / comments.length : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 space-y-8">
      {/* Portada de la noticia */}
      <div className="relative w-full h-[400px] mb-4">
        <Image
          src={newsItem.backgroundImage} // Usando la propiedad de la imagen de portada
          alt={newsItem.title}
          fill // Cambiado a fill para ocupar todo el contenedor
          style={{ objectFit: "cover" }} // Aplica el estilo en línea para objectFit
          className="rounded-lg"
          priority
        />
      </div>

      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold mb-2 text-center sm:text-4xl">
          {newsItem.title}
        </h1>
        <div className="flex justify-between w-full max-w-md mb-3">
          <Button
            onClick={handlePrev}
            className="bg-red-500 hover:bg-red-600 text-white flex-1 h-12 mr-2"
          >
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            className="bg-red-500 hover:bg-red-600 text-white flex-1 h-12 ml-2"
          >
            Siguiente
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full max-w-4xl">
        {/* Image section */}
        <div className="relative w-full sm:w-1/2 flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
          {/* Mensaje de carga */}
          {loadingImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
              <span className="text-lg font-bold">Cargando imagen...</span>
            </div>
          )}
          <Image
            key={currentIndex}
            src={newsItem.imageUrls[currentIndex].url}
            alt={
              newsItem.imageUrls[currentIndex].alt ||
              newsItem.imageUrls[currentIndex].description
            }
            width={800} // Especifica el ancho deseado
            height={600} // Especifica la altura deseada
            style={{ objectFit: "contain" }} // Usando style para aplicar objectFit
            className={`rounded-lg transition-opacity duration-500 ${
              loadingImage ? "opacity-0" : "opacity-100"
            }`} // Cambia la opacidad mientras carga
            loading={currentIndex === 0 ? "eager" : "lazy"}
            priority={currentIndex === 0}
            onLoad={() => setLoadingImage(false)} // Finaliza la carga de la imagen
          />
        </div>

        {/* Details section */}
        <Card className="w-full sm:w-1/2 shadow-2xl flex flex-col h-full">
          <CardHeader className="flex flex-col flex-grow">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {newsItem.imageUrls[currentIndex].title}
            </h2>
            <div className="mt-2 flex space-x-2">
              {id === 1 && (
                <div className="bg-red-500 text-white py-1 px-3 rounded">
                  Top {currentIndex + 1}
                </div>
              )}
              {id === 2 && (
                <div className="bg-red-500 text-white py-1 px-3 rounded">
                  {currentIndex + 1}
                </div>
              )}
            </div>
          </CardHeader>

          {/* CardContent that adapts vertically */}
          <CardContent className="flex flex-col flex-grow mt-2">
            <p className="text-sm sm:text-base text-muted-foreground mb-2">
              {newsItem.imageUrls[currentIndex].description}
            </p>
            <Button
              onClick={() =>
                window.open(newsItem.imageUrls[currentIndex].malLink, "_blank")
              }
              className="mt-2"
            >
              Ver en MyAnimeList
            </Button>
          </CardContent>
        </Card>
      </div>
      <span className="text-sm text-gray-500">
        Publicado el: {new Date(newsItem.publicationDate).toLocaleDateString()}
      </span>
      <Link href="/">
        <Button>Volver a las Noticias</Button>
      </Link>
      <div className="mt-3 w-full">
        <h2 className="text-lg font-semibold mb-2">
          Comentarios ({comments.length})
        </h2>
        {comments.length > 0 && (
          <div className="flex items-center mb-4">
            <span className="text-lg font-bold mr-2">Promedio:</span>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={
                  index < averageStars ? "text-yellow-500" : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-lg font-semibold">
              {averageStars.toFixed(1)} / 5
            </span>
          </div>
        )}

        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col space-y-4"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Deja un comentario"
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Tu nombre"
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={
                  star <= userRating
                    ? "text-yellow-500 cursor-pointer"
                    : "text-gray-300 cursor-pointer"
                }
                onClick={() => setUserRating(star)}
              />
            ))}
          </div>
          <Button type="submit">Enviar Comentario</Button>
        </form>

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 my-2 border border-gray-300 rounded-md"
          >
            <h3 className="font-semibold">{comment.userName}</h3>
            <p className="text-sm text-gray-500">
              {new Date(comment.date).toLocaleDateString()}
            </p>
            <p className="mt-2">{comment.comment}</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={
                    index < comment.rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
