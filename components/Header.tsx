import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewState } from "../App";

interface HeaderProps {
  setView: (view: ViewState) => void;
  currentView: ViewState;
}

const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems: { label: string; view: ViewState }[] = [
    { label: "The Arrival", view: "home" },
    { label: "Chambers of Calm", view: "suites" },
    { label: "The Gilded Bar", view: "dining" },
    { label: "Heritage Spa", view: "spa" },
    { label: "Our Legacy", view: "history" },
    { label: "Reservations", view: "home" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[200] transition-all duration-700 px-6 md:px-10 ${
        isScrolled || currentView !== "home"
          ? "py-4 bg-[#F9F6F0]/90 backdrop-blur-md border-b border-[#C5A059]/10 shadow-sm"
          : "py-6 md:py-10 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Nav */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          <button
            onClick={() => setView("suites")}
            className={`text-[10px] tracking-[0.3em] uppercase transition-colors ${
              currentView === "suites"
                ? "text-[#C5A059]"
                : "text-[#1B3022] hover:text-[#C5A059]"
            }`}
          >
            Suites
          </button>
          <button
            onClick={() => setView("dining")}
            className={`text-[10px] tracking-[0.3em] uppercase transition-colors ${
              currentView === "dining"
                ? "text-[#C5A059]"
                : "text-[#1B3022] hover:text-[#C5A059]"
            }`}
          >
            Dining
          </button>
        </nav>

        {/* Logo */}
        <button
          onClick={() => setView("home")}
          className="font-serif italic text-2xl md:text-3xl text-[#1B3022] transition-transform duration-500 hover:scale-105 outline-none"
        >
          The Palm Classic
        </button>

        {/* Right Nav */}
        <div className="flex items-center space-x-6 md:space-x-12">
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <button
              onClick={() => setView("history")}
              className={`text-[10px] tracking-[0.3em] uppercase transition-colors ${
                currentView === "history"
                  ? "text-[#C5A059]"
                  : "text-[#1B3022] hover:text-[#C5A059]"
              }`}
            >
              History
            </button>
            <button
              onClick={() => setView("spa")}
              className={`text-[10px] tracking-[0.3em] uppercase transition-colors ${
                currentView === "spa"
                  ? "text-[#C5A059]"
                  : "text-[#1B3022] hover:text-[#C5A059]"
              }`}
            >
              Wellness
            </button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col gap-1.5 group outline-none"
            aria-label="Open Menu"
          >
            <div className="w-6 md:w-8 h-[1px] bg-[#C5A059]" />
            <div className="w-6 md:w-8 h-[1px] bg-[#C5A059] group-hover:w-4 transition-all duration-300" />
            <div className="w-6 md:w-8 h-[1px] bg-[#C5A059]" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[300] bg-[#1B3022] flex"
          >
            <div className="hidden lg:block w-1/2 h-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1528&auto=format&fit=crop"
                alt="Hotel Interior"
                className="absolute inset-0 w-full h-full object-cover brightness-50"
              />
              <div className="absolute inset-0 bg-[#1B3022]/20" />
            </div>

            <div className="w-full lg:w-1/2 h-full bg-[#1B3022] p-8 md:p-20 flex flex-col justify-between">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#C5A059] font-sans text-[10px] md:text-xs tracking-widest uppercase hover:opacity-70"
                >
                  [ Close ]
                </button>
              </div>

              <div className="flex flex-col space-y-4 md:space-y-8">
                {menuItems.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className={`font-serif italic text-left text-4xl md:text-6xl lg:text-7xl hover:text-[#C5A059] transition-colors leading-tight ${
                      currentView === item.view
                        ? "text-[#C5A059]"
                        : "text-[#F9F6F0]"
                    }`}
                    onClick={() => {
                      setView(item.view);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              <div className="flex flex-col md:flex-row justify-between border-t border-[#C5A059]/30 pt-8 md:pt-10 text-white/40 font-sans text-[8px] md:text-[10px] tracking-[0.2em] uppercase space-y-4 md:space-y-0">
                <p>Singapore • Colonial District</p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
