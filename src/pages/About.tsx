import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/admin/PageTransition";
import { Award, Users, Gem, IndianRupee } from "lucide-react";

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
      image:
        "https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_600,h_600,c_fill/v1763230591/carpenter_cigqwe.jpg",
      alt: "Skilled carpenters working on wooden furniture and cabinetry",
    },
    {
      title: "Expert Painters",
      image:
        "https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_600,h_600,c_fill/v1763230592/painter_vejlgd.jpg",
      alt: "Expert painters delivering flawless finishes",
    },
    {
      title: "Flooring Specialists",
      image:
        "https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_600,h_600,c_fill/v1763230591/flooring_sedbgm.jpg",
      alt: "Flooring team installing tiles and wooden flooring",
    },
    {
      title: "POP and Ceiling Experts",
      image:
        "https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_600,h_600,c_fill/v1763230592/pop_biws8p.jpg",
      alt: "POP and false ceiling installation specialists",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,c_fill,w_1200,h_700/v1763230591/about_qunq9g.jpg")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
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

      <PageTransition>
        {/* Founder Section */}
        <section className="py-24 md:py-28 bg-white flex items-center">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                THE FOUNDER
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-16">
              <div className="md:w-1/2 w-full relative">
                <img
                  src="https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_900,h_900,c_fill/v1763230592/founder_kv8phh.jpg"
                  alt="Mr. Ganapathlal - Founder"
                  className="w-full h-[420px] md:h-[480px] object-cover rounded-2xl shadow-2xl"
                />
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-xl -z-10" />
              </div>

              <div className="md:w-1/2 w-full space-y-6">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-left">
                  The Man Behind the Legacy
                </h2>

                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    Mr. Ganapathlal
                  </h3>
                  <p className="text-base text-accent font-medium">
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

                <div className="pt-4 border-t border-border mt-6">
                  <p className="text-lg text-foreground font-semibold">
                    Contact: +91 8824374977
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Us
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-5 md:gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-white p-5 md:p-8 rounded-2xl border-0 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-500 flex flex-col items-center md:items-start text-center md:text-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 md:h-8 md:w-8 text-accent" />
                    </div>
                    <h3 className="text-base md:text-xl font-bold text-foreground">
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
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Expert Team
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Skilled professionals dedicated to bringing your vision to life
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-5 md:gap-8">
              {teamCategories.map((team, index) => (
                <div
                  key={team.title}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-[200px] md:h-[400px] overflow-hidden">
                    <img
                      src={team.image}
                      alt={team.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-4 md:p-6 text-center bg-white">
                    <h3 className="text-base md:text-xl font-bold text-foreground">
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
