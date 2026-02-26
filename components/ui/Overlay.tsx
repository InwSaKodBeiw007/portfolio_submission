'use client'

import React, { useState } from 'react'

interface OverlayProps {
  onViewTechStack: () => void;
  onBack?: () => void;
  isTechStackVisible?: boolean;
}

export default function Overlay({ onViewTechStack, onBack, isTechStackVisible }: OverlayProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-50">
      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-auto">
        <div className="group cursor-pointer" onClick={() => scrollToSection('home')}>
          <h1 className="text-2xl font-black text-white tracking-tighter hover:text-gray-300 transition-colors">
            GAME&apos;S <span className="text-white/50">SITE</span>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><button onClick={() => scrollToSection('home')} className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium">Home</button></li>
            <li><button onClick={() => scrollToSection('projects')} className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium">Projects</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium">Contact Me</button></li>
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white p-2 z-50"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl transition-all duration-500 pointer-events-auto md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
          <button onClick={() => scrollToSection('home')} className="text-3xl font-bold text-white uppercase tracking-tighter">Home</button>
          <button onClick={() => scrollToSection('projects')} className="text-3xl font-bold text-white uppercase tracking-tighter">Projects</button>
          <button onClick={() => scrollToSection('contact')} className="text-3xl font-bold text-white uppercase tracking-tighter">Contact Me</button>
          <div className="pt-8">
            <button
              onClick={() => { onViewTechStack(); setIsMenuOpen(false); }}
              className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg"
            >
              EXPLORE TECH STACK
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Button (Responsive) */}
      <div className={`absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 pointer-events-auto transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
        {isTechStackVisible ? (
          <button
            onClick={onBack}
            className="group relative flex items-center justify-center bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="transition-transform group-hover:-translate-x-1">←</span> BACK
            </span>
            <div className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        ) : (
          <button
            onClick={onViewTechStack}
            className="group relative hidden md:flex items-center justify-center bg-white/10 text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold border border-white/20 backdrop-blur-xl transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-2xl"
          >
            EXPLORE TECH STACK
          </button>
        )}
      </div>
    </div>
  )
}
