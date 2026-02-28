'use client'

import Scene from '../components/canvas/Scene'
import Overlay from '../components/ui/Overlay'
import ScrambleText from '../components/ui/ScrambleText'
import ContactModal from '../components/ui/ContactModal'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Section = ({ children, className = '', id = '' }: { children: React.ReactNode, className?: string, id?: string }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen flex items-start md:items-center px-6 md:px-20 lg:px-40 py-24 snap-end md:snap-start snap-always ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  const [isTechStackVisible, setIsTechStackVisible] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState({
    background: '#050508',
    lightColor: '#ffffff',
  })

  const handleViewTechStack = () => {
    setIsTechStackVisible(true)
  }

  const handleBack = () => {
    setIsTechStackVisible(false)
  }

  return (
    <main className="relative">
      <Scene
        isTechStackVisible={isTechStackVisible}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
      
      <Overlay 
        onViewTechStack={handleViewTechStack} 
        onBack={handleBack} 
        isTechStackVisible={isTechStackVisible} 
      />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      <div className={`transition-opacity duration-1000 ${isTechStackVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* 1. Hero Section - Right Aligned */}
        <Section id="home" className="justify-center md:justify-end">
          <div className="w-full md:w-[60%] text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
              <ScrambleText text="Welcome to" autoStart delay={500} />
              <br />
              <span className="text-accent">my web portfolio</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-xl">
              Software Engineer & Creative Developer specializing in high-performance web applications and immersive experiences.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all"
              >
                View My Work
              </button>
            </div>
          </div>
        </Section>

        {/* 2. Projects Section - Project 1 */}
        <Section id="projects" className="justify-center md:justify-end">
          <div className="w-full md:w-[60%] space-y-8">
            <div className="space-y-2">
              <h3 className="text-accent font-mono text-sm uppercase tracking-widest">Selected Project</h3>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">CVzone to n8n with Python</h2>
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/40 backdrop-blur-sm">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/X-f30sSHJjA"
                title="CVzone to n8n with Python"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0 transition-all duration-700"
              ></iframe>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="text-foreground text-lg max-w-md">
                Integrating computer vision with workflow automation to create seamless AI-driven processes.
              </p>
              <a
                href="https://www.youtube.com/watch?v=X-f30sSHJjA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold hover:text-accent transition-colors"
              >
                Watch on YouTube <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </Section>

        {/* 2. Projects Section - Project 2 */}
        <Section id="more-projects" className="justify-center md:justify-end">
          <div className="w-full md:w-[60%] space-y-8">
            <div className="space-y-2">
              <h3 className="text-accent font-mono text-sm uppercase tracking-widest">Game Development</h3>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">First Game with Unity</h2>
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/40 backdrop-blur-sm">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/KcYRdBM2t18"
                title="First Game with Unity"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0 transition-all duration-700"
              ></iframe>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="text-foreground text-lg max-w-md">
                Exploring game development, physics-based interactions, and immersive environmental design.
              </p>
              <a
                href="https://www.youtube.com/watch?v=KcYRdBM2t18"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold hover:text-accent transition-colors"
              >
                Watch on YouTube <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </Section>

        {/* 3. About / Profile Section - Left Aligned */}
        <Section id="about" className="justify-center md:justify-start">
          <div className="w-full md:w-[60%] flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-accent/30 shadow-[0_0_50px_rgba(79,142,247,0.2)] flex-shrink-0">
              <Image 
                src="/IMG_20251212_172409.jpg" 
                alt="Profile" 
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-accent font-mono text-sm uppercase tracking-widest">The Creator</h3>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">GAME</h2>
              </div>
              <p className="text-xl text-foreground leading-relaxed">
                I am a passionate software developer based in Thailand, driven by the desire to build tools and experiences that make an impact. My journey spans from web automation to game design, always seeking the perfect balance between functionality and aesthetics.
              </p>
              <p className="text-lg text-foreground/80 italic font-light">
                &quot;I love the immense soul and atmosphere the developers breathed into Skyrim. My goal is to craft immersive, living experiences that resonate with that same creative fire.&quot;
              </p>
            </div>
          </div>
        </Section>

        {/* 4. Skills Section - Left Aligned */}
        <Section id="skills" className="justify-center md:justify-start">
          <div className="w-full md:w-[60%] space-y-16">
            <div className="space-y-4">
              <h3 className="text-accent font-mono text-sm uppercase tracking-widest">Expertise</h3>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Technical Stack</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Web Dev */}
              <div className="space-y-6 border-l-2 border-accent/20 pl-8">
                <h3 className="text-2xl font-bold text-white">Website Development</h3>
                <ul className="space-y-2 text-foreground text-lg">
                  <li>React / Next.js</li>
                  <li>TypeScript / JavaScript</li>
                  <li>Python / Node.js</li>
                  <li>Auth (JWT, OAuth)</li>
                  <li>Databases (SQL, NoSQL)</li>
                </ul>
                <div className="pt-2">
                  <a 
                    href="https://github.com/InwSaKodBeiw007/Ecommerce-Website-Nextjs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-accent hover:bg-accent hover:text-white transition-all"
                  >
                    GitHub: Ecommerce Project
                  </a>
                </div>
              </div>

              {/* Game Dev */}
              <div className="space-y-6 border-l-2 border-accent/20 pl-8">
                <h3 className="text-2xl font-bold text-white">Game Development</h3>
                <ul className="space-y-2 text-foreground text-lg">
                  <li>Unity / C#</li>
                  <li>Godot / GDScript</li>
                  <li>Blender (3D Modeling)</li>
                  <li>Open-World Logic</li>
                  <li>Shader Programming</li>
                </ul>
              </div>

              {/* ML & Systems */}
              <div className="space-y-6 border-l-2 border-accent/20 pl-8">
                <h3 className="text-2xl font-bold text-white">Machine Learning</h3>
                <ul className="space-y-2 text-foreground text-lg">
                  <li>Python (NumPy, Pandas)</li>
                  <li>Scikit-Learn</li>
                  <li>Workflow Automation (n8n)</li>
                  <li>Computer Vision</li>
                </ul>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a 
                    href="https://github.com/InwSaKodBeiw007/Kaggle-Titanic-MLPYTHON" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-accent hover:bg-accent hover:text-white transition-all"
                  >
                    GitHub: Titanic ML
                  </a>
                  <a 
                    href="https://github.com/InwSaKodBeiw007/rasterio_NOOBML" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-accent hover:bg-accent hover:text-white transition-all"
                  >
                    GitHub: Rasterio ML
                  </a>
                </div>
              </div>

              {/* Infrastructure */}
              <div className="space-y-6 border-l-2 border-accent/20 pl-8">
                <h3 className="text-2xl font-bold text-white">Infrastructure</h3>
                <ul className="space-y-2 text-foreground text-lg">
                  <li>Linux (Ubuntu)</li>
                  <li>Docker / Docker Compose</li>
                  <li>CI/CD Pipelines</li>
                  <li>Git / Version Control</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. Contact Section - Right Aligned */}
        <Section id="contact" className="justify-center md:justify-end">
          <div className="w-full md:w-[60%] space-y-12 text-center md:text-left">
            <div className="space-y-4">
              <h3 className="text-accent font-mono text-sm uppercase tracking-widest">Connect</h3>
              <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">Let&apos;s talk<span className="text-accent">.</span></h2>
            </div>
            <p className="text-xl md:text-2xl text-foreground max-w-xl">
              I&apos;m currently available for freelance work and full-time opportunities. Have a project in mind?
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 pt-6">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full md:w-auto px-12 py-4 rounded-full bg-accent text-white font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-accent/20"
              >
                Get In Touch
              </button>
              <a 
                href="https://github.com/InwSaKodBeiw007" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto px-12 py-4 rounded-full border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </Section>

        <footer className="py-12 border-t border-white/5 text-center">
          <p className="text-sm text-foreground/50 font-mono">
            &copy; {new Date().getFullYear()} GAME. Built with Next.js & Framer Motion.
          </p>
        </footer>

      </div>
    </main>
  )
}
