import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const updateUnderline = () => {
      if (navRef.current) {
        const activeLink = navRef.current.querySelector('[data-active="true"]');
        if (activeLink) {
          const { offsetLeft, offsetWidth } = activeLink;
          setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
        }
      }
    };

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Logo - Centered */}
          <Link to="/" className="flex md:hidden items-center gap-3 mx-auto">
            <div className="w-11 h-11 bg-accent rounded-full flex items-center justify-center font-serif font-bold text-white text-lg shadow-md flex-shrink-0">
              SCM
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-bold text-primary-foreground leading-tight">
                SRI CHAMUNDESHWARI INTERIORS
              </span>
            </div>
          </Link>

          {/* Desktop Logo */}
          <Link to="/" className="hidden md:flex items-center gap-3 group">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-serif font-bold text-white text-lg group-hover:scale-110 transition-transform duration-300 shadow-md flex-shrink-0">
              SCM
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-primary-foreground leading-tight">
                SRI CHAMUNDESHWARI INTERIORS
              </span>
              <span className="text-xs text-primary-foreground/80">
                Interior Execution & Fabrication
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center gap-8 relative"
            ref={navRef}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-active={isActive(link.path)}
                className={`text-base font-medium transition-colors duration-300 relative py-1 ${
                  isActive(link.path)
                    ? "text-accent font-semibold"
                    : "text-primary-foreground hover:text-accent"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Sliding underline */}
            <div
              className="absolute bottom-0 h-0.5 bg-accent transition-all duration-300 ease-out"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            />

            <Button asChild className="bg-accent hover:bg-accent/90 ml-4">
              <a href="tel:+918824374977">
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-primary-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-primary-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-accent font-semibold"
                      : "text-primary-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="bg-accent hover:bg-accent/90 w-full">
                <a href="tel:+918824374977">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
