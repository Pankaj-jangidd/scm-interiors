import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-accent text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Branding */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-2">SCM INTERIORS</h3>
            <p className="text-sm text-white/80 mb-2">Interior Execution & Fabrication</p>
            <p className="text-xs text-white/70">Crafting beautiful spaces since 1995</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/80 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-white/80 hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Modular Kitchen</li>
              <li>False Ceiling</li>
              <li>Furniture Fabrication</li>
              <li>Renovation</li>
              <li>3D Design</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1 text-white/80" />
                <p className="text-white/80">
                  #25 Vinayaka Layout, Doddanagamangala, Electronic City Phase 2, Bangalore 560-100
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-white/80" />
                <a
                  href="tel:+918824374977"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  +91 8824374977
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 mt-1 text-white/80" />
                <a
                  href="mailto:srichamundeshwariinteriors@gmail.com"
                  className="text-white/80 hover:text-white transition-colors text-xs break-all"
                  style={{ wordBreak: 'break-all' }}
                >
                  srichamundeshwariinteriors@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-sm text-white/70">
            © 2025 Sri Chamundeshwari Interiors. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
