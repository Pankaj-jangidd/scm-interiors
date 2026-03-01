import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Branding */}
          <div>
            <div className="mb-4">
              <h3 className="font-serif text-lg font-bold leading-tight">
                SRI CHAMUNDESHWARI
              </h3>
              <h3 className="font-serif text-lg font-bold leading-tight">
                INTERIORS
              </h3>
            </div>
            <p className="text-sm text-white/70 mb-3">
              Interior Execution & Fabrication
            </p>
            <p className="text-xs text-white/50 hidden md:block">
              Crafting beautiful spaces since 1995
            </p>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h4 className="font-semibold mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Gallery", href: "#gallery" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/70 hover:text-[#C9A96E] transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="hidden md:block">
            <h4 className="font-semibold mb-5 text-white">Services</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>Modular Kitchen</li>
              <li>False Ceiling</li>
              <li>Furniture Fabrication</li>
              <li>Renovation</li>
              <li>3D Design</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-5 text-white">Contact Info</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 group">
                <Phone className="h-5 w-5 flex-shrink-0 text-white" />
                <a
                  href="tel:+918824374977"
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  +91 8824374977
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 flex-shrink-0 text-white" />
                <a
                  href="mailto:scminteriorss@gmail.com"
                  className="text-white/70 hover:text-white transition-colors duration-300 break-all"
                >
                  scminteriorss@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-white" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sri%20Chamundeshwari%20Interiors%2C%20VM6H%2B8FF%2C%20Vinayaka%20Layout%20Main%20Rd%2C%20Silicon%20Town%2C%20Electronic%20City%2C%20Doddanagamangala%20Village%2C%20Bengaluru%2C%20Karnataka%20560100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  #25 Vinayaka Layout, Doddanagamangala, Electronic City Phase
                  2, Bangalore 560-100
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/50">
            © 2025 Sri Chamundeshwari Interiors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
