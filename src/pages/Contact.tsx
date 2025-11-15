import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Ruler,
  LayoutDashboard,
  Hammer,
  Wrench,
  Heart,
  icons,
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
      color: "text-primary",
    },
    {
      icon: () => (
        <div
          style={{
            width: "52px",
            height: "52px",
            backgroundColor: "#25D366",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            width="50"
            height="50"
          >
            <path
              fill="#fff"
              d="M16.04 2C8.84 2 3 7.85 3 15.05c0 2.57.74 5.05 2.14 7.21L3 29l6.89-2.09A12.9 12.9 0 0 0 16.04 28c7.2 0 13.04-5.85 13.04-12.95S23.24 2 16.04 2Z"
            />
            <path
              fill="#25D366"
              d="M16.04 4.5c6.3 0 11.54 5.1 11.54 10.55 0 5.95-4.6 10.55-11.54 10.55-2.18 0-4.3-.64-6.1-1.85l-.43-.28-4.06 1.23 1.24-3.93-.29-.45A9.6 9.6 0 0 1 4.5 15c0-5.45 5.24-10.55 11.54-10.55Z"
            />
            <path
              fill="#fff"
              d="M12.75 9.75c-.26-.56-.54-.57-.8-.58h-.67c-.23 0-.6.09-.92.43s-1.2 1.17-1.2 2.85 1.23 3.3 1.4 3.52 2.36 3.68 5.81 5.01c2.87 1.13 3.44.9 4.07.85.63-.05 2-1.03 2.28-2.03s.28-1.86.2-2.03c-.08-.17-.29-.26-.6-.46s-1.88-.93-2.17-1.03c-.29-.1-.47-.15-.67.15s-.77 1.03-.95 1.25c-.17.22-.34.25-.64.09-.3-.17-1.28-.47-2.44-1.47-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.47.13-.62.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.55-.09-.17-.8-1.87-1.13-2.55Z"
            />
          </svg>
        </div>
      ),
      title: "WhatsApp Us",
      mobileTitle: "WhatsApp",
      description: "Chat with our design team instantly.",
      action:
        "https://wa.me/918824374977?text=Hi%20SCM%20Interiors,%20I%27m%20interested%20in%20your%20interior%20design%20services!",
      buttonText: "WHATSAPP US",
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Mail Us",
      mobileTitle: "Mail Us",
      description: "Send us your project details and queries.",
      action: "mailto:scminteriorss@gmail.com",
      buttonText: "MAIL US",
      color: "text-primary",
    },
    {
      icon: MapPin,
      title: "Get Directions",
      mobileTitle: "Directions",
      description: "Visit our office in Electronic City, Bengaluru.",
      action:
        "https://www.google.com/maps/search/?api=1&query=Sri%20Chamundeshwari%20Interiors%2C%20VM6H%2B8FF%2C%20Vinayaka%20Layout%20Main%20Rd%2C%20Silicon%20Town%2C%20Electronic%20City%2C%20Bengaluru%2C%20Karnataka%20560100",
      buttonText: "GET DIRECTIONS",
      color: "text-red-600",
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
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/v1763230592/contactt_s4teki.jpg")`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get in Touch With Us
          </h1>
          <p className="text-lg md:text-xl font-light">
            We'd love to discuss your next interior project — connect with us
            directly or book a free visit.
          </p>
        </div>
      </section>

      <PageTransition>
        {/* Contact Options Section */}
        <section className="py-16 md:py-20 bg-card">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div
                    key={index}
                    className="bg-secondary rounded-lg p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-4">
                      <Icon className={`w-8 h-8 ${option.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      <span className="md:hidden">{option.mobileTitle}</span>
                      <span className="hidden md:inline">{option.title}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-grow hidden md:block">
                      {option.description}
                    </p>
                    <Button
                      asChild
                      className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md w-full"
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
        <section className="py-16 md:py-20 bg-secondary">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
                Our Process
              </h2>
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
                      <div className="w-24 h-24 rounded-full bg-card border-4 border-primary/20 flex items-center justify-center mb-4 shadow-lg hover:scale-110 transition-transform duration-300">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="font-bold text-foreground text-center max-w-[120px] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                        {step.description}
                      </p>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="w-20 border-t-2 border-dashed border-primary/30 mx-4" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Flow - Vertical */}
            <div className="lg:hidden space-y-8">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-card border-4 border-primary/20 flex items-center justify-center shadow-lg flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary" />
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
                      <div className="ml-8 mt-2 mb-2 h-8 border-l-2 border-dashed border-primary/30" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
                Send Us a Message
              </h2>
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
