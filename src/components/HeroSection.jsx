import { ArrowDown } from "lucide-react";
import profilePhoto from "../assets/profilephoto.png";
import { useEffect, useRef } from 'react';

export const HeroSection = () => {
  const imageRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    // Only enable 3D tilt on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const distance = Math.sqrt(x * x + y * y);
      const scale = 1.1 + distance * 0.05;
      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${y * -20}deg) scale3d(${scale},${scale},${scale}) translateZ(30px)`;
      imageRef.current.style.filter = `brightness(1.1) drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))`;
    };

    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1,1,1) translateZ(0)';
      imageRef.current.style.filter = 'brightness(1) drop-shadow(0 0 0 transparent)';
    };

    const container = imageRef.current?.parentElement;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const handleProfileMouseMove = (e) => {
      if (!profileRef.current) return;
      const rect = profileRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const distance = Math.sqrt(x * x + y * y);
      const scale = 1.15 + distance * 0.1;
      profileRef.current.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${y * -15}deg) scale3d(${scale},${scale},${scale}) translateZ(20px)`;
      profileRef.current.style.filter = `brightness(1.1) drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))`;
    };

    const handleProfileMouseLeave = () => {
      if (!profileRef.current) return;
      profileRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1,1,1) translateZ(0)';
      profileRef.current.style.filter = 'brightness(1) drop-shadow(0 0 0 transparent)';
    };

    const profileContainer = profileRef.current?.parentElement;
    if (profileContainer) {
      profileContainer.addEventListener('mousemove', handleProfileMouseMove);
      profileContainer.addEventListener('mouseleave', handleProfileMouseLeave);
    }
    return () => {
      if (profileContainer) {
        profileContainer.removeEventListener('mousemove', handleProfileMouseMove);
        profileContainer.removeEventListener('mouseleave', handleProfileMouseLeave);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6"
    >
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10 w-full">

        {/* Left Side Content */}
        <div className="space-y-5 text-center lg:text-left px-0 sm:px-4 lg:px-0 lg:pl-4 order-2 lg:order-1">

          {/* Mobile / Tablet Profile Photo */}
          <div className="lg:hidden flex justify-center mb-4 sm:mb-8 opacity-0 animate-fade-in">
            <div className="relative w-36 h-36 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl">
              <img
                ref={profileRef}
                src={profilePhoto}
                alt="Kasun Mundigala"
                className="w-full h-full object-cover object-center transition-all duration-300 ease-out"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform, filter' }}
              />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in block">Hi, I'm</span>
            <div className="flex items-center gap-2 justify-center lg:justify-start flex-wrap">
              <span className="text-primary opacity-0 animate-fade-in-delay-1">
                Kasun
              </span>
              <span className="text-gradient opacity-0 animate-fade-in-delay-2">
                Mundigala
              </span>
            </div>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 text-center lg:text-justify opacity-0 animate-fade-in-delay-3 leading-relaxed">
            I'm a software engineer with a Second Class Upper Division degree, passionate about building scalable web, mobile, and ERP applications. I focus on UI/UX, real-world problem solving, and AI-powered solutions, with experience delivering multiple production-level projects.
          </p>

          <div className="pt-2 opacity-0 animate-fade-in-delay-4 flex justify-center lg:justify-start">
            <a href="#projects" className="cosmic-button inline-block">
              View My Work
            </a>
          </div>
        </div>

        {/* Right Side - Profile Image (Desktop only) */}
        <div className="hidden lg:flex justify-end items-center order-1 lg:order-2">
          <div className="transform translate-x-16 xl:translate-x-28">
            <img
              ref={imageRef}
              src={profilePhoto}
              alt="Kasun Mundigala"
              className="w-[550px] xl:w-[700px] h-auto object-contain opacity-0 animate-fade-in-delay-2 transition-all duration-300 ease-out"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform, filter' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-xs sm:text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </div>
    </section>
  );
};