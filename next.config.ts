import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  assetPrefix: '/',
  images: {
    formats: ['image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
