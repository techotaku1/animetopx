'use client';

import { Suspense, useState, useEffect, type JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { carouselData } from '@/lib/carouselData';
import { NewsCard } from '@/components/layout/news-card';
import { Button } from '@/components/ui/button';
import Loading from './loading';

export default function Home(): JSX.Element {
	const portadaItems = carouselData.filter((item) => item.isCover);
	const newsItems = carouselData.filter((item) => !item.isCover);

	const sortedNewsItems = newsItems.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
	const latestNewsItem = sortedNewsItems.find((item) => item.id === 4);
	const otherNewsItems = sortedNewsItems.filter((item) => item.id !== 4);

	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % portadaItems.length);
		}, 5000);

		return (): void => clearInterval(interval);
	}, [portadaItems.length]);

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
								/>
							</div>
						))}
					</div>

					<div className="absolute left-1/2 mt-4 flex -translate-x-1/2 transform space-x-3">
						{portadaItems.map((_, index) => (
							<button
								key={index}
								aria-label={`Ir a la diapositiva ${index + 1}`}
								className={`h-4 w-4 rounded-full ${
									currentSlide === index ? 'bg-red-500' : 'bg-black'
								} disabled={currentSlide === index} transition-all duration-300`}
								onClick={() => setCurrentSlide(index)}
							/>
						))}
					</div>
				</div>
			</Suspense>

			<section>
				<h1 className="mb-4 text-4xl font-bold">Últimas Noticias de Anime</h1>
				<p className="text-muted-foreground text-xl">
					Mantente al día con las últimas novedades del mundo del anime.
				</p>
			</section>

			<Suspense fallback={<Loading />}>
				<section className="space-y-6">
					<div className="relative flex flex-col items-center">
						<div className="animate-blink absolute left-[20%] top-1/2 -translate-y-1/2 transform text-2xl font-bold text-yellow-500">
							Nueva Noticia
							<span className="animate-bounce-left">➡️</span>
						</div>
						{latestNewsItem && <NewsCard item={latestNewsItem} />}
						<div className="animate-blink absolute right-[20%] top-1/2 -translate-y-1/2 transform text-2xl font-bold text-blue-500">
							<span className="animate-bounce-right">⬅️</span>
							Nueva Noticia
						</div>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{otherNewsItems.map((item) => (
							<NewsCard key={item.id} item={item} />
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
