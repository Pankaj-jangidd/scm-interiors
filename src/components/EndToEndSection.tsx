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
    <section className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
            End-to-end Interior Solutions in Bangalore
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            From concept to completion, we handle every aspect of your interior
            needs.
          </p>
        </div>

        {/* Icons Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="bg-white p-4 md:p-6 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col items-center justify-center text-center shadow-md border-0 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-center rounded-lg bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300">
                <img
                  src={`/endToEndIcons/${service.id}.png`}
                  alt={service.name}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-xs md:text-sm font-medium text-foreground leading-tight">
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
