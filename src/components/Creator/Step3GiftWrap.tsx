import React from 'react';
import { WishData, GiftType, GiftColorId } from '../../types';
import { Check, Gift, Mail } from 'lucide-react';

interface Step3GiftWrapProps {
  wish: WishData;
  onChange: (updated: Partial<WishData>) => void;
  onNext: () => void;
}

export const GIFT_COLOR_CONFIGS: Record<GiftColorId, {
  name: string;
  desc: string;
  boxBg: string;
  ribbonColor: string;
  badge: string;
}> = {
  classic_pink: {
    name: 'Classic Pink',
    desc: 'The original hot-pink wrap with a gold bow.',
    boxBg: 'from-pink-500 to-rose-600',
    ribbonColor: '#f59e0b',
    badge: '🎁 Classic Pink preview',
  },
  royal_gold: {
    name: 'Royal Gold',
    desc: 'Deep navy box wrapped in a shimmering gold ribbon.',
    boxBg: 'from-slate-900 to-indigo-950',
    ribbonColor: '#fbbf24',
    badge: '👑 Royal Gold preview',
  },
  mint_silver: {
    name: 'Mint & Silver',
    desc: 'Soft mint green box with a cool silver bow.',
    boxBg: 'from-teal-600 to-emerald-800',
    ribbonColor: '#e2e8f0',
    badge: '💚 Mint & Silver preview',
  },
  rainbow_pop: {
    name: 'Rainbow Pop',
    desc: 'A different bright color on every face, white bow.',
    boxBg: 'from-fuchsia-500 via-purple-500 to-pink-500',
    ribbonColor: '#ffffff',
    badge: '🌈 Rainbow Pop preview',
  },
  classic_cream: {
    name: 'Classic Cream',
    desc: 'Warm cream paper with a deep red wax seal.',
    boxBg: 'from-amber-100 to-amber-200',
    ribbonColor: '#9f1239',
    badge: '💌 Classic Cream preview',
  },
  rose_gold: {
    name: 'Rose Gold',
    desc: 'Blush pink paper with shimmering rose-gold seal.',
    boxBg: 'from-rose-300 to-pink-400',
    ribbonColor: '#be123c',
    badge: '🌸 Rose Gold preview',
  }
};

export const Step3GiftWrap: React.FC<Step3GiftWrapProps> = ({ wish, onChange, onNext }) => {
  const selectedConfig = GIFT_COLOR_CONFIGS[wish.giftColor] || GIFT_COLOR_CONFIGS.royal_gold;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6 animate-fadeIn pb-12">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold text-white tracking-wide">
          Pick a <span className="font-script text-pink-400 font-normal">gift wrap</span>
        </h2>
        <p className="text-sm text-pink-200/70">
          The gift they unwrap first — a 3D box or an envelope — and its colors.
        </p>
      </div>

      {/* Gift Type Switcher */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">GIFT TYPE</label>
        <div className="flex gap-2 p-1.5 bg-[#160c22] border border-pink-500/20 rounded-xl">
          <button
            type="button"
            onClick={() => onChange({ giftType: '3d_box' })}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              wish.giftType === '3d_box'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md font-semibold'
                : 'text-pink-200/60 hover:text-white'
            }`}
          >
            <Gift className="w-4 h-4" />
            3D Gift Box
          </button>
          <button
            type="button"
            onClick={() => onChange({ giftType: 'envelope' })}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              wish.giftType === 'envelope'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md font-semibold'
                : 'text-pink-200/60 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            Envelope
          </button>
        </div>
      </div>

      {/* Visual Live Gift Box / Envelope Interactive Preview Card */}
      <div className="p-6 rounded-2xl border border-pink-500/30 bg-[#160c22] shadow-xl flex flex-col items-center justify-center relative overflow-hidden min-h-[220px]">
        <span className="text-xs font-semibold text-pink-300 mb-4 self-start">
          {selectedConfig.badge}
        </span>

        {wish.giftType === '3d_box' ? (
          /* 3D Rendered CSS Gift Box */
          <div className="relative group cursor-pointer animate-float">
            <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${selectedConfig.boxBg} shadow-2xl shadow-pink-500/30 flex items-center justify-center relative border border-white/20`}>
              {/* Vertical Ribbon */}
              <div 
                className="absolute top-0 bottom-0 w-6 shadow-md"
                style={{ backgroundColor: selectedConfig.ribbonColor }}
              />
              {/* Horizontal Ribbon */}
              <div 
                className="absolute left-0 right-0 h-6 shadow-md"
                style={{ backgroundColor: selectedConfig.ribbonColor }}
              />
              {/* Top Bow */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 z-10">
                <div 
                  className="w-7 h-7 rounded-full shadow-md transform -rotate-45"
                  style={{ backgroundColor: selectedConfig.ribbonColor }}
                />
                <div 
                  className="w-7 h-7 rounded-full shadow-md transform rotate-45"
                  style={{ backgroundColor: selectedConfig.ribbonColor }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Vintage Sealed Envelope */
          <div className="relative animate-float">
            <div className={`w-40 h-28 rounded-xl bg-gradient-to-br ${selectedConfig.boxBg} shadow-2xl shadow-pink-500/30 border border-white/20 relative flex items-center justify-center overflow-hidden`}>
              {/* Envelope V Flap */}
              <div className="absolute top-0 inset-x-0 h-14 border-b border-pink-500/30 bg-white/10 origin-top transform rotate-180 rounded-t-xl" />
              {/* Red Wax Seal */}
              <div className="w-10 h-10 rounded-full bg-rose-700 border-2 border-amber-300 shadow-lg flex items-center justify-center z-10 text-white font-serif text-xs font-bold">
                💌
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gift Color Presets */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {(Object.keys(GIFT_COLOR_CONFIGS) as GiftColorId[]).map((colorId) => {
          const cfg = GIFT_COLOR_CONFIGS[colorId];
          const isSelected = wish.giftColor === colorId;

          return (
            <button
              key={colorId}
              type="button"
              onClick={() => onChange({ giftColor: colorId })}
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
              <div className={`w-full h-2 rounded-full mt-3 bg-gradient-to-r ${cfg.boxBg}`} />
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
