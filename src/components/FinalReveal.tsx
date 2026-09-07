import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ChevronLeft, PartyPopper, RotateCcw } from 'lucide-react';
import { BirthdayContent } from '../config/content';
import { CEOPhotoFrame } from './CEOPhotoFrame';
import { fireLuxuryCelebration } from '../utils/confetti';

interface FinalRevealProps {
  content: BirthdayContent;
  onPrev: () => void;
  onRestart: () => void;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({
  content,
  onPrev,
  onRestart,
}) => {
  const { screen4, photos } = content;
  const [activeKey, setActiveKey] = useState<'photo1' | 'photo2'>('photo2');
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const activePhoto = photos[activeKey];

  const handleCelebrate = () => {
    setHasCelebrated(true);
    fireLuxuryCelebration();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center text-center"
    >
      {/* Back button */}
      <div className="w-full flex justify-between items-center mb-4">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 text-xs text-[#D8C3BE]/70 hover:text-[#F3E5AB] transition-colors py-1 px-2.5 rounded-full hover:bg-white/5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {hasCelebrated && (
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1 text-xs text-[#E6C687]/80 hover:text-[#F3E5AB] transition-colors py-1 px-3 rounded-full bg-white/5 hover:bg-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Watch from Start</span>
          </button>
        )}
      </div>

      {/* Hero Motto Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#380E2F] via-[#4D153B] to-[#380E2F] border border-[#D4AF37]/40 text-[#F3E5AB] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)]"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>{screen4.motto}</span>
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
      </motion.div>

      {/* Large Framed Photo of Viji Ma'am with Dual Photo Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 flex flex-col items-center"
      >
        <CEOPhotoFrame
          src={activePhoto.src}
          size="large"
          alt={activePhoto.alt}
          objectPosition={activePhoto.objectPosition}
          celebrating={hasCelebrated}
          subtitle={activePhoto.subtitle}
        />

        {/* Photo Switcher Pills (Celebration vs Executive) */}
        <div className="mt-3.5 inline-flex items-center p-1 rounded-full bg-[#20081B]/90 border border-[#D4AF37]/25 shadow-md">
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
        </div>
      </motion.div>

      {/* Blessing & Warm Message */}
      <div className="max-w-xl mx-auto space-y-6 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-[#FDF8F0] font-editorial italic font-normal leading-relaxed text-balance"
        >
          “{screen4.wishText}”
        </motion.p>

        {/* Happy Birthday Ma'am! */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#E8B4B8] tracking-tight">
            {screen4.closingGreeting}
          </h2>
        </motion.div>

        {/* Signoff */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-2 text-sm sm:text-base text-[#D8C3BE] font-light space-y-1"
        >
          <p className="whitespace-pre-line text-[#E6C687] font-medium tracking-wide">
            {screen4.senderSignoff}
          </p>
        </motion.div>
      </div>

      {/* Celebrate Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.95, duration: 0.5 }}
        className="relative"
      >
        <button
          id="btn-final-celebrate"
          onClick={handleCelebrate}
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59E30] text-[#1F0819] font-bold text-base sm:text-lg shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-98 transition-all duration-300"
        >
          <PartyPopper className="w-5 h-5 group-hover:rotate-12 transition-transform text-[#1F0819]" />
          <span>{hasCelebrated ? "Celebrate Again 🎉" : screen4.celebrateButton}</span>
        </button>

        {hasCelebrated && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-[#F3E5AB]/80 mt-3 font-medium tracking-wider uppercase"
          >
            ✨ To an extraordinary leader and an inspiring year ahead! ✨
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};
