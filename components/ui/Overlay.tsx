'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OverlayProps {
  onViewTechStack: () => void;
  onBack?: () => void;
  isTechStackVisible?: boolean;
}

export default function Overlay({ onViewTechStack, onBack, isTechStackVisible }: OverlayProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Projects', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled ? 'bg-background/80 bg-blur py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-xl md:text-2xl font-bold tracking-tighter text-white hover:text-accent transition-colors"
          >
            GAME<span className="text-accent">.</span>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-10">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => scrollToSection(link.id)} 
                    className="relative text-sm font-medium tracking-wide text-foreground hover:text-white transition-colors group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white p-2 z-[110]"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span 
                animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white origin-left"
              ></motion.span>
              <motion.span 
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-white"
              ></motion.span>
              <motion.span 
                animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white origin-left"
              ></motion.span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background/95 bg-blur z-[105] md:hidden flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-10">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => scrollToSection(link.id)} 
                  className="text-3xl font-bold text-white hover:text-accent transition-colors tracking-tighter"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => { onViewTechStack(); setIsMenuOpen(false); }}
                className="mt-6 px-8 py-3 rounded-full border border-accent text-accent font-bold hover:bg-accent hover:text-white transition-all"
              >
                EXPLORE TECH STACK
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tech Stack Button (Desktop) */}
      {!isTechStackVisible && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-auto hidden md:block">
          <button
            onClick={onViewTechStack}
            className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold bg-blur hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            EXPLORE TECH STACK
          </button>
        </div>
      )}

      {isTechStackVisible && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
          <button
            onClick={onBack}
            className="px-10 py-4 rounded-full bg-accent text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-2"
          >
            <span>←</span> BACK
          </button>
        </div>
      )}
    </>
  )
}
