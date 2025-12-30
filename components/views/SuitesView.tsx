
import React from 'react';
import { motion } from 'framer-motion';

const SUITES = [
  {
    name: "The Royal Veranda Suite",
    desc: "Our flagship suite features a private wrap-around veranda with panoramic views of the botanical gardens. Marble flooring, teak furniture, and hand-woven silk tapestries.",
    amenities: ["Butler Service", "Private Pool", "Heritage Menu", "1,200 sq ft"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop"
  },
  {
    name: "Orchid Terrace Room",
    desc: "A sanctuary of peace designed for the modern botanical enthusiast. Floor-to-ceiling windows bring the jungle indoors.",
    amenities: ["Terrace Garden", "Outdoor Shower", "Organic Linens"],
    image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=1374&auto=format&fit=crop"
  },
  {
    name: "Governor's Loft",
    desc: "Two levels of pure colonial grandeur. A study filled with antique books and a master bedroom overlooking the central courtyard.",
    amenities: ["Private Library", "Wine Cellar", "Antique Bath"],
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1374&auto=format&fit=crop"
  }
];

const SuitesView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="pt-40 pb-32 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C5A059] mb-4">The Chambers</p>
          <h1 className="font-serif italic text-6xl md:text-8xl text-[#1B3022] mb-8">Sacred Spaces</h1>
          <div className="h-[1px] w-24 bg-[#C5A059] mx-auto mb-8" />
          <p className="font-sans font-light text-[#1B3022]/70 text-lg leading-relaxed">
            Discover a world where the boundary between architecture and nature dissolves. Our rooms are more than accommodation; they are heritage preserved for the modern soul.
          </p>
        </div>

        <div className="space-y-40">
          {SUITES.map((suite, idx) => (
            <div key={suite.name} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-20 items-center`}>
              <div className="w-full md:w-1/2 overflow-hidden shadow-2xl">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  src={suite.image} 
                  alt={suite.name} 
                  className="w-full h-[600px] object-cover" 
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="font-serif italic text-5xl text-[#1B3022] mb-6">{suite.name}</h2>
                <p className="font-sans font-light text-[#1B3022]/70 text-lg leading-relaxed mb-10">
                  {suite.desc}
                </p>
                <div className="grid grid-cols-2 gap-4 border-t border-[#C5A059]/20 pt-10">
                  {suite.amenities.map(a => (
                    <div key={a} className="flex items-center gap-4 text-[#1B3022]/60 font-sans text-xs uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                      {a}
                    </div>
                  ))}
                </div>
                <button className="mt-12 bg-[#1B3022] text-[#F9F6F0] px-10 py-4 font-sans text-xs uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1B3022] transition-all">
                  Book This Suite
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SuitesView;
