import React, { type JSX } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

interface ImageCarouselProps {
	images: {
		url: string;
		title: string;
		description: string;
		aspectRatio?: string;
	}[];
	currentIndex: number;
	onPrev: () => void;
	onNext: () => void;
	newsId: number;
}

export function ImageCarousel({
	images,
	currentIndex,
	onPrev,
	onNext,
}: ImageCarouselProps): JSX.Element {
	return (
		<div className="relative mb-8 w-full lg:mb-0 lg:w-1/2">
			<div className="overflow-hidden rounded-lg shadow-lg">
				<div
					className="flex transition-transform duration-300 ease-in-out"
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				>
					{images.map((image, index) => (
						<div
							key={index}
							className={`relative w-full shrink-0 ${
								image.aspectRatio === '9/16'
									? 'aspect-9/16 h-[500px] sm:h-[700px] lg:h-[600px]'
									: image.aspectRatio === '4/3'
										? 'aspect-4/3 h-[700px] sm:h-[700px] md:h-[300px] lg:h-[600px]'
										: 'aspect-square h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px]'
							} rounded-lg border border-gray-300`}
						>
							<Image
								fill
								alt={image.title || image.description}
								className="rounded-lg object-contain"
								loading={index === 0 ? 'eager' : 'lazy'}
								quality={90}
								sizes="100vw"
								src={image.url}
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAALCAYAAABCm8wlAAAAAXNSR0IArs4c6QAAAV5JREFUKFMFwT1PGmEAwPH/0ztANJigQC9qjW+DURNcdCK0urnbwdikez+HQ7cu/QDVLg7GmBh1MEYTlPCmOaABThEa8Y1TSyAF7QE+/f3E3XVeOlRJ1SzD1Tn3F0W8M0G8vgHqG2lELn8uKxkdpXaPS33FMG4wCyaB2fd07D8gSpm4rMa3eEzlSFedLCx95Pcvg/63HlpCQ8QOD6TtJY/b5aWcjtIxGaDtrOFu9tBYNRCJ2InsEqDU7rBK/7DPeWnZS9QqFsUTBXFzlZXZ00v6XQI9nGT+8ycqRg7TeUskbCL0aEJWMln+JmM0HSras4IypOGeeMf37Qgiun8mj7595UNgGpumooYMLs0/+IKdrBd7ELs/9mQ5tEnxyY5i68Lf2+RBLzC+ssgtI4iUHpPdb1o0kwVSO8dYnk54sfB/WWZwbBixtvZTTo324fG4qTcs2o06NocDbWSIVvuV/5F0nYOxy2bQAAAAAElFTkSuQmCC'
							/>
						</div>
					))}
				</div>
			</div>
			<Button
				aria-label="Previous"
				className="ml-4 bg-primary text-primary-foreground hover:bg-black/70 absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full p-3 transition-transform duration-200 ease-out hover:scale-110 active:scale-90"
				onClick={onPrev}
			>
				<ChevronLeft className="h-6 w-6" />
			</Button>
			<Button
				aria-label="Next"
				className="mr-4 bg-primary text-primary-foreground hover:bg-black/70 absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full p-3 transition-transform duration-200 ease-out hover:scale-110 active:scale-90"
				onClick={onNext}
			>
				<ChevronRight className="h-6 w-6" />
			</Button>
		</div>
	);
}
