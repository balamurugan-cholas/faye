import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { ChevronDown, Menu, Instagram, Mail } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { MobileMenu } from './components/MobileMenu';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import img1 from './portfolio/img1.jpeg';
import img2 from './portfolio/img2.jpeg';
import img3 from './portfolio/img3.jpeg';
import img4 from './portfolio/img4.jpeg';
import img5 from './portfolio/img5.jpeg';
import img6 from './portfolio/img6.jpeg';
import img7 from './portfolio/img7.jpeg';
import img8 from './portfolio/img8.jpeg';
import img9 from './portfolio/img9.jpeg';
import img10 from './portfolio/img10.jpeg';
import profile from './portfolio/profile.jpeg';

// Photography portfolio data
const portfolioImages = [
  img1,
  img2,
  img4,
  img3,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
];

const selectedWorksImages = {
  large1: 'https://images.unsplash.com/photo-1693492983564-78599aaef44e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwb3J0cmFpdCUyMGdvbGRlbiUyMGhvdXJ8ZW58MXx8fHwxNzcxNjU5Njk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  large2: 'https://images.unsplash.com/photo-1665074805060-764347712c37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc3MTU3NTEwMXww&ixlib=rb-4.1.0&q=80&w=1080',
  cinematic: 'https://images.unsplash.com/photo-1596620155307-a0739663a340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBob3VyJTIwc3Vuc2V0JTIwbGlnaHR8ZW58MXx8fHwxNzcxNjU2ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  stack1: 'https://images.unsplash.com/photo-1682936189834-9e03bf5a61af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29keSUyMHVyYmFuJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcxNjU5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  stack2: 'https://images.unsplash.com/photo-1700148676800-a12f8a016deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmUlMjBtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzE2NTk2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

function App() {
  const [showFooterMessage, setShowFooterMessage] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const quoteLines = [
  "Some memories don't need words.",
  "Just light."
];

const [typedText, setTypedText] = useState('');
const [hasTyped, setHasTyped] = useState(false);
const quoteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
  if (!quoteRef.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasTyped) {
        setHasTyped(true);

        const fullText = quoteLines.join('\n');
        let index = 0;

        const type = () => {
          setTypedText(fullText.slice(0, index));
          index++;

          if (index <= fullText.length) {
            setTimeout(type, 35);
          }
        };

        type();
      }
    },
    { threshold: 0.6 }
  );

  observer.observe(quoteRef.current);

  return () => observer.disconnect();
}, [hasTyped]);

  return (
    <div className="min-h-screen bg-[#F5F1ED] dark:bg-[#0E0E0E] transition-colors duration-700" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1648322478725-f576fdcad620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFuJTIwc2hhZG93c3xlbnwxfHx8fDE3NzE2NTk2OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Top Left - Photographer Label */}
        <div className="absolute top-8 left-8 z-20">
          <p className="text-white/60 tracking-[0.25em] uppercase text-xs md:text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Photographer
          </p>
        </div>

        {/* Top Right - Navigation (Desktop) */}
        <nav className="hidden md:flex absolute top-8 right-8 z-20 items-center gap-8">
          <button
            onClick={() => scrollToSection('work')}
            className="text-white/60 hover:text-white transition-colors duration-500 tracking-[0.2em] uppercase text-xs"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-white/60 hover:text-white transition-colors duration-500 tracking-[0.2em] uppercase text-xs"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Contact
          </button>
        </nav>

        {/* Top Right - Mobile Menu */}
        <div className="md:hidden absolute top-8 right-8 z-20 flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-white/60 hover:text-white transition-colors duration-300"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 text-center px-6"
        >
          <h1
            className="text-white mb-6 tracking-wide"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.2,
            }}
          >
            Captured by FAYE
          </h1>
          <p
            className="text-white/90 tracking-[0.25em] uppercase mb-16"
            style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', letterSpacing: '0.25em' }}
          >
            Not Just Photos. Moments That Stay.
          </p>

          <p
            className="text-white/90 tracking-[0.25em] uppercase mb-10"
            style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', letterSpacing: '0.25em' }}
          >
            Not Just Photos. Moments That Stay.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mb-16 flex-wrap">
            {/* Hire Me Button */}
            <a
              href="mailto:hello@faye.com"
              className="px-8 py-3 border border-black text-white bg-black
                        uppercase tracking-[0.2em] text-xs
                        hover:bg-white hover:text-black hover:border-black transition-all duration-300 ease-out
                        transition-all duration-300 ease-out"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Hire Me
            </a>

            {/* Instagram Button */}
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-black text-black bg-white
                        uppercase tracking-[0.2em] text-xs flex items-center gap-2
                        hover:bg-black hover:text-white hover:border-white transition-all duration-300 ease-out
                        transition-all duration-300 ease-out"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Instagram size={16} strokeWidth={1.75} />
              Instagram
            </a>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-sm tracking-[0.2em] uppercase">Scroll</span>
            <ChevronDown size={20} strokeWidth={1} />
          </motion.div>
        </motion.div>
      </section>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Intro Statement - First Person, Left Aligned */}
      <section className="fade-in-section py-14 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-[480px]">
          <p
            className="leading-relaxed text-left dark:text-white/90"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: '#0E0E0E',
              lineHeight: 1.7,
            }}
          >
            I'm drawn to quiet moments, natural light, and the stories that exist in between.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="work" className="fade-in-section py-15 md:pb-50 px-10 md:px-16 lg:px-24">
        <Masonry columnsCount={3} gutter="1.5rem">
          {portfolioImages.map((src, index) => (
            <div
              key={index}
              className="relative overflow-hidden"
            >
              <img
                src={src}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </Masonry>
      </section>

      <section className="fade-in-section py-32 md:py-48 px-6 bg-[#D6C6B8]">
  <div ref={quoteRef} className="max-w-4xl mx-auto text-center">
    <blockquote
      className="tracking-tight whitespace-pre-line"
      style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
        color: '#0E0E0E',
        lineHeight: 1.4,
      }}
    >
      {typedText}
    </blockquote>
  </div>
</section>

      {/* Featured Carousel - Cards with Navigation */}
      <section className="fade-in-section py-32 md:py-48">
        <FeaturedCarousel />
      </section>

      {/* About Section - Round Logo with Horizontal Text */}
      <section id="about" className="fade-in-section pt-5 md:pt-20 pb-2 md:pb-12 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          <div className="flex-shrink-0 relative">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text dark:text-black/40" style={{ fontFamily: 'Inter, sans-serif' }}>
              Me
            </span>
            <img
              src={profile}
              alt="Elena - Photographer"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p
              className="leading-loose text-center md:text-leftdark:text-white/70"
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                color: '#8A8A8A',
                lineHeight: 1.8,
              }}
            >
              I started taking photos as a way to hold on to fleeting moments.
              <br /><br />
              Over time, it became how I understand places, people, and light.
              <br /><br />
              This space is a collection of those observations.
            </p>
          </div>
        </div>
      </section>

      {/* Micro Section - Quiet Transition */}
      <section className="fade-in-section py-15 md:py-15 px-6 text-center">
        <p
          className="tracking-[0.15em] uppercase"
          style={{
            fontSize: '0.75rem',
            color: '#BDBDBD',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Still observing. Still learning.
        </p>
      </section>

      {/* Contact Section - With Icons, No Underline */}
      <section id="contact" className="fade-in-section py-32 md:py-40 px-6 text-center bg-[#0E0E0E]">
        <h2
          className="text-white mb-16 tracking-tight"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          Get in touch
        </h2>

        <div className="flex items-center justify-center gap-12">
          <a
            href="https://www.instagram.com/mase.raw?igsh=MWh3cWdoa2pyeDN6Yw=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors duration-500 group"
          >
            <Instagram size={32} strokeWidth={1.5} />
            <span className="text-sm tracking-[0.1em]" style={{ fontFamily: 'Inter, sans-serif' }}>Instagram</span>
          </a>

          <a
            href="mailto:balamurugan.codes@gmail.com"
            className="flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors duration-500 group"
          >
            <Mail size={32} strokeWidth={1.5} />
            <span className="text-sm tracking-[0.1em]" style={{ fontFamily: 'Inter, sans-serif' }}>Email</span>
          </a>
        </div>
      </section>

      <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), 
                      transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .fade-in-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 1 !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .masonry-grid {
            column-count: 2 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;