'use client'; // Asegúrate de que el componente sea cliente

import { useState, useEffect } from 'react';
import Loading from '../loading';  // Importa el componente de carga
import NewsDetailClient from './NewsDetailClient';  // Asegúrate de importar el componente de detalle de la noticia

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para mostrar el loading

  useEffect(() => {
    const fetchId = async () => {
      const resolvedParams = await params; // Desempaquetamos la promesa
      if (resolvedParams?.id) {
        setId(parseInt(resolvedParams.id, 10)); // Convertimos el id en número
        setIsLoading(false);  // Detener el loading una vez que se obtiene el ID
      }
    };

    fetchId();
  }, [params]);

  if (isLoading || id === null) {
    return <Loading />;  // Usa el componente de carga mientras se obtiene el ID
  }

  return (
    <div>
      <NewsDetailClient id={id} />  {/* Pasa el ID a NewsDetailClient */}
    </div>
  );
}
