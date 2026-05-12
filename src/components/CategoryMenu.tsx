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
  language: 'id' | 'en';
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
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col h-screen overflow-hidden"
    >
      <header className="w-full flex-none flex flex-row justify-between items-center p-3 md:p-6 sticky top-0 z-[100] bg-transparent max-w-5xl mx-auto flex-nowrap gap-2">
        <div className="flex-none">
          <button 
            onClick={onBack}
            className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-full border-2 md:border-4 border-[#FFC1CC] flex items-center justify-center shadow-lg text-[#FFC1CC] hover:scale-110 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
          </button>
        </div>

        <h2 className="flex-1 text-center text-sm xs:text-base sm:text-xl md:text-4xl font-display font-black text-[#5A8DCC] drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap px-1">
          {t.choose}
        </h2>

        <div className="flex-none flex items-center gap-1.5 md:gap-3 flex-nowrap">
          <div className="bg-white/90 backdrop-blur-md px-2 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-lg border-2 border-yellow-400 flex items-center gap-1 md:gap-2">
            <span className="text-xs md:text-2xl">⭐</span>
            <span className="font-black text-slate-700 text-[10px] md:text-lg font-mono">{currentPoints}</span>
          </div>
          <button 
            onClick={toggleBgm}
            className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-white/90 backdrop-blur rounded-full text-slate-500 shadow-md hover:scale-110 active:scale-95 transition-all"
          >
            {isBgmOn ? <Volume2 className="w-4 h-4 md:w-6 md:h-6" /> : <VolumeX className="w-4 h-4 md:w-6 md:h-6" />}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-8 scrollbar-hide pt-2">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {CATEGORIES.map((cat, idx) => {
          const count = getCategoryProgress(cat.id);
          const totalInCat = [...cat.wordsUnder5, ...cat.wordsAbove5].length;
          const percentage = (count / totalInCat) * 100;
          const isLocked = currentPoints < cat.requiredPoints;
          
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <motion.button
                animate={!isLocked ? { rotate: idx % 2 === 0 ? [-1, 1, -1] : [1, -1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 + (idx * 0.2), ease: "easeInOut" }}
                whileHover={!isLocked ? { scale: 1.05 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                onClick={() => !isLocked && onSelect(cat)}
                disabled={isLocked}
                className={`w-full flex flex-col items-center p-3 md:p-6 rounded-[25px] md:rounded-[40px] cursor-pointer bubble-border shadow-lg md:shadow-xl ${cat.color} relative overflow-hidden group transition-all duration-300 ${isLocked ? 'opacity-60 grayscale-[50%] cursor-not-allowed' : 'cursor-pointer hover:shadow-2xl'}`}
              >
                {/* Lock Visual */}
                {isLocked && (
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
                    <div className="bg-red-500 p-1.5 md:p-2 rounded-full shadow-lg">
                      <Lock className="w-3 h-3 md:w-5 md:h-5 text-white" fill="white" />
                    </div>
                  </div>
                )}

                {/* Requirement Overlay */}
                {isLocked && (
                  <div className="z-20 bg-white/90 backdrop-blur px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-md border border-red-200 mt-1 mb-1">
                    <p className="text-[10px] md:text-sm font-black text-red-600 uppercase tracking-tighter whitespace-nowrap">
                      {t.locked} {cat.requiredPoints} ⭐
                    </p>
                  </div>
                )}

                <span className={`text-4xl sm:text-5xl md:text-7xl mb-2 md:mb-4 drop-shadow-sm z-10 transition-transform ${isLocked ? '' : 'group-hover:scale-110'}`}>
                  {cat.icon}
                </span>
                
                <span className="font-display font-black text-[10px] md:text-lg text-slate-800 bg-white/70 px-2 md:px-4 py-0.5 md:py-1.5 rounded-full uppercase tracking-wider mb-2 md:mb-3 z-10 w-full truncate">
                  {language === 'id' ? cat.name.id : cat.name.en}
                </span>

                {/* Progress Visual */}
                {!isLocked && (
                  <div className="w-full px-1 md:px-4 z-10 text-left">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] md:text-[10px] font-black text-slate-600 uppercase">{t.progress}</span>
                      <span className="text-[8px] md:text-[10px] font-black text-slate-600 tracking-tighter">{count}/{totalInCat}</span>
                    </div>
                    <div className="w-full h-1 md:h-3 bg-white/50 rounded-full overflow-hidden border border-white/50">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className="h-full bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                      />
                    </div>
                  </div>
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
