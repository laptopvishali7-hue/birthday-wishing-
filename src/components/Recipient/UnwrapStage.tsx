import React, { useState } from 'react';
import { WishData } from '../../types';
import { GIFT_COLOR_CONFIGS } from '../Creator/Step3GiftWrap';
import { playGiftOpenSound, ensureAudioStarted } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

interface UnwrapStageProps {
  wish: WishData;
  onOpened: () => void;
}

export const UnwrapStage: React.FC<UnwrapStageProps> = ({ wish, onOpened }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorCfg = GIFT_COLOR_CONFIGS[wish.giftColor] || GIFT_COLOR_CONFIGS.royal_gold;

  const handleOpen = () => {
    if (isOpen) return;
    ensureAudioStarted();
    setIsOpen(true);
    playGiftOpenSound();
    
    // Confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f59e0b', '#3b82f6', '#10b981'],
    });

    setTimeout(() => {
      onOpened();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn relative z-10">
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-center gap-2 text-amber-300 font-semibold text-sm">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Something special, just for you</span>
          <Sparkles className="w-4 h-4 animate-spin" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-wide">
          A surprise awaits you... 🌟
        </h1>
      </div>

      {/* Gift Box / Envelope Interactive Item */}
      <div
        onClick={handleOpen}
        className={`cursor-pointer transition-transform duration-500 active:scale-95 hover:scale-105 ${
          isOpen ? 'scale-110 opacity-80' : 'animate-float'
        }`}
      >
        {wish.giftType === '3d_box' ? (
          <div className="relative group">
            {/* Box Body */}
            <div className={`w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-gradient-to-br ${colorCfg.boxBg} shadow-[0_0_50px_rgba(236,72,153,0.4)] flex items-center justify-center relative border-2 border-white/20 transition-all`}>
              {/* Vertical Ribbon */}
              <div
                className="absolute top-0 bottom-0 w-10 shadow-lg"
                style={{ backgroundColor: colorCfg.ribbonColor }}
              />
              {/* Horizontal Ribbon */}
              <div
                className="absolute left-0 right-0 h-10 shadow-lg"
                style={{ backgroundColor: colorCfg.ribbonColor }}
              />
              {/* Top Bow */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-10">
                <div
                  className="w-12 h-12 rounded-full shadow-xl transform -rotate-45"
                  style={{ backgroundColor: colorCfg.ribbonColor }}
                />
                <div
                  className="w-12 h-12 rounded-full shadow-xl transform rotate-45"
                  style={{ backgroundColor: colorCfg.ribbonColor }}
                />
              </div>

              {isOpen && (
                <div className="absolute inset-0 flex items-center justify-center text-5xl animate-ping">
                  💖
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Sealed Envelope */
          <div className="relative group">
            <div className={`w-64 h-44 sm:w-72 sm:h-48 rounded-2xl bg-gradient-to-br ${colorCfg.boxBg} shadow-[0_0_50px_rgba(236,72,153,0.4)] border-2 border-white/20 relative flex items-center justify-center`}>
              <div className="absolute top-0 inset-x-0 h-24 border-b border-pink-500/30 bg-white/10 origin-top transform rotate-180 rounded-t-2xl" />
              <div className="w-14 h-14 rounded-full bg-rose-700 border-2 border-amber-300 shadow-2xl flex items-center justify-center z-10 text-2xl animate-pulse">
                💌
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10">
        <p className="text-sm font-semibold text-pink-200/90 tracking-wide flex items-center justify-center gap-2">
          <span>Tap the gift to open</span> 🎁
        </p>
      </div>
    </div>
  );
};
