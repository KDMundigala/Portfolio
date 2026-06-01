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
  CheckCircle2,
  XCircle,
  X
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  // Custom toast notification state
  const [toast, setToast] = useState({ show: false, type: 'success', message: '' });

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
      { threshold: 0.2 }
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

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('error', 'Please fill in all fields.');
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        showToast('success', 'Success! Your message has been sent successfully.');
        setFormData({ name: "", email: "", message: "" });
      } else {
        showToast('error', data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 relative overflow-hidden bg-background">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -top-40 -right-40" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -bottom-40 -left-40" />
      </div>

      {/* Custom Toast Popup */}
      <div
        className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-500 transform ${
          toast.show
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-10 opacity-0 scale-90 pointer-events-none"
        } ${
          toast.type === "success"
            ? "bg-emerald-950/90 text-emerald-200 border-emerald-500/30"
            : "bg-rose-950/90 text-rose-200 border-rose-500/30"
        }`}
      >
        {toast.type === "success" ? (
          <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 animate-bounce" />
        ) : (
          <XCircle className="h-6 w-6 text-rose-400 shrink-0" />
        )}
        <div className="flex-1">
          <p className="text-sm font-semibold leading-snug">{toast.message}</p>
        </div>
        <button
          onClick={() => setToast(prev => ({ ...prev, show: false }))}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-5" />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Contact Cards */}
          <div
            ref={(el) => (itemRefs.current[0] = el)}
            className={`lg:col-span-5 flex flex-col justify-between gap-6 transition-all duration-1000 delay-100 ${
              visibleItems.includes(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold mb-6 leading-tight">Contact Information</h3>

              {/* Email Card */}
              <div className="group relative p-5 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</h4>
                    <a
                      href="mailto:kasunmundigala180@gmail.com"
                      className="text-foreground font-bold hover:text-primary transition-colors duration-200 mt-0.5 block break-all text-sm sm:text-base"
                    >
                      kasunmundigala180@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group relative p-5 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</h4>
                    <a
                      href="tel:+94718932289"
                      className="text-foreground font-bold hover:text-primary transition-colors duration-200 mt-0.5 block text-sm sm:text-base"
                    >
                      +94 71 893 2289
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="group relative p-5 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <MapPinned className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</h4>
                    <p className="text-foreground font-bold mt-0.5 text-sm sm:text-base">
                      Colombo, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials Row */}
            <div className="pt-6">
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/kasun-mundigala-933b85299/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-card border border-border/65 hover:border-primary text-foreground hover:text-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/kasun.mundigala.2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-card border border-border/65 hover:border-primary text-foreground hover:text-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/kasuun.__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-card border border-border/65 hover:border-primary text-foreground hover:text-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/KDMundigala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-card border border-border/65 hover:border-primary text-foreground hover:text-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Modern Form */}
          <div
            ref={(el) => (itemRefs.current[1] = el)}
            className={`lg:col-span-7 p-5 sm:p-8 rounded-3xl border border-border/50 bg-card/70 backdrop-blur-sm shadow-xl transition-all duration-1000 delay-200 ${
              visibleItems.includes(1) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-extrabold mb-6 leading-tight">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border/80 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 peer placeholder-transparent text-sm"
                  placeholder="Your Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-3 text-sm text-muted-foreground transition-all duration-350 pointer-events-none
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                             peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-card peer-focus:px-2
                             peer-valid:-top-2.5 peer-valid:text-xs peer-valid:text-muted-foreground peer-valid:bg-card peer-valid:px-2"
                >
                  Your Name
                </label>
              </div>

              {/* Email Field */}
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border/80 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 peer placeholder-transparent text-sm"
                  placeholder="Your Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-3 text-sm text-muted-foreground transition-all duration-350 pointer-events-none
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                             peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-card peer-focus:px-2
                             peer-valid:-top-2.5 peer-valid:text-xs peer-valid:text-muted-foreground peer-valid:bg-card peer-valid:px-2"
                >
                  Your Email
                </label>
              </div>

              {/* Message Field */}
              <div className="relative group">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border/80 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300 peer placeholder-transparent text-sm"
                  placeholder="Your Message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-3 text-sm text-muted-foreground transition-all duration-350 pointer-events-none
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                             peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-card peer-focus:px-2
                             peer-valid:-top-2.5 peer-valid:text-xs peer-valid:text-muted-foreground peer-valid:bg-card peer-valid:px-2"
                >
                  Your Message
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="cosmic-button w-full py-3.5 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold shadow-lg shadow-primary/20"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending Message...</span>
                ) : (
                  <>
                    Send Message
                    <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};