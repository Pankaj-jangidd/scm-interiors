import { Card } from "@/components/ui/card";

const services = [
  { name: "Modular Kitchen", id: 1 },
  { name: "Storage and Wardrobe", id: 2 },
  { name: "Crockery Units", id: 3 },
  { name: "Space Saving Furniture", id: 4 },
  { name: "TV Units", id: 5 },
  { name: "Study Tables", id: 6 },
  { name: "False Ceiling", id: 7 },
  { name: "Lights", id: 8 },
  { name: "Wallpaper", id: 9 },
  { name: "Wall Paint", id: 10 },
  { name: "Bathroom", id: 11 },
  { name: "Pooja Unit", id: 12 },
  { name: "Foyer Designs", id: 13 },
  { name: "Movable Furniture", id: 14 },
  { name: "Kids Bedroom", id: 15 },
];

const EndToEndSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Heading */}
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
          End-to-end Interior Solutions in Bangalore
        </h2>
        <p className="text-center text-base md:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          From concept to completion, we handle every aspect of your interior
          needs.
        </p>

        {/* Icons Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-5">
          {services.map((service) => (
            <Card
              key={service.id}
              className="bg-card p-6 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center shadow-sm"
            >
              <div className="w-20 h-20 mb-3 flex items-center justify-center">
                <img
                  src={`/endToEndIcons/${service.id}.png`}
                  alt={service.name}
                  className="w-16 h-16 object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-sm md:text-base font-medium text-foreground">
                {service.name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EndToEndSection;
