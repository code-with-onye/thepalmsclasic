
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const TIMES = [
  {
    id: 'sunrise',
    label: 'Sunrise',
    time: '06:00 AM',
    title: 'The Mirror Pool',
    desc: 'Watch the light dance across our infinity edge as the tropics wake.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'midday',
    label: 'Midday',
    time: '12:00 PM',
    title: 'The Botanist’s Lunch',
    desc: 'Fresh ingredients from our garden served under a canopy of banyan trees.',
    image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=1374&auto=format&fit=crop'
  },
  {
    id: 'sunset',
    label: 'Sunset',
    time: '06:00 PM',
    title: 'The Gilded Bar',
    desc: 'Crystal glasses and amber liquids. The city’s most storied cocktails.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'midnight',
    label: 'Midnight',
    time: '12:00 AM',
    title: 'Starlit Courtyard',
    desc: 'The scent of night-blooming cereus and the rhythm of the warm breeze.',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1374&auto=format&fit=crop'
  }
];

const Amenities: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const index = Math.min(Math.floor(v * TIMES.length), TIMES.length - 1);
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Desktop Layout */}
      <section ref={containerRef} className="hidden md:block relative h-[400vh] bg-[#F9F6F0]">
        <div className="sticky top-0 h-screen w-full flex overflow-hidden">
          {/* Left Side: Time List */}
          <div className="w-1/3 flex flex-col justify-center px-10 lg:px-20 border-r border-[#C5A059]/10">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C5A059] mb-12">Rhythms of the Day</p>
            <div className="space-y-10">
              {TIMES.map((t, idx) => (
                <div 
                  key={t.id}
                  className={`transition-all duration-700 ${idx === activeIndex ? 'translate-x-4 opacity-100' : 'opacity-20'}`}
                >
                  <span className="font-sans text-xs tracking-widest text-[#C5A059] block mb-2">{t.time}</span>
                  <h3 className="font-serif italic text-3xl lg:text-4xl text-[#1B3022]">{t.label}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Content & Image */}
          <div className="w-2/3 relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex flex-col"
              >
                <div className="h-2/3 overflow-hidden">
                  <motion.img 
                    src={TIMES[activeIndex].image}
                    alt={TIMES[activeIndex].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-1/3 p-10 lg:p-20 flex flex-col justify-center">
                  <h4 className="font-serif text-4xl lg:text-5xl italic text-[#1B3022] mb-6">{TIMES[activeIndex].title}</h4>
                  <p className="font-sans font-light text-[#1B3022]/70 text-base lg:text-lg leading-relaxed max-w-lg">
                    {TIMES[activeIndex].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Mobile Layout */}
      <section className="md:hidden py-20 px-6 bg-[#F9F6F0]">
        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C5A059] mb-12 text-center">Rhythms of the Day</p>
        <div className="space-y-24">
          {TIMES.map((t) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col"
            >
              <div className="mb-6">
                <span className="font-sans text-[10px] tracking-widest text-[#C5A059] block mb-1">{t.time}</span>
                <h3 className="font-serif italic text-3xl text-[#1B3022]">{t.label}</h3>
              </div>
              <div className="h-64 mb-8 overflow-hidden rounded-sm shadow-xl">
                <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
              </div>
              <div className="px-2">
                <h4 className="font-serif text-2xl italic text-[#1B3022] mb-4">{t.title}</h4>
                <p className="font-sans font-light text-[#1B3022]/70 text-sm leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Amenities;
