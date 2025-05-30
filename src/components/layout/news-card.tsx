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

interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

export function NewsCard({ item }: { item: NewsItem }): JSX.Element {
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
      <CardContent className="grow mb-4">
        <Badge className="mb-2">{item.category}</Badge>
        <CardTitle className="mb-2 text-xl">{item.title}</CardTitle>
        <CardDescription >{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="mt-8 ext-muted-foreground text-sm">
            <div className='font-bold'>Publicado</div>
            <time
              className="text-muted-foreground pr-8 text-sm"
              dateTime={item.date}
            >
              {timeAgo}
            </time>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <ArrowDown className="text-primary h-6 w-6 animate-bounce" />
            <Button asChild className="font-extrabold flex items-center">
              <Link className=" flex items-center" href={`/noticias/${item.id}`}>
                Leer más
              </Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
