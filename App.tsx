
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import Amenities from './components/Amenities';
import Experience from './components/Experience';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import WeatherWidget from './components/WeatherWidget';
import AvailabilityBar from './components/AvailabilityBar';
import SuitesView from './components/views/SuitesView';
import DiningView from './components/views/DiningView';
import SpaView from './components/views/SpaView';
import HistoryView from './components/views/HistoryView';

export type WeatherStatus = 'Sunny' | 'Rainy' | 'Cloudy';
export type ViewState = 'home' | 'suites' | 'dining' | 'spa' | 'history' | 'reservations';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('home');
  const [weather, setWeather] = useState<{ temp: number; status: WeatherStatus }>({ 
    temp: 82, 
    status: 'Sunny'
  });
  const [bgColor, setBgColor] = useState('#F9F6F0');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isRaining = weather.status === 'Rainy';

  // Custom damped scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle background color shifts based on section and weather
  useEffect(() => {
    const handleScroll = () => {
      if (activeView !== 'home') return;
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.body.scrollHeight;
      
      if (scrollPos > totalHeight - windowHeight * 1.5) {
        setBgColor('#1A2A3A'); // Midnight section
      } else {
        setBgColor(isRaining ? '#E8EAE6' : '#F9F6F0');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isRaining, activeView]);

  // Adjust background color immediately on view change
  useEffect(() => {
    if (activeView === 'spa') setBgColor('#F4F7F2'); // Softer green for spa
    else if (activeView === 'dining') setBgColor('#1B3022'); // Dark for bar
    else setBgColor(isRaining ? '#E8EAE6' : '#F9F6F0');
    window.scrollTo(0, 0);
  }, [activeView, isRaining]);

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero />
            <Rooms onNavigate={() => setActiveView('suites')} />
            <Amenities />
            <Experience />
          </motion.div>
        );
      case 'suites':
        return <SuitesView key="suites" />;
      case 'dining':
        return <DiningView key="dining" />;
      case 'spa':
        return <SpaView key="spa" />;
      case 'history':
        return <HistoryView key="history" />;
      default:
        return <Hero />;
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen transition-colors duration-1000 ease-in-out font-sans text-[#1B3022]"
      style={{ backgroundColor: bgColor }}
    >
      <CustomCursor />
      <Header setView={setActiveView} currentView={activeView} />
      <WeatherWidget weather={weather} setWeather={setWeather} />
      
      {/* Rain Overlay */}
      <AnimatePresence>
        {isRaining && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
          >
            {Array.from({ length: 80 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -200, opacity: 0 }}
                animate={{ 
                  y: window.innerHeight + 200, 
                  opacity: [0, 0.1, 0.1, 0],
                  x: [0, -20]
                }}
                transition={{ 
                  duration: 0.8 + Math.random() * 0.7, 
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
                className="absolute w-[1px] bg-[#1B3022]/20"
                style={{ 
                  left: `${Math.random() * 110}%`,
                  height: `${40 + Math.random() * 60}px`,
                  transform: 'rotate(10deg)'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-20">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      <footer className="relative z-20 py-20 px-10 border-t border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl italic mb-4">The Palm Classic</h2>
            <p className="text-sm tracking-widest uppercase opacity-60">Est. 1924 • Heritage in Bloom</p>
          </div>
          <div className="flex space-x-12 font-serif text-lg">
            <button onClick={() => setActiveView('history')} className="hover:text-[#C5A059] transition-colors">History</button>
            <button className="hover:text-[#C5A059] transition-colors">Press</button>
            <button className="hover:text-[#C5A059] transition-colors">Careers</button>
            <button className="hover:text-[#C5A059] transition-colors">Contact</button>
          </div>
          <p className="text-xs opacity-40 uppercase tracking-tighter">
            © 2024 The Palm Classic. All rights reserved.
          </p>
        </div>
      </footer>

      <AvailabilityBar />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#C5A059] origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <motion.div 
        animate={{ filter: isRaining ? 'blur(2px)' : 'blur(0px)' }}
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1] overflow-hidden"
      >
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1543&auto=format&fit=crop" 
          alt="Palm Leaf Motif"
          className="absolute -top-20 -right-20 w-1/2 rotate-45"
        />
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1543&auto=format&fit=crop" 
          alt="Palm Leaf Motif"
          className="absolute -bottom-20 -left-20 w-1/2 -rotate-12"
        />
      </motion.div>
    </motion.div>
  );
};

export default App;
