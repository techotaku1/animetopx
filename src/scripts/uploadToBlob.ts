import { writeFileSync, readFileSync, existsSync } from 'fs';
import { readdir, stat, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { put } from '@vercel/blob';

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

const BLOB_READ_WRITE_TOKEN = envVariables.BLOB_READ_WRITE_TOKEN;

async function uploadFile(
	filePath: string,
	relativePath: string
): Promise<string> {
	const fileContent: Buffer = await readFile(filePath);
	const blob = await put(relativePath, fileContent, {
		access: 'public',
		token: BLOB_READ_WRITE_TOKEN, // Pasar el token explícitamente
	});
	console.log(`Subido: ${blob.url}`);
	return blob.url;
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
		uploadedFiles[relativePath] = url;
	}

	return uploadedFiles;
}

async function main() {
	if (!BLOB_READ_WRITE_TOKEN) {
		console.error(
			'Error: BLOB_READ_WRITE_TOKEN no está definido en las variables de entorno.'
		);
		process.exit(1);
	}

	const publicDir = path.join(process.cwd(), 'public');
	console.log('Iniciando la carga de archivos desde:', publicDir);

	try {
		let existingFiles: Record<string, string> = {};
		const blobUrlsPath = 'blobUrls.json';

		if (existsSync(blobUrlsPath)) {
			const existingContent: string = readFileSync(blobUrlsPath, 'utf-8');
			existingFiles = JSON.parse(existingContent) as Record<string, string>;
		}

		const newUploadedFiles = await uploadDirectory(publicDir);
		const allUploadedFiles = { ...existingFiles, ...newUploadedFiles };

		writeFileSync(blobUrlsPath, JSON.stringify(allUploadedFiles, null, 2));
		console.log('URLs guardadas en blobUrls.json');
	} catch (error) {
		console.error('Error durante la carga:', error);
	}
}

main().catch((error) => {
	console.error('Error en la ejecución de main:', error);
});
