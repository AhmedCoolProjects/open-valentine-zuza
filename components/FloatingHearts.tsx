'use client';

import { motion } from 'framer-motion';
import { useMemo, useSyncExternalStore } from 'react';

const heartEmojis = ['❤️', '💕', '💗', '💖', '💝', '💓', '💞', '💘', '🌹', '✨'];

interface Heart {
  id: number;
  x: number;
  delay: number;
  scale: number;
  emoji: string;
  duration: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// Generate random data outside component
function generateHearts(): Heart[] {
  return Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 15,
    scale: 0.4 + Math.random() * 0.8,
    emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    duration: 12 + Math.random() * 10,
  }));
}

function generateSparkles(): Sparkle[] {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.5 + Math.random() * 0.8,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 3,
  }));
}

// Use useSyncExternalStore to detect client-side rendering
const emptySubscribe = () => () => {};

export default function FloatingHearts() {
  // Detect if we're on the client side without causing the lint warning
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Generate data only on client side using useMemo
  const hearts = useMemo(() => isClient ? generateHearts() : [], [isClient]);
  const sparkles = useMemo(() => isClient ? generateSparkles() : [], [isClient]);

  if (!isClient) {
    return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0, rotate: -20 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${heart.x}%`,
            fontSize: `${heart.scale * 2}rem`,
            filter: 'drop-shadow(0 4px 6px rgba(244, 63, 94, 0.3))',
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
      
      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="absolute text-yellow-300/60"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            fontSize: `${sparkle.size}rem`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
