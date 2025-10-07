import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import heroImage from '@/assets/hero-bg.jpg';
import endToEndImage from '@/assets/end-to-end-solutions.jpg';

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
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <img
                src={heroImage}
                alt="Interior work showcase"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-accent mb-6">
                About Us
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground">
                Sri Chamundeshwari Interiors & Contractors is a Bangalore-based firm with 30+ years
                of experience in interior execution and fabrication.
              </p>
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3 text-accent">Services we provide:</h3>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Carpentary works</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Paint works</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>False Ceiling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>SS Fabrication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Modular Fittings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Wall Scapes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* End-to-End Solutions Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <img
              src={endToEndImage}
              alt="End-to-end interior solutions in Bangalore"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

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
