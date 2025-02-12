'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  getDocs,
  addDoc,
  query,
  collection,
  where,
  Timestamp,
} from 'firebase/firestore';
import { Star, Home, Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '@/db/firebaseConfig';
import { newsItems } from '@/lib/newsData';
import { ImageCarousel } from '@/components/layout/ImageCarousel';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';

interface Comment {
  id: string;
  comment: string;
  date: Date;
  rating: number;
  userName: string;
}

export default function NewsDetailClient({
  id,
}: {
  id: number;
}): React.JSX.Element {
  const newsItem = newsItems.find((item) => item.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [userRating, setUserRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');

  const fetchComments = useCallback(async () => {
    if (!id) return;
    const commentsQuery = query(
      collection(db, 'comments'),
      where('newsId', '==', id)
    );
    const snapshot = await getDocs(commentsQuery);
    const fetchedComments: Comment[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Comment;

      return {
        id: doc.id,
        comment: data.comment,
        date:
          data.date instanceof Timestamp
            ? data.date.toDate()
            : new Date(data.date),
        rating: data.rating,
        userName: data.userName,
      };
    });

    setComments(fetchedComments);
  }, [id]);

  useEffect(() => {
    void fetchComments();
  }, [fetchComments]);

  const handleCommentSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (newComment.trim() === '' || userRating === 0 || userName.trim() === '')
      return;

    const newCommentData: Comment = {
      id: Math.random().toString(),
      comment: newComment,
      date: new Date(),
      rating: userRating,
      userName: userName,
    };

    setComments((prevComments) => [newCommentData, ...prevComments]);
    setNewComment('');
    setUserRating(0);
    setUserName('');

    await addDoc(collection(db, 'comments'), {
      comment: newComment,
      date: Timestamp.fromDate(new Date()),
      newsId: id,
      rating: userRating,
      userName: userName,
    });

    void fetchComments();
    toast.success('Comentario agregado con éxito!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  if (!newsItem) return <p className="text-center">Noticia no encontrada</p>;

  const averageStars =
    comments.length > 0
      ? comments.reduce((acc, comment) => acc + comment.rating, 0) /
        comments.length
      : 0;

  const breadcrumbItems = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/noticias', label: 'Noticias', icon: Newspaper },
    { href: `/noticias/${id}`, label: newsItem.title }, // Enlace de la noticia específica
  ];

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center space-y-8 px-4 py-4">
      <div
        className="relative mb-4 w-full overflow-hidden"
        style={{ aspectRatio: '1920/600' }}
      >
        <Image
          fill
          priority
          alt={newsItem.title}
          className="rounded-lg object-cover"
          sizes="(min-width: 1920px) 1920px, 100vw"
          src={newsItem.backgroundImage}
        />
      </div>

      {/* Breadcrumbs para navegación */}
      <div className="flex w-full justify-start">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <h1 className="mb-6 text-center text-3xl font-bold sm:text-4xl">
        {newsItem.title}
      </h1>

      <div className="mb-8 flex w-full max-w-6xl flex-col lg:flex-row lg:items-start lg:space-x-8">
        <ImageCarousel
          currentIndex={currentIndex}
          images={newsItem.imageUrls}
          newsId={id}
          onNext={() =>
            setCurrentIndex((prev) =>
              prev < newsItem.imageUrls.length - 1 ? prev + 1 : prev
            )
          }
          onPrev={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
        />

        <div className="w-full lg:sticky lg:top-4 lg:w-1/2">
          <div className="flex h-full flex-col rounded-lg border border-gray-300 p-6 shadow-md dark:border-white">
            {id <= 4 && (
              <div className="mb-2 inline-block rounded-sm bg-red-600 px-2 py-1 text-center text-sm font-semibold text-white lg:text-base">
                Top {currentIndex + 1}
              </div>
            )}
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">
              {newsItem.imageUrls[currentIndex].title}
            </h2>
            <p className="text-muted-foreground mb-6 grow text-sm sm:text-base">
              {newsItem.imageUrls[currentIndex].description}
            </p>
            <Button
              onClick={() =>
                window.open(newsItem.imageUrls[currentIndex].malLink, '_blank')
              }
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

      <div className="w-full max-w-4xl">
        <h2 className="mb-2 text-lg font-semibold">
          Comentarios ({comments.length})
        </h2>

        {comments.length > 0 && (
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-lg font-bold">Promedio:</span>
            {[...Array<number>(5)].map((_, index) => (
              <Star
                key={index}
                className={
                  index < averageStars ? 'text-yellow-500' : 'text-gray-300'
                }
              />
            ))}
            <span className="ml-2 text-lg font-semibold">
              {averageStars.toFixed(1)} / 5
            </span>
          </div>
        )}
        <ToastContainer />

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleCommentSubmit}
        >
          <textarea
            required
            className="rounded-md border border-gray-300 p-2"
            placeholder="Deja un comentario"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <input
            required
            className="rounded-md border border-gray-300 p-2"
            placeholder="Tu nombre"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={
                  star <= userRating
                    ? 'cursor-pointer text-yellow-500'
                    : 'cursor-pointer text-gray-300'
                }
                onClick={() => setUserRating(star)}
              />
            ))}
          </div>
          <Button type="submit">Enviar Comentario</Button>
        </form>

        {comments
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map((comment) => (
            <div
              key={comment.id}
              className="my-2 rounded-md border border-gray-300 p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-bold">{comment.userName}</span>
                <span className="text-sm text-gray-500">
                  {comment.date.toLocaleDateString()}
                </span>
              </div>
              <div className="mb-2 flex">
                {[...Array<number>(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={
                      index < comment.rating
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }
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
