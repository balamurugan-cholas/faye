import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import img11 from '../portfolio/img11.jpeg';
import img12 from '../portfolio/img12.jpeg';
import img13 from '../portfolio/img13.jpeg';
import img14 from '../portfolio/img14.jpeg';
import img15 from '../portfolio/img15.jpeg';

interface FeaturedCard {
  image: string;
  title?: string;
}

const featuredCards: FeaturedCard[] = [
  { image: img11 },
  { image: img12 },
  { image: img13 },
  { image: img14 },
  { image: img15 },
];

export function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === featuredCards.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? featuredCards.length - 1 : prevIndex - 1;
      }
    });
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-6">
      {/* Section Title */}
      <div className="text-center mb-10 md:mb-14">
        <h2
          className="tracking-tight"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
            color: '#0E0E0E',
          }}
        >
          A Beautiful Moment
        </h2>

        <div className="w-12 h-[1px] bg-[#0E0E0E] mx-auto mt-4 opacity-60" />
      </div>

      {/* Carousel Wrapper (THIS is now the positioning parent) */}
      <div className="relative w-full h-[70vh] overflow-hidden rounded-2xl">

        {/* Navigation Arrows — correctly locked to carousel */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
          <button
            onClick={() => paginate(-1)}
            className="
              btn-rise
              w-12 h-12 rounded-full
              bg-white/90 dark:bg-black/50
              backdrop-blur-sm
              flex items-center justify-center
              text-[#0E0E0E] dark:text-white/80
              transition-all duration-300 shadow-lg
            "
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <button
            onClick={() => paginate(1)}
            className="
              btn-rise
              w-12 h-12 rounded-full
              bg-white/90 dark:bg-black/50
              backdrop-blur-sm
              flex items-center justify-center
              text-[#0E0E0E] dark:text-white/80
              transition-all duration-300 shadow-lg
            "
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Sliding Image */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) paginate(1);
              else if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={featuredCards[currentIndex].image}
              alt={`Featured ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {featuredCards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-[#0E0E0E] dark:bg-white'
                : 'w-1.5 bg-[#BDBDBD] dark:bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}