import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  // Single-page anchor links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#solutions" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  // Handle scroll effect + active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Only do scroll-spy on the home page
      if (location.pathname !== "/") return;

      const sections = navLinks
        .map((link) => {
          const id = link.href.replace("#", "");
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop - 80 } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPos >= sections[i].top) {
          setActiveSection(sections[i].id);
          return;
        }
      }
      // Fallback for top of page
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateUnderline = () => {
      if (!navContainerRef.current) return;

      const activeBtn = navContainerRef.current.querySelector(
        '[data-active="true"]',
      ) as HTMLElement;
      if (activeBtn) {
        setUnderlineStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
        });
      } else {
        setUnderlineStyle({ left: 0, width: 0 });
      }
    };

    updateUnderline();
    // Also update on window resize to keep it aligned
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeSection, location.pathname]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");

    if (location.pathname !== "/") {
      // Navigate to homepage with hash
      window.location.href = "/" + href;
      return;
    }

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-gray-200"
          : "bg-white border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px] gap-4">
          {/* Logo — Left Side */}
          <Link
            to="/"
            className="flex items-center gap-3 group z-20 transition-transform duration-300 hover:scale-[1.02] flex-shrink-0"
          >
            <img
              src="/favicon.png"
              alt="SCM"
              className="w-8 h-8 object-contain"
            />
            <span className="font-serif text-[14px] md:text-[16px] lg:text-lg font-bold text-gray-800 leading-tight tracking-tight whitespace-normal md:whitespace-nowrap max-w-[200px] md:max-w-none text-left">
              SRI CHAMUNDESHWARI INTERIORS
            </span>
          </Link>

          {/* Desktop Navigation — Centered in available space */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div
              ref={navContainerRef}
              className="flex items-center gap-4 h-full relative"
            >
              {navLinks.map((link) => {
                const isActive =
                  isHomePage && activeSection === link.href.replace("#", "");
                return (
                  <button
                    key={link.href}
                    data-active={isActive}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-[16px] font-medium transition-colors duration-300 px-2 py-2 ${
                      isActive
                        ? "text-gray-950"
                        : "text-gray-500 hover:text-gray-950"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}

              {/* The Single Sliding Underline */}
              <span
                className="absolute bottom-[6px] h-[2.5px] bg-[#6B7C59] rounded-full transition-all duration-500 ease-in-out pointer-events-none"
                style={{
                  left: `${underlineStyle.left}px`,
                  width: `${underlineStyle.width}px`,
                  opacity: underlineStyle.width > 0 ? 1 : 0,
                }}
              />
            </div>
          </div>

          {/* Call Us — Right Side */}
          <div className="hidden md:block z-20 flex-shrink-0">
            <Button
              asChild
              className="bg-[#6B7C59] hover:bg-[#5A6B4A] text-white font-serif font-bold tracking-tight uppercase rounded-lg px-6 h-10 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              <a href="tel:+918824374977">CALL US</a>
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 z-10"
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
            {navLinks.map((link, index) => {
              const isActive =
                isHomePage && activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-base text-left font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                    isActive
                      ? "text-[#6B7C59] font-bold bg-[#6B7C59]/5"
                      : "text-foreground hover:text-[#6B7C59] hover:bg-[#6B7C59]/5"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </button>
              );
            })}
            <Button
              asChild
              className="bg-[#6B7C59] hover:bg-[#5A6B4A] w-full mt-2 shadow-md"
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
