import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState<'residential' | 'commercial'>('residential');

  // Placeholder images - in production, these would be actual project photos
  const residentialImages = Array(12).fill(null).map((_, i) => ({
    id: i,
    url: `https://images.unsplash.com/photo-${1600566752355 + i * 1000}-4a8e3d1e9e1e?w=800&h=600&fit=crop`,
    alt: `Residential Project ${i + 1}`,
  }));

  const commercialImages = Array(8).fill(null).map((_, i) => ({
    id: i + 100,
    url: `https://images.unsplash.com/photo-${1497366216000 + i * 1000}-4a8e3d1e9e1e?w=800&h=600&fit=crop`,
    alt: `Commercial Project ${i + 1}`,
  }));

  const currentImages = currentCategory === 'residential' ? residentialImages : commercialImages;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : currentImages.length - 1);
    } else {
      setSelectedImage(selectedImage < currentImages.length - 1 ? selectedImage + 1 : 0);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Residential Projects Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Residential Projects
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {residentialImages.map((image, index) => (
              <div
                key={image.id}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => {
                  setCurrentCategory('residential');
                  openLightbox(index);
                }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Projects Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Commercial Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {commercialImages.map((image, index) => (
              <div
                key={image.id}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => {
                  setCurrentCategory('commercial');
                  openLightbox(index);
                }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-12 w-12" />
          </button>

          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-12 w-12" />
          </button>

          <img
            src={currentImages[selectedImage].url}
            alt={currentImages[selectedImage].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedImage + 1} / {currentImages.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
