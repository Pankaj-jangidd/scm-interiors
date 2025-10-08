import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, Users, Gem, IndianRupee } from 'lucide-react';
import founderImage from '@/assets/founder.jpg';

const About = () => {
  const values = [
    {
      icon: Award,
      title: '30+ Years Experience',
      description: 'Three decades of excellence in interior execution and craftsmanship across Bangalore.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Skilled professionals dedicated to bringing your vision to life with precision.',
    },
    {
      icon: Gem,
      title: 'Quality Materials',
      description: 'We use only premium materials and finishes for long-lasting, beautiful interiors.',
    },
    {
      icon: IndianRupee,
      title: 'Reasonable Rates',
      description: 'Transparent pricing with no hidden costs, making quality interiors accessible to all.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Company Introduction Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-12">
            Our Story
          </h2>
          
          <div className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Established over three decades ago, Sri Chamundeshwari Interiors & Contractors has been transforming spaces across Bangalore with dedication and craftsmanship. What began as a small venture has grown into a comprehensive interior solutions provider, trusted by hundreds of satisfied clients. Our journey has been shaped by our commitment to quality, timely execution, and transparent dealings that put client satisfaction above everything else.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Today, we stand as a complete interior execution firm offering services from carpentry and paint works to modular fittings and false ceilings. Our team of skilled professionals brings years of experience to every project, ensuring precision in execution and excellence in finish. We take pride in creating functional, beautiful spaces that reflect our clients' vision while staying within budget and timeline commitments.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Meet Our Founder
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="flex flex-col items-center">
              <img
                src={founderImage}
                alt="Mr. Ganapath Lal - Founder"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-4"
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground">Mr. Ganapath Lal</h3>
                <p className="text-base text-muted-foreground">Founder & Principal Contractor</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                With over three decades of hands-on experience in interior execution, Mr. Ganapati Lal has built Sri Chamundeshwari Interiors into one of Bangalore's most trusted names. His commitment to precision craftsmanship and client satisfaction has shaped countless residential and commercial spaces across the city.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Every project reflects his dedication to quality and attention to detail, ensuring spaces that truly feel like home. His expertise spans traditional carpentry to modern modular solutions, bringing together time-tested techniques with contemporary design sensibilities.
              </p>

              <div className="pt-4 border-t border-border">
                <p className="text-base text-muted-foreground mb-2">
                  <strong>Contact:</strong> +91 8824374977
                </p>
                <p className="text-base text-muted-foreground break-all">
                  <strong>Email:</strong> srichamundeshwariinteriors@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-card p-7 rounded-xl border border-border shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Expert Team Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
            Our Expert Team
          </h2>
          <p className="text-center text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Skilled professionals dedicated to bringing your vision to life
          </p>

          <div className="space-y-10">
            {/* Paint Team */}
            <div className="bg-background rounded-xl overflow-hidden shadow-lg hover:-translate-y-1.5 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&h=350&fit=crop"
                alt="Paint Team at work"
                className="w-full h-[300px] md:h-[350px] object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Paint Team</h3>
              </div>
            </div>

            {/* Carpentry Team */}
            <div className="bg-background rounded-xl overflow-hidden shadow-lg hover:-translate-y-1.5 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&h=350&fit=crop"
                alt="Carpentry Team crafting furniture"
                className="w-full h-[300px] md:h-[350px] object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Carpentry Team</h3>
              </div>
            </div>

            {/* Flooring Team */}
            <div className="bg-background rounded-xl overflow-hidden shadow-lg hover:-translate-y-1.5 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&h=350&fit=crop"
                alt="Flooring Team installing tiles"
                className="w-full h-[300px] md:h-[350px] object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Flooring Team</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
