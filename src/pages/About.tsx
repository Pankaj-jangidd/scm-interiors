import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/admin/PageTransition";
import { Award, Users, Gem, IndianRupee } from "lucide-react";
import founderImage from "@/assets/founder.jpg";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "30+ Years Experience",
      mobileTitle: "30+ Years",
      description:
        "Three decades of excellence in interior execution and craftsmanship across Bangalore.",
    },
    {
      icon: Users,
      title: "Expert Team",
      mobileTitle: "Expert Team",
      description:
        "Skilled professionals dedicated to bringing your vision to life with precision.",
    },
    {
      icon: Gem,
      title: "Quality Materials",
      mobileTitle: "Quality Materials",
      description:
        "We use only premium materials and finishes for long-lasting, beautiful interiors.",
    },
    {
      icon: IndianRupee,
      title: "Reasonable Rates",
      mobileTitle: "Reasonable Rates",
      description:
        "Transparent pricing with no hidden costs, making quality interiors accessible to all.",
    },
  ];

  const teamCategories = [
    {
      title: "Skilled Carpenters",
      image: "/public/images/carpenter.jpeg",
      alt: "Skilled carpenters working on wooden furniture and cabinetry",
    },
    {
      title: "Expert Painters",
      image: "/public/images/painter.jpeg",
      alt: "Expert painters delivering flawless finishes",
    },
    {
      title: "Flooring Specialists",
      image: "/public/images/flooring.jpeg",
      alt: "Flooring team installing tiles and wooden flooring",
    },
    {
      title: "POP and Ceiling Experts",
      image: "/public/images/pop.jpeg",
      alt: "POP and false ceiling installation specialists",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO should NOT be inside PageTransition */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/images/about.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            The Journey Behind SCM Interiors
          </h1>
          <p className="text-base md:text-lg leading-relaxed font-light text-white/90">
            For over three decades, Sri Chamundeshwari Interiors has been
            shaping beautiful spaces across Bangalore with passion, precision,
            and trust. What began as a humble family-run venture has now evolved
            into a complete interior solutions firm built on quality, honesty,
            and timely delivery.
          </p>
        </div>
      </section>

      {/* Everything below animates — like Contact page */}
      <PageTransition>
        {/* Founder Section */}
        <section className="py-24 md:py-28 bg-card flex items-center">
          {" "}
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary tracking-wide">
                THE FOUNDER
              </h2>
              <div className="w-24 h-[3px] bg-primary mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-14">
              <div className="md:w-1/2 w-full relative">
                <img
                  src={founderImage}
                  alt="Mr. Ganapathlal - Founder"
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
                  has built SCM Interiors into one of Bangalore's most trusted
                  interior execution firms. His principles — quality, honesty,
                  and timely execution — define every project we deliver.
                </p>

                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  From residential to commercial spaces, his dedication to
                  craftsmanship continues to inspire our entire team.
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

        {/* Why Choose Us */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
              Why Choose Us
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-card p-4 md:p-7 rounded-xl border border-border shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left"
                  >
                    <Icon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
                    <h3 className="text-sm md:text-xl font-bold text-foreground">
                      <span className="md:hidden">{value.mobileTitle}</span>
                      <span className="hidden md:block">{value.title}</span>
                    </h3>
                    <p className="hidden md:block text-sm md:text-base text-muted-foreground leading-relaxed mt-3">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-20 bg-card">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
              Our Expert Team
            </h2>
            <p className="text-center text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Skilled professionals dedicated to bringing your vision to life
            </p>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 md:gap-8">
              {teamCategories.map((team) => (
                <div
                  key={team.title}
                  className="bg-background rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-[200px] md:h-[400px] overflow-hidden">
                    <img
                      src={team.image}
                      alt={team.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  <div className="p-4 md:p-6 text-center bg-gradient-to-b from-background to-muted/30">
                    <h3 className="text-base md:text-2xl font-bold text-foreground">
                      {team.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageTransition>

      <Footer />
    </div>
  );
};

export default About;
