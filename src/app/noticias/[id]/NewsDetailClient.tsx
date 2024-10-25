"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { newsItems } from "@/lib/newsData";
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
          date: data.date.toDate(),
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
                alt={newsItem.imageUrls[currentIndex].alt || newsItem.imageUrls[currentIndex].description}
                title={newsItem.imageUrls[currentIndex].title}
                fill
                className="rounded-lg border-4 border-gray-300 object-cover"
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

          <div className="flex flex-col ml-0 sm:ml-4 mb-4">
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
        <Button onClick={() => window.history.back()} className="mt-4">
          Volver a las noticias
        </Button>
        <div className="text-center mb-4 mt-4">
          <h3 className="text-lg font-semibold">
            Total de Comentarios: {comments.length}
          </h3>
          <h3 className="text-lg font-semibold">Score: {totalStars}</h3>
          <div className="flex items-center justify-center">
            <h3 className="text-lg font-semibold mr-2">Puntaje:</h3>
            {Array.from({ length: Math.round(averageStars) }, (_, index) => (
              <Star
                key={index}
                className="inline-block w-6 h-6 text-yellow-500"
              />
            ))}
            <span className="ml-2 text-lg font-semibold">
              {averageStars.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="w-full max-w-4xl p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Comentarios</h2>
          <form
            onSubmit={handleCommentSubmit}
            className="flex flex-col space-y-2 mb-4"
          >
            <input
              type="text"
              placeholder="Tu nombre"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border border-gray-300 rounded p-2"
              required
            />
            <textarea
              placeholder="Escribe tu comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border border-gray-300 rounded p-2"
              required
            />
            <div className="flex items-center space-x-2">
              <span className="text-lg">Calificación:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={classNames("w-6 h-6 cursor-pointer", {
                    "text-yellow-500": userRating >= star,
                    "text-gray-300": userRating < star,
                  })}
                  onClick={() => setUserRating(star)}
                />
              ))}
            </div>
            <Button type="submit" className="mt-2">
              Agregar Comentario
            </Button>
          </form>

          {comments.length === 0 ? (
            <p className="text-center">No hay comentarios.</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <p className="font-bold">{comment.userName}</p>
                  <p className="text-gray-600">{comment.comment}</p>
                  <p className="text-xs text-gray-400">
                    Publicado: {comment.date.toLocaleDateString()} -
                    {Array.from({ length: comment.rating }, (_, index) => (
                      <Star
                        key={index}
                        className="inline-block w-4 h-4 text-yellow-500"
                      />
                    ))}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="ml-4"
                >
                  Eliminar
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}