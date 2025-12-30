
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      setIsVisible(false);
      return;
    }

    const handleInitialMove = () => setIsVisible(true);
    window.addEventListener('mousemove', handleInitialMove, { once: true });

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], img, input, select');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousemove', handleInitialMove);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[1000] mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovering ? 40 : 15),
        y: mousePosition.y - (isHovering ? 40 : 15),
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!isHovering ? (
          <motion.div 
            key="cross"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-[30px] h-[30px]"
          >
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#C5A059]" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#C5A059]" />
          </motion.div>
        ) : (
          <motion.div 
            key="explore"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-20 h-20 rounded-full border border-[#C5A059] flex items-center justify-center bg-transparent backdrop-blur-sm"
          >
            <span className="font-serif italic text-[#C5A059] text-[10px] tracking-widest uppercase">Explore</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor;
