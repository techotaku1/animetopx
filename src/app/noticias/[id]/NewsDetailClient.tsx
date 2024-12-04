//noticias/[id]/NewsDetailClient.tsx
"use client";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, {useEffect, useState, useCallback} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Star, ChevronLeft, ChevronRight} from "lucide-react";
import {newsItems} from "@/lib/newsData";
import Link from "next/link";
import {getDocs, addDoc, query, collection, where, Timestamp} from "firebase/firestore";
import {db} from "@/db/firebaseConfig";

interface Comment {
  id: string;
  comment: string;
  date: Date;
  rating: number;
  userName: string;
}

export default function NewsDetailClient({id}: {id: number}) {
  const newsItem = newsItems.find((item) => item.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true); // Nuevo estado de carga

  useEffect(() => {
    if (!newsItem) return;
    setCurrentIndex(0);
    setIsLoading(false); // Asegúrate de desactivar la carga inicial
  }, [newsItem]);

  const fetchComments = useCallback(async () => {
    const commentsQuery = query(collection(db, "comments"), where("newsId", "==", id));
    const snapshot = await getDocs(commentsQuery); // Usamos getDocs para obtener datos de manera sincrónica
    const fetchedComments: Comment[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      fetchedComments.push({
        id: doc.id,
        comment: data.comment,
        date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
        rating: data.rating,
        userName: data.userName,
      });
    });
    setComments(fetchedComments);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchComments();
  }, [fetchComments, id]);

  const handlePrev = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev < newsItem!.imageUrls.length - 1 ? prev + 1 : prev));
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === "" || userRating === 0 || userName.trim() === "") return;

    // Crear el nuevo comentario para agregarlo optimistamente
    const newCommentData = {
      id: Math.random().toString(), // Generamos un ID único temporal
      comment: newComment,
      date: new Date(),
      rating: userRating,
      userName: userName,
    };

    // Actualizamos el estado de los comentarios con el nuevo comentario (optimistamente)
    setComments((prevComments) => [newCommentData, ...prevComments]);

    // Limpiamos los campos de entrada
    setNewComment("");
    setUserRating(0);
    setUserName("");

    // Enviar el comentario a Firebase
    await addDoc(collection(db, "comments"), {
      comment: newComment,
      date: Timestamp.fromDate(new Date()),
      newsId: id,
      rating: userRating,
      userName: userName,
    });

    // Recargamos los comentarios de Firebase después de agregar el nuevo
    fetchComments();

    // Mostrar la notificación de éxito
    toast.success("Comentario agregado con éxito!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };
  if (!newsItem) return <p className="text-center">Noticia no encontrada</p>;

  const totalStars = comments.reduce((acc, comment) => acc + comment.rating, 0);
  const averageStars = comments.length > 0 ? totalStars / comments.length : 0;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center space-y-8 px-4 py-4">
      {/* Portada de la noticia */}
      <div className="relative mb-4 w-full overflow-hidden" style={{aspectRatio: "1920/600"}}>
        <Image
          src={newsItem.backgroundImage}
          alt={newsItem.title}
          fill
          sizes="(min-width: 1920px) 1920px, 100vw"
          priority
          style={{objectFit: "cover"}}
          className="rounded-lg"
        />
      </div>

      <h1 className="mb-6 text-center text-3xl font-bold sm:text-4xl">{newsItem.title}</h1>

      {/* Carousel and Image details */}
      <div className="mb-8 flex w-full max-w-6xl flex-col lg:flex-row lg:items-start lg:space-x-8">
        {/* Carousel */}
        <div className="relative mb-8 w-full lg:mb-0 lg:w-1/2">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{transform: `translateX(-${currentIndex * 100}%)`}}
            >
              {newsItem.imageUrls.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-full flex-shrink-0 ${
                    newsItem.id === 1
                      ? "aspect-[9/16] h-auto rounded-lg border border-gray-300 sm:aspect-[2/3] sm:h-[60vh] md:aspect-[9/16] lg:aspect-[9/16] lg:h-[80vh]" // Se agregó 'rounded-lg' al contenedor
                      : "aspect-square rounded-lg border border-gray-300" // Se agregó 'rounded-lg' aquí también
                  }`}
                >
                  {isLoading && currentIndex === index && (
                    <p className="absolute inset-0 flex items-center justify-center bg-gray-100 font-semibold text-gray-500">
                      Cargando imagen...
                    </p>
                  )}
                  <Image
                    src={image.url}
                    alt={image.title || image.description}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="rounded-lg object-contain transition-opacity duration-300"
                    onLoad={() => setIsLoading(false)}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={85}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-primary p-3 text-primary-foreground transition-transform duration-200 ease-out hover:scale-110 hover:bg-primary/90 active:scale-90"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-primary p-3 text-primary-foreground transition-transform duration-200 ease-out hover:scale-110 hover:bg-primary/90 active:scale-90"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Image details */}
        <div className="w-full lg:sticky lg:top-4 lg:w-1/2">
          <div className="flex h-full flex-col rounded-lg border border-gray-300 p-6 shadow-md dark:border-white">
            {/* Etiqueta numérica arriba del título */}
            {newsItem && (
              <div className="mb-2">
                {id === 1 && (
                  <div className="inline-block rounded bg-red-600 px-2 py-1 text-center text-sm font-semibold text-white lg:text-base">
                    Top {currentIndex + 1}
                  </div>
                )}
                {(id === 2 || id === 3) && (
                  <div className="inline-block rounded bg-red-600 px-2 py-1 text-center text-sm font-semibold text-white lg:text-base">
                    {currentIndex + 1}
                  </div>
                )}
              </div>
            )}
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">
              {newsItem.imageUrls[currentIndex].title}
            </h2>
            <p className="mb-6 flex-grow text-sm text-muted-foreground sm:text-base">
              {newsItem.imageUrls[currentIndex].description}
            </p>
            <Button onClick={() => window.open(newsItem.imageUrls[currentIndex].malLink, "_blank")}>
              Ver en MyAnimeList
            </Button>
          </div>
        </div>
      </div>

      <span className="text-sm text-gray-500">
        Publicado el: {new Date(newsItem.publicationDate).toLocaleDateString()}
      </span>
      <Link href="/">
        <Button>Volver a las Noticias</Button>
      </Link>

      {/* Comments section */}
      <div className="w-full max-w-4xl">
        <h2 className="mb-2 text-lg font-semibold">Comentarios ({comments.length})</h2>

        {comments.length > 0 && (
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-lg font-bold">Promedio:</span>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={index < averageStars ? "text-yellow-500" : "text-gray-300"}
              />
            ))}
            <span className="ml-2 text-lg font-semibold">{averageStars.toFixed(1)} / 5</span>
          </div>
        )}
        <ToastContainer />

        <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Deja un comentario"
            className="rounded-md border border-gray-300 p-2"
            required
          />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Tu nombre"
            className="rounded-md border border-gray-300 p-2"
            required
          />
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={
                  star <= userRating
                    ? "cursor-pointer text-yellow-500"
                    : "cursor-pointer text-gray-300"
                }
                onClick={() => setUserRating(star)}
              />
            ))}
          </div>
          <Button type="submit">Enviar Comentario</Button>
        </form>

        {/* Ordenamos los comentarios por fecha (de más reciente a más antiguo) */}
        {comments
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Ordenar por fecha
          .map((comment) => (
            <div key={comment.id} className="my-2 rounded-md border border-gray-300 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-bold">{comment.userName}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>

              {/* Mostrar las estrellas del comentario */}
              <div className="mb-2 flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={index < comment.rating ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="mb-2 text-gray-600">{comment.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
