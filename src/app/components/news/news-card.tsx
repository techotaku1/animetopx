import {formatDistanceToNow, parseISO} from "date-fns"; // Importando las funciones necesarias
import {es} from "date-fns/locale"; // Importar la configuración regional en español
import {ArrowDown} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

export function NewsCard({item}: {item: NewsItem}) {
  // Validar y formatear la fecha
  let timeAgo = "";

  try {
    const publishedDate = parseISO(item.date); // Convierte la fecha en formato ISO a un objeto Date

    // Verificar si la fecha es válida
    if (isNaN(publishedDate.getTime())) {
      throw new Error("Fecha inválida");
    }

    timeAgo = formatDistanceToNow(publishedDate, {
      addSuffix: true,
      locale: es, // Usamos la configuración regional en español
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    timeAgo = "Fecha no disponible"; // Valor predeterminado en caso de error
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="relative h-64 w-full">
          <Image
            fill
            priority
            alt={item.title}
            className="rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
            src={item.imageUrl}
            style={{objectFit: "contain"}}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge className="mb-2">{item.category}</Badge>
        <CardTitle className="mb-2 text-xl">{item.title}</CardTitle>
        <CardDescription className="mb-2">{item.description}</CardDescription>{" "}
        {/* Reducimos el margen inferior */}
      </CardContent>
      <CardFooter className="flex items-center justify-between pb-2 pt-1">
        {" "}
        {/* Reducimos el padding superior e inferior */}
        {/* Contenedor flex para la fecha a la izquierda y el botón con flecha a la derecha */}
        <div className="flex w-full items-center justify-between">
          {/* Texto "Publicado" y fecha con "Hace X tiempo" alineados a la izquierda */}
          <div className="text-sm text-muted-foreground">
            <div>Publicado</div>
            <time className="text-sm text-muted-foreground" dateTime={item.date}>
              {timeAgo} {/* Mostrará algo como "Hace 3 días", "Hace 1 hora", etc. */}
            </time>
          </div>

          {/* Contenedor para el icono de flecha y el botón de "Leer más" alineados a la derecha */}
          <div className="flex flex-col items-center space-y-1">
            {" "}
            {/* Reducimos el espacio entre los elementos */}
            <ArrowDown className="mb-1 h-6 w-6 animate-bounce text-primary" />{" "}
            {/* Reducimos el margen inferior */}
            <Button asChild className="flex items-center">
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
