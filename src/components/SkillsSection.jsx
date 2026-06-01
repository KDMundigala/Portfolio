import { useState, useEffect, useRef } from "react";

const categoryConfig = {
  languages: { label: "Languages" },
  frontend:  { label: "Frontend" },
  backend:   { label: "Backend & DBs" },
  mobile:    { label: "Mobile Dev" },
  tools:     { label: "Tools & Platforms" },
};

const skills = [
  // Programming Languages
  { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",     category: "languages" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", category: "languages" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", category: "languages" },
  { name: "C",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",               category: "languages" },
  { name: "C#",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",     category: "languages" },
  { name: "PHP",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",           category: "languages" },
  { name: "Dart",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",         category: "languages" },
  { name: "Kotlin",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",     category: "languages" },

  // Frontend
  { name: "HTML",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",               category: "frontend" },
  { name: "CSS",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",                 category: "frontend" },
  { name: "React.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",               category: "frontend" },
  { name: "Next.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",             category: "frontend" },
  { name: "Angular",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",           category: "frontend" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",   category: "frontend" },
  { name: "Material UI",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg",     category: "frontend" },
  { name: "jQuery",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg",             category: "frontend" },

  // Backend & Databases
  { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",       category: "backend" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",     category: "backend" },
  { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",     category: "backend" },
  { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",         category: "backend" },
  { name: "Supabase",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",   category: "backend" },
  { name: "Firebase",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",   category: "backend" },

  // Mobile
  { name: "Flutter",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",     category: "mobile" },
  { name: "Dart",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",           category: "mobile" },
  { name: "Kotlin",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",       category: "mobile" },

  // Tools & Platforms
  { name: "AWS",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "tools" },
  { name: "Firebase",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",   category: "tools" },
  { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",             category: "tools" },
  { name: "GitHub",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",       category: "tools" },
  { name: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",       category: "tools" },
  { name: "Postman",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",     category: "tools" },
  { name: "Figma",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",         category: "tools" },
  { name: "Twilio",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twilio/twilio-original.svg",       category: "tools" },
  { name: "Nodemailer", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",       category: "tools" },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("languages");
  const [isVisible, setIsVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setAnimKey(k => k + 1);
  };

  const filteredSkills = skills.filter(
    (s) => s.category === activeCategory
  );

  return (
    <section ref={sectionRef} id="skills" className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 relative overflow-hidden">

      {/* Ambient background blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-4" />
          <p className="text-muted-foreground text-lg">Technologies I work with every day</p>
        </div>

        {/* Category Filter Pills */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {Object.entries(categoryConfig).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === key
                  ? "text-white border-transparent shadow-lg shadow-primary/25"
                  : "text-muted-foreground border-border/60 hover:border-primary/40 hover:text-primary hover:scale-105"
              }`}
              style={activeCategory === key ? {
                background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.75))`
              } : {}}
            >
              {cfg.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div key={animKey} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
          {filteredSkills.map((skill, i) => (
            <div
              key={`${skill.name}-${skill.category}-${animKey}`}
              className="group relative bg-card/70 backdrop-blur-sm border border-border/50 rounded-2xl p-4 flex flex-col items-center gap-3
                         hover:border-primary/40 hover:shadow-xl hover:-translate-y-2 hover:bg-card
                         transition-all duration-300 cursor-default overflow-hidden opacity-0"
              style={{
                animation: isVisible ? `skillFadeIn 0.45s ease forwards ${(i % 14) * 45}ms` : 'none',
              }}
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              {/* Tech Logo */}
              <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback initial badge */}
                <div
                  className="w-10 h-10 rounded-xl bg-primary/20 text-primary font-bold text-sm items-center justify-center hidden"
                >
                  {skill.name.slice(0, 2).toUpperCase()}
                </div>
              </div>

              {/* Skill name */}
              <span className="text-xs font-semibold text-foreground/80 text-center leading-tight group-hover:text-primary transition-colors duration-300">
                {skill.name}
              </span>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-primary/30 transition-all duration-500 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes skillFadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </section>
  );
};