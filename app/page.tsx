'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingHearts from '@/components/FloatingHearts';
import NoButton from '@/components/NoButton';
import { Heart, Sparkles } from 'lucide-react';

export default function Home() {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    triggerCelebration();
  };

  const triggerCelebration = () => {
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    
    // Heart shaped confetti
    const heartShape = confetti.shapeFromText({ text: '❤️', scalar: 2 });
    const starShape = confetti.shapeFromText({ text: '✨', scalar: 2 });
    const roseShape = confetti.shapeFromText({ text: '🌹', scalar: 2 });

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: ReturnType<typeof setInterval> = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 4 * (timeLeft / duration);
      
      // Pink and red confetti from the sides
      confetti({
        particleCount: Math.floor(particleCount * 8),
        startVelocity: 30,
        spread: 360,
        ticks: 80,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff6b9d', '#ff85a2', '#ffa5b7', '#ff4081', '#e91e63', '#f8bbd9'],
        shapes: ['circle'],
        gravity: 0.8,
        scalar: 1.2,
      });
      
      confetti({
        particleCount: Math.floor(particleCount * 8),
        startVelocity: 30,
        spread: 360,
        ticks: 80,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff6b9d', '#ff85a2', '#ffa5b7', '#ff4081', '#e91e63', '#f8bbd9'],
        shapes: ['circle'],
        gravity: 0.8,
        scalar: 1.2,
      });

      // Hearts and emojis from the center
      confetti({
        particleCount: Math.floor(particleCount * 2),
        startVelocity: 45,
        spread: 120,
        ticks: 100,
        origin: { x: 0.5, y: 0.6 },
        shapes: [heartShape, starShape, roseShape],
        gravity: 0.6,
        scalar: 2,
      });
    }, 200);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 p-4 md:p-6">
      
      {/* Animated background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <FloatingHearts />
      
      <div className="z-10 w-full max-w-xl text-center perspective-1000">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative z-10 p-8 md:p-12">
                {/* Card Background with Glass Effect */}
                <div className="absolute inset-0 bg-white/50 backdrop-blur-2xl rounded-[3rem] shadow-[0_8px_60px_rgba(244,63,94,0.25)] border border-white/70 overflow-hidden -z-10">
                   {/* Decorative gradient blobs inside card */}
                   <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
                   <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-rose-400 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full filter blur-2xl opacity-30"></div>
                </div>

                {/* Sparkle Decorations */}
                <motion.div 
                  className="absolute -top-3 -right-3 text-2xl"
                  animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 text-yellow-400/80" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-3 -left-3 text-2xl"
                  animate={{ rotate: [0, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Sparkles className="w-8 h-8 text-yellow-400/80" />
                </motion.div>

                {/* Animated Heart Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    <Heart className="w-20 h-20 md:w-28 md:h-28 text-rose-500 fill-rose-500 animate-pulse-slow drop-shadow-[0_0_25px_rgba(244,63,94,0.5)]" />
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="w-16 h-16 md:w-24 md:h-24 text-pink-300 fill-pink-300 blur-sm animate-heartbeat" />
                    </div>
                  </div>
                </motion.div>

                {/* Question Text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-3xl md:text-5xl font-bold text-rose-700 mb-3 leading-tight tracking-tight">
                    Would you date me,
                  </h1>
                  <h2 className="text-4xl md:text-6xl font-dancing font-bold mb-8 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 animate-gradient drop-shadow-sm">
                      Zuza?
                    </span>
                    <motion.span 
                      className="inline-block ml-2"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      💖
                    </motion.span>
                  </h2>
                </motion.div>

                {/* Rose Decoration */}
                <motion.div
                  className="flex justify-center gap-2 mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {['🌹', '💐', '🌹'].map((flower, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    >
                      {flower}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 relative min-h-[100px]">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0px 15px 40px rgba(244, 63, 94, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAccept}
                    className="px-10 md:px-14 py-4 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-lg md:text-xl font-bold rounded-full shadow-[0_10px_40px_rgba(244,63,94,0.4)] hover:shadow-[0_15px_50px_rgba(244,63,94,0.5)] transition-all w-full md:w-auto z-10 tracking-wide border-2 border-white/30 animate-shimmer"
                    style={{
                      backgroundSize: '200% auto',
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Yes! <span className="text-xl">💕</span>
                    </span>
                  </motion.button>

                  {/* Container for the No button */}
                  <div className="relative w-full md:w-auto h-14 flex justify-center items-center">
                     <NoButton />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white/60 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] shadow-[0_8px_60px_rgba(244,63,94,0.3)] border-2 border-white/60 text-center relative overflow-hidden"
            >
              {/* Success background decorations */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/60 via-pink-50/60 to-purple-100/60 -z-10"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-rose-400 to-pink-300 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              
              {/* Animated emoji */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1], 
                  rotate: [0, 10, -10, 0] 
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-6 inline-block drop-shadow-lg"
              >
                <span className="text-7xl md:text-8xl">😍</span>
              </motion.div>
              
              {/* Success title */}
              <motion.h2 
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 mb-6 drop-shadow-sm animate-gradient"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Yayyy!!!
              </motion.h2>
              
              {/* Success message */}
              <motion.p 
                className="text-xl md:text-2xl text-rose-700/90 font-semibold mb-6 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                You&apos;re officially my Valentine! <br/>
                <span className="text-rose-500 font-dancing text-2xl md:text-3xl">I knew you&apos;d say yes!</span>
              </motion.p>

              {/* Animated hearts row */}
              <motion.div
                className="flex justify-center gap-3 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                {['💕', '💗', '💖', '💝', '💗', '💕'].map((heart, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl md:text-3xl"
                    animate={{ 
                      y: [0, -8, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                  >
                    {heart}
                  </motion.span>
                ))}
              </motion.div>

              {/* Bottom tag */}
              <motion.div 
                className="inline-block px-6 py-3 bg-gradient-to-r from-white/60 to-pink-50/60 rounded-full border border-pink-200 text-rose-500 italic text-base md:text-lg font-semibold shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Best. Decision. Ever. 💘
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer */}
      <motion.div 
        className="fixed bottom-4 md:bottom-6 text-rose-400/70 text-sm md:text-base font-medium tracking-widest uppercase flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <span>Made with</span>
        <motion.span 
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ❤️
        </motion.span>
        <span>for Zuza</span>
      </motion.div>
    </main>
  );
}
