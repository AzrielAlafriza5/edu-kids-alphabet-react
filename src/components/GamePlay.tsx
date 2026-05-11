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
  language: 'id' | 'en';
  t: any;
  key?: React.Key;
}

const ITEM_THEME_COLORS = [
  '#ef476f', '#f78c6b', '#ffd166', '#06d6a0', '#118ab2', 
  '#073b4c', '#7209b7', '#f15bb5', '#00f5d4', '#9b5de5', 
  '#ff9f1c', '#2ec4b6', '#e71d36', '#ffbc42', '#8338ec'
];

export function GamePlay({ category, wordConfig, onBack, onNext, onWordComplete, points, isBgmOn, toggleBgm, language, t }: GamePlayProps) {
  // Extract word and letters immediately
  const word = useMemo(() => {
    return (language === 'id' ? wordConfig.id : wordConfig.en).toUpperCase();
  }, [wordConfig, language]);
  const letters = useMemo(() => word.split(''), [word]);
  
  // Find index for theme color
  const wordIndex = useMemo(() => {
    const allWords = [...category.wordsUnder5, ...category.wordsAbove5];
    return allWords.findIndex(w => (language === 'id' ? w.id : w.en).toUpperCase() === word);
  }, [category, word, language]);
  
  const themeColor = ITEM_THEME_COLORS[wordIndex % ITEM_THEME_COLORS.length] || ITEM_THEME_COLORS[0];

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
    startLetterLoop(char, language === 'id' ? 'id-ID' : 'en-US');
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
        
        // Check for completion inside the state update to ensure we have latest data
        if (next.every(item => item !== null) && !completionHandled.current) {
          completionHandled.current = true;
          setIsComplete(true);
          playTada();
          triggerVictoryConfetti();
          onWordComplete?.();
          setTimeout(() => speakWord(word, language === 'id' ? 'id-ID' : 'en-US'), 1000);
        }
        
        return next;
      });

      // Remove from available letters
      setAvailableLetters(prev => prev.filter(item => item.id !== active.id));

      playDing();
      speakWord(activeChar, language === 'id' ? 'id-ID' : 'en-US'); // Pronounce the single letter
    }
  }, [letters, word, placedLetters, triggerVictoryConfetti]);

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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full min-h-screen flex flex-col p-4 md:p-8 relative overflow-hidden"
    >
      {/* Navigation Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "anticipate" }}
            className={`absolute inset-0 z-[500] flex flex-col items-center justify-center rounded-[40px] border-8 border-white ${category.color}`}
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="text-9xl mb-6"
            >
              {category.icon}
            </motion.div>
            <h2 className="text-4xl md:text-7xl font-black text-white font-display uppercase tracking-widest drop-shadow-lg">
              {t.next}!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons Container */}
      <AnimatePresence>
        {isComplete && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 flex flex-row md:flex-col gap-3 md:gap-4 z-[400] w-[90%] max-w-sm md:w-60">
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: [0, -4, 0],
                opacity: 1,
              }}
              transition={{ 
                opacity: { duration: 0.3 },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex-1 md:w-full h-12 md:h-16 bg-yellow-400 text-yellow-900 rounded-full text-xs md:text-xl font-display font-black uppercase tracking-widest shadow-[0_4px_0_rgb(202,138,4)] active:translate-y-1 active:shadow-none border-2 md:border-4 border-white flex items-center justify-center gap-2 transition-all active:scale-95 px-2"
            >
              {t.finish} 🏠
            </motion.button>
            
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: [0, -4, 0],
                opacity: 1,
              }}
              transition={{ 
                opacity: { duration: 0.3, delay: 0.1 },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextClick}
              className="flex-1 md:w-full h-12 md:h-16 bg-green-500 text-white rounded-full text-xs md:text-xl font-display font-black uppercase tracking-widest shadow-[0_4px_0_rgb(21,128,61)] active:translate-y-1 active:shadow-none border-2 md:border-4 border-white flex items-center justify-center gap-2 transition-all active:scale-95 px-2"
            >
              {t.next}! ▶
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <header className="w-full flex-none flex flex-row justify-between items-center p-3 md:p-6 sticky top-0 z-[100] bg-transparent max-w-5xl mx-auto flex-nowrap gap-2">
        <div className="flex-none">
          <button 
            onClick={onBack}
            className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-full border-2 md:border-4 border-[#FFC1CC] flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-transform text-[#FFC1CC]"
          >
            <ArrowLeft className="w-6 h-6 md:w-10 md:h-10" strokeWidth={4} />
          </button>
        </div>

        <h1 className="flex-1 text-center text-[10px] xs:text-[12px] sm:text-lg md:text-3xl font-black text-[#5A8DCC] tracking-tight uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] overflow-hidden text-ellipsis whitespace-nowrap px-1">
          {t.tiru}
        </h1>
        
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

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-2 md:gap-4 w-full min-h-0 relative z-50">
          
          {/* Main Visual Area */}
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            
            {/* Image/Emoji Card */}
            <div className="relative group shrink-0 mb-1 md:mb-2">
              <motion.div 
                animate={{ 
                  scale: isComplete ? [1, 1.05, 1] : 1,
                  rotate: isComplete ? [0, -1, 1, -1, 0] : 0
                }}
                transition={{ repeat: isComplete ? Infinity : 0, duration: 3 }}
                className="w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 bg-white rounded-[25px] md:rounded-[60px] flex items-center justify-center shadow-lg md:shadow-2xl relative border-4 md:border-8 border-white"
              >
                <div className="absolute inset-0 rounded-[21px] md:rounded-[52px] border-[3px] md:border-[6px]" style={{ borderColor: themeColor, opacity: 0.3 }} />
                
                <span className="text-5xl sm:text-7xl md:text-[8rem] z-10 drop-shadow-md md:drop-shadow-lg">{wordConfig.emoji}</span>
                
                {/* Checkmark Badge */}
                {isComplete && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -top-2 -right-2 md:-top-6 md:-right-6 w-10 h-10 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center border-2 md:border-8 border-white shadow-xl z-[60]"
                  >
                    <svg className="w-5 h-5 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            </div>

            <div 
              className="bg-white rounded-full shadow-md md:shadow-lg border-2 md:border-4 border-white flex items-center gap-2 md:gap-4 px-4 md:px-8 py-1 md:py-2 mb-2 md:mb-4 -mt-2 md:-mt-4 relative z-20"
              style={{ color: themeColor }}
            >
              <span className="text-lg md:text-3xl lg:text-4xl font-black tracking-widest uppercase">{word}</span>
              <button onClick={() => speakWord(word, language === 'id' ? 'id-ID' : 'en-US')} className="p-1 hover:scale-110 active:scale-95 transition-transform bg-slate-50 rounded-full">
                <Volume2 className="w-4 h-4 md:w-8 md:h-8" fill="currentColor" strokeWidth={2} />
              </button>
            </div>

            {/* Target Slots Container */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3 max-w-full md:max-w-4xl p-2 md:p-6 bg-white/20 backdrop-blur-xs rounded-[20px] md:rounded-[40px] border border-white/30 mb-8">
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

        {/* Scattered Draggable Letters moved inside DndContext */}
        <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden">
          <AnimatePresence>
            {availableLetters.map((item) => (
              <div key={item.id} className="pointer-events-auto">
                <DraggableLetter 
                  id={item.id} 
                  char={item.char} 
                  index={letters.indexOf(item.char)} // For consistent coloring
                  left={item.left}
                  top={item.top}
                  scatterRotate={item.scatterRotate}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Drag Overlay moved inside DndContext */}
        <DragOverlay zIndex={1000}>
          {activeId ? (
            <div className="scale-125">
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

