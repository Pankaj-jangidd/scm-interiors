import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-3">SCM INTERIORS</h3>
            <p className="text-sm mb-2 opacity-90">Interior Execution & Fabrication</p>
            <p className="text-xs opacity-75">Crafting beautiful spaces since 1995</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-90 hover:opacity-100 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="opacity-90 hover:opacity-100 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="opacity-90 hover:opacity-100 hover:underline">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="opacity-90 hover:opacity-100 hover:underline">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-90 hover:opacity-100 hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-90">
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
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 opacity-75" />
                <p className="opacity-90">
                  #25 Vinayaka Layout, Doddanagamangala, Electronic City Phase 2, Bangalore 560-100
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 opacity-75" />
                <a href="tel:+918824374977" className="opacity-90 hover:opacity-100 hover:underline">
                  +91 8824374977
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 opacity-75" />
                <a
                  href="mailto:srichamundeshwariinteriors@gmail.com"
                  className="opacity-90 hover:opacity-100 hover:underline break-all"
                >
                  srichamundeshwariinteriors@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm opacity-75">
            © 2025 Sri Chamundeshwari Interiors. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
