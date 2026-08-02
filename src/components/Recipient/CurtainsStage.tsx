import React, { useState } from 'react';
import { WishData } from '../../types';
import { Sparkles } from 'lucide-react';

interface CurtainsStageProps {
  wish: WishData;
  onOpened: () => void;
}

export const CurtainsStage: React.FC<CurtainsStageProps> = ({ wish, onOpened }) => {
  const [curtainsParted, setCurtainsParted] = useState(false);

  const handleOpenCurtains = () => {
    setCurtainsParted(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 text-center z-10">
      {/* Red Velvet Left Curtain */}
      <div
        className={`fixed inset-y-0 left-0 w-1/2 bg-gradient-to-r from-red-950 via-rose-900 to-red-800 z-30 transition-transform duration-1000 ease-in-out border-r-4 border-amber-400/40 shadow-2xl flex items-center justify-end ${
          curtainsParted ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="w-12 h-full bg-black/20 opacity-50" />
      </div>

      {/* Red Velvet Right Curtain */}
      <div
        className={`fixed inset-y-0 right-0 w-1/2 bg-gradient-to-l from-red-950 via-rose-900 to-red-800 z-30 transition-transform duration-1000 ease-in-out border-l-4 border-amber-400/40 shadow-2xl flex items-center justify-start ${
          curtainsParted ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="w-12 h-full bg-black/20 opacity-50" />
      </div>

      {/* Curtain Center Tap Button */}
      {!curtainsParted && (
        <button
          onClick={handleOpenCurtains}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 border-2 border-amber-300 text-white font-bold text-sm shadow-2xl flex items-center gap-2 cursor-pointer animate-pulse transition-transform active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          Open
        </button>
      )}

      {/* Main Content behind curtains */}
      <div className={`space-y-6 max-w-md mx-auto transition-all duration-1000 ${curtainsParted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mx-auto text-3xl shadow-xl animate-float">
          🐻
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
            {wish.introTitle || "There's something special I want to tell you..."}
          </h2>
          <p className="text-sm font-semibold text-pink-300">
            {wish.introSubtitle || "You are very special friends 💖"}
          </p>
        </div>

        <button
          onClick={onOpened}
          className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 text-white font-bold text-base shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <span>Continue</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
