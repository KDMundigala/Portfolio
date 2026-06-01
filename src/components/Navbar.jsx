import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-lg" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">


        {/* Navigation items in the center - Desktop */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex space-x-8 bg-background/20 backdrop-blur-sm rounded-full px-8 py-3 border border-primary/20">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="relative text-foreground/80 hover:text-primary transition-all duration-300 px-3 py-2 rounded-full hover:bg-primary/10 group"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50 hover:bg-primary/10 rounded-full transition-colors duration-300"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          <div className="relative w-6 h-6">
            <Menu 
              size={24} 
              className={cn(
                "absolute transition-all duration-300",
                isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              )} 
            />
            <X 
              size={24} 
              className={cn(
                "absolute transition-all duration-300",
                isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              )} 
            />
          </div>
        </button>

        {/* Mobile menu overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-500 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className={cn(
                  "relative text-foreground/80 hover:text-primary transition-all duration-300 px-6 py-3 rounded-full hover:bg-primary/10 text-center group",
                  "transform transition-transform duration-500",
                  isMenuOpen 
                    ? `translate-y-0 opacity-100 delay-[${key * 100}ms]`
                    : "translate-y-8 opacity-0"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                <span className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
