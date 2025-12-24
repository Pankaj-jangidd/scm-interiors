import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import EndToEndSection from "@/components/EndToEndSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Phone, Mail, MapPin } from "lucide-react";
import PageTransition from "@/components/admin/PageTransition";

const Index = () => {
  const navigate = useNavigate();

  const contactOptions = [
    {
      icon: Phone,
      title: "Call Now",
      mobileTitle: "Call Now",
      description: "Speak directly with our design experts.",
      action: "tel:+918824374977",
      buttonText: "CALL NOW",
      color: "text-primary",
    },
    {
      icon: () => (
        <div
          style={{
            width: "52px",
            height: "52px",
            backgroundColor: "#25D366",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            width="50"
            height="50"
          >
            <path
              fill="#fff"
              d="M16.04 2C8.84 2 3 7.85 3 15.05c0 2.57.74 5.05 2.14 7.21L3 29l6.89-2.09A12.9 12.9 0 0 0 16.04 28c7.2 0 13.04-5.85 13.04-12.95S23.24 2 16.04 2Z"
            />
            <path
              fill="#25D366"
              d="M16.04 4.5c6.3 0 11.54 5.1 11.54 10.55 0 5.95-4.6 10.55-11.54 10.55-2.18 0-4.3-.64-6.1-1.85l-.43-.28-4.06 1.23 1.24-3.93-.29-.45A9.6 9.6 0 0 1 4.5 15c0-5.45 5.24-10.55 11.54-10.55Z"
            />
            <path
              fill="#fff"
              d="M12.75 9.75c-.26-.56-.54-.57-.8-.58h-.67c-.23 0-.6.09-.92.43s-1.2 1.17-1.2 2.85 1.23 3.3 1.4 3.52 2.36 3.68 5.81 5.01c2.87 1.13 3.44.9 4.07.85.63-.05 2-1.03 2.28-2.03s.28-1.86.2-2.03c-.08-.17-.29-.26-.6-.46s-1.88-.93-2.17-1.03c-.29-.1-.47-.15-.67.15s-.77 1.03-.95 1.25c-.17.22-.34.25-.64.09-.3-.17-1.28-.47-2.44-1.47-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.47.13-.62.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.55-.09-.17-.8-1.87-1.13-2.55Z"
            />
          </svg>
        </div>
      ),
      title: "WhatsApp Us",
      mobileTitle: "WhatsApp",
      description: "Chat with our design team instantly.",
      action:
        "https://wa.me/918824374977?text=Hi%20SCM%20Interiors,%20I%27m%20interested%20in%20your%20interior%20design%20services!",
      buttonText: "WHATSAPP US",
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Mail Us",
      mobileTitle: "Mail Us",
      description: "Send us your project details and queries.",
      action: "mailto:scminteriorss@gmail.com",
      buttonText: "MAIL US",
      color: "text-primary",
    },
    {
      icon: MapPin,
      title: "Get Directions",
      mobileTitle: "Directions",
      description: "Visit our office in Electronic City, Bengaluru.",
      action:
        "https://www.google.com/maps/search/?api=1&query=Sri%20Chamundeshwari%20Interiors%2C%20VM6H%2B8FF%2C%20Vinayaka%20Layout%20Main%20Rd%2C%20Silicon%20Town%2C%20Electronic%20City%2C%20Bengaluru%2C%20Karnataka%20560100",
      buttonText: "GET DIRECTIONS",
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageTransition>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_60,c_fill,w_1200,h_700/v1763230592/hero-bg_h6ylfk.jpg")`,
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              End-to-end interior solutions in Bangalore
            </h1>
            <p className="text-lg md:text-xl mb-8 font-light">
              30+ years of Experience | Bangalore, Karnataka
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-lg"
              onClick={() => navigate("/contact")}
            >
              Book Free Design Session
            </Button>
          </div>
        </section>
      </PageTransition>
      {/* Founder Section */}
      <section
        className="pt-16 md:pt-20 pb-24 md:pb-28 flex items-center"
        style={{ backgroundColor: "#F9F7F3" }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary tracking-wide">
              ABOUT SRI CHAMUNDESHWARI INTERIORS
            </h2>
            <div className="w-24 h-[3px] bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-14">
            <div className="md:w-1/2 w-full relative">
              <img
                src="https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_600/v1763230592/founder_kv8phh.jpg"
                alt="Mr. Ganapathlal - Founder"
                loading="lazy"
                className="w-full h-[420px] md:h-[460px] object-cover rounded-2xl shadow-lg border border-[#E7DED2]"
              />
            </div>

            <div className="md:w-1/2 w-full space-y-5">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 text-left">
                The Man Behind the Legacy
              </h2>

              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                  Mr. Ganapathlal
                </h3>
                <p className="text-base text-muted-foreground">
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

              <div className="pt-2 border-t border-border mt-4">
                <p className="text-base md:text-lg text-muted-foreground font-semibold mt-1">
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
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "#F9F7F3" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
              OUR GALLERY
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CLICK to Explore our residential and commercial projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* RESIDENTIAL */}
            <button
              onClick={() => navigate("/gallery?category=residential")}
              className="relative group h-[280px] md:h-[320px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.04]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.08]"
                style={{
                  backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,c_fill,w_800,h_500/v1763230593/residential_atsi3m.avif")`,
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
              onClick={() => navigate("/gallery?category=commercial")}
              className="relative group h-[280px] md:h-[320px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.04]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.08]"
                style={{
                  backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,c_fill,w_800,h_500/v1763230591/commercial_m9o5us.jpg")`,
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

      {/* End-to-End Solutions Section */}
      <EndToEndSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Buttons Section */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "#F9F7F3" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
              Get in Touch
            </h2>
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
                    className="bg-card rounded-lg p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <Icon className={`w-8 h-8 ${option.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      <span className="md:hidden">{option.mobileTitle}</span>
                      <span className="hidden md:inline">{option.title}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-grow hidden md:block">
                      {option.description}
                    </p>
                    <Button
                      asChild
                      className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md w-full"
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
