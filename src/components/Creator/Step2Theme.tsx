import React from 'react';
import { WishData, ThemeId } from '../../types';
import { THEME_CONFIGS } from '../ThemeCanvas';
import { Check, Sparkles } from 'lucide-react';

interface Step2ThemeProps {
  wish: WishData;
  onChange: (updated: Partial<WishData>) => void;
  onNext: () => void;
}

export const Step2Theme: React.FC<Step2ThemeProps> = ({ wish, onChange, onNext }) => {
  const themeKeys = Object.keys(THEME_CONFIGS) as ThemeId[];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6 animate-fadeIn pb-12">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold text-white tracking-wide">
          Pick a <span className="font-script text-pink-400 font-normal">theme</span>
        </h2>
        <p className="text-sm text-pink-200/70">
          The background, glow and accent colors for the whole journey.
        </p>
      </div>

      {/* Selected Theme Live Preview Card */}
      <div className="p-4 rounded-2xl border border-pink-500/30 bg-[#160c22] shadow-xl overflow-hidden relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-pink-300">
              {THEME_CONFIGS[wish.theme].name} Preview
            </span>
          </div>
          <span className="text-xs text-pink-300/60 font-mono">
            {wish.theme}
          </span>
        </div>
        
        {/* Sample Animated Banner */}
        <div className={`w-full h-24 rounded-xl relative overflow-hidden flex items-center justify-center ${THEME_CONFIGS[wish.theme].bgClass}`}>
          <div className="text-center z-10 px-4">
            <p className="font-script text-2xl text-pink-200 drop-shadow">Happy Birthday {wish.recipientName || 'Friend'} ✨</p>
            <p className="text-[11px] text-pink-300/80 font-sans-custom">{THEME_CONFIGS[wish.theme].description}</p>
          </div>
        </div>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {themeKeys.map((themeId) => {
          const item = THEME_CONFIGS[themeId];
          const isSelected = wish.theme === themeId;

          return (
            <button
              key={themeId}
              type="button"
              onClick={() => onChange({ theme: themeId })}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[120px] ${
                isSelected
                  ? 'border-pink-500 bg-[#231233] ring-2 ring-pink-500/40 shadow-lg shadow-pink-500/20 scale-[1.02]'
                  : 'border-pink-500/20 bg-[#150b1f] hover:border-pink-500/40 hover:bg-[#1c0e2a]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center shadow">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-bold text-sm text-white">{item.name}</span>
                </div>
                <p className="text-[11px] text-pink-200/60 leading-tight line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Color Stripe indicator */}
              <div className={`w-full h-1.5 rounded-full mt-3 bg-gradient-to-r ${item.accentClass}`} />
            </button>
          );
        })}
      </div>

      <div className="text-xs text-pink-200/50 text-center leading-relaxed">
        This changes the background glow and accent colors throughout the journey.
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};
