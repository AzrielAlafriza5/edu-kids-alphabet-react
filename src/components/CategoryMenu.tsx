import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES, Category } from '../data/words';
import { playBlup } from '../lib/audio';
import { ArrowLeft, Volume2, VolumeX, Lock } from 'lucide-react';

interface CategoryMenuProps {
  key?: React.Key;
  onSelect: (category: Category) => void;
  onBack: () => void;
  progress: Set<string>;
  points: number;
  isBgmOn: boolean;
  toggleBgm: () => void;
  language: 'id' | 'en' | 'es' | 'de';
  t: any;
}

export function CategoryMenu({ onSelect, onBack, progress, points, isBgmOn, toggleBgm, language, t }: CategoryMenuProps) {
  const getCategoryProgress = (catId: string) => {
    let count = 0;
    progress.forEach(val => {
      if (val.startsWith(`${catId}:`)) count++;
    });
    return count;
  };

  const currentPoints = points;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col h-screen overflow-hidden bg-pattern"
    >
      <header className="w-full flex-none flex flex-row justify-between items-center p-4 md:p-10 sticky top-0 z-[100] max-w-7xl mx-auto flex-nowrap gap-4">
        <div className="flex-none">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full border-[4px] md:border-[8px] border-[#4E88E5] flex items-center justify-center shadow-xl text-[#4E88E5] transition-transform"
          >
            <ArrowLeft className="w-6 h-6 md:w-10 md:h-10" strokeWidth={4} />
          </motion.button>
        </div>

        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex-1 text-center text-xl md:text-5xl font-display font-black text-[#4E88E5] drop-shadow-sm uppercase tracking-tight overflow-hidden text-ellipsis whitespace-nowrap px-2"
        >
          {t.choose}
        </motion.h2>

        <div className="flex-none flex items-center gap-2 md:gap-4 flex-nowrap">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white px-3 md:px-8 py-2 md:py-4 rounded-full shadow-xl border-[4px] md:border-[6px] border-[#FFD93D] flex items-center gap-2 md:gap-3"
          >
            <span className="text-xl md:text-4xl">⭐</span>
            <span className="font-black text-slate-700 text-sm md:text-3xl font-display">{currentPoints}</span>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleBgm}
            className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center bg-white rounded-full text-slate-400 shadow-xl border-[4px] border-slate-100 transition-all"
          >
            {isBgmOn ? <Volume2 className="w-5 h-5 md:w-8 md:h-8" /> : <VolumeX className="w-5 h-5 md:w-8 md:h-8" />}
          </motion.button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-12 scrollbar-hide">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 pt-4">
        {CATEGORIES.map((cat, idx) => {
          const count = getCategoryProgress(cat.id);
          const totalInCat = [...cat.wordsUnder5, ...cat.wordsAbove5].length;
          const percentage = (count / totalInCat) * 100;
          const isLocked = currentPoints < cat.requiredPoints;
          
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.05, type: "spring", damping: 12 }}
            >
              <motion.button
                whileHover={!isLocked ? { y: -10, scale: 1.02 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (!isLocked) {
                    playBlup();
                    onSelect(cat);
                  }
                }}
                disabled={isLocked}
                className={`w-full flex flex-col items-center p-6 md:p-10 rounded-[60px] cursor-pointer shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] border-[8px] md:border-[12px] border-white relative overflow-hidden group transition-all duration-500 ${cat.color} ${isLocked ? 'opacity-70 grayscale-[30%] cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {/* Decorative Pattern Layer */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:10px_10px]" />

                {/* Lock Visual */}
                {isLocked && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-[#FF4757] p-2 md:p-3 rounded-2xl shadow-xl border-4 border-white">
                      <Lock className="w-4 h-4 md:w-6 md:h-6 text-white" fill="white" />
                    </div>
                  </div>
                )}

                {/* Requirement Info */}
                {isLocked && (
                  <div className="z-20 bg-white px-4 py-2 rounded-2xl shadow-lg border-2 border-[#FF4757]/20 mt-2 mb-4">
                    <p className="text-xs md:text-sm font-black text-[#FF4757] uppercase tracking-wider">
                      {t.locked} {cat.requiredPoints} ⭐
                    </p>
                  </div>
                )}

                {/* Animated Icon */}
                <motion.div 
                   animate={!isLocked ? { 
                     y: [0, -10, 0],
                     rotate: [0, 5, -5, 0]
                   } : {}}
                   transition={{ 
                     repeat: Infinity, 
                     duration: 3 + (idx * 0.5), 
                     ease: "easeInOut" 
                   }}
                   className={`text-6xl md:text-9xl mb-6 drop-shadow-xl z-10 transition-transform ${isLocked ? '' : 'group-hover:scale-125 duration-500'}`}
                >
                  {cat.icon}
                </motion.div>
                
                <h3 className="font-display font-black text-lg md:text-3xl text-slate-800 mb-4 z-10 uppercase tracking-tight">
                  {(cat.name as any)[language === 'id' ? 'id' : language] || cat.name.en}
                </h3>

                {/* Progress Visual */}
                {!isLocked && (
                  <div className="w-full px-2 z-10">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                         <span className="text-[10px] md:text-xs font-black text-slate-600 uppercase tracking-widest">{t.progress}</span>
                      </div>
                      <span className="text-[10px] md:text-xs font-black text-slate-600 bg-white/50 px-2 py-0.5 rounded-full">{count}/{totalInCat}</span>
                    </div>
                    <div className="w-full h-3 md:h-5 bg-white/40 rounded-full p-1 shadow-inner border border-white/30">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-full bg-gradient-to-r from-[#2ED573] to-[#7BED9F] rounded-full shadow-[0_2px_10px_rgba(46,213,115,0.3)] relative overflow-hidden"
                      >
                         <motion.div 
                           animate={{ x: ['-100%', '200%'] }}
                           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                         />
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Card Sparkle Effect */}
                {!isLocked && (
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                )}
              </motion.button>
            </motion.div>
          );
        })}
        </div>
      </div>
    </motion.div>
  );
}
