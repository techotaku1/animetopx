/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // Esto permite cargar imágenes sin optimización
    },
  };
  
  module.exports = nextConfig;
  