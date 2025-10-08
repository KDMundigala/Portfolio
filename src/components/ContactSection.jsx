import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Facebook,
  MessageSquare,
  Smartphone,
  MapPinned,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

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
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleItems.includes(index)) {
              setVisibleItems(prev => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((item) => {
      if (item) itemObserver.observe(item);
    });

    return () => {
      itemRefs.current.forEach((item) => {
        if (item) itemObserver.unobserve(item);
      });
    };
  }, [visibleItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Error: Email feature is not available. This is a demo contact form and doesn't send actual emails. Please contact me directly through the provided email address or social media links.");
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-4 relative bg-secondary/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl top-1/4 right-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl bottom-1/4 left-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out.
            I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            ref={(el) => (itemRefs.current[0] = el)}
            className={`space-y-8 transition-all duration-700 ${
              visibleItems.includes(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a
                    href="mailto:hello@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    kasunmundigala180@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <a
                    href="tel:+11234567890"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    +94 71 893 2289
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <MapPinned className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    Colombo , Sri Lanka
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="font-medium mb-3 pl-[0px]"></h4> {/* Added pl-2 to move just the text */}
              <div className="flex space-x-5">
                <a 
                  href="https://www.linkedin.com/in/kasun-mundigala-933b85299/overlay/about-this-profile/" 
                  target="_blank"
                  className="p-3 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.facebook.com/kasun.mundigala.2025?mibextid=LQQJ4d" 
                  target="_blank"
                  className="p-3 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/kasuun.__?igsh=MTJ3ajZmemdoaTllOA%3D%3D&utm_source=qr" 
                  target="_blank"
                  className="p-3 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://github.com/KDMundigala" 
                  target="_blank"
                  className="p-3 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={(el) => (itemRefs.current[1] = el)}
            className={`bg-card p-8 rounded-2xl shadow-lg border border-border/50 transition-all duration-700 ${
              visibleItems.includes(1) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <div className="space-y-6">
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Pedro Machado..."
                />
              </div>

              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="john@gmail.com"
                />
              </div>

              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="cosmic-button w-full flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};