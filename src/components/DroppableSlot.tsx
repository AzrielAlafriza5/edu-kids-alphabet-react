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
      className={`w-12 h-16 sm:w-16 sm:h-20 md:w-28 md:h-36 rounded-2xl md:rounded-[36px] border-[4px] md:border-[8px] flex items-center justify-center transition-all relative shrink-0 ${
        isFilled 
          ? 'bg-transparent border-transparent' 
          : isOver 
            ? 'bg-white border-[#4E88E5] shadow-2xl scale-110 rotate-2' 
            : 'bg-white/80 border-[#4E88E5]/30 shadow-md'
      }`}
    >
      {!isFilled && (
        <span className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-[#4E88E5]/30 pointer-events-none drop-shadow-sm uppercase">
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
