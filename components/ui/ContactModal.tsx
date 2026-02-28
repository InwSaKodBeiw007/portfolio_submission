'use client'

import React from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [state, handleSubmit] = useForm("xbdawgpn")

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-deep-space/90 border border-white/10 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            {/* Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

            {!state.succeeded ? (
              <>
                <div className="flex justify-between items-center mb-10">
                  <div className="space-y-1">
                    <h3 className="text-accent font-mono text-xs uppercase tracking-widest">Connect</h3>
                    <h2 className="text-4xl font-bold text-white tracking-tighter">Get in Touch</h2>
                  </div>
                  <button 
                    onClick={onClose} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all text-2xl"
                  >
                    &times;
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-medium text-foreground uppercase tracking-wider ml-1">Your Name</label>
                    <input 
                      required
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-medium text-foreground uppercase tracking-wider ml-1">Email Address</label>
                    <input 
                      required
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 transition-all"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-medium text-foreground uppercase tracking-wider ml-1">Message</label>
                    <textarea 
                      required
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="How can I help you?"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 transition-all resize-none"
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
                  </div>
                  <button 
                    disabled={state.submitting}
                    type="submit"
                    className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:bg-accent hover:text-white active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
                  >
                    {state.submitting ? (
                      <span className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>Send Message <span className="text-xl">→</span></>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 flex flex-col items-center text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                  className="w-24 h-24 bg-accent/20 border border-accent/40 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(79,142,247,0.3)]"
                >
                  <svg className="w-12 h-12 text-accent stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-3 tracking-tighter">Message Sent!</h2>
                <p className="text-lg text-foreground mb-10">I&apos;ll get back to you as soon as possible.</p>
                <button 
                  onClick={onClose}
                  className="px-12 py-4 bg-white/5 text-white rounded-full font-bold border border-white/10 hover:bg-white/10 transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
