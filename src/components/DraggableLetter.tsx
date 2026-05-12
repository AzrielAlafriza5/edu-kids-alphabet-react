import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'motion/react';

export interface DraggableLetterProps {
  key?: React.Key;
  id: string;
  char: string;
  index: number;
  left?: string;
  top?: string;
  scatterRotate?: number;
}

const THEME_COLORS = [
  'text-[#FF6B6B]', // red
  'text-[#4ECDC4]', // teal
  'text-[#FCD34D]', // yellow
  'text-[#9B5DE5]', // purple
  'text-[#F15BB5]'  // pink
];

export function LetterVisual({ char, index, isDragging, isOverlay, isPlaced, scatterRotate, className = '' }: { char: string, index: number, isDragging?: boolean, isOverlay?: boolean, isPlaced?: boolean, scatterRotate?: number, className?: string }) {
  const colorTheme = THEME_COLORS[index % THEME_COLORS.length];
  
  return (
    <motion.div
      initial={isOverlay || isPlaced ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: isOverlay ? 1.2 : 1, opacity: isDragging && !isOverlay ? 0 : 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={!isDragging && !isOverlay && !isPlaced ? { scale: 1.1 } : undefined}
      whileTap={!isDragging && !isOverlay && !isPlaced ? { scale: 0.9 } : undefined}
      className={`touch-none flex items-center justify-center font-display font-black shrink-0 ${!isPlaced ? 'cursor-grab active:cursor-grabbing' : ''} ${colorTheme} ${className || 'text-6xl sm:text-7xl lg:text-8xl'}`}
    >
      <motion.div
        animate={{ 
          rotate: isDragging || isOverlay || isPlaced ? 0 : [scatterRotate! - 5, scatterRotate! + 5, scatterRotate! - 5],
          y: isDragging || isOverlay || isPlaced ? 0 : [-3, 3, -3]
        }}
        transition={isPlaced ? undefined : { 
          repeat: Infinity, 
          duration: 3 + (index * 0.5), 
          ease: "easeInOut" 
        }}
        className="w-full h-full flex items-center justify-center relative drop-shadow-[0_2px_1px_rgba(0,0,0,0.15)]"
        style={{ 
          WebkitTextStroke: '1.5px white',
          paintOrder: 'stroke fill'
        } as React.CSSProperties}
      >
        {char}
      </motion.div>
    </motion.div>
  );
}

export function DraggableLetter({ id, char, index, left = '50%', top = '50%', scatterRotate = 0 }: DraggableLetterProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
    data: {
      char: char,
    }
  });

  const style = {
    position: 'absolute' as const,
    left,
    top,
    zIndex: isDragging ? 999 : 100,
    transform: 'translate(-50%, -50%)', // Ensure the position is centered
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <LetterVisual char={char} index={index} isDragging={isDragging} scatterRotate={scatterRotate} />
    </div>
  );
}

export const DraggableLetterOverlay = React.forwardRef<HTMLDivElement, { char: string, index: number }>(({ char, index, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      <LetterVisual char={char} index={index} isOverlay={true} scatterRotate={0} />
    </div>
  );
});
DraggableLetterOverlay.displayName = 'DraggableLetterOverlay';
