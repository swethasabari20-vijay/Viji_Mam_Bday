import React, { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';

interface CEOPhotoFrameProps {
  src: string;
  alt?: string;
  size?: 'standard' | 'large' | 'compact';
  priority?: boolean;
  celebrating?: boolean;
  objectPosition?: string;
  subtitle?: string;
}

export const CEOPhotoFrame: React.FC<CEOPhotoFrameProps> = ({
  src,
  alt = "CEO Viji Ma'am",
  size = 'standard',
  celebrating = false,
  objectPosition = '50% 18%',
  subtitle,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Responsive size classes designed to fit small mobile screens, tablets, and desktops
  const sizeClasses = {
    compact: 'w-[190px] h-[245px] sm:w-[220px] sm:h-[285px] max-w-[80vw]',
    standard: 'w-[230px] h-[300px] sm:w-[280px] sm:h-[365px] md:w-[320px] md:h-[415px] max-w-[85vw]',
    large: 'w-[250px] h-[325px] sm:w-[320px] sm:h-[415px] md:w-[360px] md:h-[470px] max-w-[88vw]',
  }[size];

  return (
    <>
      <div className="relative mx-auto flex flex-col items-center justify-center group select-none">
        {/* Outer ambient golden aura / glow */}
        <div
          className={`absolute inset-0 rounded-[28px] blur-xl transition-all duration-700 pointer-events-none ${
            celebrating
              ? 'bg-gradient-to-tr from-[#D4AF37]/60 via-[#F3E5AB]/40 to-[#E8B4B8]/50 scale-105 opacity-100 animate-pulse'
              : 'bg-gradient-to-tr from-[#D4AF37]/25 via-[#E6C687]/15 to-transparent opacity-80 group-hover:opacity-100 group-hover:scale-102'
          }`}
        />

        {/* Main Luxury Frame Structure */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsLightboxOpen(true)}
          title="Click to view full photo"
          className={`relative ${sizeClasses} cursor-pointer rounded-[26px] p-1.5 bg-gradient-to-b from-[#E6C687]/70 via-[#8C6B1B]/35 to-[#D4AF37]/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_20px_45px_rgba(212,175,55,0.25)] hover:scale-[1.015] active:scale-[0.99]`}
        >
          {/* Inner Border Inset */}
          <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#1D0717] border border-[#F3E5AB]/35 shadow-inner">
            {/* Shimmer loading skeleton */}
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 bg-[#2D0D26] animate-pulse flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#D4AF37]/40 animate-spin" />
              </div>
            )}

            {/* Actual Photo */}
            {!hasError ? (
              <img
                src={src}
                alt={alt}
                referrerPolicy="no-referrer"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                style={{ objectPosition }}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                } ${celebrating ? 'scale-102 filter contrast-[1.03] brightness-[1.02]' : 'group-hover:scale-103'}`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#25091F]">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3 border border-[#D4AF37]/30">
                  <Sparkles className="w-8 h-8 text-[#E6C687]" />
                </div>
                <p className="text-sm font-serif text-[#F3E5AB]">Viji Ma’am</p>
                <p className="text-xs text-[#D8C3BE]/70 mt-1">Photo loading error</p>
              </div>
            )}

            {/* Tap to expand hint (subtle hover pill) */}
            <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-[#F3E5AB] border border-[#D4AF37]/40">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>

            {/* Subtle gradient vignette at the bottom of the photo to blend with the frame */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1F0819]/60 via-[#1F0819]/20 to-transparent pointer-events-none" />

            {/* Delicate inner gold hairline edge */}
            <div className="absolute inset-0 rounded-[22px] border border-[#D4AF37]/25 pointer-events-none" />
          </div>

          {/* Decorative Luxury Corner Accents */}
          <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#F3E5AB] rounded-tl-sm pointer-events-none" />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#F3E5AB] rounded-tr-sm pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#F3E5AB] rounded-bl-sm pointer-events-none" />
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#F3E5AB] rounded-br-sm pointer-events-none" />
        </div>

        {/* Optional caption / subtitle */}
        {subtitle && (
          <p className="mt-2.5 text-[11px] sm:text-xs text-[#E6C687]/80 font-medium tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>{subtitle}</span>
          </p>
        )}
      </div>

      {/* High-Resolution Full-Photo Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[90vh] flex flex-col items-center bg-[#1F0819] border border-[#D4AF37]/40 rounded-3xl p-3 sm:p-5 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-[#FDF8F0] hover:text-[#F3E5AB] hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Uncropped Full Photo */}
            <div className="relative max-h-[78vh] rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
              <img
                src={src}
                alt={alt}
                className="w-auto h-auto max-h-[75vh] max-w-full object-contain mx-auto"
              />
            </div>

            {/* Footer Caption */}
            <div className="mt-3 text-center">
              <p className="text-sm font-serif-luxury text-[#F3E5AB]">{alt}</p>
              <p className="text-[11px] text-[#D8C3BE]/70">Tap outside or close to return</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
