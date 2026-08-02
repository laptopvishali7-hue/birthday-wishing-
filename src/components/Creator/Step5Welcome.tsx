import React from 'react';
import { WishData } from '../../types';

interface Step5WelcomeProps {
  wish: WishData;
  onChange: (updated: Partial<WishData>) => void;
  onNext: () => void;
}

export const Step5Welcome: React.FC<Step5WelcomeProps> = ({ wish, onChange, onNext }) => {
  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-6 animate-fadeIn">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold text-white tracking-wide">
          Their first <span className="font-script text-pink-400 font-normal">welcome</span>
        </h2>
        <p className="text-sm text-pink-200/70">
          The opening line they will see when the curtains part.
        </p>
      </div>

      <div className="space-y-4">
        {/* Intro Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">
            INTRO TITLE
          </label>
          <input
            type="text"
            value={wish.introTitle}
            onChange={(e) => onChange({ introTitle: e.target.value })}
            placeholder="There's something special I want to tell you..."
            className="w-full px-4 py-3 bg-[#190e24] border border-pink-500/30 focus:border-pink-500 rounded-xl text-white placeholder-pink-300/30 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all font-medium text-base"
          />
        </div>

        {/* Intro Subtitle */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">
            INTRO SUBTITLE
          </label>
          <input
            type="text"
            value={wish.introSubtitle}
            onChange={(e) => onChange({ introSubtitle: e.target.value })}
            placeholder="You are very special friends 💖"
            className="w-full px-4 py-3 bg-[#190e24] border border-pink-500/30 focus:border-pink-500 rounded-xl text-white placeholder-pink-300/30 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all font-medium text-base"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-between items-center">
        <button
          type="button"
          onClick={onNext}
          className="text-xs font-semibold text-pink-300/70 hover:text-white transition-colors"
        >
          Skip
        </button>
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
