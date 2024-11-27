import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  // Optimizaciones generales
  reactStrictMode: true, // Ayuda a identificar problemas potenciales
  output: 'export', // Configuración para exportación estática
  trailingSlash: true, // Agrega una barra al final de las rutas (requerido para exportación estática)
  assetPrefix: '/', // Corregido para usar una barra inicial
  images: {
    formats: ['image/webp'], // Habilita formatos modernos para mejor rendimiento
  },
  experimental: {
    optimizeCss: true, // Habilita la optimización automática de CSS
  },
  redirects: async () => [
    {
      source: '/old-page',
      destination: '/new-page',
      permanent: true, // Redirección 301 para SEO
    },
  ],
};

export default nextConfig;
