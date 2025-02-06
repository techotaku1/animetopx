import blobUrls from '../../blob-urls.json';

export function getBlobUrl(localPath: string): string {
  // Normaliza la ruta para manejar correctamente las barras invertidas
  const normalizedPath = localPath.replace(/\\/g, '/');
  const url = (blobUrls as Record<string, string>)[normalizedPath];
  return url?.startsWith('http') ? url : '/placeholder.svg';
}
