import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import ReviewCard from '@/components/ReviewCard';
import ContactForm from '@/components/ContactForm';
import {
  Home,
  Wrench,
  Lightbulb,
  Paintbrush,
  Hammer,
  Package,
  Grid,
  Layers,
  RefreshCw,
  Box,
  ChefHat,
  Sofa,
  ShoppingBag,
  Table,
  Monitor,
  BookOpen,
  Waves,
  Zap,
  Wallpaper,
  Droplet,
  Church,
  DoorOpen,
  Armchair,
  Baby,
} from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import founderImage from '@/assets/founder.jpg';

const Index = () => {
  const services = [
    { icon: Package, title: 'Turnkey Interior Projects' },
    { icon: ChefHat, title: 'Modular Kitchen Design' },
    { icon: Layers, title: 'False Ceiling & Lighting' },
    { icon: Paintbrush, title: 'Painting & Wall Finishes' },
    { icon: Hammer, title: 'Wood & Furniture Fabrication' },
    { icon: Grid, title: 'Flooring Solutions' },
    { icon: Wrench, title: 'MS & SS Fabrication' },
    { icon: Layers, title: 'Glass & Partition Work' },
    { icon: RefreshCw, title: 'Renovation & Remodeling' },
    { icon: Box, title: '3D Design & Visualization' },
  ];

  const solutions = [
    { icon: ChefHat, label: 'Modular Kitchen' },
    { icon: Armchair, label: 'Storage & Wardrobe' },
    { icon: ShoppingBag, label: 'Crockery Units' },
    { icon: Sofa, label: 'Space Saving Furniture' },
    { icon: Monitor, label: 'TV Units' },
    { icon: BookOpen, label: 'Study Tables' },
    { icon: Waves, label: 'False Ceiling' },
    { icon: Zap, label: 'Lights' },
    { icon: Wallpaper, label: 'Wallpaper' },
    { icon: Paintbrush, label: 'Wall Paint' },
    { icon: Droplet, label: 'Bathroom' },
    { icon: Church, label: 'Pooja Unit' },
    { icon: DoorOpen, label: 'Foyer Designs' },
    { icon: Table, label: 'Movable Furniture' },
    { icon: Baby, label: 'Kids Bedroom' },
  ];

  const reviews = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      review:
        'Outstanding work! The team transformed our home beautifully. Very professional and delivered on time.',
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      review:
        'Excellent modular kitchen design. The quality of materials and finish is top-notch. Highly recommended!',
    },
    {
      name: 'Anil Patel',
      rating: 5,
      review:
        'Great attention to detail. The false ceiling work was done perfectly. Very satisfied with the results.',
    },
    {
      name: 'Meena Reddy',
      rating: 5,
      review:
        'Professional team and excellent craftsmanship. They understood our requirements perfectly.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            Designing Beautiful Spaces That Reflect Your Lifestyle
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light">
            We craft elegant, functional, and timeless interiors — blending design with comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg">
              <Link to="/gallery">View Gallery</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white hover:bg-white/90 text-primary border-white text-lg"
            >
              <a href="#contact">Get a Free Quote</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            <span className="border-b-4 border-primary pb-2">SRI CHAMUNDESHWARI INTERIORS</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded by Ganapat Lal in 1995, Sri Chamundeshwari Interiors brings over 30+ years
                of experience in transforming homes and commercial spaces across Bangalore.
              </p>
              <p>
                Belonging to the traditional Jangid community of Rajasthan, known for their
                excellence in wood craftsmanship, our legacy combines art, precision, and modern
                design to deliver interiors that stand the test of time.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={founderImage}
                alt="Founder Ganapat Lal"
                className="rounded-lg shadow-lg max-w-sm w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Services We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} icon={service.icon} title={service.title} />
            ))}
          </div>
        </div>
      </section>

      {/* End-to-End Solutions Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            End-to-end interior solutions in Bangalore
          </h2>
          <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
            Whether you're dreaming of a state-of-the-art kitchen or an interior you can't stop
            admiring, our team works with you to create your perfect home.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
            {solutions.map((solution, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <solution.icon className="h-12 w-12 md:h-16 md:w-16 text-primary mb-3" strokeWidth={1} />
                <span className="text-sm font-medium text-foreground">{solution.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href="#contact">Book Free Design Session</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            View Our Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <Link
              to="/gallery"
              className="relative h-96 rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-accent/80 group-hover:to-accent/90 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform">
                  Residential Projects
                </h3>
              </div>
            </Link>
            <Link
              to="/gallery"
              className="relative h-96 rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-muted/80 group-hover:to-muted/90 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform">
                  Commercial Projects
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Client Reviews
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
          <div className="text-center">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link to="/reviews">Read More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
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
