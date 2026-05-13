import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, useSensor, useSensors, PointerSensor, DragOverlay, closestCenter } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { Category, WordConfig } from '../data/words';
import { playDing, playTada, startLetterLoop, stopLetterLoop, speakWord, playTransitionSound } from '../lib/audio';
import { DraggableLetter, DraggableLetterOverlay } from './DraggableLetter';
import { DroppableSlot } from './DroppableSlot';

interface GamePlayProps {
  category: Category;
  wordConfig: WordConfig;
  onBack: () => void;
  onNext: () => void;
  onWordComplete?: () => void;
  points: number;
  isBgmOn: boolean;
  toggleBgm: () => void;
  language: 'id' | 'en' | 'es' | 'de';
  t: any;
  key?: React.Key;
}

const LANG_LOCALE: Record<string, string> = {
  id: 'id-ID',
  en: 'en-US',
  es: 'es-ES',
  de: 'de-DE',
};

const ITEM_THEME_COLORS = [
  '#ef476f', '#f78c6b', '#ffd166', '#06d6a0', '#118ab2', 
  '#073b4c', '#7209b7', '#f15bb5', '#00f5d4', '#9b5de5', 
  '#ff9f1c', '#2ec4b6', '#e71d36', '#ffbc42', '#8338ec'
];

export function GamePlay({ category, wordConfig, onBack, onNext, onWordComplete, points, isBgmOn, toggleBgm, language, t }: GamePlayProps) {
  // Extract word and letters immediately
  const word = useMemo(() => {
    const langKey = language === 'id' ? 'id' : (language as string);
    const val = (wordConfig as any)[langKey] || wordConfig.en;
    return val.toUpperCase();
  }, [wordConfig, language]);
  const letters = useMemo(() => word.split(''), [word]);
  
  // Find index for theme color
  const wordIndex = useMemo(() => {
    const allWords = [...category.wordsUnder5, ...category.wordsAbove5];
    const langKey = language === 'id' ? 'id' : (language as string);
    return allWords.findIndex(w => ((w as any)[langKey] || w.en).toUpperCase() === word);
  }, [category, word, language]);
  
  const themeColor = ITEM_THEME_COLORS[wordIndex % ITEM_THEME_COLORS.length] || ITEM_THEME_COLORS[0];

  const currentLocale = LANG_LOCALE[language] || 'en-US';

  // Logic: placedLetters stores the ID of the letter placed in that index
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: string, char: string, left: string, top: string, scatterRotate: number }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const completionHandled = React.useRef(false);

  // Initialize word game state
  useEffect(() => {
    const freshSlots = new Array(letters.length).fill(null);
    setPlacedLetters(freshSlots);
    setIsComplete(false);
    completionHandled.current = false;

    // Generate scattered letters with unique IDs including word context to avoid clashes on fast transition
    const scattered = letters.map((char, index) => {
      const isAbove = Math.random() > 0.5;
      const randomLeft = 10 + Math.random() * 80; // 10% to 90%
      const randomTop = isAbove 
        ? 20 + Math.random() * 10  // Top area (closer to center)
        : 70 + Math.random() * 15; // Bottom area (closer to center)

      return {
        id: `letter-${word}-${index}-${char}`,
        char,
        left: `${randomLeft}%`,
        top: `${randomTop}%`,
        scatterRotate: Math.random() * 40 - 20
      };
    });

    // Shuffle and set
    setAvailableLetters([...scattered].sort(() => Math.random() - 0.5));
  }, [word, letters]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 0, tolerance: 5 },
    })
  );

  const triggerVictoryConfetti = useCallback(() => {
    const duration = 2500;
    const end = Date.now() + duration;
    const colors = ['#fbcfe8', '#bae6fd', '#bef264', '#fde047', themeColor];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [themeColor]);

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id as string;
    setActiveId(id);
    
    // Play sound loop for the character
    const char = id.split('-').pop() || '';
    startLetterLoop(char, currentLocale);
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    stopLetterLoop();

    if (!over) return;

    const overId = over.id as string; // slot-X
    const slotIndex = parseInt(overId.split('-')[1], 10);
    
    const activeIdParts = (active.id as string).split('-');
    const activeChar = activeIdParts[activeIdParts.length - 1];
    const expectedChar = letters[slotIndex];

    // Check if correct and slot is empty
    if (activeChar === expectedChar && placedLetters[slotIndex] === null) {
      // Place it
      setPlacedLetters(prev => {
        const next = [...prev];
        next[slotIndex] = active.id as string;
        return next;
      });

      // Remove from available letters
      setAvailableLetters(prev => prev.filter(item => item.id !== active.id));

      playDing();
      speakWord(activeChar, currentLocale); // Pronounce the single letter
    }
  }, [letters, placedLetters, currentLocale]);

  // Completion Detection
  useEffect(() => {
    if (placedLetters.length > 0 && 
        placedLetters.every(item => item !== null) && 
        !isComplete && 
        !completionHandled.current) {
      
      completionHandled.current = true;
      setIsComplete(true);
      playTada();
      triggerVictoryConfetti();
      onWordComplete?.();
      setTimeout(() => speakWord(word, currentLocale), 1000);
    }
  }, [placedLetters, isComplete, word, currentLocale, triggerVictoryConfetti, onWordComplete]);

  const handleNextClick = () => {
    playTransitionSound(category.id);
    setIsTransitioning(true);
    setTimeout(() => {
      onNext();
      setIsTransitioning(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen flex flex-col p-4 md:p-10 relative overflow-hidden bg-pattern"
    >
      {/* Navigation Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ y: '100%', rotate: -10 }}
            animate={{ y: 0, rotate: 0 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className={`absolute inset-0 z-[500] flex flex-col items-center justify-center border-[20px] border-white shadow-2xl ${category.color}`}
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-[12rem] md:text-[20rem] mb-8 drop-shadow-xl"
            >
              {category.icon}
            </motion.div>
            <h2 className="text-5xl md:text-9xl font-black text-white font-display uppercase tracking-tight drop-shadow-md text-center px-4">
              {t.next}!
            </h2>
            
            {/* Added floating particles in transition */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               {[...Array(10)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     y: [-20, window.innerHeight + 20],
                     x: [Math.random() * 100, Math.random() * 100]
                   }}
                   transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                   className="absolute w-8 h-8 md:w-16 md:h-16 bg-white/20 rounded-full"
                   style={{ left: `${Math.random() * 100}%` }}
                 />
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons - Win State */}
      <AnimatePresence>
        {isComplete && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-10 flex flex-col items-center gap-6 z-[400] w-[90%] max-w-sm md:w-80">
            <motion.button
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextClick}
              className="w-full py-6 md:py-10 bg-[#FFD93D] text-[#B45309] rounded-[40px] md:rounded-[60px] text-3xl md:text-5xl font-black uppercase tracking-tight border-[8px] border-white shadow-2xl flex items-center justify-center gap-4 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent flex items-center justify-center">
                 <motion.div animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
              </div>
              <span className="relative z-10">{t.next}!</span>
            </motion.button>
            
            <motion.button
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="w-3/4 py-4 md:py-6 bg-white text-slate-400 rounded-full text-lg md:text-2xl font-black uppercase tracking-widest border-[4px] border-slate-100 shadow-xl flex items-center justify-center gap-3"
            >
              {t.finish} 🏠
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
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

        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex-1 text-center text-xl md:text-5xl font-display font-black text-[#4E88E5] drop-shadow-sm uppercase tracking-tight overflow-hidden text-ellipsis whitespace-nowrap px-2"
        >
          {t.tiru}
        </motion.h1>
        
        <div className="flex-none flex items-center gap-2 md:gap-4 flex-nowrap">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white px-3 md:px-8 py-2 md:py-4 rounded-full shadow-xl border-[4px] md:border-[6px] border-[#FFD93D] flex items-center gap-2 md:gap-3"
          >
            <span className="text-xl md:text-4xl">⭐</span>
            <span className="font-black text-slate-700 text-sm md:text-3xl font-display">{points}</span>
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

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-4 md:gap-12 w-full min-h-0 relative z-50 py-10">
          <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
            {/* Visual Card */}
            <div className="relative group shrink-0 mb-8 md:mb-16">
              <motion.div 
                animate={{ 
                  scale: isComplete ? [1, 1.1, 1] : 1,
                  rotate: isComplete ? [0, -2, 2, -2, 0] : [0, 1, -1, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: isComplete ? 2 : 5,
                  ease: "easeInOut"
                }}
                className="w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-white rounded-[40px] md:rounded-[100px] flex items-center justify-center shadow-2xl relative border-[10px] md:border-[24px] border-white overflow-visible"
              >
                <div className="absolute inset-0 rounded-[30px] md:rounded-[76px] border-[6px] md:border-[12px] opacity-10" style={{ borderColor: themeColor }} />
                
                <span className="text-6xl sm:text-8xl md:text-[14rem] z-10 drop-shadow-xl select-none">{wordConfig.emoji}</span>
                
                {/* Win Badge */}
                {isComplete && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -45, x: 20, y: -20 }}
                    animate={{ scale: 1, rotate: 15, x: 0, y: 0 }}
                    className="absolute -top-6 -right-6 md:-top-16 md:-right-16 w-14 h-14 md:w-32 md:h-32 bg-[#2ED573] rounded-[20px] md:rounded-[40px] flex items-center justify-center border-[6px] md:border-[12px] border-white shadow-2xl z-[60]"
                  >
                    <svg className="w-8 h-8 md:w-20 md:h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>

              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-2xl border-[4px] md:border-[10px] border-white flex items-center gap-4 px-6 md:px-12 py-2 md:py-4 z-20"
                style={{ color: themeColor }}
              >
                <span className="text-xl md:text-5xl font-display font-black tracking-tight uppercase">{word}</span>
                <button onClick={() => speakWord(word, currentLocale)} className="p-2 md:p-3 hover:scale-110 active:scale-95 transition-transform bg-slate-50 rounded-full shadow-inner">
                  <Volume2 className="w-5 h-5 md:w-10 md:h-10" fill="currentColor" strokeWidth={3} />
                </button>
              </motion.div>
            </div>

            {/* Slots */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5 max-w-full md:max-w-7xl p-6 md:p-14 bg-white/60 backdrop-blur-md rounded-[40px] md:rounded-[80px] border-[6px] border-white/50 mb-12 shadow-inner">
              {letters.map((char, index) => (
                <DroppableSlot 
                  key={`slot-${word}-${index}`} 
                  id={`slot-${index}`} 
                  expectedLetter={char}
                  isFilled={placedLetters[index] !== null}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Letters */}
        <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden">
          <AnimatePresence>
            {availableLetters.map((item) => (
              <div key={item.id} className="pointer-events-auto">
                <DraggableLetter 
                  id={item.id} 
                  char={item.char} 
                  index={letters.indexOf(item.char)}
                  left={item.left}
                  top={item.top}
                  scatterRotate={item.scatterRotate}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        <DragOverlay zIndex={1000}>
          {activeId ? (
            <div className="scale-150">
              <DraggableLetterOverlay 
                char={activeId.split('-').pop() || ''} 
                index={parseInt(activeId.split('-')[2] || '0', 10)} 
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </motion.div>
  );
}

