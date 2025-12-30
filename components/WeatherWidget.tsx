
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Sun, RefreshCw } from 'lucide-react';
import { WeatherStatus } from '../App';

interface WeatherWidgetProps {
  weather: { temp: number; status: WeatherStatus };
  setWeather: React.Dispatch<React.SetStateAction<{ temp: number; status: WeatherStatus }>>;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, setWeather }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleWeather = () => {
    setWeather(prev => ({
      temp: prev.status === 'Sunny' ? 78 : 82,
      status: prev.status === 'Sunny' ? 'Rainy' : 'Sunny'
    }));
  };

  const isRaining = weather.status === 'Rainy';

  return (
    <div className="fixed top-24 md:top-32 right-6 md:right-10 z-[100] flex flex-col items-end pointer-events-none">
      <motion.div 
        className="bg-[#F9F6F0]/80 backdrop-blur-md border border-[#C5A059]/20 p-2 md:p-4 rounded-sm shadow-xl flex items-center gap-3 md:gap-4 pointer-events-auto cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        onClick={toggleWeather}
      >
        <div className="text-right">
          <p className="font-sans text-[6px] md:text-[8px] tracking-[0.2em] uppercase text-[#1B3022]/60 mb-0.5">Heritage Grounds</p>
          <div className="flex items-center gap-2 justify-end">
             <RefreshCw className="w-2 h-2 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity" />
             <p className="font-serif italic text-sm md:text-xl text-[#1B3022] leading-none">{weather.temp}°F & {weather.status}</p>
          </div>
        </div>
        <div className="p-1.5 md:p-2 bg-[#C5A059]/10 rounded-full">
          {isRaining ? <CloudRain className="w-3 h-3 md:w-4 md:h-4 text-[#C5A059]" /> : <Sun className="w-3 h-3 md:w-4 md:h-4 text-[#C5A059]" />}
        </div>
      </motion.div>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-2 md:mt-4 p-3 md:p-4 bg-[#1B3022] text-[#F9F6F0] rounded-sm shadow-2xl max-w-[150px] md:max-w-[200px] pointer-events-auto"
          >
            <p className="font-serif italic text-xs md:text-sm mb-1 md:mb-2">Atmospheric Sync</p>
            <p className="font-sans text-[8px] md:text-[10px] font-light leading-relaxed tracking-wider opacity-80">
              Synced with actual hotel weather. {isRaining ? 'A gentle tropical rain is falling.' : 'Clear skies at the veranda.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeatherWidget;
