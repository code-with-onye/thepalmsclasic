import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const textScale = useTransform(scrollY, [0, 800], [1, 1.4]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-[100vh] md:h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-[0.7] grayscale-[0.2]"
        >
          <source
            src="https://res.cloudinary.com/dxev1yx0k/video/upload/q_auto:best,e_accelerate:-50/v1767096010/WhatsApp_Video_1404-10-09_at_12.58.29_sdm7if.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B3022]/40 via-transparent to-[#F9F6F0]" />
      </div>

      {/* Parallax Content */}
      <motion.div
        style={{ scale: textScale, opacity: textOpacity }}
        className="relative z-10 text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[#C5A059] font-sans tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 md:group-hover:mb-6"
        >
          Welcome to Inherited Luxury
        </motion.p>

        <div className="relative inline-block">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="font-serif italic text-5xl md:text-8xl lg:text-9xl text-white mb-4 leading-tight"
          >
            The Palm Classic
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1, ease: "circOut" }}
            className="h-[1px] bg-[#C5A059] w-full origin-left"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-white/80 font-sans font-light tracking-widest uppercase text-[10px] md:text-sm mt-6 md:mt-8 max-w-xs md:max-w-md mx-auto leading-relaxed"
        >
          Where colonial stateliness meets the wild heartbeat of the tropics.
        </motion.p>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-8 md:h-12 bg-[#C5A059]/50" />
        <span className="text-[#C5A059] uppercase tracking-widest text-[8px] md:text-[10px]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
