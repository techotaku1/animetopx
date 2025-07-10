'use client';

import { type JSX, Suspense, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { NewsCard } from '@/components/layout/news-card';
import { Button } from '@/components/ui/button';
import { carouselData } from '@/lib/carouselData';

import Loading from './loading';

export default function Home(): JSX.Element {
	const portadaItems = carouselData.filter((item) => item.isCover);
	const newsItems = carouselData.filter((item) => !item.isCover);

	const sortedNewsItems = newsItems.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
	const latestNewsItem =
		sortedNewsItems.find((item) => item.id === 6) ??
		sortedNewsItems.find((item) => item.id === 5); // Ahora busca primero la de verano 2025
	const otherNewsItems = sortedNewsItems.filter((item) => item.id !== 6); // Excluye la de verano 2025

	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % portadaItems.length);
		}, 5000);

		return (): void => clearInterval(interval);
	}, [portadaItems.length]);

	// Función para mostrar tiempo relativo en español
	function getRelativeTime(dateString: string) {
		const now = new Date();
		const date = new Date(dateString);

		const nowMidnight = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate()
		);
		const dateMidnight = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);

		const diffTime = nowMidnight.getTime() - dateMidnight.getTime();
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) {
			return 'Publicado hoy';
		}
		if (diffDays === 1) {
			return 'Publicado ayer';
		}

		if (diffDays > 60) {
			const nowY = now.getFullYear();
			const nowM = now.getMonth();
			const dateY = date.getFullYear();
			const dateM = date.getMonth();
			let diffMonths = (nowY - dateY) * 12 + (nowM - dateM);

			if (now.getDate() < date.getDate()) {
				diffMonths -= 1;
			}

			if (diffMonths <= 0) {
				return 'Publicado hoy';
			}
			if (diffMonths === 1) {
				return 'Publicado hace 1 mes';
			}
			if (diffMonths < 12) {
				return `Publicado hace ${diffMonths} meses`;
			}
			return 'Publicado hace más de un año';
		}
		if (diffDays > 1) {
			return `Publicado hace ${diffDays} días`;
		}

		return 'Publicado hoy';
	}

	return (
		<div className="space-y-8">
			<Suspense fallback={<Loading />}>
				<div className="space-y-4">
					<div className="relative w-full" style={{ aspectRatio: '1920/600' }}>
						{portadaItems.map((item, index) => (
							<div
								key={item.id}
								className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
									index === currentSlide ? 'opacity-100' : 'opacity-0'
								}`}
							>
								<Image
									fill
									alt={item.title}
									loading={index === 0 ? 'eager' : 'lazy'}
									priority={index === 0}
									quality={85}
									sizes="(min-width: 1920px) 1920px, 100vw"
									src={item.imageUrl}
									style={{ objectFit: 'cover' }}
									placeholder="blur"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAALBJREFUGFcBpQBa/wE4U3P/OiImABoJ6gAjPBQAGRIYANzJ5QDg9QgAsbDKAAFxkLH/IvLIAO7I2QAxVlkA0tbsABoD9QAHAfMAyAInAAGFqrn/KLG7AAw/8wDw/AsABgcHAOXz9gAc6P8A9REsAAHFmJn/8u79ANrm5QD6Dw0AOSUQANLszADcy/kAIStJAAHIrLj/1r/VAMPe7gBTTDIA8PD/AN0M5QDcxNUAOTNOAHSjRron3jjAAAAAAElFTkSuQmCC"
								/>
							</div>
						))}
					</div>

					<div className="flex justify-center space-x-2 sm:absolute sm:left-1/2 sm:mt-4 sm:-translate-x-1/2 sm:transform sm:space-x-3">
						{portadaItems.map((_, index) => (
							<button
								key={index}
								aria-label={`Ir a la diapositiva ${index + 1}`}
								className={`h-2 w-2 rounded-full sm:h-4 sm:w-4 ${
									currentSlide === index ? 'bg-red-500' : 'bg-black'
								} disabled={currentSlide === index} transition-all duration-300`}
								onClick={() => setCurrentSlide(index)}
							/>
						))}
					</div>
				</div>
			</Suspense>

			<section className="mt-8 sm:mt-12 md:mt-16">
				<h1 className="mb-4 text-4xl font-bold">Últimas Noticias de Anime</h1>
				<p className="text-muted-foreground text-xl">
					Mantente al día con las últimas novedades del mundo del anime.
				</p>
			</section>

			<Suspense fallback={<Loading />}>
				<section className="space-y-6">
					<div className="relative flex flex-col items-center">
						{latestNewsItem && (
							<>
								<div className="relative w-full sm:w-1/2 lg:w-1/3">
									{/* Side texts - only visible on larger screens */}
									<div className="animate-blink absolute left-[-215px] top-1/2 hidden -translate-y-1/2 transform text-2xl font-bold text-yellow-500 sm:block">
										Nueva Noticia
										<span className="animate-bounce-left ml-2">➡️</span>
									</div>
									<div className="animate-blink absolute right-[-215px] top-1/2 hidden -translate-y-1/2 transform text-2xl font-bold text-blue-500 sm:block">
										<span className="animate-bounce-right mr-2">⬅️</span>
										Nueva Noticia
									</div>

									<NewsCard
										item={{
											...latestNewsItem,
											// Añade una propiedad extra para mostrar el tiempo relativo
											relativeTime: getRelativeTime(latestNewsItem.date),
										}}
									/>
									{/* Elimina la línea de fecha absoluta aquí */}
								</div>
								{/* Mobile version - only visible on small screens */}
								<div className="animate-blink mt-2 block text-center text-xl font-bold text-yellow-500 sm:hidden">
									Nueva Noticia
									<span className="ml-2 animate-bounce">⬆️</span>
								</div>
							</>
						)}
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{otherNewsItems.map((item) => (
							<NewsCard
								key={item.id}
								item={{
									...item,
									relativeTime: getRelativeTime(item.date),
								}}
							/>
						))}
					</div>
				</section>
			</Suspense>

			<section className="text-center">
				<Button asChild size="lg">
					<Link href="/noticias">Ver todas las noticias</Link>
				</Button>
			</section>
		</div>
	);
}
