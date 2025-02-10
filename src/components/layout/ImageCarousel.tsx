import React, { type JSX } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

interface ImageCarouselProps {
  images: { url: string; title: string; description: string }[];
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
  newsId,
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
                newsId === 1
                  ? // Configuración para newsId === 1
                    'aspect-9/16 sm:aspect-2/3 md:aspect-9/16 lg:aspect-9/16 h-[500px] rounded-lg border border-gray-300 sm:h-[700px] lg:h-[600px]'
                  : newsId === 2 || newsId === 3
                    ? 'aspect-square lg:aspect-4/3 h-[700px] rounded-lg border border-gray-300 sm:h-[700px] md:h-[300px] lg:h-[600px]'
                    : // Configuración por defecto
                      'aspect-4/3 rounded-lg border border-gray-300 sm:h-[400px] md:h-[500px] lg:h-[600px]'
              }`}
            >
              <Image
                fill
                alt={image.title || image.description}
                className="rounded-lg object-contain"
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
                quality={90}
                sizes="100vw"
                src={image.url}
              />
            </div>
          ))}
        </div>
      </div>
      <Button
        aria-label="Previous"
        className="bg-primary text-primary-foreground hover:bg-primary/90 absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full p-3 transition-transform duration-200 ease-out hover:scale-110 active:scale-90"
        onClick={onPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        aria-label="Next"
        className="bg-primary text-primary-foreground hover:bg-primary/90 absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full p-3 transition-transform duration-200 ease-out hover:scale-110 active:scale-90"
        onClick={onNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
