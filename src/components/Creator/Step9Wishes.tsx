import React from 'react';
import { WishData } from '../../types';
import { Plus, X } from 'lucide-react';

interface Step9WishesProps {
  wish: WishData;
  onChange: (updated: Partial<WishData>) => void;
  onNext: () => void;
}

export const Step9Wishes: React.FC<Step9WishesProps> = ({ wish, onChange, onNext }) => {
  const handleUpdateWish = (index: number, val: string) => {
    const updated = [...wish.wishes];
    updated[index] = val;
    onChange({ wishes: updated });
  };

  const handleAddWish = () => {
    onChange({ wishes: [...wish.wishes, 'May all your dreams come true! ✨'] });
  };

  const handleRemoveWish = (index: number) => {
    if (wish.wishes.length <= 1) return;
    onChange({ wishes: wish.wishes.filter((_, i) => i !== index) });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6 animate-fadeIn pb-12">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold text-white tracking-wide">
          Pop the <span className="font-script text-pink-400 font-normal">wishes</span>
        </h2>
        <p className="text-sm text-pink-200/70">
          Tap balloons to pop them and reveal little wishes — add as many as you like.
        </p>
      </div>

      <div className="space-y-3">
        {wish.wishes.map((w, index) => (
          <div key={index} className="space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-pink-300">
              WISH {index + 1}
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={w}
                onChange={(e) => handleUpdateWish(index, e.target.value)}
                placeholder="Write a sweet wish..."
                className="flex-1 px-4 py-3 bg-[#190e24] border border-pink-500/30 focus:border-pink-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
              {wish.wishes.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveWish(index)}
                  className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddWish}
        className="w-full py-3 border-2 border-dashed border-pink-500/40 hover:border-pink-500/70 rounded-2xl text-pink-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer bg-white/5 hover:bg-white/10"
      >
        <Plus className="w-4 h-4" />
        Add wish
      </button>

      <div className="pt-2 flex justify-between items-center">
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
