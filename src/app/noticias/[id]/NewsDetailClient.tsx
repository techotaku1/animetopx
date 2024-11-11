"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { newsItems } from "@/lib/newsData";
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
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return prevIndex; // No permite retroceder más allá de la primera imagen
      }
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < newsItem!.imageUrls.length - 1) {
        return prevIndex + 1;
      } else {
        return prevIndex; // No permite avanzar más allá de la última imagen
      }
    });
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
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 space-y-8 max-w-6xl mx-auto">
      {/* Portada de la noticia */}
      <div
        className="relative w-full overflow-hidden mb-4"
        style={{ aspectRatio: "1920/600" }}
      >
        <Image
          src={newsItem.backgroundImage}
          alt={newsItem.title}
          fill
          sizes="(min-width: 1920px) 1920px, 100vw"
          priority
          className="object-cover object-center rounded-lg"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center sm:text-4xl">
        {newsItem.title}
      </h1>

      {/* Carousel and Image details */}
      <div className="w-full max-w-6xl mb-8 flex flex-col lg:flex-row lg:space-x-8 lg:items-start">
        {/* Carousel */}
        <div className="relative w-full lg:w-1/2 mb-8 lg:mb-0">
          <div className="overflow-hidden rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {newsItem.imageUrls.map((image, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 relative"
                  style={{ aspectRatio: "4/4" }} // Hacer la imagen más "grande" cambiando la relación de aspecto
                >
                  <Image
                    src={image.url}
                    alt={image.title || image.description}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="rounded-lg object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full transition-all duration-300 ease-in-out hover:scale-110 active:scale-90 border-none hover:shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full transition-all duration-300 ease-in-out hover:scale-110 active:scale-90 border-none hover:shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Image details */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-4">
          <div className="flex flex-col h-full p-6 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-gray-300 dark:border-white">
            {id <= 3 && (
              <div className="bg-red-500 py-1 px-3 rounded mb-4 inline-block self-start text-white font-bold">
                {id === 1 ? `Top ${currentIndex + 1}` : `${currentIndex + 1}`}
              </div>
            )}
            <h2 className="text-xl font-semibold sm:text-2xl mb-4">
              {newsItem.imageUrls[currentIndex].title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 flex-grow">
              {newsItem.imageUrls[currentIndex].description}
            </p>
            <Button
              onClick={() =>
                window.open(newsItem.imageUrls[currentIndex].malLink, "_blank")
              }
              className="self-start shadow-md hover:shadow-lg transition-shadow"
            >
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
