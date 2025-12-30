
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const { scrollXProgress } = useScroll({
    target: containerRef,
  });

  // Scale the x-transform based on device
  const x = useTransform(scrollXProgress, [0, 1], ["0%", isTouchDevice ? "-65%" : "-50%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const HOTSPOTS = [
    { x: '15%', y: '40%', label: 'Banyan Tree' },
    { x: '45%', y: '60%', label: 'Blue Orchids' },
    { x: '75%', y: '30%', label: 'Lily Pond' }
  ];

  return (
    <section className="relative overflow-hidden bg-[#1B3022] py-20 md:py-40">
      <div className="px-6 md:px-10 mb-12 md:mb-20">
        <h2 className="font-serif italic text-4xl md:text-6xl text-white mb-6">Botanical Immersion</h2>
        <p className="text-[#C5A059] font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs">A Living Legacy in Every Leaf</p>
      </div>

      <div 
        ref={containerRef}
        className={`h-[60vh] md:h-[80vh] flex ${isTouchDevice ? 'cursor-grab active:cursor-grabbing overflow-x-auto no-scrollbar' : 'cursor-none'}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isTouchDevice && setIsHovering(true)}
        onMouseLeave={() => !isTouchDevice && setIsHovering(false)}
      >
        <motion.div 
          style={{ x }}
          className="flex whitespace-nowrap h-full relative"
        >
          {/* Main Panorama */}
          <div className={`relative h-full ${isTouchDevice ? 'w-[300vw]' : 'w-[200vw]'}`}>
            <img 
              src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop" 
              alt="Jungle Garden Panorama"
              className={`w-full h-full object-cover ${isTouchDevice ? 'saturate-[1.2] brightness-90' : 'grayscale-[0.3] brightness-[0.7]'}`}
            />

            {/* Magnifying Glass Effect - Hidden on Mobile */}
            {!isTouchDevice && (
              <motion.div 
                className="pointer-events-none absolute z-20 w-80 h-80 rounded-full border-2 border-[#C5A059] overflow-hidden"
                style={{ 
                  left: mousePos.x - 160, 
                  top: mousePos.y - 160,
                  opacity: isHovering ? 1 : 0
                }}
              >
                <div 
                  className="absolute w-[200vw] h-[80vh] saturate-[1.5] brightness-110"
                  style={{ 
                    backgroundImage: `url(https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop)`,
                    backgroundSize: 'cover',
                    transform: `translate(-${mousePos.x}px, -${mousePos.y}px) scale(1.1)`,
                    transformOrigin: 'top left'
                  }}
                />
              </motion.div>
            )}

            {/* Hotspots */}
            {HOTSPOTS.map((h, i) => (
              <div 
                key={i} 
                className="absolute text-white/60 md:text-white/40 font-sans text-[8px] md:text-[10px] tracking-widest uppercase flex items-center gap-2 md:gap-4"
                style={{ left: h.x, top: h.y }}
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span>{h.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white/10 font-serif italic text-5xl md:text-8xl pointer-events-none select-none">
        Botanical Heritage
      </div>
      
      {/* Mobile hint */}
      {isTouchDevice && (
        <div className="md:hidden mt-8 text-center">
           <span className="text-[#C5A059]/60 font-sans text-[8px] tracking-[0.4em] uppercase">← Pan to Explore →</span>
        </div>
      )}
    </section>
  );
};

export default Experience;
