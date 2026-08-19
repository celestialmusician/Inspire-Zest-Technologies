import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import "./PrismaHero.css";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="prisma-hero-asterisk">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- Hero ---------------- */
export const PrismaHero = () => {
  const titleGroupRef = useRef<HTMLDivElement>(null);

  const handleTitleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = titleGroupRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
    el.style.setProperty("--spotlight-active", "1");
  };

  const handleTitleMouseLeave = () => {
    const el = titleGroupRef.current;
    if (!el) return;
    el.style.setProperty("--mouse-x", "-500px");
    el.style.setProperty("--mouse-y", "-500px");
    el.style.setProperty("--spotlight-active", "0");
  };



  const handleCtaClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServicesClick = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="prisma-hero-section">
      <div className="prisma-hero-card">
        
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="prisma-hero-video"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Cinematic gradient overlay for maximum contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-1" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 z-1" />

        {/* Hero content container (Vertically Centered on the Left) */}
        <div className="prisma-hero-content-wrapper">
          <div className="prisma-hero-stack">
            
            {/* Headline Display with Cursor Field Spotlight */}
            <div
              ref={titleGroupRef}
              onMouseMove={handleTitleMouseMove}
              onMouseLeave={handleTitleMouseLeave}
              className="prisma-hero-title-group"
            >

              <h1 className="prisma-hero-title">
                <motion.span
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  Inspire
                </motion.span>
                <span className="prisma-zest-wrap">
                  <motion.span
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block relative"
                  >
                    Zest<span className="prisma-hero-asterisk">*</span>
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="prisma-hero-technologies font-display"
                  >
                    Technologies
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* 3. Description Copy */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="prisma-hero-description"
            >
              Empowering ambitious brands across India and the Middle East with cutting-edge software architecture, digital marketing, and bespoke cloud solutions.
            </motion.p>



            {/* 4. Action Buttons Row */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="prisma-hero-btn-group"
            >
              <button
                type="button"
                onClick={handleCtaClick}
                className="prisma-hero-btn-primary group"
              >
                <span>Let's Talk</span>
                <span className="prisma-hero-btn-arrow">
                  <ArrowRight className="h-4 w-4 text-[#E1E0CC]" />
                </span>
              </button>

              <button
                type="button"
                onClick={handleServicesClick}
                className="prisma-hero-btn-secondary"
              >
                <span>Our Services</span>
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PrismaHero;



