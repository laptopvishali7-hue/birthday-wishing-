import React from 'react';
import { WishData, CakeTypeId } from '../../types';
import { Check } from 'lucide-react';

interface Step4CakeProps {
  wish: WishData;
  onChange: (updated: Partial<WishData>) => void;
  onNext: () => void;
}

export const CAKE_CONFIGS: Record<CakeTypeId, {
  name: string;
  desc: string;
  cakeColor: string;
  frostingColor: string;
  badge: string;
}> = {
  classic_pink: {
    name: 'Classic Pink',
    desc: 'The original strawberry frosting look.',
    cakeColor: 'bg-pink-500',
    frostingColor: 'bg-pink-300',
    badge: '🎂 Classic Pink preview',
  },
  chocolate: {
    name: 'Chocolate',
    desc: 'Rich cocoa ganache tiers.',
    cakeColor: 'bg-[#3d2314]',
    frostingColor: 'bg-[#5c3722]',
    badge: '🍫 Chocolate preview',
  },
  vanilla_cream: {
    name: 'Vanilla Cream',
    desc: 'Soft cream & white frosting.',
    cakeColor: 'bg-[#fef3c7]',
    frostingColor: 'bg-[#fffbeb]',
    badge: '🍦 Vanilla Cream preview',
  },
  rainbow_funfetti: {
    name: 'Rainbow Funfetti',
    desc: 'Pastel tiers with colorful sprinkles.',
    cakeColor: 'bg-fuchsia-400',
    frostingColor: 'bg-pink-200',
    badge: '🦄 Rainbow Funfetti preview',
  },
  red_velvet: {
    name: 'Red Velvet',
    desc: 'Deep red tiers with cream frosting.',
    cakeColor: 'bg-rose-900',
    frostingColor: 'bg-rose-200',
    badge: '❤️ Red Velvet preview',
  }
};

export const Step4Cake: React.FC<Step4CakeProps> = ({ wish, onChange, onNext }) => {
  const selectedConfig = CAKE_CONFIGS[wish.cakeType] || CAKE_CONFIGS.chocolate;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6 animate-fadeIn pb-12">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold text-white tracking-wide">
          Choose a <span className="font-script text-pink-400 font-normal">cake</span>
        </h2>
        <p className="text-sm text-pink-200/70">
          The frosting flavor for their birthday cake.
        </p>
      </div>

      {/* Visual Live Cake Interactive Preview */}
      <div className="p-6 rounded-2xl border border-pink-500/30 bg-[#160c22] shadow-xl flex flex-col items-center justify-center relative overflow-hidden min-h-[220px]">
        <span className="text-xs font-semibold text-pink-300 mb-4 self-start">
          {selectedConfig.badge}
        </span>

        {/* CSS 2-Tier Birthday Cake with Candles */}
        <div className="flex flex-col items-center animate-float">
          {/* Candles */}
          <div className="flex items-center gap-3 mb-1 z-10">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-3.5 bg-amber-300 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]" />
              <div className="w-1.5 h-6 bg-white rounded-t border-t border-amber-400" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-3.5 bg-amber-300 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]" />
              <div className="w-1.5 h-6 bg-white rounded-t border-t border-amber-400" />
            </div>
          </div>

          {/* Top Tier */}
          <div className={`w-28 h-10 ${selectedConfig.cakeColor} rounded-t-xl border-t-4 border-amber-300/40 relative flex items-center justify-center shadow-lg`}>
            <div className={`absolute top-0 inset-x-0 h-2.5 ${selectedConfig.frostingColor} rounded-t-xl`} />
            <span className="text-xs font-bold text-white/90">21</span>
          </div>

          {/* Bottom Tier */}
          <div className={`w-40 h-14 ${selectedConfig.cakeColor} rounded-t-2xl border-t-4 border-amber-300/40 relative shadow-xl`}>
            <div className={`absolute top-0 inset-x-0 h-3 ${selectedConfig.frostingColor} rounded-t-2xl`} />
          </div>

          {/* Cake Stand Base */}
          <div className="w-48 h-3 bg-amber-100 rounded-full shadow-md mt-1" />
        </div>
      </div>

      {/* Cake Flavors Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {(Object.keys(CAKE_CONFIGS) as CakeTypeId[]).map((cakeId) => {
          const cfg = CAKE_CONFIGS[cakeId];
          const isSelected = wish.cakeType === cakeId;

          return (
            <button
              key={cakeId}
              type="button"
              onClick={() => onChange({ cakeType: cakeId })}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-pink-500 bg-[#231233] ring-2 ring-pink-500/40 shadow-lg shadow-pink-500/20'
                  : 'border-pink-500/20 bg-[#150b1f] hover:border-pink-500/40'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center shadow">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
              <div>
                <p className="font-bold text-sm text-white mb-1">{cfg.name}</p>
                <p className="text-[11px] text-pink-200/60 leading-tight">{cfg.desc}</p>
              </div>
              <div className={`w-full h-2 rounded-full mt-3 ${cfg.cakeColor}`} />
            </button>
          );
        })}
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
