/**
 * =========================================================================
 * 🎂 Viji Ma'am's CEO Birthday Website
 * Created with deep admiration and respect by Swetha
 * =========================================================================
 * 
 * NAVIGATION FLOW:
 * Screen 0: IntroScreen (Teaser & Opening)
 * Screen 1: BirthdayReveal (Prominent Photo + September 8 Edition + CEO Quote)
 * Screen 2: PersonalMessage (Gratitude Letter with Staggered Fade-in)
 * Screen 3: FinalReveal (Framed Photo + Keep Leading Motto + Celebration Confetti)
 * 
 * CUSTOMIZATION GUIDE:
 * - Edit all texts in: `src/config/content.ts`
 * - Replace photo in: `src/assets/viji-maam.jpg` (or click "Photo" in the top bar)
 * - Replace audio in: `src/assets/birthday-music.mp3`
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { BIRTHDAY_CONFIG } from './config/content';
import { birthdayAudio } from './utils/audio';
import { SparklesBackground } from './components/SparklesBackground';
import { HeaderNav } from './components/HeaderNav';
import { IntroScreen } from './components/IntroScreen';
import { BirthdayReveal } from './components/BirthdayReveal';
import { PersonalMessage } from './components/PersonalMessage';
import { FinalReveal } from './components/FinalReveal';
import { PhotoModal } from './components/PhotoModal';

const LOCAL_STORAGE_PHOTO_KEY = 'viji_maam_custom_birthday_photo';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);

  // Load custom photo from localStorage if user previously uploaded one
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PHOTO_KEY);
      if (saved) {
        setCustomPhoto(saved);
      }
    } catch {
      // Ignore localStorage errors in restricted environments
    }
  }, []);

  const effectiveContent = React.useMemo(() => {
    if (!customPhoto) return BIRTHDAY_CONFIG;
    return {
      ...BIRTHDAY_CONFIG,
      photos: {
        photo1: {
          ...BIRTHDAY_CONFIG.photos.photo1,
          src: customPhoto,
        },
        photo2: {
          ...BIRTHDAY_CONFIG.photos.photo2,
          src: customPhoto,
        },
      },
    };
  }, [customPhoto]);

  const activePhoto = customPhoto || BIRTHDAY_CONFIG.photos.photo1.src;

  const handlePhotoChange = (newPhoto: string) => {
    setCustomPhoto(newPhoto);
    try {
      localStorage.setItem(LOCAL_STORAGE_PHOTO_KEY, newPhoto);
    } catch {
      // Local storage may be restricted in sandboxes
    }
  };

  const handleResetDefaultPhoto = () => {
    setCustomPhoto(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_PHOTO_KEY);
    } catch {
      // Local storage may be restricted in sandboxes
    }
  };

  const handleToggleMusic = async () => {
    await birthdayAudio.toggle((playing) => {
      setIsMusicPlaying(playing);
    });
  };

  // Screen transition handlers
  const handleNextScreen = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevScreen = () => {
    setCurrentScreen((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectScreen = (idx: number) => {
    setCurrentScreen(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentScreen(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#160714] text-[#FDF8F0] overflow-x-hidden flex flex-col justify-between selection:bg-[#D4AF37]/30 selection:text-[#FDF8F0]">
      {/* Background Sparkles & Ambient Glows */}
      <SparklesBackground />

      {/* Persistent Minimalist Top Navigation */}
      <HeaderNav
        currentScreen={currentScreen}
        totalScreens={4}
        onSelectScreen={handleSelectScreen}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
      />

      {/* Main Interactive Screen Carousel with Cinematic Transitions */}
      <main className="relative z-10 flex-1 flex items-center justify-center w-full px-2 sm:px-4 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {currentScreen === 0 && (
            <IntroScreen
              key="screen-0"
              content={effectiveContent}
              onNext={handleNextScreen}
            />
          )}

          {currentScreen === 1 && (
            <BirthdayReveal
              key="screen-1"
              content={effectiveContent}
              onNext={handleNextScreen}
              onPrev={handlePrevScreen}
            />
          )}

          {currentScreen === 2 && (
            <PersonalMessage
              key="screen-2"
              content={effectiveContent}
              onNext={handleNextScreen}
              onPrev={handlePrevScreen}
            />
          )}

          {currentScreen === 3 && (
            <FinalReveal
              key="screen-3"
              content={effectiveContent}
              onPrev={handlePrevScreen}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 w-full text-center py-4 px-4 text-xs text-[#D8C3BE]/50 flex items-center justify-center gap-2">
        <span>Designed with admiration for CEO Viji Ma’am</span>
        <span className="w-1 h-1 rounded-full bg-[#D4AF37]/60" />
        <span className="text-[#E6C687]/80">September 8</span>
      </footer>

      {/* Photo Uploader / Manager Modal */}
      <PhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhoto={activePhoto}
        onPhotoChange={handlePhotoChange}
        onResetDefault={handleResetDefaultPhoto}
        isCustomPhoto={!!customPhoto}
      />
    </div>
  );
}
