import React, { useMemo } from 'react';
import { ThemeId } from '../types';

interface ThemeCanvasProps {
  theme: ThemeId;
}

export const THEME_CONFIGS: Record<ThemeId, {
  name: string;
  description: string;
  bgClass: string;
  accentClass: string;
  glowColor: string;
  particleType: 'fireflies' | 'galaxy' | 'stars' | 'confetti' | 'hearts' | 'neon_hearts';
}> = {
  classic: {
    name: 'Classic',
    description: 'The original warm gold & pink glow, with rising fireflies.',
    bgClass: 'bg-gradient-to-b from-[#180924] via-[#12071a] to-[#0a030f]',
    accentClass: 'from-amber-400 to-pink-500',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    particleType: 'fireflies',
  },
  galaxy: {
    name: 'Galaxy',
    description: 'Deep indigo night with soft drifting violet bokeh.',
    bgClass: 'bg-gradient-to-b from-[#0e0a29] via-[#130b3a] to-[#08041d]',
    accentClass: 'from-violet-400 to-indigo-500',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    particleType: 'galaxy',
  },
  emerald: {
    name: 'Emerald',
    description: 'Cool teal night with calm twinkling stars.',
    bgClass: 'bg-gradient-to-b from-[#041d1a] via-[#072c27] to-[#02100e]',
    accentClass: 'from-emerald-400 to-teal-500',
    glowColor: 'rgba(20, 184, 166, 0.3)',
    particleType: 'stars',
  },
  frost: {
    name: 'Frost',
    description: 'Icy blue & silver, with calm twinkling stars.',
    bgClass: 'bg-gradient-to-b from-[#0a1829] via-[#0f233a] to-[#050d18]',
    accentClass: 'from-sky-300 to-blue-500',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    particleType: 'stars',
  },
  midnight: {
    name: 'Midnight',
    description: 'Deep violet-black night with rising fireflies.',
    bgClass: 'bg-gradient-to-b from-[#0f0a1c] via-[#080512] to-[#030208]',
    accentClass: 'from-purple-400 to-pink-600',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    particleType: 'fireflies',
  },
  party: {
    name: 'Party',
    description: 'Vibrant celebration with falling confetti streamers.',
    bgClass: 'bg-gradient-to-b from-[#240a24] via-[#1f0729] to-[#0f0217]',
    accentClass: 'from-pink-500 via-amber-400 to-cyan-400',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    particleType: 'confetti',
  },
  floating_hearts: {
    name: 'Floating Hearts',
    description: 'Romantic pink & red, with hearts drifting upward.',
    bgClass: 'bg-gradient-to-b from-[#2b081a] via-[#210513] to-[#12020a]',
    accentClass: 'from-rose-400 to-pink-600',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    particleType: 'hearts',
  },
  neon_hearts: {
    name: 'Neon Hearts',
    description: 'Electric magenta & cyan glow, with neon hearts drifting up.',
    bgClass: 'bg-gradient-to-b from-[#1b0826] via-[#120a2e] to-[#0a0319]',
    accentClass: 'from-fuchsia-400 to-cyan-400',
    glowColor: 'rgba(217, 70, 239, 0.35)',
    particleType: 'neon_hearts',
  },
  sparkle_hearts: {
    name: 'Sparkle Hearts',
    description: 'Warm gold & rose, with hearts twinkling as they drift up.',
    bgClass: 'bg-gradient-to-b from-[#2a111a] via-[#1f0a14] to-[#0e0308]',
    accentClass: 'from-amber-300 to-rose-400',
    glowColor: 'rgba(251, 191, 36, 0.3)',
    particleType: 'hearts',
  },
  two_hearts: {
    name: 'Two Hearts',
    description: 'Soft crimson, with paired hearts drifting up together.',
    bgClass: 'bg-gradient-to-b from-[#280a13] via-[#1b050c] to-[#0d0205]',
    accentClass: 'from-red-400 to-rose-600',
    glowColor: 'rgba(225, 29, 72, 0.35)',
    particleType: 'hearts',
  }
};

export const ThemeCanvas: React.FC<ThemeCanvasProps> = ({ theme }) => {
  const config = THEME_CONFIGS[theme] || THEME_CONFIGS.classic;

  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 17) % 100}%`,
      top: `${(i * 23) % 100}%`,
      size: `${Math.floor((i % 5) * 4) + 6}px`,
      duration: `${4 + (i % 6) * 1.5}s`,
      delay: `${(i % 5) * 0.8}s`,
      opacity: 0.2 + (i % 5) * 0.15,
    }));
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${config.bgClass} transition-colors duration-1000`}>
      {/* Background radial ambient glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 animate-pulse-glow"
        style={{ backgroundColor: config.glowColor }}
      />
      <div 
        className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 animate-pulse-glow"
        style={{ backgroundColor: config.glowColor, animationDelay: '1.5s' }}
      />

      {/* Floating Theme Particles */}
      {particles.map((p) => {
        if (config.particleType === 'hearts' || config.particleType === 'neon_hearts') {
          return (
            <div
              key={p.id}
              className="absolute text-pink-400/50 animate-float"
              style={{
                left: p.left,
                top: p.top,
                fontSize: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            >
              {config.particleType === 'neon_hearts' ? '💖' : '❤️'}
            </div>
          );
        }

        if (config.particleType === 'confetti') {
          return (
            <div
              key={p.id}
              className="absolute rounded-sm animate-float opacity-70"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: `${parseInt(p.size) * 1.5}px`,
                backgroundColor: p.id % 3 === 0 ? '#ec4899' : p.id % 3 === 1 ? '#f59e0b' : '#06b6d4',
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            />
          );
        }

        // Fireflies / Stars / Galaxy Bokeh
        return (
          <div
            key={p.id}
            className="absolute rounded-full bg-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.8)] animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        );
      })}
    </div>
  );
};
