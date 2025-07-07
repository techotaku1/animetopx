import { type JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface NewsCardProps {
	item: {
		id: number;
		title: string;
		description: string;
		category: string;
		imageUrl: string;
		date: string;
		relativeTime?: string; // Nueva prop opcional
	};
}

function getRelativeTime(dateString: string) {
	const now = new Date();
	const date = new Date(dateString);
	const diff = (now.getTime() - date.getTime()) / 1000; // en segundos

	if (diff < 60) return 'hace unos segundos';
	if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
	if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
	if (diff < 172800) return 'hace 1 día';
	return `hace ${Math.floor(diff / 86400)} días`;
}

export function NewsCard({ item }: NewsCardProps): JSX.Element {
	let timeAgo = '';

	try {
		const publishedDate = parseISO(item.date);
		if (isNaN(publishedDate.getTime())) {
			throw new Error('Fecha inválida');
		}

		timeAgo = formatDistanceToNow(publishedDate, {
			addSuffix: true,
			locale: es,
		});
	} catch {
		timeAgo = 'Fecha no disponible';
	}

	return (
		<Card className="flex flex-col p-8">
			<CardHeader>
				<div className="relative h-64 w-full">
					<Image
						fill
						alt={item.title}
						className="rounded-t-lg"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
						src={item.imageUrl}
						style={{ objectFit: 'contain' }}
					/>
				</div>
			</CardHeader>
			<CardContent className="mb-4 grow">
				<Badge className="mb-2">{item.category}</Badge>
				<CardTitle className="mb-2 text-xl">{item.title}</CardTitle>
				<CardDescription>{item.description}</CardDescription>
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<div className="flex w-full items-center justify-between">
					<div className="ext-muted-foreground mt-8 text-sm">
						<div className="font-bold">Publicado</div>
						<time
							className="text-muted-foreground pr-8 text-sm"
							dateTime={item.date}
						>
							{item.relativeTime ?? getRelativeTime(item.date)}
						</time>
					</div>
					<div className="flex flex-col items-center space-y-1">
						<ArrowDown className="text-primary h-6 w-6 animate-bounce" />
						<Button asChild className="flex items-center font-extrabold">
							<Link className="flex items-center" href={`/noticias/${item.id}`}>
								Leer más
							</Link>
						</Button>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
