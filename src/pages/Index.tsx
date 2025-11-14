import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ServicesSection from "@/components/ServicesSection";
import EndToEndSection from "@/components/EndToEndSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReviewCard from "@/components/ReviewCard";
import heroImage from "@/assets/hero-bg.jpg";
import founderImage from "@/assets/founder.jpg";

const Index = () => {
  const navigate = useNavigate();

  // Same reviews from Reviews page - first 4
  const featuredReviews = [
    {
      name: "Rajesh Kumar",
      rating: 5,
      review:
        "Outstanding work! The team transformed our home beautifully. Very professional and delivered on time. The attention to detail was remarkable.",
    },
    {
      name: "Priya Sharma",
      rating: 5,
      review:
        "Excellent modular kitchen design. The quality of materials and finish is top-notch. Highly recommended! They made the entire process smooth and stress-free.",
    },
    {
      name: "Anil Patel",
      rating: 5,
      review:
        "Great attention to detail. The false ceiling work was done perfectly. Very satisfied with the results and the professionalism of the team.",
    },
    {
      name: "Meena Reddy",
      rating: 5,
      review:
        "Professional team and excellent craftsmanship. They understood our requirements perfectly and delivered beyond our expectations.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section - NO GAP after navbar */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
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
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg">
            <a href="#contact">Book Free Design Session</a>
          </Button>
        </div>
      </section>

      {/* Founder Section - Clean, Strong & Professional */}
      <section className="pt-16 md:pt-20 pb-24 md:pb-28 bg-gradient-to-b from-[#F5EFE7] to-[#F9F7F3] flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary tracking-wide">
              ABOUT SRI CHAMUNDESHWARI INTERIORS
            </h2>
            <div className="w-24 h-[3px] bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-14">
            {/* Founder Image */}
            <div className="md:w-1/2 w-full relative">
              <img
                src={founderImage}
                alt="Mr. Ganapathlal - Founder"
                className="w-full h-[420px] md:h-[460px] object-cover rounded-2xl shadow-lg border border-[#E7DED2]"
              />
            </div>

            {/* Text Section */}
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

      {/* End-to-End Solutions Section */}
      <EndToEndSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* ✅ Reviews Section - WHITE BACKGROUND */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
              Hear what our clients say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stories of trust, satisfaction, and beautifully transformed
              spaces.
            </p>
          </div>

          {/* Reviews Grid - 4 Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto mb-8">
            {featuredReviews.map((review, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ReviewCard {...review} />
              </div>
            ))}
          </div>

          {/* Read More Button */}
          <div className="text-center">
            <Button
              onClick={() => navigate("/reviews")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              Read More Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Contact Us
          </h2>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
