import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import founderImage from '@/assets/founder.jpg';
import {
  CheckCircle2,
  Palette,
  Clock,
  DollarSign,
  Boxes,
  MessageSquare,
  Award,
  Users,
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: CheckCircle2,
      title: 'Customer Satisfaction',
    },
    {
      icon: Award,
      title: 'Premium Finishing',
    },
    {
      icon: Palette,
      title: 'Detailing & Precision',
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
    },
    {
      icon: DollarSign,
      title: 'Reasonable Rates',
    },
    {
      icon: Boxes,
      title: 'Quality Materials',
    },
    {
      icon: MessageSquare,
      title: 'Transparent Communication',
    },
    {
      icon: Users,
      title: 'Experienced Team',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* About Introduction */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-accent">
            About Sri Chamundeshwari Interiors
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-foreground">
            Sri Chamundeshwari Interiors (SCM Interiors) is a trusted name in interior design and
            execution, bringing creativity, precision, and elegance to every project. From
            residential to commercial spaces, our mission is to create interiors that reflect your
            style, enhance functionality, and elevate comfort. With a commitment to quality and an
            eye for detail, we ensure each space tells a story of craftsmanship and care.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <img
                src={founderImage}
                alt="Founder Ganapat Lal"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-accent mb-4">
                Our Founder
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground">
                Founded by Mr. Ganapat Lal, Sri Chamundeshwari Interiors stands on the foundation
                of trust, workmanship, and dedication. Active in the business since 1995, he has
                guided SCM Interiors to become a firm known for reliability, quality finishes, and
                customer-first values. Belonging to the traditional Jangid community of Rajasthan,
                his expertise in wood craftsmanship is legendary.
              </p>
              <div className="mt-6 space-y-2 text-base">
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-accent">Phone:</span>
                  <a href="tel:+918824374977" className="text-primary hover:underline">
                    +91 8824374977
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-accent">Email:</span>
                  <a
                    href="mailto:srichamundeshwariinteriors@gmail.com"
                    className="text-primary hover:underline break-all"
                  >
                    srichamundeshwariinteriors@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-8 text-accent">
            Our Team
          </h2>
          <div className="mb-8">
            <img
              src={founderImage}
              alt="SCM Interiors Team"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-lg"
            />
          </div>
          <p className="text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto text-foreground">
            Our team at SCM Interiors is built on passion and precision. From designers and
            craftsmen to site supervisors and painters — every individual plays a vital role in
            delivering the best results. We take pride in our skilled workforce and their ability to
            bring ideas to life through dedication and teamwork.
          </p>
        </div>
      </section>

      {/* Our Main Aim Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-accent">
            Our Main Aim
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-md hover-lift text-center animate-fade-in"
              >
                <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-base text-accent">{value.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
