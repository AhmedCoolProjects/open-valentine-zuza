'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function NoButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // We need to know the initial position of the button to calculate offsets correctly.
  // However, since the button starts in the flow, 'x:0, y:0' is its natural place.
  // We just need to generate a new x/y offset that puts it somewhere else on screen.
  
  const moveButton = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Viewport dimensions
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Margins to keep it away from edges
    const margin = 20;

    // Calculate the valid range for the top-left corner of the button
    // The button's "position" in framer motion is a transform offset from its layout position.
    // So: CurrentScreenPos = InitialLayoutPos + Offset
    // We want: NewScreenPos = InitialLayoutPos + NewOffset
    // Therefore: NewOffset = NewScreenPos - InitialLayoutPos
    
    // PROBLEM: 'InitialLayoutPos' might change if the window resizes, but usually it's static enough for this demo.
    // Better approach: 
    // We just want to move it to a random spot.
    // Let's generate a random spot (screen coordinates).
    
    const randomX = Math.random() * (vw - width - margin * 2) + margin;
    const randomY = Math.random() * (vh - height - margin * 2) + margin;

    // Now convert this absolute screen coordinate to a relative offset.
    // We need the INITIAL layout position (where x=0, y=0 would place it).
    // We can approximate this by subtracting the *current* x/y offset from the *current* rect.
    
    const currentOffset = position; 
    const initialLayoutX = rect.left - currentOffset.x;
    const initialLayoutY = rect.top - currentOffset.y;

    const newOffsetX = randomX - initialLayoutX;
    const newOffsetY = randomY - initialLayoutY;

    setPosition({ x: newOffsetX, y: newOffsetY });
  };

  return (
    <motion.button
      ref={buttonRef}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovered ? 0.9 : 1,
        rotate: isHovered ? (Math.random() * 10 - 5) : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 150, // Softer spring
        damping: 15,    // Less bouncy, more slide-like
        mass: 0.8
      }}
      onHoverStart={() => {
        setIsHovered(true);
        moveButton();
      }}
      onHoverEnd={() => setIsHovered(false)}
      onTouchStart={(e) => { 
        e.preventDefault(); 
        moveButton();
      }}
      onClick={(e) => { 
        e.preventDefault(); 
        moveButton();
      }}
      className="px-8 py-3 bg-white/50 backdrop-blur-sm text-rose-500 font-bold rounded-full shadow-lg border border-white/60 hover:bg-white/80 transition-colors z-50 whitespace-nowrap select-none"
    >
      No 😅
    </motion.button>
  );
}