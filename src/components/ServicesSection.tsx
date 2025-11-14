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
    <section className="py-16 md:py-20" style={{ backgroundColor: "#F5EFE7" }}>
      {" "}
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
          Services We Provide
        </h2>
        <p className="text-center text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Comprehensive interior solutions tailored to your needs
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.name}
                className="bg-background p-7 rounded-xl border border-border hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <Icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">
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
