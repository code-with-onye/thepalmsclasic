import React from "react";
import { motion } from "framer-motion";

const DiningView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-[#1B3022] text-[#F9F6F0] pt-40 pb-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-20 items-center mb-40">
          <div className="w-full md:w-1/2">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C5A059] mb-4">
              The Culinary Journey
            </p>
            <h1 className="font-serif italic text-6xl md:text-8xl mb-8">
              The Gilded Bar
            </h1>
            <p className="font-sans font-light text-white/70 text-xl leading-relaxed mb-12">
              Where the spirit of the Orient meets European mixology. Our bar is
              a shrine to the rare and the hand-crafted.
            </p>
            <div className="space-y-8">
              <div className="flex justify-between border-b border-[#C5A059]/20 pb-4">
                <span className="font-serif italic text-2xl">
                  The Palm Signature
                </span>
                <span className="text-[#C5A059] font-sans text-sm">₦28</span>
              </div>
              <div className="flex justify-between border-b border-[#C5A059]/20 pb-4">
                <span className="font-serif italic text-2xl">
                  Colonial Negroni
                </span>
                <span className="text-[#C5A059] font-sans text-sm">₦24</span>
              </div>
              <div className="flex justify-between border-b border-[#C5A059]/20 pb-4">
                <span className="font-serif italic text-2xl">
                  Heritage Botanical Gin
                </span>
                <span className="text-[#C5A059] font-sans text-sm">₦22</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-[700px]">
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1470&auto=format&fit=crop"
              alt="Gilded Bar"
              className="w-full h-full object-cover shadow-2xl"
            />
            <div className="absolute -bottom-10 -left-10 bg-[#C5A059] p-10 hidden md:block">
              <p className="text-[#1B3022] font-serif italic text-3xl">
                Midnight at the Classic
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-[400px] relative group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=1374&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="font-serif italic text-4xl">The Terrace Dining</h3>
            </div>
          </div>
          <div className="h-[400px] relative group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="font-serif italic text-4xl">Artisan Pantry</h3>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiningView;
