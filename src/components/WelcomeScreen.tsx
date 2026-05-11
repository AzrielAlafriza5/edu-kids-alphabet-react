import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playBlup } from '../lib/audio';

interface WelcomeScreenProps {
  key?: React.Key;
  onStart: () => void;
  t: any;
  language: 'id' | 'en';
  setLanguage: (lang: 'id' | 'en') => void;
}

export function WelcomeScreen({ onStart, t, language, setLanguage }: WelcomeScreenProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    setIsTransitioning(true);
    playBlup();
    
    // Play multiple bubble sounds
    setTimeout(() => playBlup(), 150);
    setTimeout(() => playBlup(), 300);
    setTimeout(() => playBlup(), 450);
    setTimeout(() => playBlup(), 600);

    setTimeout(() => {
      onStart();
    }, 1200);
  };

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] pointer-events-none flex items-end justify-center overflow-hidden"
          >
            {/* Creates several bubbles moving upwards */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 100, x: Math.random() * 400 - 200, scale: 0, opacity: 0 }}
                animate={{ 
                  y: -window.innerHeight - 100, 
                  x: Math.random() * 600 - 300,
                  scale: Math.random() * 2 + 1,
                  opacity: 0.8
                }}
                transition={{ 
                  duration: Math.random() * 0.8 + 0.6,
                  ease: "easeOut",
                  delay: Math.random() * 0.3
                }}
                className="absolute w-12 h-12 bg-white rounded-full opacity-80 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.1)] border-2 border-blue-100"
                style={{
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -50 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-sm rounded-[40px] md:rounded-[60px] p-6 md:p-12 shadow-2xl text-center max-w-sm md:max-w-lg w-full flex flex-col items-center justify-center relative border-4 md:border-8 border-white border-opacity-50 mx-4"
      >
      {/* Decorative floating emojis around the welcome card */}
      <motion.div 
        animate={{ y: [-10, 10, -10], rotate: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -top-8 -left-6 md:-top-12 md:-left-8 text-5xl md:text-7xl drop-shadow-lg"
      >
        🦁
      </motion.div>
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-6 text-5xl md:text-7xl drop-shadow-lg z-0"
      >
        🧑‍🚀
      </motion.div>
      <motion.div 
        animate={{ y: [-15, 15, -15], rotate: [15, -15, 15] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -top-6 -right-4 md:-top-10 md:-right-6 text-5xl md:text-7xl drop-shadow-lg z-0"
      >
        🍎
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 text-5xl md:text-7xl drop-shadow-lg z-0"
      >
        🧸
      </motion.div>
      
      <motion.h1 
        animate={{ scale: [1, 1.05, 1], rotate: [-1, 1, -1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-[#5A8DCC] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] uppercase leading-tight mb-4 md:mb-6"
      >
        PINTAR <br /> ALFABET
      </motion.h1>

      <div className="flex flex-col items-center gap-4 w-full mb-8">
        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{t.choose_lang}</p>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage('id')}
            className={`px-4 py-2 rounded-full font-black text-sm transition-all border-2 active:scale-95 ${language === 'id' ? 'bg-[#5A8DCC] text-white border-[#5A8DCC] shadow-[0_4px_15px_rgba(90,141,204,0.4)] scale-110' : 'bg-white text-slate-400 border-slate-100 hover:border-[#5A8DCC]'}`}
          >
            🇮🇩 INDONESIA
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-full font-black text-sm transition-all border-2 active:scale-95 ${language === 'en' ? 'bg-[#5A8DCC] text-white border-[#5A8DCC] shadow-[0_4px_15px_rgba(90,141,204,0.4)] scale-110' : 'bg-white text-slate-400 border-slate-100 hover:border-[#5A8DCC]'}`}
          >
            🇺🇸 ENGLISH
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          y: [0, -5, 0],
          boxShadow: ["0px 10px 20px rgba(0,0,0,0.1)", "0px 15px 30px rgba(0,0,0,0.15)", "0px 10px 20px rgba(0,0,0,0.1)"]
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={handleStart}
        className="w-full md:w-3/4 py-3 md:py-6 bg-[#FDFD96] text-[#EAB308] rounded-full text-2xl md:text-3xl font-black uppercase tracking-widest border-4 border-white shadow-xl transition-all active:scale-95"
      >
        {t.start}
      </motion.button>
    </motion.div>
    </>
  );
}
