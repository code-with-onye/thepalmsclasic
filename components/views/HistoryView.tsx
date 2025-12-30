
import React from 'react';
import { motion } from 'framer-motion';

const HistoryView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 px-6 md:px-10"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-24">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C5A059] mb-4">A Century of Grace</p>
          <h1 className="font-serif italic text-6xl md:text-9xl text-[#1B3022] mb-12">The Legacy</h1>
          
          <div className="flex flex-col md:flex-row gap-20 items-start">
            <div className="w-full md:w-1/2">
              <img src="https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1528&auto=format&fit=crop" className="w-full grayscale mb-8" />
              <p className="font-sans text-[10px] tracking-widest uppercase opacity-40 italic">Circa 1928 - The Original Grand Opening</p>
            </div>
            <div className="w-full md:w-1/2 space-y-10">
              <h2 className="font-serif italic text-4xl text-[#1B3022]">Founded in 1924, The Palm Classic was envisioned as a beacon of sophistication in the heart of the tropics.</h2>
              <p className="font-sans font-light text-[#1B3022]/70 text-lg leading-relaxed">
                Originally built as a colonial administrative residence, the structure was transformed into a boutique hotel in the early 1930s. It has survived world events and cultural shifts, remaining a steadfast symbol of timeless luxury.
              </p>
              <p className="font-sans font-light text-[#1B3022]/70 text-lg leading-relaxed">
                Our architecture preserves the original teakwood frames and Italian marble flooring, meticulously restored to their 1920s splendor while integrating the subtle comforts of the 21st century.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1B3022] text-[#F9F6F0] p-20 relative overflow-hidden">
           <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="font-serif italic text-5xl mb-8">"To walk these halls is to hear the echoes of history."</h3>
              <div className="h-[1px] w-20 bg-[#C5A059] mx-auto mb-8" />
              <p className="font-sans text-xs tracking-widest uppercase opacity-60">- Sir Alexander Finch, Founder</p>
           </div>
           {/* Decorative palm leaf */}
           <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1543&auto=format&fit=crop" className="absolute top-0 right-0 w-64 opacity-5 rotate-45 pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryView;
