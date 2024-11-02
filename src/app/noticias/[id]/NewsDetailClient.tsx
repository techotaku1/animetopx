"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { newsItems } from "@/lib/newsData";
import Link from "next/link";
import classNames from "classnames";
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
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");

  // Nuevas variables de estado para la pre-carga de imágenes
  const [isAllImagesLoaded, setIsAllImagesLoaded] = useState(false);
  const [imageLoadProgress, setImageLoadProgress] = useState(0);

  useEffect(() => {
    if (!newsItem) return;
    setCurrentIndex(0);
    setLoading(true);
    setIsAllImagesLoaded(false);
    setImageLoadProgress(0);
  }, [newsItem]);

  // Pre-cargar imágenes y actualizar el progreso
  useEffect(() => {
    if (!newsItem) return;

    const imageUrls = newsItem.imageUrls.map((image) => image.url);
    let loadedImagesCount = 0;

    const handleImageLoad = () => {
      loadedImagesCount += 1;
      const progress = Math.round((loadedImagesCount / imageUrls.length) * 100);
      setImageLoadProgress(progress);

      if (loadedImagesCount === imageUrls.length) {
        setIsAllImagesLoaded(true);
        setLoading(false);
      }
    };

    imageUrls.forEach((url) => {
      const img: HTMLImageElement = new window.Image();
      img.src = url;
      img.onload = handleImageLoad;
      img.onerror = () => {
        console.error(`Error loading image: ${url}`);
        handleImageLoad(); // Consideramos la imagen como cargada en caso de error
      };
    });
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
              : new Date(data.date), // Verifica si es un Timestamp
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
    setLoading(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? newsItem
          ? newsItem.imageUrls.length - 1
          : 0
        : prevIndex - 1
    );
  };

  const handleNext = () => {
    setLoading(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === (newsItem ? newsItem.imageUrls.length - 1 : 0)
        ? 0
        : prevIndex + 1
    );
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

  const imageContainerClasses = classNames(
    "relative w-full h-full transition-opacity duration-300",
    {
      "opacity-0": loading,
      "opacity-100": !loading,
    }
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 space-y-8">
      <div className="relative w-full max-w-[1200px] mx-auto">
        <div className="overflow-x-auto">
          <div className="relative w-[1200px] h-[400px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${newsItem.backgroundImage}')` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-2 text-center sm:text-4xl">
          {newsItem.title}
        </h1>

        <div className="relative flex flex-col items-start w-full max-w-4xl">
          {/* Contenedor de botones "Anterior" y "Siguiente" */}
          <div className="flex justify-between w-full max-w-md mb-3">
            <Button
              onClick={handlePrev}
              variant="secondary"
              className="bg-red-500 hover:bg-red-600 text-white flex-1 h-12 mr-2"
              aria-label="Imagen anterior"
              disabled={!isAllImagesLoaded}
            >
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              variant="secondary"
              className="bg-red-500 hover:bg-red-600 text-white flex-1 h-12 ml-2"
              aria-label="Siguiente imagen"
              disabled={!isAllImagesLoaded}
            >
              Siguiente
            </Button>
          </div>

          {/* Contenedor de imagen y detalles */}
          <div className="flex flex-col sm:flex-row items-start w-full">
            {/* Contenedor de la imagen */}
            <div className="relative flex-shrink-0 w-full max-w-md overflow-hidden sm:mr-4 mb-4 sm:mb-0">
              <div
                className="relative flex items-center justify-center"
              >
                {" "}
                {/* Ajusta la altura aquí */}
                <div className={imageContainerClasses}>
                  <Image
                    src={newsItem.imageUrls[currentIndex].url}
                    alt={
                      newsItem.imageUrls[currentIndex].alt ||
                      newsItem.imageUrls[currentIndex].description
                    }
                    title={newsItem.imageUrls[currentIndex].title}
                    width={800}
                    height={600}
                    className="object-contain rounded-lg"  // Mantiene la imagen dentro del contenedor sin recortar
                    quality={100} // Calidad máxima
                    priority
                    onLoad={() => setLoading(false)}
                  />
                </div>
              </div>
              {!isAllImagesLoaded && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${imageLoadProgress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Sección de Título y Descripción */}
            <div className="flex flex-col justify-start max-w-md">
              <Card className="flex flex-col shadow-2xl transform mb-2">
                <CardHeader className="text-left">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    {newsItem.imageUrls[currentIndex].title}
                  </h2>
                  <div className="flex justify-start mt-2">
                    {id === 2 ? (
                      <span className="bg-red-500 text-white text-xl sm:text-3xl font-bold rounded px-2">
                        {currentIndex + 1}
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white text-xl sm:text-3xl font-bold rounded px-2">
                        TOP {currentIndex + 1}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-0">
                    {newsItem.imageUrls[currentIndex].description}
                  </p>
                  <Button
                    onClick={() =>
                      window.open(
                        newsItem.imageUrls[currentIndex].malLink,
                        "_blank"
                      )
                    }
                    className="mt-2"
                  >
                    Ver en MyAnimeList
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de fecha de publicación integrada con otras secciones */}
      <span className="text-sm text-gray-500 mt-3">
        Publicado el: {new Date(newsItem.date).toLocaleDateString()}
      </span>

      {/* Ajuste del margen inferior dependiendo del ID */}
      <div>
        <Link href="/">
          <Button>Volver a las Noticias</Button>
        </Link>
      </div>

      {/* Sección de comentarios */}
      <div className="mt-3 w-full">
        <h2 className="text-lg font-semibold mb-2">
          Comentarios ({comments.length})
        </h2>

        {/* Promedio de estrellas */}
        {comments.length > 0 && (
          <div className="flex items-center mb-4">
            <span className="text-lg font-bold mr-2">Promedio:</span>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={classNames("w-6 h-6", {
                  "text-yellow-500": index < averageStars,
                  "text-gray-300": index >= averageStars,
                })}
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
                className={classNames("w-6 h-6 cursor-pointer", {
                  "text-yellow-500": star <= userRating,
                  "text-gray-300": star > userRating,
                })}
                onClick={() => setUserRating(star)}
              />
            ))}
          </div>
          <Button type="submit" className="mt-2">
            Enviar Comentario
          </Button>
        </form>

        {/* Listado de comentarios */}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 my-2 border border-gray-300 rounded-md"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{comment.userName}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(comment.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="mt-2">{comment.comment}</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={classNames("w-6 h-6", {
                    "text-yellow-500": index < comment.rating,
                    "text-gray-300": index >= comment.rating,
                  })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
