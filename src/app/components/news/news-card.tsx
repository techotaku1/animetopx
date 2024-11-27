import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="relative w-full h-64">
          {" "}
          {/* Ajustar la altura para un estilo vertical */}
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill // Para que ocupe todo el contenedor
            style={{ objectFit: "contain" }} // Ajusta la imagen sin recortar
            className="rounded-t-lg" // Bordes redondeados
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge className="mb-2">{item.category}</Badge>
        <CardTitle className=" text-xl mb-2">{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <time dateTime={item.date} className="text-sm text-muted-foreground">
          {new Date(item.date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <Button asChild>
          <Link href={`/noticias/${item.id}`}>Leer más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
