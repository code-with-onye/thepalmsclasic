
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROOMS = [
  {
    id: 1,
    name: "The Royal Veranda Suite",
    type: "Master Suite",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop",
    height: "h-[450px] md:h-[600px]"
  },
  {
    id: 2,
    name: "Orchid Terrace Room",
    type: "Deluxe Queen",
    image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=1374&auto=format&fit=crop",
    height: "h-[350px] md:h-[400px]"
  },
  {
    id: 3,
    name: "Colonial Heritage Loft",
    type: "Luxury Loft",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1374&auto=format&fit=crop",
    height: "h-[400px] md:h-[500px]"
  }
];

const VenetianRoomCard: React.FC<{ room: typeof ROOMS[0]; onClick?: () => void }> = ({ room, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const sliceCount = 8;

  return (
    <motion.div 
      onClick={onClick}
      className={`relative overflow-hidden group mb-6 md:mb-8 ${room.height} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center grayscale sepia brightness-75 transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${room.image})` }}
      />

      <div className="absolute inset-0 flex">
        {Array.from({ length: sliceCount }).map((_, i) => (
          <motion.div
            key={i}
            className="relative h-full overflow-hidden"
            style={{ width: `${100 / sliceCount}%` }}
            initial={false}
            animate={{ 
              height: isHovered ? "100%" : "0%",
              opacity: isHovered ? 1 : 0
            }}
            transition={{ 
              duration: 0.6, 
              delay: i * 0.05, 
              ease: "easeInOut" 
            }}
          >
            <div 
              className="absolute top-0 h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ 
                backgroundImage: `url(${room.image})`,
                width: `${100 * sliceCount}%`,
                left: `-${i * 100}%`
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022]/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
        <span className="text-[#C5A059] font-sans text-[10px] md:text-xs tracking-widest uppercase mb-2">{room.type}</span>
        <h3 className="text-white font-serif italic text-2xl md:text-3xl mb-4">{room.name}</h3>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "40px" }}
          className="h-[1px] bg-[#C5A059]" 
        />
      </div>
    </motion.div>
  );
};

const Rooms: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
  return (
    <section id="rooms" className="py-20 md:py-32 px-6 md:px-10 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 md:mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="font-serif italic text-4xl md:text-5xl text-[#1B3022] mb-6">Chambers of Calm</h2>
            <p className="font-sans font-light text-[#1B3022]/70 leading-relaxed tracking-wide text-sm md:text-base">
              Each suite is an essay in colonial elegance, where high-vaulted ceilings and marble hallways breathe with the scent of jasmine and vintage wood.
            </p>
          </div>
          <button 
            onClick={onNavigate}
            className="group flex items-center gap-4 text-[#1B3022] font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase border-b border-[#C5A059] pb-2"
          >
            View All Suites
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ROOMS.map(room => (
            <VenetianRoomCard key={room.id} room={room} onClick={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
