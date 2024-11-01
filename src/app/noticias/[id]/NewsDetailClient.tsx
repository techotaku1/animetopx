"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
  deleteDoc,
  doc,
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

  const handleDeleteComment = async (commentId: string) => {
    const commentRef = doc(db, "comments", commentId);
    await deleteDoc(commentRef);
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
        <h1 className="text-3xl font-bold mb-4 text-center sm:text-4xl">
          {newsItem.title}
        </h1>

        <div className="flex flex-col sm:flex-row w-full">
          <div className="relative flex-shrink-0 w-full max-w-md aspect-[2/3] overflow-hidden sm:mr-4">
            <div className="relative flex-shrink-0 w-full max-w-md aspect-[2/3] overflow-hidden sm:mr-4">
              <div className={imageContainerClasses}>
                <Image
                  src={newsItem.imageUrls[currentIndex].url}
                  alt={
                    newsItem.imageUrls[currentIndex].alt ||
                    newsItem.imageUrls[currentIndex].description
                  }
                  title={newsItem.imageUrls[currentIndex].title}
                  fill
                  className="object-contain"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  onLoad={() => setLoading(false)} // Cambia onLoadingComplete por onLoad
                />
              </div>
            </div>
            {/* Barra de progreso */}
            {!isAllImagesLoaded && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${imageLoadProgress}%` }}
                />
              </div>
            )}
            <div className="absolute inset-0 flex justify-between items-center">
              <Button
                onClick={handlePrev}
                variant="secondary"
                size="icon"
                className="rounded-full"
                aria-label="Imagen anterior"
                disabled={!isAllImagesLoaded}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                onClick={handleNext}
                variant="secondary"
                size="icon"
                className="rounded-full"
                aria-label="Siguiente imagen"
                disabled={!isAllImagesLoaded}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col ml-0 sm:ml-4 mb-4">
            <Card className="flex flex-col shadow-2xl transform translate-y-2">
              <CardHeader className="text-left">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {newsItem.imageUrls[currentIndex].title}
                </h2>
                <div className="flex justify-start mt-4">
                  {id === 2 ? (
                    // Solo el número sin "Top" para la noticia con ID 2
                    <span className="bg-red-500 text-white text-xl sm:text-3xl font-bold rounded px-2">
                      {currentIndex + 1} {/* Solo el número */}
                    </span>
                  ) : (
                    // Muestra "TOP" para otras noticias
                    <span className="bg-red-500 text-white text-xl sm:text-3xl font-bold rounded px-2">
                      TOP {currentIndex + 1}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {newsItem.imageUrls[currentIndex].description}
                </p>
                <Button
                  onClick={() =>
                    window.open(
                      newsItem.imageUrls[currentIndex].malLink,
                      "_blank"
                    )
                  }
                  className="mt-4"
                >
                  Ver en MyAnimeList
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fecha de publicación */}
        <span className="text-sm text-gray-500 mb-2">
          Publicado el: {new Date(newsItem.date).toLocaleDateString()}
        </span>

        {/* Botón "Volver a las Noticias" */}
        <Link href="/" className="mt-4">
          <Button>Volver a las Noticias</Button>
        </Link>

        {/* Sección de comentarios */}
        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold mb-2">
            Comentarios ({comments.length}){" "}
            {/* Añadido el conteo de comentarios */}
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
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Eliminar
                </Button>
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
    </div>
  );
}