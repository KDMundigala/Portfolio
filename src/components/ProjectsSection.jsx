import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Vaccine Baby",
    description: "Developed a responsive web application that helps parents.",
    image: "/projects/project1.png",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Material UI", "Twilio", "Nodemailer"],
    demoUrl: "https://github.com/KDMundigala/Vaccine-Baby",
    githubUrl: "https://github.com/KDMundigala/Vaccine-Baby",
  },
  {
    id: 2,
    title:"Furniture Visualization",
    description:
      "Developed a 3D web application that helps users visualize furniture in virtual rooms.",
    image: "/projects/project2.png",
    tags: ["React", "React Three Fiber", "JavaScript", "3D Modeling"],
    demoUrl: "https://github.com/KDMundigala/HCI-Project",
    githubUrl: "https://github.com/KDMundigala/HCI-Project",
  },
  {
    id: 3,
    title: "Green Supermarket",
    description:
      "Java-based e-commerce platform with secure payments, user accounts, and admin controls.",
    image: "/projects/project3.png",
    tags: ["Java", "JSP", "Servlets", "MySQL", "PayPal API"],
    demoUrl: "https://github.com/KDMundigala/Green-Supermarket",
    githubUrl: "https://github.com/KDMundigala/Green-Supermarket",
  },
  {
    id: 4,
    title: "Book Nest",
    description:
      "Role-based library management system with book reservations and real-time updates.",
    image: "/projects/project4.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "AWS S3", "WebSocket", "Docker"],
    demoUrl: "https://github.com/KDMundigala/Booknest",
    githubUrl: "https://github.com/KDMundigala/Booknest",
  },
];

export const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

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

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards(prev => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) cardObserver.unobserve(card);
      });
    };
  }, [visibleCards]);

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are some of my recent projects. Each project was carefully
            crafted with attention to detail, performance, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, key) => (
            <div
              key={key}
              ref={(el) => (cardRefs.current[key] = el)}
              className={`group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-border/50 transition-all duration-700 transform hover:-translate-y-3 ${
                visibleCards.includes(key) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
              }`}
              style={{ transitionDelay: `${(key % 4) * 0.1}s` }}
            >
              {/* Image Container - Full visible without crop */}
              <div className="relative h-48 overflow-hidden bg-secondary/20 p-3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content Container */}
              <div className="p-5 flex flex-col">
                {/* Title */}
                <h3 className="text-lg font-bold mb-2 min-h-[3.5rem] leading-tight group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 min-h-[2.5rem] leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4 min-h-[2.5rem]">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 transition-all duration-300 hover:bg-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-secondary/70 text-muted-foreground">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-center">
                  <div className="flex space-x-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                        title="View Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                      title="View Code"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2 transform hover:scale-105 transition-transform duration-300"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/KDMundigala"
          >
            <Github size={20} />
            Check My Github 
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};