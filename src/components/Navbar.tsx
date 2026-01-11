import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Mobile Logo - Centered */}
          <Link to="/" className="flex md:hidden items-center gap-2 mx-auto">
            <span className="font-serif text-xl font-bold text-accent tracking-wide">
              SCM
            </span>
            <span className="font-serif text-sm font-bold text-foreground leading-tight tracking-tight">
              SRI CHAMUNDESHWARI INTERIORS
            </span>
          </Link>

          {/* Desktop Logo */}
          <Link to="/" className="hidden md:flex items-center gap-3 group">
            <span className="font-serif text-2xl font-bold text-accent tracking-wide group-hover:scale-110 transition-transform duration-300">
              SCM
            </span>
            <span className="font-serif text-lg font-bold text-foreground leading-tight tracking-tight group-hover:text-accent transition-colors duration-300">
              SRI CHAMUNDESHWARI INTERIORS
            </span>
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
                className={`text-sm font-medium transition-all duration-300 relative py-2 ${
                  isActive(link.path)
                    ? "text-accent font-semibold"
                    : "text-foreground/80 hover:text-accent"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Sliding underline */}
            <div
              className="absolute bottom-0 h-0.5 bg-accent transition-all duration-300 ease-out rounded-full"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            />

            <Button
              asChild
              className="bg-accent hover:bg-accent/90 ml-4 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <a href="tel:+918824374977">
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 absolute right-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-border">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                  isActive(link.path)
                    ? "text-accent font-semibold bg-accent/5"
                    : "text-foreground hover:text-accent hover:bg-accent/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 w-full mt-2 shadow-md"
            >
              <a href="tel:+918824374977">
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
