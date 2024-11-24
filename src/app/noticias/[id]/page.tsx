'use client';

import { use } from 'react';  // Importa el hook 'use'
import Loading from '../loading';  // Importa el componente de carga
import NewsDetailClient from './NewsDetailClient';  // Asegúrate de importar el componente de detalle de la noticia

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // Utiliza el hook 'use' para obtener los params asincrónicamente
  const resolvedParams = use(params);  // Resuelve los params sin necesidad de un 'useEffect'

  // Si no existe el ID o está cargando, muestra el componente de carga
  if (!resolvedParams?.id) {
    return <Loading />;
  }

  const id = parseInt(resolvedParams.id, 10); // Convierte el id en número

  return (
    <div>
      <NewsDetailClient id={id} />  {/* Pasa el ID a NewsDetailClient */}
    </div>
  );
}
