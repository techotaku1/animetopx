import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Ayuda a identificar problemas potenciales
  output: 'export', // Configuración para exportación estática
  trailingSlash: true, // Agrega una barra al final de las rutas (requerido para exportación estática)
  assetPrefix: '/', // Corregido para usar una barra inicial
  images: {
    formats: ['image/webp'], // Habilita formatos modernos para mejor rendimiento
  },
  experimental: {
    optimizeCss: true, // Habilita la optimización automática de CSS
    staleTimes: {
      dynamic: 30, // Tiempo en segundos para páginas dinámicas
      static: 180, // Tiempo en segundos para páginas estáticas
    },
  },
  redirects: async () => [
    {
      source: '/old-page',
      destination: '/new-page',
      permanent: true, // Redirección 301 para SEO
    },
  ],
  // Si necesitas configurar fetch cache, puedes hacerlo de la siguiente manera:
  fetchCache: 'default-cache', // Configura el comportamiento de caché para todas las solicitudes
};

export default nextConfig;
