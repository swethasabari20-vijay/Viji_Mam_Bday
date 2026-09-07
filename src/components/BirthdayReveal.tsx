import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, Sparkles, Quote, Image as ImageIcon } from 'lucide-react';
import { BirthdayContent } from '../config/content';
import { CEOPhotoFrame } from './CEOPhotoFrame';

interface BirthdayRevealProps {
  content: BirthdayContent;
  onNext: () => void;
  onPrev: () => void;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({
  content,
  onNext,
  onPrev,
}) => {
  const { screen2, photos } = content;
  const [activeKey, setActiveKey] = useState<'photo1' | 'photo2'>('photo1');
  const activePhoto = photos[activeKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center"
    >
      {/* Back button */}
      <div className="w-full flex justify-start mb-3">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 text-xs text-[#D8C3BE]/70 hover:text-[#F3E5AB] transition-colors py-1 px-2.5 rounded-full hover:bg-white/5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Date Edition Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mb-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#2E0D27]/80 border border-[#D4AF37]/35 text-[#F3E5AB] text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase shadow-sm"
      >
        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
        <span>{screen2.editionBadge}</span>
      </motion.div>

      {/* Main Container: Split or Centered on Desktop */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-2">
        {/* Photo Column */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-1"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <CEOPhotoFrame
                src={activePhoto.src}
                size="standard"
                alt={activePhoto.alt}
                objectPosition={activePhoto.objectPosition}
                subtitle={activePhoto.subtitle}
              />
            </motion.div>
          </AnimatePresence>

          {/* Photo Switcher Pills (Executive vs Celebration) */}
          <div className="mt-3.5 inline-flex items-center p-1 rounded-full bg-[#20081B]/90 border border-[#D4AF37]/25 shadow-md">
            <button
              onClick={() => setActiveKey('photo1')}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 ${
                activeKey === 'photo1'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59E30] text-[#1F0819] shadow-sm'
                  : 'text-[#D8C3BE]/75 hover:text-[#F3E5AB]'
              }`}
            >
              Executive
            </button>
            <button
              onClick={() => setActiveKey('photo2')}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 ${
                activeKey === 'photo2'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59E30] text-[#1F0819] shadow-sm'
                  : 'text-[#D8C3BE]/75 hover:text-[#F3E5AB]'
              }`}
            >
              Celebration
            </button>
          </div>
        </motion.div>

        {/* Text & Quote Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2 space-y-5">
          {/* Main Birthday Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-medium text-[#FDF8F0] tracking-tight leading-[1.15]">
              Happy Birthday,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#E8B4B8]">
                Viji Ma’am! 🎂
              </span>
            </h1>
          </motion.div>

          {/* Elegant Quote Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="relative w-full max-w-xl p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#2E0D27]/80 to-[#1F0819]/90 border border-[#D4AF37]/25 shadow-xl backdrop-blur-md"
          >
            <div className="flex gap-3 sm:gap-4 items-start">
              <Quote className="w-6 h-6 text-[#D4AF37]/50 shrink-0 rotate-180 -mt-1 hidden sm:block" />
              <div className="space-y-1.5 font-editorial text-lg sm:text-xl md:text-2xl text-[#FDF8F0] italic leading-relaxed">
                {screen2.quoteLines.map((line, idx) => (
                  <p key={idx} className="tracking-wide">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Subtitle below quote */}
            <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-center lg:justify-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <p className="text-xs sm:text-sm font-medium tracking-wider uppercase text-[#E6C687]/90 font-sans-clean">
                {screen2.roleSubtitle}
              </p>
            </div>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="pt-2"
          >
            <button
              id="btn-reveal-next"
              onClick={onNext}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59E30] text-[#1F0819] font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:scale-102 active:scale-98 transition-all duration-300"
            >
              <span>{screen2.buttonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
