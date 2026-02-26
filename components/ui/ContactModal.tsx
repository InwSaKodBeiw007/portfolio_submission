'use client'

import React from 'react'
import { useForm, ValidationError } from '@formspree/react'

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [state, handleSubmit] = useForm("xbdawgpn")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {!state.succeeded ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white tracking-tighter">Get in Touch</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors text-2xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1 ml-1">Your Name</label>
                <input 
                  required
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Master's guest..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1 ml-1">Email Address</label>
                <input 
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="text-red-400 text-xs mt-1 ml-1"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1 ml-1">Message</label>
                <textarea 
                  required
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell me something interesting..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors resize-none"
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="text-red-400 text-xs mt-1 ml-1"
                />
              </div>
              <button 
                disabled={state.submitting}
                type="submit"
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {state.submitting ? (
                  <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : 'Send Message'}
              </button>
            </form>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <svg 
                className="w-10 h-10 text-white stroke-[4]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-white mb-2 tracking-tight uppercase italic">Message Sent!</h2>
            <p className="text-2xl font-bold text-green-500 mb-8 italic">Have a great day.</p>
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-white/10 text-white rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
