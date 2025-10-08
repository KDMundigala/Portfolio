import { Briefcase, Code, User, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
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
    const handleMouseMove = (e, cardElement, iconElement) => {
      if (!cardElement || !iconElement) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = cardElement.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      cardElement.style.transform = `
        perspective(1000px)
        rotateY(${x * 5}deg)
        rotateX(${y * -5}deg)
        translateZ(10px)
      `;

      iconElement.style.transform = `
        scale(1.2)
        rotate(${x * 20}deg)
        translateZ(20px)
      `;
    };

    const handleMouseLeave = (cardElement, iconElement) => {
      if (!cardElement || !iconElement) return;
      cardElement.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
      iconElement.style.transform = 'scale(1) rotate(0) translateZ(0)';
    };

    cardsRef.current.forEach((card) => {
      if (card) {
        const iconWrapper = card.querySelector('.icon-wrapper');
        const mouseMoveHandler = (e) => handleMouseMove(e, card, iconWrapper);
        const mouseLeaveHandler = () => handleMouseLeave(card, iconWrapper);
        
        card.addEventListener('mousemove', mouseMoveHandler);
        card.addEventListener('mouseleave', mouseLeaveHandler);
        
        card._mouseMoveHandler = mouseMoveHandler;
        card._mouseLeaveHandler = mouseLeaveHandler;
      }
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card && card._mouseMoveHandler) {
          card.removeEventListener('mousemove', card._mouseMoveHandler);
          card.removeEventListener('mouseleave', card._mouseLeaveHandler);
        }
      });
    };
  }, [isVisible]);

  return (
    <section id="about" className="py-24 px-4 relative" ref={sectionRef}>
      <div className="container mx-auto max-w-5xl">
        <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              <h3 className="text-2xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  Motivated Software Engineer
                </span>
                <br />
                <span className="text-foreground">& Full-Stack Developer</span>
              </h3>
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/30 rounded-full"></div>
            </div>

            <p className="text-muted-foreground">
              As a recent Software Engineering graduate, I specialize in building responsive, scalable web applications using the MERN stack. I focus on integrating modern UI/UX principles to deliver seamless and intuitive user experiences.
            </p>

            <p className="text-muted-foreground">
              I'm passionate about turning ideas into impactful digital solutions through clean code, collaborative teamwork, and continuous learning, while exploring emerging technologies and innovative approaches to solve complex problems in the ever-evolving world of web development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href="https://drive.google.com/file/d/1UtU1vhlY17eUPpORCLkL_0x0p1t_OF7A/view?usp=drive_link"
                className="px-6 py-2 rounded-full border border-primary text-primary 
                           hover:bg-primary/10 transition-colors duration-300 
                           flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div 
              ref={(el) => (cardsRef.current[0] = el)}
              className={`gradient-border p-6 card-hover transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} 
              style={{ transitionDelay: '300ms', transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-4">
                <div className="icon-wrapper p-3 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg transition-all duration-300" style={{ transformStyle: 'preserve-3d' }}>
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Full-Stack Development</h4>
                  <p className="text-muted-foreground">
                    Building dynamic, responsive web applications using modern technologies and frameworks.
                  </p>
                </div>
              </div>
            </div>
            <div 
              ref={(el) => (cardsRef.current[1] = el)}
              className={`gradient-border p-6 card-hover transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} 
              style={{ transitionDelay: '450ms', transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-4">
                <div className="icon-wrapper p-3 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg transition-all duration-300" style={{ transformStyle: 'preserve-3d' }}>
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">UI/UX Design</h4>
                  <p className="text-muted-foreground">
                    Designing user-focused interfaces that provide smooth, engaging, and meaningful digital experiences.
                  </p>
                </div>
              </div>
            </div>
            <div 
              ref={(el) => (cardsRef.current[2] = el)}
              className={`gradient-border p-6 card-hover transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} 
              style={{ transitionDelay: '600ms', transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-4">
                <div className="icon-wrapper p-3 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg transition-all duration-300" style={{ transformStyle: 'preserve-3d' }}>
                  <Briefcase className="h-6 w-6 text-white" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Collaborative Team</h4>
                  <p className="text-muted-foreground">
                    Driving teamwork and communication to achieve project goals efficiently through agile practices..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};