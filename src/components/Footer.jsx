import { ArrowUp, Heart } from "lucide-react";
import { useState, useEffect } from "react";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 bg-gradient-to-b from-background to-secondary/30 border-t border-border overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl top-1/2 left-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl top-1/2 right-1/4 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Animated Divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8">
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
        </div>

        {/* Main Footer Content */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>&copy; {currentYear}  All rights reserved.</span>
          </div>

       

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="group p-3 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>

      {/* Floating Scroll to Top Button (appears on scroll) */}
   
    </footer>
  );
};