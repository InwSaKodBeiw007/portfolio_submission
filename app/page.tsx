'use client'

import Scene from '../components/canvas/Scene'
import Overlay from '../components/ui/Overlay'
import ScrambleText from '../components/ui/ScrambleText'
import ContactModal from '../components/ui/ContactModal'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Section = ({ children, className = '', id = '', inViewCallback }: { children: React.ReactNode, className?: string, id?: string, inViewCallback?: (inView: boolean) => void }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: !inViewCallback,
    onChange: inViewCallback,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView || inViewCallback ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative z-10 min-h-screen flex items-start md:items-center px-6 md:px-20 lg:px-40 py-16 md:py-24 snap-end md:snap-start snap-always scroll-mt-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const AccordionItem = ({ title, label, children, isOpen, onClick }: { title: string, label: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => (
  <div className="border-b border-white/10">
    <button
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-left group min-h-[48px]"
    >
      <div>
        <div className="text-xs text-blue-400 uppercase tracking-widest mb-1">{label}</div>
        <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-white/90 transition-colors">{title}</h3>
      </div>
      <span className="text-white/50 text-2xl font-light">{isOpen ? '−' : '+'}</span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div className="pb-6 px-4 py-3 text-sm text-[#a0a8b8] space-y-2">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function Home() {
  const [isTechStackVisible, setIsTechStackVisible] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  const [isSkillsInView, setIsSkillsInView] = useState(false)
  
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
        isSkillsInView={isSkillsInView}
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
        <Section id="home" className="!p-0 !snap-start overflow-visible flex-col items-center justify-center">
          {/* MOBILE — CENTERED CONTENT (layered over mascot) */}
          <div className="
            flex flex-col items-center justify-center
            min-h-[100vh] w-full
            px-6 pt-16
            text-center
            md:hidden
          ">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
              <ScrambleText text="Welcome to" autoStart delay={500} />
            </h1>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mt-4 text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
              <ScrambleText text="my web portfolio" autoStart delay={1200} />
            </h2>
            <p className="text-lg text-[#a0a8b8] mt-6 max-w-[280px] font-mono [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
              Software Engineer & Game Developer
            </p>
          </div>

          {/* DESKTOP — original layout untouched */}
          <div className="
            hidden md:flex
            h-full w-full items-center justify-end
            px-20 lg:px-40
            text-left
          ">
            <div className="w-full md:w-[60%] space-y-6 [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white hover:text-gray-300 transition-colors cursor-default md:whitespace-nowrap">
                <ScrambleText text="Welcome to" autoStart delay={500} />
                <br />
                <span className="text-accent">my web portfolio</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-4xl lg:text-6xl font-medium tracking-tight text-[#a0a8b8] max-w-xl hover:text-gray-300 transition-colors cursor-default md:whitespace-nowrap">
                Software Engineer & Game Developer
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
          </div>
        </Section>

        {/* 2. Projects Section - Project 1 */}
        <Section id="projects" className="!p-0 !snap-start overflow-visible flex-col">
          {/* MOBILE — CENTERED CONTENT (layered over mascot) */}
          <div className="flex flex-col items-center justify-center min-h-[100vh] w-full px-4 py-20 md:hidden">
            <div className="w-full bg-black/70 p-5 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl pointer-events-auto">
              <h3 className="text-accent font-mono text-xs uppercase tracking-widest mb-1">Selected Project</h3>
              <h1 className="text-xl font-bold mb-3 text-white">CVzone to n8n with Python</h1>
              <div className="aspect-video mb-3 rounded-lg overflow-hidden border border-white/10">
                <iframe width="100%" height="100%"
                  src="https://www.youtube.com/embed/X-f30sSHJjA"
                  title="CVzone to n8n with Python"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen className="border-0" />
              </div>
              <p className="text-sm text-gray-300 mb-3">Integrating computer vision with workflow automation.</p>
              <a href="https://www.youtube.com/watch?v=X-f30sSHJjA" target="_blank" rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white px-5 py-2 text-sm rounded-full">
                Watch on YouTube
              </a>
            </div>
          </div>

          {/* DESKTOP — original layout untouched */}
          <div className="hidden md:flex h-full w-full items-center justify-end pr-15 px-4">
            <div className="max-w-6xl w-full bg-black/60 p-12 rounded-2xl border border-white/20 backdrop-blur-md pointer-events-auto">
              <div className="space-y-2">
                <h3 className="text-accent font-mono text-sm uppercase tracking-widest">Selected Project</h3>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white tracking-tight mb-3">CVzone to n8n with Python</h2>
              </div>
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/40 backdrop-blur-sm mb-4">
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
                <p className="text-sm sm:text-base md:text-lg text-[#a0a8b8] max-w-md">
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
          </div>
        </Section>

        {/* 2. Projects Section - Project 2 */}
        <Section id="more-projects" className="!p-0 !snap-start overflow-visible flex-col">
          {/* MOBILE — CENTERED CONTENT (layered over mascot) */}
          <div className="flex flex-col items-center justify-center min-h-[100vh] w-full px-4 py-20 md:hidden">
            <div className="w-full bg-black/70 p-5 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl pointer-events-auto">
              <h3 className="text-accent font-mono text-xs uppercase tracking-widest mb-1">Game Development</h3>
              <h1 className="text-xl font-bold mb-3 text-white">First Game with Unity</h1>
              <div className="aspect-video mb-3 rounded-lg overflow-hidden border border-white/10">
                <iframe width="100%" height="100%"
                  src="https://www.youtube.com/embed/KcYRdBM2t18"
                  title="First Game with Unity"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen className="border-0" />
              </div>
              <p className="text-sm text-gray-300 mb-3">Exploring game development, physics-based interactions.</p>
              <a href="https://www.youtube.com/watch?v=KcYRdBM2t18" target="_blank" rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white px-5 py-2 text-sm rounded-full">
                Watch on YouTube
              </a>
            </div>
          </div>

          {/* DESKTOP — original layout untouched */}
          <div className="hidden md:flex h-full w-full items-center justify-end pr-15 px-4">
            <div className="max-w-6xl w-full bg-black/60 p-12 rounded-2xl border border-white/20 backdrop-blur-md pointer-events-auto">
              <div className="space-y-2">
                <h3 className="text-accent font-mono text-sm uppercase tracking-widest">Game Development</h3>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white tracking-tight mb-3">First Game with Unity</h2>
              </div>
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/40 backdrop-blur-sm mb-4">
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
                <p className="text-sm sm:text-base md:text-lg text-[#a0a8b8] max-w-md">
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
          </div>
        </Section>

        {/* 3. About / Profile Section - Left Aligned */}
        <Section id="about" className="!p-0 !snap-start overflow-visible flex-col">
          {/* MOBILE — CENTERED CONTENT (layered over mascot) */}
          <div className="flex flex-col items-center justify-center min-h-[100vh] w-full px-4 py-20 md:hidden">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl flex-shrink-0 mb-4">
              <Image 
                src="/IMG_20251212_172409.jpg" 
                alt="Profile" 
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full space-y-4 text-center bg-black/70 p-6 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl pointer-events-auto">
              <h3 className="text-accent font-mono text-xs uppercase tracking-widest">The Creator</h3>
              <h2 className="text-4xl font-bold text-white tracking-tighter">GAME</h2>
              <p className="text-base text-[#a0a8b8] leading-relaxed">
                I am a passionate software developer based in Thailand, driven by the desire to build tools and experiences that make an impact. My journey spans from web automation to game design.
              </p>
            </div>
          </div>

          {/* DESKTOP — original layout untouched */}
          <div className="hidden md:flex h-full w-full items-center justify-start pl-40 px-4 pt-32 ">
            <div className="w-full md:w-[60%] flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left [text-shadow:0_2px_20px_rgba(0,0,0,0.8)] bg-black/70 p-6 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl">
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 md:border-4 border-white/20 shadow-2xl flex-shrink-0">
                <Image 
                  src="/IMG_20251212_172409.jpg" 
                  alt="Profile" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 ">
                <div className="space-y-2">
                  <h3 className="text-accent font-mono text-sm uppercase tracking-widest">The Creator</h3>
                  <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">GAME</h2>
                </div>
                <p className="text-xl text-[#a0a8b8] leading-relaxed">
                  I am a passionate software developer based in Thailand, driven by the desire to build tools and experiences that make an impact. My journey spans from web automation to game design, always seeking the perfect balance between functionality and aesthetics.
                </p>
                <p className="text-lg text-[#a0a8b8]/80 italic font-light">
                  &quot;I love the immense soul and atmosphere the developers breathed into Skyrim. My goal is to craft immersive, living experiences that resonate with that same creative fire.&quot;
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Skills Section - Left Aligned */}
        <Section id="skills" className="!p-0 !snap-start overflow-visible flex-col" inViewCallback={(inView) => setIsSkillsInView(inView)}>
          {/* MOBILE — CENTERED CONTENT (layered over mascot) */}
          <div className="flex flex-col items-center justify-center min-h-[100vh] w-full px-4 py-20 md:hidden">
            <div className="w-full bg-black/70 p-5 rounded-xl border border-white/20 backdrop-blur-sm pointer-events-auto">
              <div className="space-y-1 mb-6">
                <h3 className="text-accent font-mono text-xs uppercase tracking-widest">EXPERTISE</h3>
                <h2 className="text-2xl font-bold text-white tracking-tight">Technical skills Stack</h2>
              </div>
              <div className="w-full flex flex-col">
                <AccordionItem 
                  title="Web Frameworks & CMS" 
                  label="WEBSITE DEVELOPMENT" 
                  isOpen={openAccordion === 0} 
                  onClick={() => setOpenAccordion(openAccordion === 0 ? null : 0)}
                >
                  <div>React / Next.js</div>
                  <div>TypeScript / JavaScript</div>
                  <div>Python / Node.js</div>
                  <div>Auth (JWT, OAuth)</div>
                  <div>Databases (SQL, NoSQL)</div>
                  <div>SQLite, MongoDB, Firebase</div>
                  <div>Prisma</div>
                  <div>WordPress Design & Customization</div>
                </AccordionItem>

                <AccordionItem 
                  title="Unity / Godot" 
                  label="GAME DEVELOPMENT" 
                  isOpen={openAccordion === 1} 
                  onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                >
                  <div>Unity / C#</div>
                  <div>Roblox studio / Lua</div>
                  <div>Godot / GDScript</div>
                  <div>Blender (3D Modeling)</div>
                  <div>Game Systems Design</div>
                </AccordionItem>

                <AccordionItem 
                  title="Python & Automation" 
                  label="MACHINE LEARNING & AUTOMATION" 
                  isOpen={openAccordion === 2} 
                  onClick={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
                >
                  <div>Python (NumPy, Pandas)</div>
                  <div>Scikit-Learn</div>
                  <div>Computer Vision (CVzone)</div>
                  <div>Workflow Automation (n8n)</div>
                </AccordionItem>

                <AccordionItem 
                  title="Linux & Docker" 
                  label="INFRASTRUCTURE" 
                  isOpen={openAccordion === 3} 
                  onClick={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
                >
                  <div>Linux (Ubuntu)</div>
                  <div>Docker / Docker Compose</div>
                  <div>Git / Version Control</div>
                </AccordionItem>
              </div>
            </div>
          </div>

          {/* DESKTOP — original layout untouched */}
          <div className="hidden md:flex h-[100vh] items-center justify-start pl-40 px-4 w-full">
            <div className="w-full md:w-[60%] space-y-8">
              <div className="space-y-1">
                <h3 className="text-accent font-mono text-xs uppercase tracking-widest">EXPERTISE</h3>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Technical skills Stack</h2>
              </div>

              <div className="w-full flex flex-col bg-black/70 p-6 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl">
                <AccordionItem 
                  title="Web Frameworks & CMS" 
                  label="WEBSITE DEVELOPMENT" 
                  isOpen={openAccordion === 0} 
                  onClick={() => setOpenAccordion(openAccordion === 0 ? null : 0)}
                >
                  <div>React / Next.js</div>
                  <div>TypeScript / JavaScript</div>
                  <div>Python / Node.js</div>
                  <div>Auth (JWT, OAuth)</div>
                  <div>Databases (SQL, NoSQL)</div>
                  <div>SQLite, MongoDB, Firebase</div>
                  <div>Prisma</div>
                  <div>WordPress Design & Customization</div>
                  <div className="pt-3 flex flex-col gap-2">
                    <a href="https://github.com/InwSaKodBeiw007/Ecommerce-Website-Nextjs" target="_blank" rel="noopener noreferrer" className="inline-block border border-white/20 rounded-full px-3 py-1 text-xs text-white hover:bg-white/10 w-fit">GitHub: Ecommerce Project ↗</a>
                    <a href="https://narakpainai.wordpress.com/about/" target="_blank" rel="noopener noreferrer" className="inline-block border border-white/20 rounded-full px-3 py-1 text-xs text-white hover:bg-white/10 w-fit">WordPress: About what my Dream is ↗</a>
                  </div>
                </AccordionItem>

                <AccordionItem 
                  title="Unity / Godot" 
                  label="GAME DEVELOPMENT" 
                  isOpen={openAccordion === 1} 
                  onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                >
                  <div>Unity / C#</div>
                  <div>Roblox studio / Lua</div>
                  <div>Godot / GDScript</div>
                  <div>Blender (3D Modeling)</div>
                  <div>Game Systems Design</div>
                </AccordionItem>

                <AccordionItem 
                  title="Python & Automation" 
                  label="MACHINE LEARNING & AUTOMATION" 
                  isOpen={openAccordion === 2} 
                  onClick={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
                >
                  <div>Python (NumPy, Pandas)</div>
                  <div>Scikit-Learn</div>
                  <div>Computer Vision (CVzone)</div>
                  <div>Workflow Automation (n8n)</div>
                  <div className="pt-3 flex flex-col gap-2">
                    <a href="https://github.com/InwSaKodBeiw007/Kaggle-Titanic-MLPYTHON" target="_blank" rel="noopener noreferrer" className="inline-block border border-white/20 rounded-full px-3 py-1 text-xs text-white hover:bg-white/10 w-fit">GitHub: Titanic ML ↗</a>
                    <a href="https://github.com/InwSaKodBeiw007/rasterio_NOOBML" target="_blank" rel="noopener noreferrer" className="inline-block border border-white/20 rounded-full px-3 py-1 text-xs text-white hover:bg-white/10 w-fit">GitHub: Rasterio ML ↗</a>
                  </div>
                </AccordionItem>

                <AccordionItem 
                  title="Linux & Docker" 
                  label="INFRASTRUCTURE" 
                  isOpen={openAccordion === 3} 
                  onClick={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
                >
                  <div>Linux (Ubuntu)</div>
                  <div>Docker / Docker Compose</div>
                  <div>Git / Version Control</div>
                </AccordionItem>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. Contact Section - Right Aligned */}
        <Section id="contact" className="justify-center md:justify-end !snap-start">
          <div className="w-full md:w-[60%] space-y-12 text-center md:text-left">
            <div className="space-y-4">
              <h3 className="text-accent font-mono text-sm uppercase tracking-widest">Connect</h3>
              <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">Let&apos;s talk<span className="text-accent">.</span></h2>
            </div>
            <p className="text-xl md:text-2xl text-[#a0a8b8] max-w-xl bg-black/70 p-6 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl">
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

        <footer className="py-12 border-t border-white/5 text-center relative z-10">
          <p className="text-sm text-[#a0a8b8]/50 font-mono">
            &copy; {new Date().getFullYear()} GAME. Built with Next.js & Framer Motion.
          </p>
        </footer>

      </div>
    </main>
  )
}
