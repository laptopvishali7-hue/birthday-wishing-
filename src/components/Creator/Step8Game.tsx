import React from 'react';
import { WishData, GameType } from '../../types';
import { Upload, Puzzle, Grid } from 'lucide-react';

interface Step8GameProps {
  wish: WishData;
  onChange: (updated: Partial<WishData>) => void;
  onNext: () => void;
}

export const Step8Game: React.FC<Step8GameProps> = ({ wish, onChange, onNext }) => {
  const handlePuzzleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange({ puzzleImage: e.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6 animate-fadeIn pb-12">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold text-white tracking-wide">
          Pick a <span className="font-script text-pink-400 font-normal">little game</span>
        </h2>
        <p className="text-sm text-pink-200/70">
          A quick interactive moment they solve to continue.
        </p>
      </div>

      {/* Game Type Selection */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange({ gameType: 'sliding_puzzle' })}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center gap-2 ${
            wish.gameType === 'sliding_puzzle'
              ? 'border-pink-500 bg-[#231233] ring-2 ring-pink-500/40 shadow-lg shadow-pink-500/20'
              : 'border-pink-500/20 bg-[#150b1f] hover:border-pink-500/40'
          }`}
        >
          <Puzzle className="w-6 h-6 text-pink-400" />
          <span className="font-bold text-sm text-white">🧩 Sliding Puzzle</span>
        </button>

        <button
          type="button"
          onClick={() => onChange({ gameType: 'memory_match' })}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center gap-2 ${
            wish.gameType === 'memory_match'
              ? 'border-pink-500 bg-[#231233] ring-2 ring-pink-500/40 shadow-lg shadow-pink-500/20'
              : 'border-pink-500/20 bg-[#150b1f] hover:border-pink-500/40'
          }`}
        >
          <Grid className="w-6 h-6 text-pink-400" />
          <span className="font-bold text-sm text-white">🎀 Memory Match</span>
        </button>
      </div>

      {/* Puzzle Live Preview & Image Upload */}
      {wish.gameType === 'sliding_puzzle' ? (
        <div className="p-6 rounded-2xl border border-pink-500/30 bg-[#160c22] shadow-xl space-y-4">
          <span className="text-xs font-semibold text-pink-300 block">
            🧩 Sliding Puzzle preview
          </span>

          <div className="flex flex-col items-center justify-center">
            <div className="w-48 h-48 rounded-2xl border-2 border-pink-500/40 overflow-hidden shadow-2xl relative">
              <img
                src={wish.puzzleImage || wish.memories[0]?.url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800'}
                alt="Puzzle preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="absolute inset-0 bg-black/20 grid grid-cols-3 grid-rows-3 border border-white/20 divide-x divide-y divide-white/20 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">
              PUZZLE IMAGE URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={wish.puzzleImage}
                onChange={(e) => onChange({ puzzleImage: e.target.value })}
                placeholder="https://..."
                className="flex-1 px-4 py-2.5 bg-[#12071a] border border-pink-500/30 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
              <label className="px-4 py-2.5 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 rounded-xl text-xs font-semibold text-pink-200 flex items-center gap-1.5 cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5" />
                Upload puzzle image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handlePuzzleUpload(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-pink-500/30 bg-[#160c22] text-center space-y-3">
          <p className="font-bold text-pink-200 text-sm">🎀 Memory Match Preview</p>
          <p className="text-xs text-pink-300/70 leading-relaxed max-w-md mx-auto">
            A quick flip-and-match game with 3 pairs of playful emojis (6 cards total) — no photos needed.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <div className="w-12 h-14 bg-pink-500/20 border border-pink-500/40 rounded-xl flex items-center justify-center text-xl shadow">🎂</div>
            <div className="w-12 h-14 bg-pink-500/20 border border-pink-500/40 rounded-xl flex items-center justify-center text-xl shadow">🎀</div>
            <div className="w-12 h-14 bg-pink-500/20 border border-pink-500/40 rounded-xl flex items-center justify-center text-xl shadow">🎁</div>
          </div>
        </div>
      )}

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
