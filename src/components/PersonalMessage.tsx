import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ChevronLeft, Gift } from 'lucide-react';
import { BirthdayContent } from '../config/content';

interface PersonalMessageProps {
  content: BirthdayContent;
  onNext: () => void;
  onPrev: () => void;
}

export const PersonalMessage: React.FC<PersonalMessageProps> = ({
  content,
  onNext,
  onPrev,
}) => {
  const { screen3 } = content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center"
    >
      {/* Back button */}
      <div className="w-full flex justify-start mb-4">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 text-xs text-[#D8C3BE]/70 hover:text-[#F3E5AB] transition-colors py-1 px-2.5 rounded-full hover:bg-white/5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Decorative Subtle Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-4 relative"
      >
        <div className="flex items-center justify-center gap-2 text-[#E8B4B8]">
          <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <Heart className="w-5 h-5 text-[#E8B4B8] fill-[#E8B4B8]/30 animate-bounce" style={{ animationDuration: '2.5s' }} />
          <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
        </div>
      </motion.div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#FDF8F0] text-center font-normal tracking-tight mb-8 leading-snug max-w-lg text-balance"
      >
        {screen3.heading}
      </motion.h2>

      {/* Message Letter Card with Paragraph-by-Paragraph Reveal */}
      <div className="w-full relative rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-b from-[#280B22]/90 to-[#190616]/95 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl mb-8 space-y-6">
        {/* Subtle decorative gold top hairline */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        {screen3.paragraphs.map((para, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35 + index * 0.35, // Staggered entrance for emotional pace
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <p className="text-base sm:text-lg text-[#FDF8F0]/95 font-light leading-relaxed tracking-normal">
              {para}
            </p>
          </motion.div>
        ))}

        {/* Small subtle heart / sparkle embellishment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="pt-2 flex items-center justify-end gap-1.5 text-xs text-[#E6C687]/70 italic"
        >
          <span>With genuine gratitude</span>
          <Heart className="w-3.5 h-3.5 text-[#E8B4B8] fill-[#E8B4B8]" />
        </motion.div>
      </div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <button
          id="btn-message-next"
          onClick={onNext}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59E30] text-[#1F0819] font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.55)] hover:scale-102 active:scale-98 transition-all duration-300"
        >
          <span>{screen3.buttonText}</span>
          <Gift className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
};
