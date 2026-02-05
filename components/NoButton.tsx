'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';

const funnyTexts = ["No 😅", "Are you sure? 🥺", "Think again! 💔", "Please? 🙏", "Don't do this 😢", "Pretty please? 🌹"];

export default function NoButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  const moveButton = useCallback(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Viewport dimensions
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Margins to keep it away from edges
    const margin = 20;

    const randomX = Math.random() * (vw - width - margin * 2) + margin;
    const randomY = Math.random() * (vh - height - margin * 2) + margin;

    const currentOffset = position; 
    const initialLayoutX = rect.left - currentOffset.x;
    const initialLayoutY = rect.top - currentOffset.y;

    const newOffsetX = randomX - initialLayoutX;
    const newOffsetY = randomY - initialLayoutY;

    setPosition({ x: newOffsetX, y: newOffsetY });
    setTextIndex((prev) => (prev + 1) % funnyTexts.length);
    setRotation(Math.random() * 20 - 10);
  }, [position]);

  return (
    <motion.button
      ref={buttonRef}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovered ? 0.85 : 1,
        rotate: isHovered ? rotation : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 200,
        damping: 20,
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
      className="px-8 py-3 bg-gradient-to-br from-white/80 to-pink-50/80 backdrop-blur-sm text-rose-400 font-bold rounded-full shadow-lg border-2 border-pink-200/60 hover:border-pink-300 transition-all z-50 whitespace-nowrap select-none"
    >
      {funnyTexts[textIndex]}
    </motion.button>
  );
}