import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EndToEndSection from "@/components/EndToEndSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section — Single Premium Image */}
      <section
        id="home"
        className="relative min-h-[calc(100vh-71px)] lg:h-[calc(100vh-71px)] flex items-center justify-center overflow-hidden"
      >
        {/* Desktop Image */}
        <div
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2000&h=1200&q=95")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/70" />
        </div>

        {/* Mobile Image */}
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{
            backgroundImage: `url("/images/mobile_hero.png")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/70" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-[1.2] text-white">
            End to End Interior Solutions
            <br />
            in Bangalore
          </h1>
          <p className="text-base md:text-lg mb-8 font-medium tracking-[0.2em] text-white/70 uppercase">
            SINCE 1950 • BANGALORE
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#6B7C59] hover:bg-[#6B7C59] text-white hover:text-white text-lg px-8 py-6 shadow-lg transition-transform duration-300 hover:scale-105"
              onClick={() => {
                const el = document.getElementById("gallery");
                if (el) {
                  const offsetTop =
                    el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top: offsetTop, behavior: "smooth" });
                }
              }}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white hover:bg-white text-black hover:text-black border-white text-lg px-8 py-6 shadow-lg transition-transform duration-300 hover:scale-105"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) {
                  const offsetTop =
                    el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top: offsetTop, behavior: "smooth" });
                }
              }}
            >
              Get a Quote
            </Button>
          </div>
        </motion.div>

        {/* Solid bottom line instead of fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200/40 z-20" />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen lg:min-h-0 lg:h-[calc(100vh-71px)] bg-white py-16 lg:py-0 scroll-mt-[72px]"
      >
        <div className="container mx-auto px-4 max-w-7xl lg:h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px", once: false }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-950">
              About Us
            </h2>
            <div className="w-16 h-1 bg-[#6B7C59] mt-2" />
          </motion.div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-8 items-center lg:items-stretch pt-4 pb-12 lg:py-0">
            {/* Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px", once: false }}
              transition={{ duration: 0.6 }}
              className="w-full grid grid-cols-2 gap-3 h-[320px] md:h-[400px] lg:h-[90%] lg:w-[90%]"
            >
              <div className="flex flex-col gap-3 h-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative flex-1 rounded-2xl overflow-hidden shadow-lg border border-border/50"
                >
                  <img
                    src="/images/about/painter.png"
                    alt="Master Painter"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative flex-1 rounded-2xl overflow-hidden shadow-lg border border-border/50"
                >
                  <img
                    src="/images/about/modular.png"
                    alt="Modular Fitting"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-full rounded-2xl overflow-hidden shadow-lg border border-border/50"
              >
                <img
                  src="/images/about/carpenter.png"
                  alt="Expert Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px", once: false }}
              transition={{ duration: 0.6 }}
              className="w-full text-left"
            >
              <h3
                className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-slate-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Transforming spaces with traditional craftsmanship and modern
                design.
              </h3>

              <p className="text-gray-600 leading-relaxed mb-4 text-base md:text-lg">
                Since 1950, we have been crafting interior experiences across
                Bangalore, offering premium finishing, timely delivery, and
                reasonable rates, making dream spaces accessible to all.
                <br />
                <br />
                Our team of skilled craftsmen work closely with every client to
                understand their vision and bring it to life with attention to
                detail. From concept to completion, we ensure every project
                reflects quality, elegance, and functionality.
              </p>

              {/* Services Label */}
              <p className="text-sm font-extrabold uppercase tracking-widest text-[#6B7C59] mb-3">
                Services we offer:
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {[
                  "Carpentry Works",
                  "SS Fabrication",
                  "Paint Works",
                  "Modular Fittings",
                  "False Ceiling",
                  "Wall Scapes",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 p-2 group"
                  >
                    <CheckCircle
                      className="text-[#6B7C59] flex-shrink-0 group-hover:scale-110 transition-transform"
                      size={24}
                    />
                    <span className="text-gray-800 font-semibold group-hover:text-[#6B7C59] transition-colors">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services (End-to-End Steps) */}
      <EndToEndSection />

      {/* Gallery Section */}
      <section
        id="gallery"
        className="lg:h-[calc(100vh-71px)] flex flex-col justify-center py-24 md:py-32 bg-white scroll-mt-[72px] overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px", once: false }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-950">
              Gallery
            </h2>
            <div className="w-16 h-1 bg-[#6B7C59] mt-2" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mx-auto overflow-hidden">
            {/* RESIDENTIAL */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px", once: false }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <button
                onClick={() => {
                  document.documentElement.style.scrollBehavior = "auto";
                  window.scrollTo({
                    top: 0,
                    behavior: "instant" as ScrollBehavior,
                  });
                  navigate("/gallery?category=residential");
                }}
                className="relative group h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl w-full block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,c_fill,w_800,h_500/v1763230593/residential_atsi3m.avif")`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-3 text-left">
                    RESIDENTIAL PROJECTS
                  </h2>
                  <span className="inline-flex items-center gap-2 bg-[#6B7C59] hover:bg-[#5A6B4A] text-white text-base font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg group-hover:scale-105">
                    View Gallery <span className="text-lg">→</span>
                  </span>
                </div>
              </button>
            </motion.div>

            {/* COMMERCIAL */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px", once: false }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <button
                onClick={() => {
                  document.documentElement.style.scrollBehavior = "auto";
                  window.scrollTo({
                    top: 0,
                    behavior: "instant" as ScrollBehavior,
                  });
                  navigate("/gallery?category=commercial");
                }}
                className="relative group h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl w-full block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,c_fill,w_800,h_500/v1763230591/commercial_m9o5us.jpg")`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-3 text-left">
                    COMMERCIAL PROJECTS
                  </h2>
                  <span className="inline-flex items-center gap-2 bg-[#6B7C59] hover:bg-[#5A6B4A] text-white text-base font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg group-hover:scale-105">
                    View Gallery <span className="text-lg">→</span>
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </div>
  );
};

export default Index;
