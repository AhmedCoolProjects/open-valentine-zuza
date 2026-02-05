'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingHearts from '@/components/FloatingHearts';
import NoButton from '@/components/NoButton';
import { Heart } from 'lucide-react';

export default function Home() {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    triggerCelebration();
  };

  const triggerCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200 via-rose-100 to-rose-50 p-6">
      
      <FloatingHearts />
      
      <div className="z-10 w-full max-w-lg text-center perspective-1000">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, y: 20, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Card Container - No Overflow Hidden here to allow button escape */}
              <div className="relative z-10 p-10">
                {/* Background Layer with Overflow Hidden (for blobs and blur) */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/60 overflow-hidden -z-10">
                   {/* Decorative gradient blob inside card */}
                   <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                   <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-8 flex justify-center drop-shadow-lg"
                >
                   <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-pulse-slow" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-black text-rose-600 mb-10 leading-tight tracking-tight drop-shadow-sm">
                  Would you date me, <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                    Zuza?
                  </span> 
                  <span className="inline-block ml-2 animate-bounce">💖</span>
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative min-h-[80px]">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(244, 63, 94, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAccept}
                    className="px-10 py-4 bg-gradient-to-br from-rose-500 to-pink-600 text-white text-lg font-bold rounded-full shadow-xl shadow-rose-300/40 hover:shadow-2xl transition-all w-full md:w-auto z-10 tracking-wide"
                  >
                    Yes! 💕
                  </motion.button>

                  {/* Container for the No button to ensure it starts in flow but moves freely */}
                  <div className="relative w-full md:w-auto h-14 flex justify-center items-center">
                     <NoButton />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white/60 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border-2 border-white/50 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50 -z-10"></div>
              
              <motion.div 
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-8 inline-block drop-shadow-md"
              >
                <span className="text-7xl">😍</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 mb-6 drop-shadow-sm">
                Yayyy!!!
              </h2>
              
              <p className="text-xl md:text-2xl text-rose-800/80 font-semibold mb-8 leading-relaxed">
                You’re officially my Valentine! <br/>
                <span className="text-rose-500">I knew you'd say yes!</span>
              </p>

              <div className="inline-block px-6 py-2 bg-white/50 rounded-full border border-rose-100 text-rose-400 italic text-sm font-medium shadow-sm">
                Best. Decision. Ever. 💘
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="fixed bottom-6 text-rose-400/60 text-sm font-medium tracking-widest uppercase">
        Made for Zuza
      </div>
    </main>
  );
}