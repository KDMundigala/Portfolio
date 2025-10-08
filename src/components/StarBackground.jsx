import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [floatingElements, setFloatingElements] = useState([]);
  const [gridDots, setGridDots] = useState([]);

  useEffect(() => {
    generateFloatingElements();
    generateGridDots();

    const handleResize = () => {
      generateFloatingElements();
      generateGridDots();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateFloatingElements = () => {
    const numberOfElements = 8;
    const newElements = [];

    for (let i = 0; i < numberOfElements; i++) {
      newElements.push({
        id: i,
        size: Math.random() * 120 + 80,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.1 + 0.05,
        animationDuration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
      });
    }

    setFloatingElements(newElements);
  };

  const generateGridDots = () => {
    const spacing = 40;
    const newDots = [];
    let id = 0;

    for (let x = 0; x < window.innerWidth; x += spacing) {
      for (let y = 0; y < window.innerHeight; y += spacing) {
        if (Math.random() > 0.7) { // Only show 30% of dots
          newDots.push({
            id: id++,
            x: (x / window.innerWidth) * 100,
            y: (y / window.innerHeight) * 100,
            opacity: Math.random() * 0.2 + 0.1,
            delay: Math.random() * 5,
          });
        }
      }
    }

    setGridDots(newDots);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-slate-900 dark:via-slate-800/50 dark:to-indigo-900/30" />
      
      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-200/20 via-transparent to-blue-200/20 dark:from-purple-900/20 dark:to-blue-900/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-rose-100/10 to-transparent dark:via-rose-900/10" />
      </div>

      {/* Animated grid dots */}
      {gridDots.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-1 h-1 bg-slate-400/40 dark:bg-slate-500/40 rounded-full animate-pulse-slow"
          style={{
            left: dot.x + "%",
            top: dot.y + "%",
            opacity: dot.opacity,
            animationDelay: dot.delay + "s",
          }}
        />
      ))}

      {/* Floating geometric elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className={`absolute animate-float-gentle ${
            element.type === 0
              ? "rounded-full bg-gradient-to-br from-blue-200/20 to-purple-300/20 dark:from-blue-800/20 dark:to-purple-700/20"
              : element.type === 1
              ? "rounded-lg bg-gradient-to-br from-emerald-200/20 to-teal-300/20 dark:from-emerald-800/20 dark:to-teal-700/20 rotate-12"
              : "bg-gradient-to-br from-rose-200/20 to-pink-300/20 dark:from-rose-800/20 dark:to-pink-700/20 transform rotate-45"
          } backdrop-blur-sm border border-white/10 dark:border-white/5`}
          style={{
            width: element.size + "px",
            height: element.size + "px",
            left: element.x + "%",
            top: element.y + "%",
            opacity: element.opacity,
            animationDuration: element.animationDuration + "s",
            animationDelay: element.delay + "s",
          }}
        />
      ))}

      {/* Subtle light rays */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-200/30 to-transparent dark:via-blue-800/20 animate-pulse-slow" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-200/30 to-transparent dark:via-purple-800/20 animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-rose-200/30 to-transparent dark:via-rose-800/20 animate-pulse-slow" style={{ animationDelay: "4s" }} />

      {/* Radial gradient overlays for depth */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-blue-200/10 to-transparent dark:from-blue-800/10 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-radial from-purple-200/10 to-transparent dark:from-purple-800/10 rounded-full animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-100/5 to-transparent dark:from-emerald-800/5 rounded-full animate-pulse-slow" style={{ animationDelay: "6s" }} />

      {/* CSS Custom Animations */}
      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-10px) translateX(5px) rotate(1deg); }
          50% { transform: translateY(-5px) translateX(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) translateX(3px) rotate(0.5deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        .animate-float-gentle {
          animation: float-gentle 20s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        /* Ensure smooth transitions for dark mode */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>
    </div>
  );
};