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
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            End-to-end interior solutions in Bangalore
          </h1>
          <p className="text-lg md:text-xl mb-8 font-light">
            30+ years of Experience | Bangalore, Karnataka
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg">
            <a href="#contact">Book Free Design Session</a>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <img
                src={founderImage}
                alt="Founder of Sri Chamundeshwari Interiors"
                className="w-full h-[450px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-accent mb-4">
                About Sri Chamundeshwari Interiors
              </h2>
              
              <div className="border-b border-border pb-4 mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  Mr. Ganapat Lal
                </h3>
                <p className="text-base text-muted-foreground">Founder & Principal Designer</p>
              </div>

              <p className="text-base md:text-lg leading-relaxed text-foreground">
                Sri Chamundeshwari Interiors & Contractors brings over 30+ years of excellence in transforming 
                residential and commercial spaces across Bangalore. Founded by Mr. Ganapat Lal in 1995, our 
                firm has built a reputation for quality craftsmanship and innovative design solutions.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-foreground">
                Belonging to the traditional Jangid community of Rajasthan, renowned for their mastery in 
                woodwork and architectural craftsmanship, we combine heritage techniques with modern design 
                principles to deliver interiors that are both timeless and contemporary.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-foreground">
                Our vision is to create spaces that not only reflect your personal style but also enhance 
                functionality and comfort. We are committed to delivering exceptional results through meticulous 
                attention to detail, premium materials, and transparent communication throughout every project.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-foreground">
                Serving Bangalore and surrounding areas, we are available to transform your dream space into 
                reality with our comprehensive interior solutions and dedicated team of skilled professionals.
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

      {/* Gallery Preview Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-accent">
            View Our Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <a
              href="/gallery"
              className="relative h-96 rounded-xl overflow-hidden group cursor-pointer block"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
              >
                <div className="absolute inset-0 bg-accent/60 group-hover:brightness-110 transition-all" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform">
                  Residential Projects
                </h3>
              </div>
            </a>
            <a
              href="/gallery"
              className="relative h-96 rounded-xl overflow-hidden group cursor-pointer block"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
              >
                <div className="absolute inset-0 bg-muted/60 group-hover:brightness-110 transition-all" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform">
                  Commercial Projects
                </h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-accent">
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
