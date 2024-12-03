/** @type {import('next').NextConfig} */

const nextConfig = {
  bundlePagesRouterDependencies: true,
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  assetPrefix: "/",
  images: {
    formats: ["image/webp"],
    unoptimized: true, // Desactiva la optimización de imágenes temporalmente
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
