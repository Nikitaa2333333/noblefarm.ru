import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  caption?: string;
}

interface ImageCarouselProps {
  slides: Slide[];
  alt: string;
  aspect?: string;
}

export default function ImageCarousel({ slides, alt, aspect = 'aspect-[4/3]' }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const go = (dir: number) => setIndex((prev) => (prev + dir + count) % count);
  const active = slides[index];

  return (
    <div className="flex flex-col gap-4">
      <div className={`relative ${aspect} overflow-hidden shadow-soft`}>
        <img
          src={active.image}
          alt={`${alt} ${index + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-secondary/60 text-text-light hover:bg-secondary/80 transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-secondary/60 text-text-light hover:bg-secondary/80 transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {active.caption && (
        <p className="body-sm text-center min-h-[3rem]">{active.caption}</p>
      )}

      {count > 1 && (
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-accent' : 'w-2 bg-text-dark/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
