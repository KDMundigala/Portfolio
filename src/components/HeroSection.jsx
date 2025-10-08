import { ArrowDown } from "lucide-react";
import profilePhoto from "../assets/profilephoto.png";
import { useEffect, useRef } from 'react';

export const HeroSection = () => {
  const imageRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
      const { left, top, width, height } = rect;
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      // Calculate distance from center
      const distance = Math.sqrt(x * x + y * y);
      const scale = 1.1 + (distance * 0.05);
      
      imageRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 20}deg)
        rotateX(${y * -20}deg)
        scale3d(${scale}, ${scale}, ${scale})
        translateZ(30px)
      `;
      
      // Add glow effect
      imageRef.current.style.filter = `brightness(1.1) drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))`;
    };

    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1) translateZ(0)';
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
    const handleProfileMouseMove = (e) => {
      if (!profileRef.current) return;

      const rect = profileRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
      const { left, top, width, height } = rect;
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      // Calculate distance from center
      const distance = Math.sqrt(x * x + y * y);
      const scale = 1.15 + (distance * 0.1);
      
      profileRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 15}deg)
        rotateX(${y * -15}deg)
        scale3d(${scale}, ${scale}, ${scale})
        translateZ(20px)
      `;
      
      // Add glow effect
      profileRef.current.style.filter = `brightness(1.1) drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))`;
    };

    const handleProfileMouseLeave = () => {
      if (!profileRef.current) return;
      profileRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1) translateZ(0)';
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
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10">
        {/* Left Side Content */}
        <div className="space-y-6 text-left pl-12">
          {/* Mobile Profile Photo */}
          <div className="lg:hidden flex justify-center mb-8 opacity-0 animate-fade-in">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl transition-shadow duration-300">
              <img
                ref={profileRef}
                src={profilePhoto}
                alt="Kasun Mundigala"
                className="w-full h-full object-cover transition-all duration-300 ease-out"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform, filter' }}
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in block">Hi, I'm</span>
            <div className="flex items-center gap-2">
              <span className="text-primary opacity-0 animate-fade-in-delay-1">
                Kasun
              </span>
              <span className="text-gradient opacity-0 animate-fade-in-delay-2">
                Mundigala
              </span>
            </div>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl opacity-0 animate-fade-in-delay-3">
            Versatile software engineer and MERN stack developer, skilled in both
            front-end and back-end. I build responsive, high-performance web
            applications with a strong focus on UI/UX and problem-solving.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button inline-block">
              View My Work
            </a>
          </div>
        </div>

        {/* Right Side - Profile Image */}
        <div className="hidden lg:flex justify-end items-center perspective-1000">
          <div className="transform translate-x-55">
            <img
              ref={imageRef}
              src={profilePhoto}
              alt="Kasun Mundigala"
              className="w-[850px] h-[800px] object-contain opacity-0 animate-fade-in-delay-2 transition-all duration-300 ease-out"
              style={{ maxWidth: "none", transformStyle: 'preserve-3d', willChange: 'transform, filter' }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};