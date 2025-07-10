import { type JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';

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

export function NewsCard({ item }: NewsCardProps): JSX.Element {
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
