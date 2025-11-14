import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAdmin } from "@/contexts/AdminContext";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageTransition from "@/components/admin/PageTransition";

const Gallery = () => {
  const { galleryImages } = useAdmin();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | "">(
    ""
  );

  const categoryParam = searchParams.get("category") || "main";
  const currentCategory = categoryParam;

  const RESIDENTIAL_CATEGORIES = [
    {
      name: "Modular Kitchen",
      bg: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    },
    {
      name: "Living Rooms",
      bg: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    },
    {
      name: "Bedrooms",
      bg: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    },
    {
      name: "False Ceiling",
      bg: "https://images.unsplash.com/photo-1615873968403-89e068629265",
    },
  ];

  const setCurrentCategory = (category: string) => {
    setSearchParams({ category });
  };

  const getCurrentImages = () => {
    if (currentCategory === "commercial") {
      return galleryImages.filter((img) => img.category === "commercial");
    }
    if (currentCategory === "main" || currentCategory === "residential") {
      return [];
    }
    return galleryImages.filter(
      (img) =>
        img.category === "residential" && img.subcategory === currentCategory
    );
  };

  const currentImages = getCurrentImages();

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) navigateLightbox("next");
    if (distance < -minSwipeDistance) navigateLightbox("prev");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      else if (e.key === "ArrowRight") navigateLightbox("next");
      else if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentImages.length]);

  useEffect(() => {
    document.body.style.overflow = selectedImage !== null ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => {
    setSelectedImage(null);
    setSlideDirection("");
    setIsAnimating(false);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (selectedImage === null || isAnimating) return;

    setIsAnimating(true);
    setSlideDirection(direction === "next" ? "left" : "right");

    setTimeout(() => {
      if (direction === "prev") {
        setSelectedImage(
          selectedImage > 0 ? selectedImage - 1 : currentImages.length - 1
        );
      } else {
        setSelectedImage(
          selectedImage < currentImages.length - 1 ? selectedImage + 1 : 0
        );
      }
      setIsAnimating(false);
      setSlideDirection("");
    }, 100);
  };

  const handleBackButton = () => navigate(-1);

  // ========================
  // MAIN CATEGORY PAGE
  // ========================
  if (currentCategory === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navbar />
        <PageTransition>
          <section className="pt-4 pb-20 md:py-16">
            <div className="container mx-auto px-4">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-12 text-primary text-center">
                Our Gallery
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {/* RESIDENTIAL */}
                <button
                  onClick={() => setCurrentCategory("residential")}
                  className="relative group h-[280px] md:h-[320px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.04]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.08]"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                      RESIDENTIAL
                    </h2>
                  </div>
                </button>

                {/* COMMERCIAL */}
                <button
                  onClick={() => setCurrentCategory("commercial")}
                  className="relative group h-[280px] md:h-[320px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.04]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.08]"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                      COMMERCIAL
                    </h2>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </PageTransition>
        <Footer />
      </div>
    );
  }

  // ========================
  // RESIDENTIAL – SUBCATEGORY PAGE
  // ========================
  if (currentCategory === "residential" && selectedImage === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navbar />
        <PageTransition>
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={handleBackButton}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>

                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary text-center flex-1">
                  Residential Projects
                </h1>

                <div className="w-6" />
              </div>

              {/* SUBCATEGORY TILES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RESIDENTIAL_CATEGORIES.map((category) => {
                  const imageCount = galleryImages.filter(
                    (img) =>
                      img.category === "residential" &&
                      img.subcategory === category.name
                  ).length;

                  return (
                    <button
                      key={category.name}
                      onClick={() => setCurrentCategory(category.name)}
                      className="relative group h-[250px] md:h-[280px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.04]"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.08]"
                        style={{
                          backgroundImage: `url(${category.bg}?w=1200&h=800&fit=crop)`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white drop-shadow">
                          {category.name}
                        </h3>
                        <p className="text-white/90 text-base font-medium mt-2">
                          {imageCount} {imageCount === 1 ? "Image" : "Images"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </PageTransition>
        <Footer />
      </div>
    );
  }

  // ========================
  // IMAGES PAGE (CATEGORY OR COMMERCIAL)
  // ========================
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <PageTransition>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleBackButton}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary text-center flex-1">
                {currentCategory === "commercial"
                  ? "Commercial Projects"
                  : currentCategory}
              </h1>

              <div className="w-6" />
            </div>

            {currentImages.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No images in this category yet.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Images will appear here once uploaded via Admin Panel.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {currentImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </PageTransition>

      {/* FULLSCREEN LIGHTBOX */}
      {selectedImage !== null && currentImages.length > 0 && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20 bg-black/50 p-3 rounded-full backdrop-blur-sm"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev - Hidden on mobile */}
          <button
            onClick={() => navigateLightbox("prev")}
            disabled={isAnimating}
            className="hidden md:block absolute left-4 text-white hover:text-gray-300 transition-colors z-20 bg-black/50 p-3 rounded-full backdrop-blur-sm disabled:opacity-50"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Next - Hidden on mobile */}
          <button
            onClick={() => navigateLightbox("next")}
            disabled={isAnimating}
            className="hidden md:block absolute right-4 text-white hover:text-gray-300 transition-colors z-20 bg-black/50 p-3 rounded-full backdrop-blur-sm disabled:opacity-50"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image with Slide Animation */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
            <img
              src={currentImages[selectedImage].url}
              alt={currentImages[selectedImage].alt}
              className={`max-h-screen max-w-screen object-contain select-none transition-all duration-200 ease-out ${
                slideDirection === "left" ? "lightbox-slide-out-left" : ""
              } ${
                slideDirection === "right" ? "lightbox-slide-out-right" : ""
              } ${!slideDirection ? "lightbox-slide-in" : ""}`}
              draggable={false}
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm">
            {selectedImage + 1} / {currentImages.length}
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes lightboxSlideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-30%);
            opacity: 0;
          }
        }

        @keyframes lightboxSlideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(30%);
            opacity: 0;
          }
        }

        @keyframes lightboxSlideIn {
          from {
            transform: translateX(0);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .lightbox-slide-out-left {
          animation: lightboxSlideOutLeft 0.2s ease-out forwards;
        }

        .lightbox-slide-out-right {
          animation: lightboxSlideOutRight 0.2s ease-out forwards;
        }

        .lightbox-slide-in {
          animation: lightboxSlideIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
