'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Home, Newspaper, Star } from 'lucide-react';
import { FaPlay } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

import { ImageCarousel } from '@/components/layout/ImageCarousel';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { newsItems } from '@/lib/newsData';

import 'react-toastify/dist/ReactToastify.css';

interface Comment {
	id: string;
	comment: string;
	date: Date;
	rating: number;
	userName: string; // email
	likes?: number;
	likedBy?: string[]; // array de emails
}

interface NewCommentData {
	comment: string;
	newsId: string;
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
	const [userCommentEmail, setUserCommentEmail] = useState<string>('');
	const [userLikeEmail, setUserLikeEmail] = useState<string>('');
	const [commentEmailVerified, setCommentEmailVerified] =
		useState<boolean>(false);
	const [likeEmailVerified, setLikeEmailVerified] = useState<boolean>(false);
	const [commentVerificationCode, setCommentVerificationCode] = useState('');
	const [likeVerificationCode, setLikeVerificationCode] = useState('');
	const [commentCodeSent, setCommentCodeSent] = useState(false);
	const [likeCodeSent, setLikeCodeSent] = useState(false);
	const [likeLoading, setLikeLoading] = useState<string | null>(null); // id del comentario que está procesando like

	const fetchComments = useCallback(async () => {
		if (!id) return;
		const response = await fetch(`/api/comment?newsId=${id}`);
		if (!response.ok) {
			console.error('Error fetching comments:', response.statusText);
			return;
		}
		const fetchedComments = (await response.json()) as Comment[];
		setComments(
			fetchedComments.map((comment) => ({
				...comment,
				date: new Date(comment.date),
			}))
		);
	}, [id]);

	useEffect(() => {
		fetchComments().catch((_error) => {
			console.error('Error fetching comments:', _error);
		});
	}, [fetchComments]);

	useEffect(() => {
		const savedCommentEmail = localStorage.getItem('userCommentEmail');
		const savedLikeEmail = localStorage.getItem('userLikeEmail');
		const commentVerified =
			localStorage.getItem('commentEmailVerified') === 'true';
		const likeVerified = localStorage.getItem('likeEmailVerified') === 'true';
		if (savedCommentEmail) setUserCommentEmail(savedCommentEmail);
		if (savedLikeEmail) setUserLikeEmail(savedLikeEmail);
		setCommentEmailVerified(commentVerified);
		setLikeEmailVerified(likeVerified);
	}, []);

	const validateEmail = (email: string) => {
		// Validación básica de email
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const sendVerificationCode = async (
		email: string,
		type: 'comment' | 'like'
	) => {
		if (!validateEmail(email)) {
			toast.error('Ingresa un correo válido.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
			return;
		}
		const res = await fetch('/api/verify-email', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		});
		if (res.ok) {
			toast.success('Código enviado al correo.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
			if (type === 'comment') setCommentCodeSent(true);
			else setLikeCodeSent(true);
		} else {
			toast.error('Error enviando código.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
		}
	};

	const verifyCode = async (
		email: string,
		code: string,
		type: 'comment' | 'like'
	) => {
		const res = await fetch('/api/verify-email', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, code }),
		});
		if (res.ok) {
			toast.success('Correo verificado.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
			if (type === 'comment') {
				setCommentEmailVerified(true);
				localStorage.setItem('userCommentEmail', email);
				localStorage.setItem('commentEmailVerified', 'true');
			} else {
				setLikeEmailVerified(true);
				localStorage.setItem('userLikeEmail', email);
				localStorage.setItem('likeEmailVerified', 'true');
			}
		} else {
			toast.error('Código incorrecto.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
		}
	};

	const handleCommentSubmit = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();
		if (userRating === 0) {
			toast.error(
				'Faltan las estrellas. Por favor selecciona una calificación.',
				{
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: true,
				}
			);
			return;
		}
		if (
			newComment.trim() === '' ||
			userCommentEmail.trim() === '' ||
			!validateEmail(userCommentEmail.trim()) ||
			!commentEmailVerified
		) {
			toast.error('Debes verificar tu correo antes de comentar.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
			return;
		}
		const newCommentData: NewCommentData = {
			comment: newComment,
			newsId: id.toString(),
			rating: userRating,
			userName: userCommentEmail,
		};

		try {
			const response = await fetch('/api/comment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCommentData),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Error submitting comment:', errorText);
				toast.error(`Error submitting comment: ${errorText}`, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: true,
				});
				return;
			}

			setNewComment('');
			setUserRating(0);
			setUserCommentEmail('');

			localStorage.setItem('userEmail', userCommentEmail.trim());

			fetchComments().catch((_error) => {
				console.error('Error fetching comments:', _error);
			});
			toast.success('Comentario agregado con éxito!', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
		} catch (_error) {
			const errorMessage =
				_error instanceof Error ? _error.message : String(_error);
			console.error('Error submitting comment:', errorMessage);
			toast.error(`Error submitting comment: ${errorMessage}`, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
		}
	};

	const handleLike = async (commentId: string) => {
		if (!validateEmail(userLikeEmail.trim()) || !likeEmailVerified) {
			toast.error('Debes verificar tu correo antes de dar like.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
			return;
		}
		localStorage.setItem('userLikeEmail', userLikeEmail.trim());
		setLikeLoading(commentId);
		try {
			const response = await fetch('/api/comment/like', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					commentId,
					userEmail: userLikeEmail.trim(),
				}),
			});
			if (!response.ok) {
				const errorText = await response.text();
				toast.error(`Error al dar like: ${errorText}`, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: true,
				});
			} else {
				await fetchComments();
			}
		} catch (_error) {
			toast.error('Error al dar like.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
		}
		setLikeLoading(null);
	};

	const handleDeleteComment = async (commentId: string) => {
		if (!userCommentEmail || !commentEmailVerified) {
			toast.error('Debes verificar tu correo para eliminar tu comentario.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
			return;
		}
		try {
			const response = await fetch('/api/comment', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ commentId, userEmail: userCommentEmail }),
			});
			if (!response.ok) {
				const errorText = await response.text();
				toast.error(`Error al eliminar comentario: ${errorText}`, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: true,
				});
				return;
			}
			toast.success('Comentario eliminado.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
			await fetchComments();
		} catch (_error) {
			toast.error('Error al eliminar comentario.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
			});
		}
	};

	if (!newsItem) return <p className="text-center">Noticia no encontrada</p>;

	// Elimina o renombra la variable si no la usas
	// const averageStars =
	// 	comments.length > 0
	// 		? comments.reduce((acc, comment) => acc + comment.rating, 0) /
	// 			comments.length
	// 		: 0;

	// Nueva función para formatear la fecha como dd/mm/yyyy con ceros a la izquierda
	function formatDate(date: Date): string {
		const d = new Date(date);
		const day = String(d.getDate()).padStart(2, '0');
		const month = String(d.getMonth() + 1).padStart(2, '0');
		const year = d.getFullYear();
		return `${day}/${month}/${year}`;
	}

	// Encuentra el comentario con más likes
	const maxLikes = Math.max(...comments.map((c) => c.likes ?? 0), 0);
	const winnerCommentId = comments.find((c) => (c.likes ?? 0) === maxLikes)?.id;

	// Calcula el promedio general de estrellas
	const averageStars =
		comments.length > 0
			? comments.reduce((acc, comment) => acc + comment.rating, 0) /
				comments.length
			: 0;

	// Ordena: primero el de más estrellas, luego por fecha descendente
	const sortedComments = [...comments].sort((a, b) => {
		if (b.rating !== a.rating) return b.rating - a.rating;
		return b.date.getTime() - a.date.getTime();
	});

	return (
		<div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center">
			<div
				className="relative w-full overflow-hidden"
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
			<div className="mt-7 flex w-full justify-start">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<Home className="mr-1 inline-block size-4 align-text-bottom" />
							<BreadcrumbLink asChild>
								<Link href="/">Inicio</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<Newspaper className="mr-1 inline-block size-4 align-text-bottom" />
							<BreadcrumbLink asChild>
								<Link href="/noticias">Noticias</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{newsItem.title}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
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
						{id <= 6 && (
							<div className="mb-2 inline-block rounded-sm bg-red-600 py-1 text-center font-sans text-sm font-semibold text-white lg:text-base">
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
							className="flex items-center px-4 py-[0.7rem] font-bold"
						>
							<span className="flex items-center">
								<FaPlay className="mr-2" />
								Ver Serie TV
							</span>
						</Button>
					</div>
				</div>
			</div>

			<div className="-mt-4 mb-2 flex w-full flex-col items-center sm:-mt-2">
				<span className="text-sm text-gray-500">
					Publicado el: {formatDate(newsItem.publicationDate)}
				</span>
				<Link href="/">
					<Button className="flex items-center gap-2 px-4 py-[0.7rem]">
						<span className="flex-1 text-center">Volver a las Noticias</span>
					</Button>
				</Link>
			</div>

			<div className="w-full max-w-4xl">
				<h2 className="mb-2 text-lg font-semibold">
					Comentarios ({comments.length})
				</h2>
				<ToastContainer />

				{/* Promedio general de estrellas */}
				{comments.length > 0 && (
					<div className="mb-4 flex items-center">
						<span className="mr-2 text-lg font-bold">Promedio general:</span>
						{[...Array<number>(5)].map((_, index) => (
							<Star
								key={index}
								className={
									index < Math.round(averageStars)
										? 'text-yellow-500'
										: 'text-gray-300'
								}
							/>
						))}
						<span className="ml-2 text-lg font-semibold">
							{averageStars.toFixed(1)} / 5
						</span>
					</div>
				)}

				{/* Formulario de comentario con verificación */}
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
						placeholder="Correo para comentar"
						type="email"
						value={userCommentEmail}
						onChange={(e) => {
							setUserCommentEmail(e.target.value);
							setCommentEmailVerified(false);
							localStorage.removeItem('commentEmailVerified');
						}}
						disabled={commentEmailVerified}
					/>
					{!commentEmailVerified && (
						<div className="flex items-center gap-2">
							<Button
								type="button"
								onClick={() =>
									sendVerificationCode(userCommentEmail, 'comment')
								}
							>
								Enviar código
							</Button>
							{commentCodeSent && (
								<>
									<input
										className="rounded-md border border-gray-300 p-2"
										placeholder="Código recibido"
										value={commentVerificationCode}
										onChange={(e) => setCommentVerificationCode(e.target.value)}
									/>
									<Button
										type="button"
										onClick={() =>
											verifyCode(
												userCommentEmail,
												commentVerificationCode,
												'comment'
											)
										}
									>
										Verificar
									</Button>
								</>
							)}
						</div>
					)}
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
					<Button type="submit" disabled={!commentEmailVerified}>
						Enviar Comentario
					</Button>
				</form>

				{/* Input de correo para dar like con verificación */}
				<div className="my-4 flex flex-col gap-2">
					<input
						required
						className="rounded-md border border-gray-300 p-2"
						placeholder="Correo para dar like"
						type="email"
						value={userLikeEmail}
						onChange={(e) => {
							setUserLikeEmail(e.target.value);
							setLikeEmailVerified(false);
							localStorage.removeItem('likeEmailVerified');
						}}
						disabled={likeEmailVerified}
					/>
					{!likeEmailVerified && (
						<div className="flex items-center gap-2">
							<Button
								type="button"
								onClick={() => sendVerificationCode(userLikeEmail, 'like')}
							>
								Enviar código
							</Button>
							{likeCodeSent && (
								<>
									<input
										className="rounded-md border border-gray-300 p-2"
										placeholder="Código recibido"
										value={likeVerificationCode}
										onChange={(e) => setLikeVerificationCode(e.target.value)}
									/>
									<Button
										type="button"
										onClick={() =>
											verifyCode(userLikeEmail, likeVerificationCode, 'like')
										}
									>
										Verificar
									</Button>
								</>
							)}
						</div>
					)}
				</div>

				{sortedComments.map((comment) => {
					const alreadyLiked = comment.likedBy?.includes(userLikeEmail.trim());
					const isOwner =
						comment.userName.trim().toLowerCase() ===
							userCommentEmail.trim().toLowerCase() && commentEmailVerified;
					return (
						<div
							key={comment.id}
							className={`my-2 rounded-md border border-gray-300 p-4 ${
								comment.id === winnerCommentId && maxLikes > 0
									? 'border-2 border-yellow-400 bg-yellow-50'
									: ''
							}`}
						>
							<div className="mb-2 flex items-center justify-between">
								<span className="font-bold">{comment.userName}</span>
								<span className="text-sm text-gray-500">
									{new Date(comment.date).toLocaleDateString()}
								</span>
							</div>
							{/* Promedio de estrellas por comentario individual */}
							<div className="mb-2 flex items-center">
								<span className="mr-2 text-sm font-medium">Calificación:</span>
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
								<span className="ml-2 text-sm font-semibold">
									{comment.rating.toFixed(1)} / 5
								</span>
							</div>
							<p className="mb-2 text-gray-600">{comment.comment}</p>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									disabled={
										(!likeEmailVerified || alreadyLiked) ??
										likeLoading === comment.id
									}
									onClick={() => handleLike(comment.id)}
								>
									👍 {comment.likes ?? 0}
								</Button>
								{alreadyLiked && (
									<span className="text-xs text-green-600">
										¡Ya diste like!
									</span>
								)}
								{comment.id === winnerCommentId && maxLikes > 0 && (
									<span className="ml-2 text-xs font-bold text-yellow-600">
										🥇 Más likes
									</span>
								)}
								{isOwner && (
									<Button
										variant="destructive"
										size="sm"
										onClick={() => handleDeleteComment(comment.id)}
									>
										Eliminar
									</Button>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
