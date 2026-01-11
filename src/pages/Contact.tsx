import {
  Phone,
  Mail,
  MapPin,
  Ruler,
  LayoutDashboard,
  Hammer,
  Wrench,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageTransition from "@/components/admin/PageTransition";

const Contact = () => {
  const contactOptions = [
    {
      icon: Phone,
      title: "Call Now",
      mobileTitle: "Call Now",
      description: "Speak directly with our design experts.",
      action: "tel:+918824374977",
      buttonText: "CALL NOW",
    },
    {
      icon: () => (
        <img
          src="/whatsapp-icon.png"
          alt="WhatsApp"
          className="w-[52px] h-[52px] object-contain"
        />
      ),
      title: "WhatsApp Us",
      mobileTitle: "WhatsApp",
      description: "Chat with our design team instantly.",
      action:
        "https://wa.me/918824374977?text=Hi%20SCM%20Interiors,%20I%27m%20interested%20in%20your%20interior%20design%20services!",
      buttonText: "WHATSAPP US",
    },
    {
      icon: Mail,
      title: "Mail Us",
      mobileTitle: "Mail Us",
      description: "Send us your project details and queries.",
      action: "mailto:scminteriorss@gmail.com",
      buttonText: "MAIL US",
    },
    {
      icon: MapPin,
      title: "Get Directions",
      mobileTitle: "Directions",
      description: "Visit our office in Electronic City, Bengaluru.",
      action:
        "https://www.google.com/maps/search/?api=1&query=Sri%20Chamundeshwari%20Interiors%2C%20VM6H%2B8FF%2C%20Vinayaka%20Layout%20Main%20Rd%2C%20Silicon%20Town%2C%20Electronic%20City%2C%20Bengaluru%2C%20Karnataka%20560100",
      buttonText: "GET DIRECTIONS",
    },
  ];

  const processSteps = [
    {
      icon: Phone,
      title: "Call / Consultation",
      description: "Initial discussion",
    },
    {
      icon: Ruler,
      title: "Site Visit",
      description: "Measurement & analysis",
    },
    {
      icon: LayoutDashboard,
      title: "Planning & Design",
      description: "Proposal creation",
    },
    {
      icon: Hammer,
      title: "Execution",
      description: "Development begins",
    },
    {
      icon: Wrench,
      title: "Installation",
      description: "Final touches",
    },
    {
      icon: Heart,
      title: "Support",
      description: "Post-project care",
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
            backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_1200,h_700,c_fill/v1763230592/contactt_s4teki.jpg")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get in Touch With Us
          </h1>
          <p className="text-lg md:text-xl font-light text-white/90">
            We'd love to discuss your next interior project — connect with us
            directly or book a free visit.
          </p>
        </div>
      </section>

      <PageTransition>
        {/* Contact Options Section */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div
                    key={index}
                    className="bg-secondary rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center border-0"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      <span className="md:hidden">{option.mobileTitle}</span>
                      <span className="hidden md:inline">{option.title}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 flex-grow hidden md:block">
                      {option.description}
                    </p>
                    <Button
                      asChild
                      className="bg-accent hover:bg-accent/90 text-white shadow-md w-full transition-all duration-300 hover:shadow-lg"
                    >
                      <a
                        href={option.action}
                        target={
                          option.action.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          option.action.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {option.buttonText}
                      </a>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section className="py-20 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Process
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
              <p className="text-lg text-muted-foreground">
                From consultation to completion, we make interiors effortless.
              </p>
            </div>

            {/* Desktop Flow - Horizontal */}
            <div className="hidden lg:flex items-center justify-between relative">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-2xl bg-white border-2 border-accent/20 flex items-center justify-center mb-4 shadow-lg hover:scale-110 hover:border-accent/50 transition-all duration-500 group">
                        <Icon className="w-10 h-10 text-accent" />
                      </div>
                      <h3 className="font-bold text-foreground text-center max-w-[120px] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                        {step.description}
                      </p>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="w-20 border-t-2 border-dashed border-accent/30 mx-4" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Flow - Vertical */}
            <div className="lg:hidden space-y-6">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-white border-2 border-accent/20 flex items-center justify-center shadow-lg flex-shrink-0">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <div className="flex-grow pt-2">
                        <h3 className="font-bold text-foreground mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="ml-8 mt-2 mb-2 h-6 border-l-2 border-dashed border-accent/30" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Send Us a Message
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
      </PageTransition>

      <Footer />
    </div>
  );
};

export default Contact;
