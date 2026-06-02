import { Briefcase, Code, GraduationCap, User, Download, Smartphone, Cpu, Building2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import cvPdf from "../assets/Kasun Mundigala.pdf";

const capabilities = [
  {
    icon: Code,
    title: "Full-Stack Development",
    desc: "Building dynamic, responsive web applications using modern technologies and frameworks.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    desc: "Developing high-performance, cross-platform mobile apps for iOS and Android.",
  },
  {
    icon: User,
    title: "UI/UX Design",
    desc: "Designing user-focused interfaces that provide smooth, engaging digital experiences.",
  },
  {
    icon: Cpu,
    title: "AI & Production Solutions",
    desc: "Integrating AI-powered solutions and delivering production-grade systems across web, mobile, and ERP.",
  },
];

const education = [
  {
    degree: "BSc (Hons) in Software Engineering",
    grade: "Second Class (Upper Division)",
    institution: "University of Plymouth",
    period: "2022 – 2025",
  },
  {
    degree: "English Diploma",
    institution: "Aquinas College",
    period: "2021 – 2022",
  },
  {
    degree: "G.C.E. A/Level (Commerce)",
    institution: "Siri Piyarathana College",
    period: "2020 – 2021",
  },
];

const experience = [
  {
    role: "Full-Stack & Mobile Developer",
    company: "Cozy Hub Digital",
    period: "September 2025 – Present",
    points: [
      "Developed and maintained scalable web, mobile, and ERP applications using modern technologies and best practices.",
      "Designed and implemented secure backend services, RESTful APIs, and efficient database solutions.",
      "Led end-to-end development activities, from requirements analysis to deployment and ongoing support.",
      "Collaborated with cross-functional teams to deliver high-quality software solutions in Agile environments.",
    ],
  },
];

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  // Animated counter for 15+
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = 15;
    const duration = 1200;
    const step = Math.ceil(duration / end);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Ambient glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">

        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary to-primary/40" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14 lg:mb-20">

          {/* LEFT: Bio + Stat + Buttons */}
          <div className={`text-center lg:text-left transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>

            {/* Title with accent bar */}
            <div className="relative pl-5 border-l-4 border-primary rounded-sm mb-6">
              <h3 className="text-2xl font-bold leading-snug">
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Motivated Software Engineer
                </span>
                <br />
                <span className="text-foreground">Full-Stack & Mobile Developer</span>
              </h3>
            </div>

            {/* Bio Paragraph */}
            <div className="space-y-4 mb-8">
              <p className="text-muted-foreground leading-relaxed text-justify">
                Motivated Software Engineering graduate (BSc Hons, Second Class Upper) with a strong passion for Full-Stack, Mobile, and ERP systems. Experienced in transforming complex requirements into responsive, production-level solutions, I have successfully delivered 15+ high-performance projects through clean code, structured system design, and collaborative teamwork.
              </p>
            </div>

            {/* 15+ Projects Stat */}
            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl md:text-5xl font-black text-primary leading-none tabular-nums">
                {count}<span className="text-2xl md:text-3xl font-extrabold">+</span>
              </div>
              <div className="text-sm font-semibold text-muted-foreground tracking-wide leading-tight max-w-[200px]">
                Production-Grade Projects Completed
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>
              <a
                href={cvPdf}
                download="Kasun Mundigala.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center gap-2 font-medium"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>

          {/* RIGHT: Capability Cards 2x2 Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="group relative p-5 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-default overflow-hidden"
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  {/* Hover glow accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 flex flex-col gap-3">
                    {/* Icon */}
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-md group-hover:scale-110 group-hover:shadow-primary/30 transition-all duration-300">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    {/* Text */}
                    <div>
                      <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors duration-300">
                        {cap.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-primary/30 transition-all duration-500 rounded-b-2xl" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Education & Experience Side-by-Side ── */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Section divider label */}
          <div className="relative flex items-center gap-4 mb-12">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase px-3">
              Qualifications & Experience
            </span>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* ── Education Column ── */}
            <div>
              {/* Column header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-md">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Education</h3>
              </div>

              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className="group relative p-5 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden cursor-default"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                      transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${700 + i * 130}ms,
                                   transform 0.65s cubic-bezier(0.22,1,0.36,1) ${700 + i * 130}ms,
                                   box-shadow 0.3s ease,
                                   border-color 0.3s ease`,
                    }}
                  >
                    {/* Top sweep accent bar */}
                    <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary via-primary/70 to-primary/20 transition-all duration-500 ease-out rounded-t-2xl" />
                    {/* Soft glow overlay */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.07) 0%, transparent 70%)' }}
                    />
                    {/* Lift on hover */}
                    <div className="relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                        <h4 className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors duration-300">
                          {edu.degree}
                        </h4>
                        <span className="shrink-0 self-start text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                          {edu.period}
                        </span>
                      </div>
                      {edu.grade && (
                        <p className="text-xs text-primary/80 font-semibold mb-1">{edu.grade}</p>
                      )}
                      <p className="text-xs text-muted-foreground font-medium">{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Work Experience Column ── */}
            <div>
              {/* Column header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-md">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Work Experience</h3>
              </div>

              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className="group relative p-5 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden cursor-default"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                      transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${830 + i * 130}ms,
                                   transform 0.65s cubic-bezier(0.22,1,0.36,1) ${830 + i * 130}ms,
                                   box-shadow 0.3s ease,
                                   border-color 0.3s ease`,
                    }}
                  >
                    {/* Top sweep accent bar */}
                    <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary via-primary/70 to-primary/20 transition-all duration-500 ease-out rounded-t-2xl" />
                    {/* Soft glow overlay */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.07) 0%, transparent 70%)' }}
                    />

                    <div className="relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h4 className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors duration-300">
                            {exp.role}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Building2 size={12} className="text-primary/70" />
                            <span className="text-xs text-primary/80 font-semibold">{exp.company}</span>
                          </div>
                        </div>
                        <span className="shrink-0 self-start text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {exp.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                            <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};