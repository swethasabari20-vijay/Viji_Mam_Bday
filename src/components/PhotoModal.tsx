import React, { useRef, useState } from 'react';
import { X, Upload, RotateCcw, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/content';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhoto: string;
  onPhotoChange: (newPhotoUrl: string) => void;
  onResetDefault: () => void;
  isCustomPhoto: boolean;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  onPhotoChange,
  onResetDefault,
  isCustomPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onPhotoChange(result);
        setSuccessMsg("Custom photo set!");
        setTimeout(() => setSuccessMsg(null), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPredefined = (src: string, label: string) => {
    onPhotoChange(src);
    setSuccessMsg(`Switched to ${label}!`);
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#23091E] border border-[#D4AF37]/35 rounded-3xl p-6 shadow-2xl text-[#FDF8F0] max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#D8C3BE] hover:text-[#FDF8F0] hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#E6C687] border border-[#D4AF37]/30">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-luxury text-lg font-medium text-[#F3E5AB]">Viji Ma'am's Portraits</h3>
            <p className="text-xs text-[#D8C3BE]/70">2 Authentic Photographs Included in App</p>
          </div>
        </div>

        {/* Dual Pre-configured Photos Grid */}
        <p className="text-xs font-semibold text-[#E6C687]/90 uppercase tracking-wider mb-2.5">
          Available Project Photos:
        </p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Photo 1: Executive Portrait */}
          <div
            onClick={() => handleSelectPredefined(BIRTHDAY_CONFIG.photos.photo1.src, "Executive Portrait")}
            className="group relative cursor-pointer rounded-2xl p-2.5 bg-[#170514] border border-[#D4AF37]/30 hover:border-[#F3E5AB] transition-all hover:bg-[#20081B] flex flex-col items-center text-center"
          >
            <div className="w-full h-36 rounded-xl overflow-hidden mb-2 border border-[#D4AF37]/20 shadow-inner">
              <img
                src={BIRTHDAY_CONFIG.photos.photo1.src}
                alt="Executive Portrait"
                className="w-full h-full object-cover object-[50%_18%] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-xs font-medium text-[#F3E5AB]">Photo 1: Executive</p>
            <p className="text-[10px] text-[#D8C3BE]/70 mt-0.5">Corporate blazer (Screen 2)</p>
          </div>

          {/* Photo 2: Celebration Portrait */}
          <div
            onClick={() => handleSelectPredefined(BIRTHDAY_CONFIG.photos.photo2.src, "Celebration Portrait")}
            className="group relative cursor-pointer rounded-2xl p-2.5 bg-[#170514] border border-[#D4AF37]/30 hover:border-[#F3E5AB] transition-all hover:bg-[#20081B] flex flex-col items-center text-center"
          >
            <div className="w-full h-36 rounded-xl overflow-hidden mb-2 border border-[#D4AF37]/20 shadow-inner">
              <img
                src={BIRTHDAY_CONFIG.photos.photo2.src}
                alt="Celebration Portrait"
                className="w-full h-full object-cover object-[50%_14%] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-xs font-medium text-[#F3E5AB]">Photo 2: Celebration</p>
            <p className="text-[10px] text-[#D8C3BE]/70 mt-0.5">Festive saree (Screen 4)</p>
          </div>
        </div>

        {successMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-center gap-1.5 font-medium">
            <Check className="w-4 h-4" /> {successMsg}
          </div>
        )}

        {/* Upload / Replace Actions */}
        <div className="space-y-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59E30] hover:from-[#E6C687] hover:to-[#D4AF37] text-[#1F0819] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Another Photo from Device</span>
          </button>

          {isCustomPhoto && (
            <button
              onClick={() => {
                onResetDefault();
                setSuccessMsg("Reset to default photos!");
                setTimeout(() => setSuccessMsg(null), 2500);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-[#E6C687] border border-[#D4AF37]/25 text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default Both Photos</span>
            </button>
          )}
        </div>

        {/* Note */}
        <div className="mt-4 pt-3.5 border-t border-white/10 text-[11px] text-[#D8C3BE]/60 space-y-1">
          <p className="flex items-center gap-1 text-[#E6C687]">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Both photos render with responsive framing across all devices.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
