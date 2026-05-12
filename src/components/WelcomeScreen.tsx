import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playBlup } from '../lib/audio';
import { Play } from 'lucide-react';

interface WelcomeScreenProps {
  key?: React.Key;
  onStart: () => void;
  t: any;
  language: 'id' | 'en' | 'es' | 'de';
  setLanguage: (lang: 'id' | 'en' | 'es' | 'de') => void;
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

  const languages = [
    { id: 'id', name: 'INDONESIA', flag: '🇮🇩' },
    { id: 'en', name: 'ENGLISH', flag: '🇺🇸' },
    { id: 'es', name: 'ESPAÑOL', flag: '🇪🇸' },
    { id: 'de', name: 'GERMAN', flag: '🇩🇪' },
  ] as const;

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
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 200, x: Math.random() * 400 - 200, scale: 0, opacity: 0 }}
                animate={{ 
                  y: -window.innerHeight - 200, 
                  x: Math.random() * 800 - 400,
                  scale: Math.random() * 4 + 1,
                  opacity: 0.9
                }}
                transition={{ 
                  duration: Math.random() * 1.5 + 1,
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
                className="absolute w-16 h-16 bg-white rounded-full opacity-80 shadow-[inset_0_-8px_16px_rgba(0,0,0,0.1)] border-[8px] border-blue-50"
                style={{
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-pattern">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -100 }}
          transition={{ 
            type: "spring",
            damping: 20,
            stiffness: 120
          }}
          className="bg-white rounded-[60px] md:rounded-[100px] p-10 md:p-20 card-shadow text-center max-w-lg md:max-w-4xl w-full flex flex-col items-center justify-center relative border-[12px] md:border-[24px] border-white mx-4"
        >
          {/* Decorative floating elements */}
          <motion.div 
            animate={{ y: [-15, 15, -15], rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -top-12 -left-8 md:-top-16 md:-left-12 text-6xl md:text-9xl drop-shadow-xl z-20 select-none"
          >
            🦁
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-12 -right-8 md:-top-16 md:-right-12 text-6xl md:text-9xl drop-shadow-xl z-20 select-none"
          >
            🍎
          </motion.div>
          <motion.div 
            animate={{ y: [10, -10, 10], rotate: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-8 md:-bottom-16 md:-left-12 text-6xl md:text-9xl drop-shadow-xl z-20 select-none"
          >
            🧑‍🚀
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
            className="absolute -bottom-10 -right-8 md:-bottom-16 md:-right-12 text-6xl md:text-9xl drop-shadow-xl z-20 select-none"
          >
            🧸
          </motion.div>

          {/* Title Area */}
          <div className="mb-12 md:mb-16 select-none">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <h1 className="text-6xl md:text-9xl font-display font-black text-[#4E88E5] tracking-tight drop-shadow-sm mb-[-0.1em]">
                PINTAR
              </h1>
              <div className="flex gap-2">
                {['A', 'L', 'F', 'A', 'B', 'E', 'T'].map((letter, i) => (
                  <motion.span
                    key={i}
                    animate={{ rotate: [-3, 3, -3], scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.1, ease: "easeInOut" }}
                    className={`text-6xl md:text-9xl font-display font-black inline-block drop-shadow-sm ${
                      ['text-[#FF9F43]', 'text-[#4E88E5]', 'text-[#2ED573]', 'text-[#FF4757]', 'text-[#FFC107]', 'text-[#B2BEC3]', 'text-[#A29BFD]'][i] || 'text-[#4E88E5]'
                    }`}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-6 w-full mb-12 md:mb-20">
            <div className="flex items-center gap-4 text-[#758AA1] font-black tracking-[0.2em] text-sm md:text-lg mb-2">
              <motion.span animate={{ x: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 2 }}>➔</motion.span>
              {t.choose_lang.toUpperCase()}
              <motion.span animate={{ x: [3, -3, 3] }} transition={{ repeat: Infinity, duration: 2 }}>⬅</motion.span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              {languages.map((lang) => (
                <button 
                  key={lang.id}
                  onClick={() => {
                    setLanguage(lang.id);
                    playBlup();
                  }}
                  className={`group relative flex items-center gap-3 px-6 md:px-10 py-3 md:py-5 rounded-full font-black text-sm md:text-xl transition-all border-[4px] md:border-[6px] active:scale-95 shadow-lg ${
                    language === lang.id 
                      ? 'bg-[#4E88E5] text-white border-[#4E88E5] scale-110 z-10' 
                      : 'bg-[#F8FAFC] text-slate-400 border-transparent hover:border-[#4E88E5]/20'
                  }`}
                >
                  <span className="text-2xl md:text-4xl transform group-hover:scale-125 transition-transform drop-shadow-sm">
                    {lang.id === 'id' ? '🇮🇩' : lang.id === 'en' ? '🇺🇸' : lang.id === 'es' ? '🇪🇸' : '🇩🇪'}
                  </span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md relative group select-none">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="w-full py-6 md:py-10 bg-[#FFD93D] text-[#B45309] rounded-[40px] md:rounded-[60px] text-4xl md:text-6xl font-black uppercase tracking-[0.05em] border-[8px] md:border-[12px] border-white shadow-[0_15px_30px_-5px_rgba(234,179,8,0.4)] relative flex items-center justify-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {t.start}
              </motion.span>
              
              {/* Shine effect */}
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
              />
            </motion.button>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 md:mt-16 text-slate-300 font-bold text-xs uppercase tracking-widest"
          >
            Fun Learning Adventure For Kids
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
