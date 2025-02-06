import { put } from '@vercel/blob';
import { readdir, stat, readFile } from 'fs/promises';
import path from 'path';
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env' });

async function uploadFile(filePath: string, relativePath: string) {
	const fileContent = await readFile(filePath);
	const blob = await put(relativePath, fileContent, {
		access: 'public',
		token: process.env.BLOB_READ_WRITE_TOKEN, // Pasar el token explícitamente
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
	const uploadedFiles: { [key: string]: string } = {};

	for await (const filePath of walkDirectory(sourceDir)) {
		const relativePath = path.relative(sourceDir, filePath);
		const url = await uploadFile(filePath, relativePath);
		uploadedFiles[relativePath] = url;
	}

	return uploadedFiles;
}

async function main() {
	if (!process.env.BLOB_READ_WRITE_TOKEN) {
		console.error(
			'Error: BLOB_READ_WRITE_TOKEN no está definido en las variables de entorno.'
		);
		process.exit(1);
	}

	const publicDir = path.join(process.cwd(), 'public');
	console.log('Iniciando la carga de archivos desde:', publicDir);

	try {
		const uploadedFiles = await uploadDirectory(publicDir);
		console.log('Todos los archivos han sido subidos exitosamente.');
		console.log(
			'URLs de los archivos subidos:',
			JSON.stringify(uploadedFiles, null, 2)
		);

		writeFileSync('blob-urls.json', JSON.stringify(uploadedFiles, null, 2));
		console.log('URLs guardadas en blob-urls.json');
	} catch (error) {
		console.error('Error durante la carga:', error);
	}
}

main();
