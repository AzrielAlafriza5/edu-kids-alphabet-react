import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Volume2, VolumeX, Lock } from 'lucide-react';
import { Category, WordConfig } from '../data/words';

interface LevelSelectionProps {
  key?: React.Key;
  category: Category;
  completedLevels: Set<string>;
  onSelect: (word: WordConfig) => void;
  onBack: () => void;
  points: number;
  isBgmOn: boolean;
  toggleBgm: () => void;
  language: 'id' | 'en' | 'es' | 'de';
  t: any;
}

export function LevelSelection({ category, completedLevels, onSelect, onBack, points, isBgmOn, toggleBgm, language, t }: LevelSelectionProps) {
  const allWords = [...category.wordsUnder5, ...category.wordsAbove5];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
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

        <h2 className="flex-1 text-center text-sm xs:text-base sm:text-xl md:text-3xl lg:text-4xl font-black text-[#5A8DCC] uppercase tracking-tight drop-shadow-sm overflow-hidden text-ellipsis whitespace-nowrap px-1">
          {t.select} {(category.name as any)[language === 'id' ? 'id' : language] || category.name.en}
        </h2>
 
        <div className="flex-none flex items-center gap-1.5 md:gap-3 flex-nowrap">
          <div className="bg-white/90 backdrop-blur-md px-2 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-lg border-2 border-yellow-400 flex items-center gap-1 md:gap-2">
            <span className="text-xs md:text-2xl">⭐</span>
            <span className="font-black text-slate-700 text-[10px] md:text-lg font-mono">{points}</span>
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
        <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5">
          {allWords.map((word, idx) => {
            const isCompleted = completedLevels.has(`${category.id}:${word.id}`);
            
            // Linear progression check:
            // 1. Level 1 (idx 0) is always unlocked
            // 2. Subsequent levels are unlocked if the previous level is completed
            const isUnlocked = idx === 0 || completedLevels.has(`${category.id}:${allWords[idx - 1].id}`);
            
            return (
              <motion.button
                key={word.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isUnlocked ? 1 : 0.5, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={() => isUnlocked && onSelect(word)}
                disabled={!isUnlocked}
                className={`relative aspect-square bg-white rounded-2xl md:rounded-3xl border-4 border-white shadow-xl flex flex-col items-center justify-center p-2 group overflow-visible transition-all ${isUnlocked ? 'cursor-pointer hover:shadow-2xl' : 'cursor-not-allowed grayscale-[30%]'}`}
              >
                <div className={`text-3xl sm:text-4xl md:text-6xl mb-1 ${isUnlocked ? 'group-hover:scale-110' : ''} transition-transform`}>
                  {word.emoji}
                </div>
                <span className="text-[10px] md:text-sm font-black text-[#5A8DCC] uppercase tracking-tighter truncate w-full text-center px-1">
                  {(word as any)[language === 'id' ? 'id' : language] || word.en}
                </span>

                {isCompleted && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-0.5 md:p-1 border-2 border-white shadow-lg z-10 transition-transform hover:scale-110">
                    <CheckCircle2 size={16} className="md:w-5 md:h-5" />
                  </div>
                )}

                {!isUnlocked && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 border-2 border-white shadow-lg z-10">
                    <Lock size={12} className="md:w-4 md:h-4 text-white" fill="white" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
