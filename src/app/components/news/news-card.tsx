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
import { ArrowDown } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns"; // Importando las funciones necesarias
import { es } from "date-fns/locale"; // Importar la configuración regional en español

interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

export function NewsCard({ item }: { item: NewsItem }) {
  // Validar y formatear la fecha
  let timeAgo = '';
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
  } catch (error) {
    timeAgo = "Fecha no disponible"; // Valor predeterminado en caso de error
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="relative w-full h-64">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            style={{ objectFit: "contain" }}
            className="rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge className="mb-2">{item.category}</Badge>
        <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
        <CardDescription className="mb-2">{item.description}</CardDescription> {/* Reducimos el margen inferior */}
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-1 pb-2"> {/* Reducimos el padding superior e inferior */}
        {/* Contenedor flex para la fecha a la izquierda y el botón con flecha a la derecha */}
        <div className="flex w-full justify-between items-center">
          {/* Texto "Publicado" y fecha con "Hace X tiempo" alineados a la izquierda */}
          <div className="text-sm text-muted-foreground">
            <div>Publicado</div>
            <time dateTime={item.date} className="text-sm text-muted-foreground">
              {timeAgo} {/* Mostrará algo como "Hace 3 días", "Hace 1 hora", etc. */}
            </time>
          </div>

          {/* Contenedor para el icono de flecha y el botón de "Leer más" alineados a la derecha */}
          <div className="flex flex-col items-center space-y-1"> {/* Reducimos el espacio entre los elementos */}
            <ArrowDown className="w-6 h-6 mb-1 text-primary animate-bounce" /> {/* Reducimos el margen inferior */}
            <Button asChild className="flex items-center">
              <Link href={`/noticias/${item.id}`} className="flex items-center">
                Leer más
              </Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
