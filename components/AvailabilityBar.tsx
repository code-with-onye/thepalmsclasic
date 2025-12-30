
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';

const AvailabilityBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // State for form values
  const [bookingData, setBookingData] = useState({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: '2 Adults'
  });

  const handleCheck = () => {
    setIsChecking(true);
    // Simulate API call to check availability
    setTimeout(() => {
      setIsChecking(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 w-full z-[120] px-4 md:px-10 pb-4 md:pb-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto pointer-events-auto relative">
        {/* Success Feedback Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 bg-[#1B3022] text-[#F9F6F0] px-8 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#C5A059]/30"
            >
              <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
              <span className="font-serif italic text-sm tracking-wide">Availability confirmed for your dates.</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-[#F9F6F0] border border-[#C5A059]/20 shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 rounded-sm">
          
          {/* Mobile Header / Quick View */}
          <div className="flex md:hidden w-full justify-between items-center mb-2" onClick={() => setIsExpanded(!isExpanded)}>
            <span className="font-serif italic text-lg text-[#1B3022]">Reservation Details</span>
            <button className="text-[#C5A059] text-xs uppercase tracking-widest outline-none">{isExpanded ? '[ Hide ]' : '[ Edit ]'}</button>
          </div>

          <div className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center flex-1 w-full md:w-auto ${!isExpanded && 'hidden md:flex'}`}>
            <div className="w-full md:w-auto">
              <label className="block font-sans text-[8px] tracking-widest uppercase text-[#1B3022]/40 mb-1 md:mb-2">Check In</label>
              <input 
                type="date" 
                value={bookingData.checkIn}
                onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                className="bg-transparent border-b border-[#C5A059]/40 font-serif text-base md:text-lg text-[#1B3022] outline-none w-full py-1 transition-colors focus:border-[#C5A059]"
              />
            </div>
            <div className="w-full md:w-auto">
              <label className="block font-sans text-[8px] tracking-widest uppercase text-[#1B3022]/40 mb-1 md:mb-2">Check Out</label>
              <input 
                type="date" 
                value={bookingData.checkOut}
                onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                className="bg-transparent border-b border-[#C5A059]/40 font-serif text-base md:text-lg text-[#1B3022] outline-none w-full py-1 transition-colors focus:border-[#C5A059]"
              />
            </div>
            <div className="w-full md:w-auto">
              <label className="block font-sans text-[8px] tracking-widest uppercase text-[#1B3022]/40 mb-1 md:mb-2">Guests</label>
              <select 
                value={bookingData.guests}
                onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                className="bg-transparent border-b border-[#C5A059]/40 font-serif text-base md:text-lg text-[#1B3022] outline-none w-full cursor-pointer py-1 transition-colors focus:border-[#C5A059]"
              >
                <option value="1 Adult">1 Adult</option>
                <option value="2 Adults">2 Adults</option>
                <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                <option value="Suite Buyout">Entire Wing</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleCheck}
            disabled={isChecking}
            className="bg-[#1B3022] text-[#F9F6F0] font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase px-8 md:px-12 py-4 hover:bg-[#C5A059] hover:text-[#1B3022] transition-all duration-500 whitespace-nowrap w-full md:w-auto mt-2 md:mt-0 shadow-lg md:shadow-none flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait"
          >
            {isChecking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Check Availability'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AvailabilityBar;
