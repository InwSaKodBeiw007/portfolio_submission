'use client'

import Link from 'next/link'

interface OverlayProps {
  onViewTechStack: () => void;
  onBack?: () => void;
  isTechStackVisible?: boolean;
  onContactClick?: () => void;
}

export default function Overlay({ onViewTechStack, onBack, isTechStackVisible, onContactClick }: OverlayProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10">
      {/* Top Header ... */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-auto">
        <div className="group cursor-pointer" onClick={() => scrollToSection('home')}>
          <h1 className="text-2xl font-black text-white tracking-tighter hover:text-gray-300 transition-colors">
            GAME&apos;S <span className="text-white/50">SITE</span>
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-8">
            <li><button onClick={() => scrollToSection('home')} className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium">Home</button></li>
            <li><button onClick={() => scrollToSection('projects')} className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium">Projects</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium">More Projects</button></li>
            <li><button onClick={onContactClick} className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium">Contact Me</button></li>
          </ul>
        </nav>
      </div>

      {/* Bottom Center Button */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto">
        {isTechStackVisible ? (
          <button
            onClick={onBack}
            className="group relative flex items-center justify-center bg-white text-black px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="transition-transform group-hover:-translate-x-1">←</span> BACK
            </span>
            <div className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        ) : (
          <button
            onClick={onViewTechStack}
            className="group relative flex items-center justify-center bg-white/10 text-white px-10 py-4 rounded-full font-bold border border-white/20 backdrop-blur-xl transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-2xl"
          >
            EXPLORE TECH STACK
          </button>
        )}
      </div>
    </div>
  )
}
