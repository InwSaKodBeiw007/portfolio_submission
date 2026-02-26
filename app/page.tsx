'use client'

import Scene from '../components/canvas/Scene'
import Overlay from '../components/ui/Overlay'
import ScrambleText from '../components/ui/ScrambleText'
import ContactModal from '../components/ui/ContactModal'
import { useRef, useState } from 'react'

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isTechStackVisible, setIsTechStackVisible] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState({
    background: '#000000',
    lightColor: '#ffffff',
  })

  const handleViewTechStack = () => {
    setIsTechStackVisible(true)
  }

  const handleBack = () => {
    setIsTechStackVisible(false)
  }

  return (
    <>
      <Scene
        scrollRef={scrollRef}
        isTechStackVisible={isTechStackVisible}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
      <Overlay 
        onViewTechStack={handleViewTechStack} 
        onBack={handleBack} 
        isTechStackVisible={isTechStackVisible} 
        onContactClick={() => setIsContactModalOpen(true)}
      />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      {/* This div stays interactive to capture scroll/drag even when content is hidden */}
      <div className="relative w-full pointer-events-none" ref={scrollRef}>
        <div 
          className={`transition-opacity duration-1000 ${isTechStackVisible ? 'opacity-0' : 'opacity-100 pointer-events-auto'}`}
        >
          {/* Hero Section */}
          <div id="home" className="relative h-[100vh] flex flex-row items-center justify-between px-10 md:px-20 lg:px-40 text-white snap-start snap-always">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter hover:text-gray-300 transition-colors cursor-default whitespace-nowrap">
              <ScrambleText text="Welcome to" autoStart delay={500} />
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-medium tracking-tight hover:text-gray-300 transition-colors cursor-default whitespace-nowrap">
              <ScrambleText text="my web portfolio" autoStart delay={1200} />
            </h2>
          </div>

          {/* Section 1: CVzone to n8n with Python */}
          <div id="projects" className="relative h-[100vh] flex items-center justify-end pr-15 text-white snap-start snap-always">
            <div className="max-w-6xl w-full bg-black/50 p-12 rounded-2xl border border-white/20 backdrop-blur-md pointer-events-auto">
              <h1 className="text-4xl font-bold mb-4">CVzone to n8n with Python</h1>
              <div className="aspect-video mb-6 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/X-f30sSHJjA"
                  title="CVzone to n8n with Python"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                ></iframe>
              </div>
              <p className="text-lg mb-6 text-gray-300">
                Integrating computer vision with workflow automation.
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href="https://www.youtube.com/watch?v=X-f30sSHJjA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Section 2: First Game with Unity */}
          <div id="more-projects" className="relative h-[100vh] flex items-center justify-end pr-15 text-white snap-start snap-always">
            <div className="max-w-6xl w-full bg-black/50 p-12 rounded-2xl border border-white/20 backdrop-blur-md pointer-events-auto">
              <h1 className="text-4xl font-bold mb-4">First Game with Unity</h1>
              <div className="aspect-video mb-6 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/KcYRdBM2t18"
                  title="First Game with Unity"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                ></iframe>
              </div>
              <p className="text-lg mb-6 text-gray-300">
                Exploring game development and interactive experiences.
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href="https://www.youtube.com/watch?v=KcYRdBM2t18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Section 3: Middle Left Content (Skills & Expertise) */}
          <div className="relative h-[100vh] flex items-center justify-start pl-40 text-white snap-start snap-always">
            <div className="max-w-6xl w-full bg-black/50 p-12 rounded-2xl border border-white/20 backdrop-blur-md pointer-events-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10 border-b border-white/10 pb-8">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl flex-shrink-0">
                  <img 
                    src="/IMG_20251212_172409.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-all duration-700 scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tighter text-white inline-block">
                    Skills & Expertise
                  </h1>
                  <p className="text-gray-400 font-mono text-sm mt-1 uppercase tracking-widest">Master of the Artifact</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Website Dev */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-blue-400">Website Development</h2>
                  <p className="text-lg text-gray-200">
                    HTML, CSS, JAVASCRIPT, React, TypeScript, Python
                  </p>
                  <p className="text-sm text-gray-400 font-mono italic">
                    JWT Web Token, LocalStorage, Cookies, Auth, Hash, DB
                  </p>
                  <div className="pt-2">
                    <p className="text-gray-300">Favorite Framework: <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">Next.js</span></p>
                    <a 
                      href="https://github.com/InwSaKodBeiw007/Ecommerce-Website-Nextjs" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 font-bold hover:text-blue-300 transition-colors text-sm mt-4 flex items-center gap-2"
                    >
                      <span>→</span> Ecommerce Project (Next.js)
                    </a>
                  </div>
                </div>

                {/* Game Dev - Skyrim Spirit */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-purple-400">Game Development</h2>
                  <p className="text-lg text-gray-200">
                    Dreaming of creating worlds with the <span className="text-white font-bold italic">Spirit of Skyrim</span>.
                  </p>
                  <p className="text-sm text-gray-400 font-mono italic">
                    Unity, C#, GDScript, Blender, Open-World Logic
                  </p>
                  <div className="pt-2">
                    <p className="text-gray-300 leading-relaxed">
                      I love the immense soul and atmosphere the developers breathed into Skyrim. My goal is to craft immersive, living experiences that resonate with that same creative fire.
                    </p>
                  </div>
                </div>

                {/* ML & Systems */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-green-400">Machine Learning</h2>
                  <p className="text-lg text-gray-200">
                    Python for Model Training (train_test_split Master)
                  </p>
                  <div className="flex flex-col space-y-3 pt-2">
                    <a 
                      href="https://github.com/InwSaKodBeiw007/Kaggle-Titanic-MLPYTHON" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 font-bold hover:text-green-300 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>→</span> Kaggle Titanic ML
                    </a>
                    <a 
                      href="https://github.com/InwSaKodBeiw007/rasterio_NOOBML" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 font-bold hover:text-green-300 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>→</span> Rasterio NOOB ML
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer of the box */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex gap-4">
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono text-gray-300">Docker container</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono text-gray-300">Docker compose</span>
                </div>
                <div className="mt-6 md:mt-0 text-right">
                  <p className="text-gray-400 italic text-sm">
                    I&apos;m a LinuxOS user btw. <span className="text-white not-italic font-bold ml-2">Ubuntu Distro</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: GitHub & Contact */}
          <div id="contact" className="relative h-[100vh] flex items-center justify-center text-white snap-start snap-always">
            <div className="max-w-xl bg-black/50 p-12 rounded-2xl border border-white/10 backdrop-blur-md pointer-events-auto text-center">
              <h1 className="text-5xl font-bold mb-8 tracking-tighter">Let&apos;s Connect</h1>
              <p className="text-xl mb-10 text-gray-400">
                I&apos;m always open to new opportunities and interesting projects.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a 
                  href="https://github.com/InwSaKodBeiw007" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  GitHub Profile
                </a>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full md:w-auto border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
