import React, { useMemo } from 'react';

export const SparklesBackground: React.FC = () => {
  // Generate a fixed array of subtle sparkling particles
  const particles = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.1 + (i % 5) * 19) % 100}%`,
      top: `${(i * 7.3 + (i % 7) * 13) % 100}%`,
      size: (i % 3) + 2, // 2px to 4px
      duration: 6 + (i % 6) * 1.5, // 6s to 15s
      delay: (i % 5) * 0.8,
      opacity: 0.2 + (i % 4) * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft luxury ambient vignette & glow radial gradients */}
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#73194B]/20 via-[#400e2b]/10 to-transparent blur-3xl" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tl from-[#541238]/25 via-[#2d091e]/15 to-transparent blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#d4af37]/5 blur-3xl" />

      {/* Floating subtle gold particle points */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#f3e5ab] shadow-[0_0_8px_#d4af37]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatSparkle ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
