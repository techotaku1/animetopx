/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		dangerouslyAllowSVG: true,
		contentDispositionType: 'inline',
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: '/**',
			},
		],
		unoptimized: true, // Disable Image Optimization API
	},
	experimental: {
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.js',
				},
			},
			resolveAlias: {
				underscore: 'lodash',
				mocha: { browser: 'mocha/browser-entry.js' },
			},
			resolveExtensions: [
				'.mdx',
				'.tsx',
				'.ts',
				'.jsx',
				'.js',
				'.mjs',
				'.json',
			],
		},
	},
};

export default nextConfig;
