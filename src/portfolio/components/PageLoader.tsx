import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoaderProps {
  onComplete?: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 350);
          return 100;
        }
        const increment = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + increment, 100);
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 md:p-14 bg-[#09090b] text-[#f4f3ef]"
        >
          {/* Top minimal status */}
          <div className="w-full flex items-center justify-between text-xs tracking-widest uppercase text-white/40 font-tabular">
            <span>Portfolio Editorial</span>
            <span>2026 Edition</span>
          </div>

          {/* Central title reveal */}
          <div className="text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-editorial text-3xl md:text-5xl lg:text-6xl tracking-tight font-normal text-white"
            >
              Designing Ideas. <span className="italic font-light text-white/70">Building Experiences.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xs md:text-sm tracking-widest uppercase text-[#9e96b8] font-body"
            >
              Web Developer · Digital Projects
            </motion.p>
          </div>

          {/* Bottom progress bar & counter */}
          <div className="w-full max-w-md space-y-3">
            <div className="flex items-center justify-between text-xs text-white/50 font-tabular">
              <span>Initializing workspace</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#9b87c7] to-[#e8e7e3]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
