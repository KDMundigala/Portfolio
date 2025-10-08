import { useState, useEffect, useRef } from "react";
import { Code2, Braces, FileJson, Database, Cloud, Mail, GitBranch, Github, Package, Figma, Server, Layers, Palette } from "lucide-react";

const skillIcons = {
  "Python": Code2,
  "JavaScript": FileJson,
  "TypeScript": Braces,
  "C": Code2,
  "C#": Code2,
  "PHP": Code2,
  "HTML": Braces,
  "CSS": Palette,
  "React.js": Layers,
  "Next.js": Layers,
  "Angular": Layers,
  "Tailwind CSS": Palette,
  "Material UI": Palette,
  "Node.js": Server,
  "Express.js": Server,
  "MongoDB": Database,
  "MySQL": Database,
  "AWS": Cloud,
  "Firebase Storage": Database,
  "Twilio": Mail,
  "Nodemailer": Mail,
  "Git": GitBranch,
  "GitHub": Github,
  "Postman": Package,
  "Docker": Package,
  "Figma": Figma,
};

const skills = [
  // Programming Languages
  { name: "Python", level: 85, category: "languages" },
  { name: "JavaScript", level: 92, category: "languages" },
  { name: "TypeScript", level: 88, category: "languages" },
  { name: "C", level: 75, category: "languages" },
  { name: "C#", level: 70, category: "languages" },
  { name: "PHP", level: 72, category: "languages" },
  
  // Frontend Development
  { name: "HTML", level: 95, category: "frontend" },
  { name: "CSS", level: 93, category: "frontend" },
  { name: "React.js", level: 90, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "Angular", level: 78, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  { name: "Material UI", level: 88, category: "frontend" },
  
  // Backend & Databases
  { name: "Node.js", level: 87, category: "backend" },
  { name: "Express.js", level: 85, category: "backend" },
  { name: "MongoDB", level: 82, category: "backend" },
  { name: "MySQL", level: 80, category: "backend" },
  
  // Tools & Platforms
  { name: "AWS", level: 75, category: "tools" },
  { name: "Firebase Storage", level: 80, category: "tools" },
  { name: "Twilio", level: 70, category: "tools" },
  { name: "Nodemailer", level: 78, category: "tools" },
  { name: "Git", level: 90, category: "tools" },
  { name: "GitHub", level: 92, category: "tools" },
  { name: "Postman", level: 88, category: "tools" },
  { name: "Docker", level: 76, category: "tools" },
  { name: "Figma", level: 85, category: "tools" },
];

const categories = ["all", "languages", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-4 relative bg-secondary/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg">Technologies I work with</p>
        </div>
        
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 capitalize font-medium transform hover:scale-105 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-secondary/70 text-foreground hover:bg-secondary hover:shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => {
            const IconComponent = skillIcons[skill.name] || Code2;
            return (
              <div
                key={key}
                className={`bg-card p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 border border-border/50 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${key * 0.05 + 0.3}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                  </div>
                  <span className="text-lg font-bold text-primary">{skill.level}%</span>
                </div>
                
                <div className="relative w-full bg-secondary/50 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ease-out ${
                      isVisible ? '' : 'w-0'
                    }`}
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${key * 0.05 + 0.5}s`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                
                <div className="mt-3 inline-block">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/70 text-muted-foreground capitalize">
                    {skill.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};