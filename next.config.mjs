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
				hostname: "puujtsaknfrmtxbs.public.blob.vercel-storage.com",
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
				pathname: '/**',
			},
		],
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
	headers: () => {
		return [
			{
				source: '/app/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, must-revalidate',
					},
				],
			},
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
				],
			},
		];
	},
};

export default (nextConfig);
