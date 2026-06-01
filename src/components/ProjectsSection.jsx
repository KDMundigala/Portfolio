import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Vaccine Baby",
    description:
      "Developed a responsive web application that helps parents track and manage their child's vaccination schedule with smart reminders.",
    image: "/projects/project1.png",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Material UI", "Twilio", "Nodemailer"],
    demoUrl: "https://github.com/KDMundigala/Vaccine-Baby",
    githubUrl: "https://github.com/KDMundigala/Vaccine-Baby",
    accent: "from-blue-500/20 to-cyan-500/10",
    dot: "bg-blue-400",
  },
  {
    id: 2,
    title: "Furniture Visualization",
    description:
      "Developed a 3D web application that helps users visualize furniture in virtual rooms before purchasing.",
    image: "/projects/project2.png",
    tags: ["React", "React Three Fiber", "JavaScript", "3D Modeling"],
    demoUrl: "https://github.com/KDMundigala/HCI-Project",
    githubUrl: "https://github.com/KDMundigala/HCI-Project",
    accent: "from-violet-500/20 to-purple-500/10",
    dot: "bg-violet-400",
  },
  {
    id: 3,
    title: "Green Supermarket",
    description:
      "Java-based e-commerce platform with secure payments, user accounts, and full admin controls.",
    image: "/projects/project3.png",
    tags: ["Java", "JSP", "Servlets", "MySQL", "PayPal API"],
    demoUrl: "https://github.com/KDMundigala/Green-Supermarket",
    githubUrl: "https://github.com/KDMundigala/Green-Supermarket",
    accent: "from-emerald-500/20 to-green-500/10",
    dot: "bg-emerald-400",
  },
  {
    id: 4,
    title: "Book Nest",
    description:
      "Role-based library management system with book reservations, real-time updates, and cloud storage.",
    image: "/projects/project4.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "AWS S3", "WebSocket", "Docker"],
    demoUrl: "https://github.com/KDMundigala/Booknest",
    githubUrl: "https://github.com/KDMundigala/Booknest",
    accent: "from-amber-500/20 to-orange-500/10",
    dot: "bg-amber-400",
  },
];

export const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((card) => { if (card) cardObserver.observe(card); });
    return () => { cardRefs.current.forEach((card) => { if (card) cardObserver.unobserve(card); }); };
  }, [visibleCards]);

  return (
    <section ref={sectionRef} id="projects" className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -top-20 -left-20" />
        <div className="absolute w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -bottom-20 -right-20" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-5" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are some of my recent projects — each carefully crafted with attention to detail, performance, and user experience.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[i] = el)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative rounded-3xl overflow-hidden border border-border/50 bg-card/70 backdrop-blur-sm
                          shadow-md hover:shadow-2xl hover:border-primary/30
                          transition-all duration-500 cursor-default
                          ${visibleCards.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Gradient accent overlay (top) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`} />

              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-secondary/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark gradient fade at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />

                {/* Live status dot */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${project.dot} animate-pulse`} />
                  <span className="text-xs font-medium text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    Project
                  </span>
                </div>

                {/* Action buttons appear on hover over image */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm text-white hover:bg-primary transition-colors duration-300"
                      title="View Demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm text-white hover:bg-primary transition-colors duration-300"
                    title="View Code"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={15} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6">
                {/* Title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tags + count */}
                <div className="flex flex-wrap gap-2 items-center">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-secondary/60 text-muted-foreground">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-primary/30 transition-all duration-700 rounded-b-3xl" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2 transform hover:scale-105 transition-transform duration-300"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/KDMundigala"
          >
            <Github size={18} />
            Check My GitHub
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};