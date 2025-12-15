import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  // Premium Animation Variants - slightly faster for a snappier feel
  const menuVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] } }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.05 + i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    exit: { y: 10, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isMobileMenuOpen
            ? 'bg-transparent border-transparent' // Invisible when menu is open
            : isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-neutral-200/50 py-4'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-semibold tracking-tight text-neutral-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            AiMystara
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact"
              className="bg-neutral-900 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-neutral-800 transition-colors duration-300"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-900 focus:outline-none z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
             <AnimatePresence mode='wait'>
                {isMobileMenuOpen ? (
                   <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                      <X size={24} />
                   </motion.div>
                ) : (
                   <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                      <Menu size={24} />
                   </motion.div>
                )}
             </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-white/90 backdrop-blur-3xl flex flex-col items-center justify-start pt-28 md:hidden"
          >
            {/* Very subtle gradient for texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-neutral-50/20 pointer-events-none" />

            <div className="flex flex-col items-center space-y-6 z-10 w-full px-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  custom={index}
                  variants={linkVariants}
                >
                  <Link
                    to={link.path}
                    className="text-2xl font-normal tracking-tight text-neutral-900 hover:text-neutral-500 transition-colors duration-300 block py-1 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Elegant footer detail */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.8 } }}
               className="absolute bottom-12 text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-medium"
            >
               San Francisco • London • Tokyo
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;