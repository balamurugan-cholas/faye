import { useState } from 'react';
import { ImageModal } from './ImageModal';

interface HorizontalGalleryProps {
  images: string[];
}

export function HorizontalGallery({ images }: HorizontalGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; index: number } | null>(null);

  return (
    <>
      <div className="flex gap-8 overflow-x-auto py-16 px-8 md:px-16 lg:px-24 scrollbar-hide snap-x snap-mandatory">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-center cursor-pointer group"
            onClick={() => setSelectedImage({ url: image, index })}
          >
            <div className="relative overflow-hidden">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="h-[70vh] w-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          currentIndex={selectedImage.index}
          totalImages={images.length}
        />
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
