import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { X, ChevronLeft, ChevronRight, ChevronRight as ArrowRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState<'main' | 'residential' | 'commercial' | string>('main');

  // Residential subcategories
  const residentialSubcategories = [
    'Modular Kitchen',
    'Living Rooms',
    'Bedrooms',
    'Wardrobes',
    'False Ceilings',
    'Wall Panelling',
    'Dressing Units',
  ];

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

  const getCurrentImages = () => {
    if (currentCategory === 'commercial') return commercialImages;
    return residentialImages;
  };

  const currentImages = getCurrentImages();

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

  // Main category view
  if (currentCategory === 'main') {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-accent text-center">
              Gallery
            </h1>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <button
                onClick={() => setCurrentCategory('residential')}
                className="relative h-96 rounded-xl overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop)` }}
                >
                  <div className="absolute inset-0 bg-accent/60 group-hover:brightness-110 transition-all" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                    RESIDENTIAL
                  </h2>
                </div>
              </button>
              <button
                onClick={() => setCurrentCategory('commercial')}
                className="relative h-96 rounded-xl overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop)` }}
                >
                  <div className="absolute inset-0 bg-accent/60 group-hover:brightness-110 transition-all" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                    COMMERCIAL
                  </h2>
                </div>
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Residential subcategories view
  if (currentCategory === 'residential' && selectedImage === null) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-6 text-sm text-muted-foreground">
              <button onClick={() => setCurrentCategory('main')} className="hover:text-primary">
                Gallery
              </button>{' '}
              &gt; Residential
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-accent">
              Residential Projects
            </h1>
            <div className="space-y-4">
              {residentialSubcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => setCurrentCategory(subcategory)}
                  className="w-full bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between group"
                >
                  <span className="font-semibold text-lg text-foreground">{subcategory}</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Image grid view (for subcategories or commercial)
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-muted-foreground">
            <button onClick={() => setCurrentCategory('main')} className="hover:text-primary">
              Gallery
            </button>
            {currentCategory !== 'commercial' && currentCategory !== 'main' && (
              <>
                {' > '}
                <button onClick={() => setCurrentCategory('residential')} className="hover:text-primary">
                  Residential
                </button>
                {' > '}
                {currentCategory}
              </>
            )}
            {currentCategory === 'commercial' && ' > Commercial'}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-accent">
            {currentCategory === 'commercial' ? 'Commercial Projects' : currentCategory}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentImages.map((image, index) => (
              <div
                key={image.id}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-300"
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
