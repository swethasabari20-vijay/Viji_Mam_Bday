import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { BirthdayContent } from '../config/content';

interface IntroScreenProps {
  content: BirthdayContent;
  onNext: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ content, onNext }) => {
  const { screen1 } = content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 text-center"
    >
      {/* Decorative luxury seal / emblem */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-8 relative"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 via-[#E6C687]/20 to-[#4D153B]/50 p-[1px] shadow-[0_0_25px_rgba(212,175,55,0.25)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#23091E]/90 backdrop-blur-md flex items-center justify-center border border-[#D4AF37]/30">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#F3E5AB] animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Small elegant text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A0B23]/70 border border-[#D4AF37]/30 text-[#E6C687] text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-6 shadow-sm"
      >
        <span>{screen1.teaserBadge}</span>
      </motion.div>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-normal text-[#FDF8F0] tracking-tight leading-[1.15] mb-6 max-w-xl text-balance"
      >
        {screen1.heading}
      </motion.h1>

      {/* Supporting text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="text-[#D8C3BE] text-base sm:text-lg font-light leading-relaxed max-w-lg mb-10 text-balance"
      >
        {screen1.description}
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        <button
          id="btn-open-surprise"
          onClick={onNext}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59E30] text-[#1F0819] font-semibold text-base sm:text-lg shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.55)] hover:scale-103 active:scale-98 transition-all duration-300"
        >
          <span>{screen1.buttonText}</span>
          <div className="w-2 h-2 rounded-full bg-[#1F0819]/40 group-hover:scale-125 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
};
