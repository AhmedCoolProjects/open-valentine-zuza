'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; scale: number }[]>([]);

  useEffect(() => {
    // Generate random hearts only on client side to avoid hydration mismatch
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      delay: Math.random() * 10,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${heart.x}%`,
            scale: heart.scale,
            color: 'rgba(255, 182, 193, 0.4)', // Soft pink
            fontSize: '2rem',
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
}
