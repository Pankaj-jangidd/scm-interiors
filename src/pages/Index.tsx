import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import ServicesSection from '@/components/ServicesSection';
import EndToEndSection from '@/components/EndToEndSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import heroImage from '@/assets/hero-bg.jpg';
import founderImage from '@/assets/founder.jpg';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
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

      {/* About Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            About Sri Chamundeshwari Interiors
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="flex flex-col items-center">
              <img
                src={founderImage}
                alt="Mr. Ganapath Lal - Founder of Sri Chamundeshwari Interiors"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-4"
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground">Mr. Ganapath Lal</h3>
                <p className="text-base text-muted-foreground">Founder & Principal Contractor</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-left">
                With over three decades of hands-on experience in interior execution, Mr. Ganapati Lal has built Sri Chamundeshwari Interiors into one of Bangalore's most trusted names. His commitment to precision craftsmanship and client satisfaction has shaped countless residential and commercial spaces across the city. Every project reflects his dedication to quality and attention to detail, ensuring spaces that truly feel like home. His expertise spans traditional carpentry to modern modular solutions, bringing together time-tested techniques with contemporary design sensibilities.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-left">
                Founded in Bangalore, Sri Chamundeshwari Interiors & Contractors specializes in comprehensive interior solutions from concept to completion. Our experienced team handles everything from modular kitchens and wardrobes to false ceilings and complete home makeovers. We believe in transparent pricing, timely delivery, and creating spaces that blend functionality with aesthetic appeal. Whether it's a cozy apartment or a sprawling commercial space, we bring the same level of dedication and craftsmanship to every project, making dream interiors accessible to every homeowner and business.
              </p>
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

      {/* Contact Form Section */}
      <section id="contact" className="py-16 md:py-20 bg-secondary">
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
