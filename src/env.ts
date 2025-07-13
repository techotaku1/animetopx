import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		FIREBASE_AUTH_DOMAIN: z.string().min(1),
		FIREBASE_API_KEY: z.string().min(1),
		FIREBASE_APP_ID: z.string().min(1),
		FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
		FIREBASE_STORAGE_BUCKET: z.string().min(1),
		FIREBASE_PROJECT_ID: z.string().min(1),
		CLOUDINARY_URL: z.string().min(1),
		CLOUDINARY_API_SECRET: z.string().min(1),
		CLOUDINARY_API_KEY: z.string().min(1),
		CLOUDINARY_CLOUD_NAME: z.string().min(1),
		EMAIL_USER: z.string().min(1),
		EMAIL_PASS: z.string().min(1),
		NODE_ENV: z
			.enum(['development', 'test', 'production'])
			.default('development'),
	},
	client: {
		// Si necesitas exponer alguna variable al cliente, agrégala aquí como NEXT_PUBLIC_*
	},
	runtimeEnv: {
		FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
		FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
		FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		CLOUDINARY_URL: process.env.CLOUDINARY_URL,
		CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
		CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
		CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
		EMAIL_USER: process.env.EMAIL_USER,
		EMAIL_PASS: process.env.EMAIL_PASS,
		NODE_ENV: process.env.NODE_ENV,
	},
	skipValidation: false,
	emptyStringAsUndefined: true,
});
