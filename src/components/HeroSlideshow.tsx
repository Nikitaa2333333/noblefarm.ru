import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSlideshowProps {
  images: string[];
  alt: string;
  intervalMs?: number;
}

export default function HeroSlideshow({ images, alt, intervalMs = 3000 }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images, intervalMs]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={index}
          src={images[index]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          loading="eager"
        />
      </AnimatePresence>
    </div>
  );
}
