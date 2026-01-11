import {
  Hammer,
  PaintBucket,
  Layers,
  Wrench,
  Package,
  Wallpaper,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Hammer,
    name: "Carpentry Works",
    description:
      "Expert woodwork and custom furniture crafted with precision and attention to detail.",
  },
  {
    icon: PaintBucket,
    name: "Paint Works",
    description:
      "Professional painting services with premium finishes for walls, ceilings, and exteriors.",
  },
  {
    icon: Layers,
    name: "False Ceiling",
    description:
      "Modern false ceiling designs with integrated lighting and acoustic solutions.",
  },
  {
    icon: Wrench,
    name: "SS Fabrication",
    description:
      "High-quality stainless steel fabrication for kitchens, railings, and fixtures.",
  },
  {
    icon: Package,
    name: "Modular Fittings",
    description:
      "Space-efficient modular solutions for kitchens, wardrobes, and storage units.",
  },
  {
    icon: Wallpaper,
    name: "Wall Scapes",
    description:
      "Decorative wall treatments including wallpapers, textures, and artistic finishes.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Services We Provide
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive interior solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.name}
                className="bg-white p-6 md:p-8 rounded-2xl border-0 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="h-7 w-7 md:h-8 md:w-8 text-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">
                  {service.name}
                </h3>

                {/* Description hidden on mobile */}
                <p className="text-sm text-muted-foreground leading-relaxed hidden md:block">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
