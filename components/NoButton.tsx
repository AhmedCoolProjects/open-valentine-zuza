'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';

const funnyTexts = ["No 😅", "Are you sure? 🥺", "Think again! 💔", "Please? 🙏", "Don't do this 😢", "Pretty please? 🌹", "Catch me! 🏃", "Too slow! 😜", "Nope! 🙈"];

export default function NoButton() {
  const controls = useAnimation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [textIndex, setTextIndex] = useState(0);
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Get safe bounds for button movement
  const getSafeBounds = useCallback(() => {
    if (!buttonRef.current) return null;
    
    const button = buttonRef.current.getBoundingClientRect();
    const padding = 20;
    
    return {
      minX: -button.left + padding,
      maxX: window.innerWidth - button.right - padding,
      minY: -button.top + padding,
      maxY: window.innerHeight - button.bottom - padding,
    };
  }, []);

  // Clamp position within bounds
  const clampPosition = useCallback((x: number, y: number, bounds: ReturnType<typeof getSafeBounds>) => {
    if (!bounds) return { x, y };
    return {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, y)),
    };
  }, []);

  const moveButton = useCallback(async () => {
    if (!buttonRef.current || isAnimating) return;
    
    setIsAnimating(true);
    
    const bounds = getSafeBounds();
    if (!bounds) {
      setIsAnimating(false);
      return;
    }

    // Calculate a new position that's far from current position but within bounds
    const moveDistance = 150 + Math.random() * 100; // 150-250px jump
    const angle = Math.random() * Math.PI * 2; // Random direction
    
    let newX = currentPos.x + Math.cos(angle) * moveDistance;
    let newY = currentPos.y + Math.sin(angle) * moveDistance;
    
    // Clamp to bounds
    let finalPos = clampPosition(newX, newY, bounds);
    
    // If position didn't change much due to clamping, try opposite direction
    const movedDistance = Math.sqrt(
      Math.pow(finalPos.x - currentPos.x, 2) + 
      Math.pow(finalPos.y - currentPos.y, 2)
    );
    
    if (movedDistance < 80) {
      // Try opposite direction or a different angle
      const newAngle = angle + Math.PI; // Opposite direction
      newX = currentPos.x + Math.cos(newAngle) * moveDistance;
      newY = currentPos.y + Math.sin(newAngle) * moveDistance;
      finalPos = clampPosition(newX, newY, bounds);
    }
    
    // Fun rotation
    const rotation = (Math.random() - 0.5) * 30;
    
    // Animate with a playful bounce
    await controls.start({
      x: finalPos.x,
      y: finalPos.y,
      rotate: rotation,
      scale: [1, 0.8, 1.1, 1],
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
        scale: {
          times: [0, 0.2, 0.5, 1],
          duration: 0.4,
        },
      },
    });
    
    setCurrentPos(finalPos);
    setTextIndex((prev) => (prev + 1) % funnyTexts.length);
    setIsAnimating(false);
  }, [controls, currentPos, getSafeBounds, clampPosition, isAnimating]);

  // Reset position on window resize to prevent going out of bounds
  useEffect(() => {
    const handleResize = () => {
      const bounds = getSafeBounds();
      if (bounds) {
        const clampedPos = clampPosition(currentPos.x, currentPos.y, bounds);
        if (clampedPos.x !== currentPos.x || clampedPos.y !== currentPos.y) {
          setCurrentPos(clampedPos);
          controls.set({ x: clampedPos.x, y: clampedPos.y });
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPos, getSafeBounds, clampPosition, controls]);

  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
        animate={controls}
        initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
        whileHover={{ 
          boxShadow: "0px 8px 25px rgba(244, 63, 94, 0.3)",
        }}
        onHoverStart={moveButton}
        onTouchStart={(e) => { 
          e.preventDefault(); 
          moveButton();
        }}
        onClick={(e) => { 
          e.preventDefault(); 
          moveButton();
        }}
        className="px-8 py-3 bg-gradient-to-br from-white/80 to-pink-50/80 backdrop-blur-sm text-rose-400 font-bold rounded-full shadow-lg border-2 border-pink-200/60 hover:border-pink-300 transition-colors z-50 whitespace-nowrap select-none cursor-pointer"
        style={{ willChange: 'transform' }}
      >
        {funnyTexts[textIndex]}
      </motion.button>
    </div>
  );
}