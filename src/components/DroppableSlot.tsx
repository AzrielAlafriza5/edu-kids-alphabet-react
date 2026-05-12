import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { motion } from 'motion/react';
import { LetterVisual } from './DraggableLetter';

interface DroppableSlotProps {
  key?: React.Key;
  id: string;
  expectedLetter: string;
  isFilled: boolean;
  index: number;
}

export function DroppableSlot({ id, expectedLetter, isFilled, index }: DroppableSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-28 rounded-xl md:rounded-3xl border-2 md:border-4 flex items-center justify-center transition-colors relative shrink-0 ${
        isFilled 
          ? 'bg-transparent shadow-inner z-10 border-transparent' 
          : isOver 
            ? 'bg-white border-dashed border-[#5A8DCC]/50 shadow-md' 
            : 'bg-white/70 border-dashed border-white/80 shadow-inner'
      }`}
    >
      {!isFilled && (
        <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#5A8DCC] opacity-30 pointer-events-none">
          {expectedLetter}
        </span>
      )}

      {isFilled && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1.3, 0.9, 1] }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute inset-0 flex items-center justify-center`}
        >
          <LetterVisual 
            char={expectedLetter} 
            index={index} 
            isPlaced={true} 
            className="text-5xl sm:text-7xl md:text-8xl"
          />
        </motion.div>
      )}
    </div>
  );
}
