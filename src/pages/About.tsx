import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Users, Award, Clock, Heart, Shield, MessageCircle } from 'lucide-react';
import founderImage from '@/assets/founder.jpg';

const About = () => {
  const values = [
    { icon: Heart, title: 'Customer Satisfaction' },
    { icon: Award, title: 'Premium Finishing' },
    { icon: CheckCircle, title: 'Detailing & Precision' },
    { icon: Clock, title: 'Timely Delivery' },
    { icon: Shield, title: 'Reasonable Rates' },
    { icon: Award, title: 'Quality Materials' },
    { icon: MessageCircle, title: 'Transparent Communication' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* About Introduction */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-foreground">
            About Sri Chamundeshwari Interiors
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-4xl mx-auto leading-relaxed">
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
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="flex justify-center">
              <img
                src={founderImage}
                alt="Founder Ganapat Lal"
                className="rounded-lg shadow-lg max-w-md w-full"
              />
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Our Founder
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded by Mr. Ganapat Lal, Sri Chamundeshwari Interiors stands on the foundation
                  of trust, workmanship, and dedication. Active in the business since 1995, he has
                  guided SCM Interiors to become a firm known for reliability, quality finishes, and
                  customer-first values.
                </p>
                <p>
                  Belonging to the traditional Jangid community of Rajasthan, his expertise in wood
                  craftsmanship is legendary. With over 30 years of experience, his vision continues
                  to drive our commitment to excellence in every project we undertake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
            Our Team
          </h2>
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-muted/30 rounded-lg p-12 flex items-center justify-center">
              <Users className="h-32 w-32 text-primary" />
            </div>
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Our team at SCM Interiors is built on passion and precision. From designers and
            craftsmen to site supervisors and painters — every individual plays a vital role in
            delivering the best results. We take pride in our skilled workforce and their ability to
            bring ideas to life through dedication and teamwork.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Our Main Aim
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-md hover-lift text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <value.icon className="h-12 w-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="font-semibold text-foreground">{value.title}</h3>
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
