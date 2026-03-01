import { motion } from "framer-motion";
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
    <section
      id="solutions"
      className="lg:h-[calc(100vh-71px)] bg-secondary/50 flex flex-col justify-center py-24 md:py-32 scroll-mt-[72px] overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px", once: false }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-950">
            Our Services
          </h2>
          <div className="w-16 h-1 bg-[#6B7C59] mt-4" />
        </motion.div>

        {/* Icons Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {services.map((service, index) => {
            const rowIndex = Math.floor(
              index / (window.innerWidth >= 768 ? 5 : 3),
            );
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay:
                    rowIndex * 0.1 +
                    (index % (window.innerWidth >= 768 ? 5 : 3)) * 0.05,
                }}
              >
                <Card className="bg-card p-4 md:p-6 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col items-center justify-center text-center shadow-md border border-border/50 group h-full">
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-center rounded-lg bg-[#C9A96E]/5 group-hover:bg-[#C9A96E]/10 transition-colors duration-300">
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EndToEndSection;
