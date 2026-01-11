import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import EndToEndSection from "@/components/EndToEndSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Phone, Mail, MapPin } from "lucide-react";
import PageTransition from "@/components/admin/PageTransition";

// Hero slider images - Premium luxury interior categories
const heroImages = [
  // 1. Luxury Living Room - White sofas with grand TV unit
  "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&h=900&q=90",
  // 2. Modular Kitchen - full wall and base cabinets
  "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&h=900&q=90",
  // 3. Master Bedroom with Premium Wardrobes and Bed
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&h=900&q=90",
  // 4. Textured Wall with Photos/Shelves - Feature wall design
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&h=900&q=90",
  // 5. Luxury Corporate Office - Premium commercial workspace
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&h=900&q=90",
];

const Index = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-slide every 3.5 seconds with infinite loop (always forward)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Handle infinite loop - when we reach the cloned first image, jump back instantly
  useEffect(() => {
    if (currentImageIndex === heroImages.length) {
      // We've reached the clone, wait for transition to finish then jump back
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentImageIndex(0);
      }, 700);
      return () => clearTimeout(timeout);
    } else if (!isTransitioning) {
      // Re-enable transition after instant jump
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentImageIndex, isTransitioning]);

  const contactOptions = [
    {
      icon: Phone,
      title: "Call Now",
      mobileTitle: "Call Now",
      description: "Speak directly with our design experts.",
      action: "tel:+918824374977",
      buttonText: "CALL NOW",
    },
    {
      icon: () => (
        <img
          src="/whatsapp-icon.png"
          alt="WhatsApp"
          className="w-[52px] h-[52px] object-contain"
        />
      ),
      title: "WhatsApp Us",
      mobileTitle: "WhatsApp",
      description: "Chat with our design team instantly.",
      action:
        "https://wa.me/918824374977?text=Hi%20SCM%20Interiors,%20I%27m%20interested%20in%20your%20interior%20design%20services!",
      buttonText: "WHATSAPP US",
    },
    {
      icon: Mail,
      title: "Mail Us",
      mobileTitle: "Mail Us",
      description: "Send us your project details and queries.",
      action: "mailto:scminteriorss@gmail.com",
      buttonText: "MAIL US",
    },
    {
      icon: MapPin,
      title: "Get Directions",
      mobileTitle: "Directions",
      description: "Visit our office in Electronic City, Bengaluru.",
      action:
        "https://www.google.com/maps/search/?api=1&query=Sri%20Chamundeshwari%20Interiors%2C%20VM6H%2B8FF%2C%20Vinayaka%20Layout%20Main%20Rd%2C%20Silicon%20Town%2C%20Electronic%20City%2C%20Bengaluru%2C%20Karnataka%20560100",
      buttonText: "GET DIRECTIONS",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageTransition>
        {/* Hero Section with Image Slider */}
        <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
          {/* Image Slider - Infinite loop sliding animation */}
          <div
            ref={sliderRef}
            className={`absolute inset-0 flex ${
              isTransitioning
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              width: `${(heroImages.length + 1) * 100}%`,
              transform: `translateX(-${
                currentImageIndex * (100 / (heroImages.length + 1))
              }%)`,
            }}
          >
            {/* Original images */}
            {heroImages.map((image, index) => (
              <div
                key={index}
                className="h-full bg-cover bg-center flex-shrink-0"
                style={{
                  backgroundImage: `url("${image}")`,
                  width: `${100 / (heroImages.length + 1)}%`,
                }}
              />
            ))}
            {/* Clone of first image for seamless infinite loop */}
            <div
              className="h-full bg-cover bg-center flex-shrink-0"
              style={{
                backgroundImage: `url("${heroImages[0]}")`,
                width: `${100 / (heroImages.length + 1)}%`,
              }}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              End-to-end interior solutions in Bangalore
            </h1>
            <p className="text-lg md:text-xl mb-10 font-light text-white/90">
              30+ years of Experience | Bangalore, Karnataka
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/contact")}
            >
              Book Free Design Session
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentImageIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentImageIndex % heroImages.length === index
                    ? "bg-accent w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </PageTransition>

      {/* Founder Section */}
      <section className="py-20 md:py-24 flex items-center bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              ABOUT SRI CHAMUNDESHWARI INTERIORS
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-16">
            <div className="md:w-1/2 w-full relative">
              <img
                src="https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_600/v1763230592/founder_kv8phh.jpg"
                alt="Mr. Ganapathlal - Founder"
                loading="lazy"
                className="w-full h-[420px] md:h-[480px] object-cover rounded-2xl shadow-2xl"
              />
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-xl -z-10" />
            </div>

            <div className="md:w-1/2 w-full space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-left">
                The Man Behind the Legacy
              </h2>

              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                  Mr. Ganapathlal
                </h3>
                <p className="text-base text-accent font-medium">
                  Founder & Principal Contractor
                </p>
              </div>

              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                With over three decades of experience,{" "}
                <span className="font-medium text-foreground">
                  Mr. Ganapathlal
                </span>{" "}
                has turned Sri Chamundeshwari Interiors into one of Bangalore's
                most trusted interior execution firms. Starting from the ground
                up, his vision, precision, and hard work have shaped countless
                homes and commercial spaces across the city.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                His leadership style is simple — focus on quality, be honest
                with clients, and deliver on time. These principles have defined
                SCM Interiors for over 30 years and continue to guide every
                project we undertake.
              </p>

              <div className="pt-4 border-t border-border mt-6">
                <p className="text-lg text-foreground font-semibold">
                  Contact: +91 8824374977
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Gallery Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              OUR GALLERY
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CLICK to Explore our residential and commercial projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* RESIDENTIAL */}
            <button
              onClick={() => navigate("/gallery?category=residential")}
              className="relative group h-[300px] md:h-[360px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,c_fill,w_800,h_500/v1763230593/residential_atsi3m.avif")`,
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
              onClick={() => navigate("/gallery?category=commercial")}
              className="relative group h-[300px] md:h-[360px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,c_fill,w_800,h_500/v1763230591/commercial_m9o5us.jpg")`,
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

      {/* End-to-End Solutions Section */}
      <EndToEndSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Buttons Section */}
      <section className="py-20 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with us directly through your preferred channel
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center border-0"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      <span className="md:hidden">{option.mobileTitle}</span>
                      <span className="hidden md:inline">{option.title}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 flex-grow hidden md:block">
                      {option.description}
                    </p>
                    <Button
                      asChild
                      className="bg-accent hover:bg-accent/90 text-white shadow-md w-full transition-all duration-300 hover:shadow-lg"
                    >
                      <a
                        href={option.action}
                        target={
                          option.action.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          option.action.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {option.buttonText}
                      </a>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
