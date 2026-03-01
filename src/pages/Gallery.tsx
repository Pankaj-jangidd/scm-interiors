import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useAdmin } from "@/contexts/AdminContext";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageTransition from "@/components/admin/PageTransition";
import { getThumbnailUrl, getFullSizeUrl } from "@/lib/cloudinary";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Gallery = () => {
  const { galleryImages } = useAdmin();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const categoryParam = searchParams.get("category") || "main";
  const currentCategory = categoryParam;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentCategory]);

  const RESIDENTIAL_CATEGORIES = [
    {
      name: "Modular Kitchen",
      bg: "https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_350,h_220,c_fill,dpr_auto/v1763230593/kitchen_mwplnp.jpg",
    },
    {
      name: "Living Rooms",
      bg: "https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_350,h_220,c_fill,dpr_auto/v1763230594/living_bl7005.jpg",
    },
    {
      name: "Bedrooms",
      bg: "https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_350,h_220,c_fill,dpr_auto/v1763230591/bedroom_acdycq.jpg",
    },
    {
      name: "False Ceiling",
      bg: "https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_350,h_220,c_fill,dpr_auto/v1763230592/painter_vejlgd.jpg",
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
        img.category === "residential" && img.subcategory === currentCategory,
    );
  };

  const currentImages = getCurrentImages();

  const handleWheel = (e: React.WheelEvent) => {
    if (isSwiping) return;
    if (Math.abs(e.deltaX) > 40) {
      if (e.deltaX > 0) navigateLightbox("next");
      else navigateLightbox("prev");
      setIsSwiping(true);
      setTimeout(() => setIsSwiping(false), 500);
    }
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

    if (selectedImage !== null) {
      window.history.pushState({ lightboxOpen: true }, "");
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (selectedImage !== null) {
        e.preventDefault();
        closeLightbox();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedImage]);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (newDirection: "prev" | "next") => {
    if (selectedImage === null) return;

    if (newDirection === "next") {
      setDirection(1);
      setSelectedImage(
        selectedImage < currentImages.length - 1 ? selectedImage + 1 : 0,
      );
    } else {
      setDirection(-1);
      setSelectedImage(
        selectedImage > 0 ? selectedImage - 1 : currentImages.length - 1,
      );
    }
  };

  const handleBackButton = () => {
    if (selectedImage !== null) {
      closeLightbox();
      return;
    }

    if (currentCategory === "commercial" || currentCategory === "residential") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("gallery")
          ?.scrollIntoView({ behavior: "instant" });
      }, 0);
    } else if (RESIDENTIAL_CATEGORIES.some((c) => c.name === currentCategory)) {
      setCurrentCategory("residential");
    } else {
      navigate("/");
    }
  };

  // ========================
  // MAIN CATEGORY PAGE
  // ========================
  if (currentCategory === "main") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <PageTransition>
          <section className="pt-8 pb-20 md:py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-14">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  Our Gallery
                </h1>
                <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore our residential and commercial interior projects
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* RESIDENTIAL */}
                <button
                  onClick={() => setCurrentCategory("residential")}
                  className="relative group h-[300px] md:h-[360px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_800,h_500,c_fill/v1763230593/residential_atsi3m.avif")`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
                      RESIDENTIAL
                    </h2>
                    <div className="w-12 h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </button>

                {/* COMMERCIAL */}
                <button
                  onClick={() => setCurrentCategory("commercial")}
                  className="relative group h-[300px] md:h-[360px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_800,h_500,c_fill/v1763230591/commercial_m9o5us.jpg")`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
                      COMMERCIAL
                    </h2>
                    <div className="w-12 h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </button>
              </div>
            </div>
          </section>
        </PageTransition>
      </div>
    );
  }

  // ========================
  // RESIDENTIAL – SUBCATEGORY PAGE
  // ========================
  if (currentCategory === "residential" && selectedImage === null) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <PageTransition>
          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex items-center justify-between mb-10">
                <button
                  onClick={handleBackButton}
                  className="text-muted-foreground hover:text-accent transition-colors p-2 -ml-2"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>

                <div className="text-center flex-1">
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                    Residential Projects
                  </h1>
                  <div className="w-12 h-0.5 bg-accent mx-auto mt-4 rounded-full" />
                </div>

                <div className="w-10" />
              </div>

              {/* SUBCATEGORY TILES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {RESIDENTIAL_CATEGORIES.map((category, index) => {
                  const imageCount = galleryImages.filter(
                    (img) =>
                      img.category === "residential" &&
                      img.subcategory === category.name,
                  ).length;

                  return (
                    <button
                      key={category.name}
                      onClick={() => setCurrentCategory(category.name)}
                      className="relative group h-[250px] md:h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${category.bg})`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white drop-shadow mb-2">
                          {category.name}
                        </h3>
                        <div className="w-10 h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mb-3" />
                        <p className="text-white/90 text-base font-medium">
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
      </div>
    );
  }

  // ========================
  // IMAGES PAGE (CATEGORY OR COMMERCIAL)
  // ========================
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageTransition>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <button
                onClick={handleBackButton}
                className="text-muted-foreground hover:text-accent transition-colors p-2 -ml-2"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>

              <div className="text-center flex-1">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {currentCategory === "commercial"
                    ? "Commercial Projects"
                    : currentCategory}
                </h1>
                <div className="w-12 h-0.5 bg-accent mx-auto mt-4 rounded-full" />
              </div>

              <div className="w-10" />
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
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-500 group"
                    onClick={() => openLightbox(index)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <img
                      src={getThumbnailUrl(image.url)}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden"
          onWheel={handleWheel}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-20 bg-black/50 p-3 rounded-full backdrop-blur-sm"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev - Hidden on mobile */}
          <button
            onClick={() => navigateLightbox("prev")}
            className="hidden md:block absolute left-4 text-white hover:text-accent transition-colors z-20 bg-black/50 p-3 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Next - Hidden on mobile */}
          <button
            onClick={() => navigateLightbox("next")}
            className="hidden md:block absolute right-4 text-white hover:text-accent transition-colors z-20 bg-black/50 p-3 rounded-full backdrop-blur-sm"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image with Slide Animation */}
          <div className="relative w-full h-full flex items-center justify-center pt-10 pb-20">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={selectedImage}
                src={getFullSizeUrl(currentImages[selectedImage].url)}
                alt={currentImages[selectedImage].alt}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    navigateLightbox("next");
                  } else if (swipe > swipeConfidenceThreshold) {
                    navigateLightbox("prev");
                  }
                }}
                className="absolute max-h-full max-w-full object-contain select-none px-2 md:px-16"
                draggable={false}
              />
            </AnimatePresence>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm z-20">
            {selectedImage + 1} / {currentImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
