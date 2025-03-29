import { writeFileSync, readFileSync, existsSync } from 'fs';
import { readdir, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually load environment variables from .env file
const envFilePath = path.resolve(__dirname, '../../.env');
const envFileContent = readFileSync(envFilePath, 'utf-8');
const envVariables = envFileContent.split('\n').reduce(
	(acc, line) => {
		const [key, value] = line.split('=');
		if (key && value) {
			acc[key.trim()] = value.trim();
		}
		return acc;
	},
	{} as Record<string, string>
);

const CLOUDINARY_CLOUD_NAME = envVariables.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = envVariables.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = envVariables.CLOUDINARY_API_SECRET;

interface CloudinaryResponse {
    secure_url: string;
    error?: {
        message: string;
    };
}

async function uploadFile(
	filePath: string,
	relativePath: string
): Promise<string> {
	try {
		const fileBuffer = readFileSync(filePath);
		const blob = new Blob([fileBuffer]);

		const formData = new FormData();
		formData.append('file', blob, relativePath); // Use relativePath instead of just the filename
		formData.append('upload_preset', 'ml_default');

		const uploadResponse = await fetch(
			`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
			{
				method: 'POST',
				body: formData,
			}
		);

		const result = (await uploadResponse.json()) as CloudinaryResponse;

		if (result.error) {
			throw new Error(result.error.message);
		}

		console.log(`Subido: ${result.secure_url}`);
		return result.secure_url;
	} catch (error: unknown) {
		if (
			error instanceof Error &&
			error.message.includes('File size too large')
		) {
			console.error(
				`Error: El archivo ${filePath} es demasiado grande para subirlo.`
			);
		} else {
			console.error('Error durante la carga:', error);
		}
		return '';
	}
}

async function* walkDirectory(dir: string): AsyncGenerator<string> {
	const files = await readdir(dir);
	for (const file of files) {
		const filePath = path.join(dir, file);
		const fileStat = await stat(filePath);
		if (fileStat.isDirectory()) {
			yield* walkDirectory(filePath);
		} else {
			yield filePath;
		}
	}
}

async function uploadDirectory(sourceDir: string) {
	const uploadedFiles: Record<string, string> = {};

	for await (const filePath of walkDirectory(sourceDir)) {
		const relativePath = path.relative(sourceDir, filePath).replace(/\\/g, '/');
		const url = await uploadFile(filePath, relativePath);
		if (url) {
			uploadedFiles[relativePath] = url;
		}
	}

	return uploadedFiles;
}

async function main() {
	if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
		console.error(
			'Error: Las credenciales de Cloudinary no están definidas en las variables de entorno.'
		);
		process.exit(1);
	}

	const publicDir = path.join(process.cwd(), 'public');
	console.log('Iniciando la carga de archivos desde:', publicDir);

	try {
		let existingFiles: Record<string, string> = {};
		const blobUrlsPath = 'blobUrls.json';

		if (existsSync(blobUrlsPath)) {
			const existingFilesContent = readFileSync(blobUrlsPath, 'utf-8');
			existingFiles = JSON.parse(existingFilesContent) as Record<string, string>;
		}

		const uploadedFiles = await uploadDirectory(publicDir);
		const updatedFiles = { ...existingFiles, ...uploadedFiles };

		writeFileSync(blobUrlsPath, JSON.stringify(updatedFiles, null, 2));
		console.log('Carga completada y blobUrls.json actualizado.');
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error durante la carga:', error.message);
		} else {
			console.error('Error durante la carga:', error);
		}
	}
}

main().catch((error: unknown) => {
	if (error instanceof Error) {
		console.error('Error en la ejecución de main:', error.message);
	} else {
		console.error('Error en la ejecución de main:', error);
	}
});
