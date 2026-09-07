import React from 'react';
import { Volume2, VolumeX, Image as ImageIcon, Sparkles } from 'lucide-react';

interface HeaderNavProps {
  currentScreen: number;
  totalScreens: number;
  onSelectScreen: (index: number) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenPhotoModal: () => void;
}

const SCREEN_TITLES = [
  "Surprise",
  "Reveal",
  "Message",
  "Celebrate"
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  totalScreens,
  onSelectScreen,
  isMusicPlaying,
  onToggleMusic,
  onOpenPhotoModal,
}) => {
  return (
    <header className="relative z-30 w-full max-w-4xl mx-auto px-4 pt-4 sm:pt-6 pb-2 flex items-center justify-between gap-3">
      {/* Brand / Monogram */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6B1B] p-[1px] shadow-sm">
          <div className="w-full h-full rounded-full bg-[#1F0819] flex items-center justify-center">
            <span className="text-[#F3E5AB] text-xs font-serif font-bold tracking-widest">VM</span>
          </div>
        </div>
        <span className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] text-[#E6C687]/80 font-medium">
          September 8 • Celebration
        </span>
      </div>

      {/* Subtle Step Dots */}
      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#2D0D26]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D4AF37]/20 shadow-inner">
        {Array.from({ length: totalScreens }).map((_, idx) => {
          const isActive = idx === currentScreen;
          const isPassed = idx < currentScreen;
          return (
            <button
              key={idx}
              id={`nav-step-${idx}`}
              onClick={() => onSelectScreen(idx)}
              title={`Go to ${SCREEN_TITLES[idx]}`}
              className={`group flex items-center gap-1.5 transition-all duration-300 py-0.5 px-1 rounded-full ${
                isActive ? 'text-[#F3E5AB]' : 'text-[#D8C3BE]/50 hover:text-[#D8C3BE]'
              }`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-6 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] shadow-[0_0_8px_#D4AF37]'
                    : isPassed
                    ? 'w-2.5 bg-[#D4AF37]/50'
                    : 'w-2 bg-white/20 group-hover:bg-white/40'
                }`}
              />
              {isActive && (
                <span className="text-[10px] uppercase tracking-wider font-medium hidden md:inline-block pr-1">
                  {SCREEN_TITLES[idx]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Photo Manager / Upload Button */}
        <button
          id="btn-photo-options"
          onClick={onOpenPhotoModal}
          title="Change or upload Viji Ma'am's photo"
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full bg-[#2D0D26]/70 hover:bg-[#3E1335] text-[#E6C687] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all duration-200 shadow-sm"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="hidden sm:inline font-medium">Photo</span>
        </button>

        {/* Music Button */}
        <button
          id="btn-toggle-music"
          onClick={onToggleMusic}
          title={isMusicPlaying ? "Turn Music Off" : "Turn Music On"}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all duration-200 shadow-sm ${
            isMusicPlaying
              ? 'bg-[#D4AF37] text-[#1F0819] font-semibold border-[#F3E5AB] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
              : 'bg-[#2D0D26]/70 hover:bg-[#3E1335] text-[#E6C687] border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
          }`}
        >
          {isMusicPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span>♫ Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 opacity-70" />
              <span>♫ Music</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
