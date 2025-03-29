import Image from 'next/image';

import { getBlobUrl } from '@/lib/blobUtils';

interface BlobImageProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
}

export default function BlobImage({
	src,
	alt,
	width,
	height,
	className,
}: BlobImageProps) {
	const blobSrc = getBlobUrl(src);

	return (
		<Image
			src={blobSrc || '/placeholder.svg'}
			alt={alt}
			width={width}
			height={height}
			className={className}
		/>
	);
}
