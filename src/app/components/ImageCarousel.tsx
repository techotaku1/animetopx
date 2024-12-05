import Image from "next/image";
import {ChevronLeft, ChevronRight} from "lucide-react";

import {Button} from "@/components/ui/button";

interface ImageCarouselProps {
  images: {url: string; title: string; description: string}[];
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
          style={{transform: `translateX(-${currentIndex * 100}%)`}}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-full flex-shrink-0 ${
                newsId === 1
                  ? // Configuración para newsId === 1
                    "aspect-[9/16] h-[50vh] rounded-lg border border-gray-300 sm:aspect-[2/3] sm:h-[70vh] md:aspect-[9/16] lg:aspect-[9/16] lg:h-[80vh]"
                  : newsId === 2 || newsId === 3
                    ? "xs:h-[70vw] aspect-square h-[70vw] rounded-lg border border-gray-300 sm:h-[70vw] md:h-[30vw] lg:h-[35vw]"
                    : // Configuración por defecto
                      "aspect-[4/3] rounded-lg border border-gray-300 sm:h-[40vh] md:h-[50vh] lg:h-[70vh]"
              }`}
            >
              <Image
                fill
                alt={image.title || image.description}
                className="rounded-lg object-contain"
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
                quality={85}
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={image.url}
              />
            </div>
          ))}
        </div>
      </div>
      <Button
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-primary p-3 text-primary-foreground transition-transform duration-200 ease-out hover:scale-110 hover:bg-primary/90 active:scale-90"
        onClick={onPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-primary p-3 text-primary-foreground transition-transform duration-200 ease-out hover:scale-110 hover:bg-primary/90 active:scale-90"
        onClick={onNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
