import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAdmin } from '@/contexts/AdminContext';
import { X, ChevronLeft, ChevronRight, ChevronRight as ArrowRight } from 'lucide-react';

const Gallery = () => {
  const { galleryImages } = useAdmin();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState<'main' | 'residential' | 'commercial' | string>('main');

  // Get unique subcategories for residential images
  const residentialSubcategories = useMemo(() => {
    const residential = galleryImages.filter(img => img.category === 'residential');
    const unique = Array.from(new Set(residential.map(img => img.subcategory).filter(Boolean)));
    return unique.sort();
  }, [galleryImages]);

  // Get current images based on category
  const getCurrentImages = () => {
    if (currentCategory === 'commercial') {
      return galleryImages.filter(img => img.category === 'commercial');
    }
    if (currentCategory === 'main' || currentCategory === 'residential') {
      return [];
    }
    // Specific subcategory for residential
    return galleryImages.filter(
      img => img.category === 'residential' && img.subcategory === currentCategory
    );
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
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-primary text-center">
              Gallery
            </h1>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <button
                onClick={() => setCurrentCategory('residential')}
                className="relative h-96 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center brightness-75 group-hover:brightness-90 transition-all duration-300"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop)` }}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    RESIDENTIAL
                  </h2>
                </div>
              </button>
              <button
                onClick={() => setCurrentCategory('commercial')}
                className="relative h-96 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center brightness-75 group-hover:brightness-90 transition-all duration-300"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop)` }}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
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
    const predefinedCategories = [
      'Modular Kitchen',
      'Living Rooms',
      'Wardrobes',
      'Bedrooms',
      'Dressing Units',
      'False Ceiling',
      'Pooja Units',
    ];

    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-6 text-sm text-muted-foreground">
              <button onClick={() => setCurrentCategory('main')} className="hover:text-primary transition-colors">
                Gallery
              </button>{' '}
              &gt; Residential
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-primary text-center">
              Residential Projects
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {predefinedCategories.map((category) => {
                const imageCount = galleryImages.filter(
                  img => img.category === 'residential' && img.subcategory === category
                ).length;
                
                return (
                  <button
                    key={category}
                    onClick={() => setCurrentCategory(category)}
                    className="group relative bg-card rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-primary/50"
                  >
                    <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {imageCount} {imageCount === 1 ? 'image' : 'images'}
                    </p>
                    <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
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
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-muted-foreground">
            <button onClick={() => setCurrentCategory('main')} className="hover:text-primary transition-colors">
              Gallery
            </button>
            {currentCategory !== 'commercial' && currentCategory !== 'main' && (
              <>
                {' > '}
                <button onClick={() => setCurrentCategory('residential')} className="hover:text-primary transition-colors">
                  Residential
                </button>
                {' > '}
                {currentCategory}
              </>
            )}
            {currentCategory === 'commercial' && ' > Commercial'}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-primary text-center">
            {currentCategory === 'commercial' ? 'Commercial Projects' : currentCategory}
          </h1>
          {currentImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No images in this category yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Images will appear here once uploaded via Admin Panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentImages.map((image, index) => (
                <div
                  key={image.id}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-all duration-300"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && currentImages.length > 0 && (
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
