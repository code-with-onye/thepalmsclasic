
import React from 'react';
import { motion } from 'framer-motion';

const SpaView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="pt-40 pb-32 px-6 md:px-10 bg-[#F4F7F2]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#7D9A81] mb-4">The Wellness Ritual</p>
          <h1 className="font-serif italic text-6xl md:text-9xl text-[#1B3022] mb-12">Heritage Spa</h1>
          <p className="font-sans font-light text-[#1B3022]/60 text-xl max-w-2xl mx-auto leading-relaxed">
            A return to essential calm. Using botanical extracts harvested from our own grounds, we offer a sensory journey back to balance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { name: "Jasmine Renewal", duration: "90 min", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1470&auto=format&fit=crop" },
            { name: "Antique Oil Therapy", duration: "120 min", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1374&auto=format&fit=crop" },
            { name: "Veranda Meditation", duration: "60 min", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1374&auto=format&fit=crop" }
          ].map(spa => (
            <motion.div key={spa.name} whileHover={{ y: -20 }} className="group">
              <div className="h-[500px] mb-8 overflow-hidden rounded-t-full shadow-lg">
                <img src={spa.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <h3 className="font-serif italic text-3xl text-[#1B3022] mb-2">{spa.name}</h3>
              <p className="font-sans text-[10px] tracking-widest text-[#7D9A81] uppercase">{spa.duration}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 border border-[#7D9A81]/30 p-20 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="max-w-md">
              <h2 className="font-serif italic text-5xl text-[#1B3022] mb-6">Private Sanctuary</h2>
              <p className="font-sans font-light text-[#1B3022]/70 leading-relaxed">
                Experience the ultimate in seclusion with a spa suite overlooking our private lily pond.
              </p>
           </div>
           <button className="bg-[#7D9A81] text-white px-12 py-5 font-sans text-xs uppercase tracking-widest hover:bg-[#1B3022] transition-all">
              Request Booking
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SpaView;
