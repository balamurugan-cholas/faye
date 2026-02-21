import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-0 right-0 h-full w-[280px] bg-[#0E0E0E] z-50 flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors duration-300"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <nav className="flex flex-col gap-8 px-8 py-12">
              <button
                onClick={() => scrollToSection('work')}
                className="text-white/80 hover:text-white transition-colors duration-300 text-left tracking-[0.2em] uppercase text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white/80 hover:text-white transition-colors duration-300 text-left tracking-[0.2em] uppercase text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Contact
              </button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
