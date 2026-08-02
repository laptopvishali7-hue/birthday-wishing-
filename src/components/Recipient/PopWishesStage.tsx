import React, { useState } from 'react';
import { WishData } from '../../types';
import { playPopSound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PopWishesStageProps {
  wish: WishData;
  onNextStage: () => void;
}

const BALLOON_COLORS = [
  'from-pink-400 to-pink-600 border-pink-300',
  'from-amber-400 to-amber-600 border-amber-300',
  'from-sky-400 to-blue-600 border-sky-300',
  'from-purple-400 to-purple-600 border-purple-300',
  'from-emerald-400 to-emerald-600 border-emerald-300',
  'from-rose-400 to-rose-600 border-rose-300',
];

export const PopWishesStage: React.FC<PopWishesStageProps> = ({ wish, onNextStage }) => {
  const wishesList = wish.wishes.length > 0 ? wish.wishes : [
    'You make my whole world brighter 🌟',
    'Thank you for every single laugh 😊'
  ];

  const [poppedSet, setPoppedSet] = useState<Set<number>>(new Set());
  const [activeRevealedWish, setActiveRevealedWish] = useState<string | null>(null);

  const handlePopBalloon = (index: number, wishText: string) => {
    if (poppedSet.has(index)) return;

    playPopSound();
    const updated = new Set(poppedSet);
    updated.add(index);
    setPoppedSet(updated);
    setActiveRevealedWish(wishText);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.5 },
    });
  };

  const allPopped = poppedSet.size === wishesList.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center animate-fadeIn relative z-10 space-y-6 max-w-lg mx-auto pb-16">
      {/* Title Header */}
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-bold text-white tracking-wide">
          Pop the Wishes 🎈
        </h2>
        <p className="text-xs text-pink-200/80">
          Tap each balloon to reveal a little wish
        </p>
      </div>

      {/* Floating Balloons Cluster */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-6 min-h-[220px]">
        {wishesList.map((wText, index) => {
          const isPopped = poppedSet.has(index);
          const colorClass = BALLOON_COLORS[index % BALLOON_COLORS.length];

          return (
            <div key={index} className="flex flex-col items-center relative">
              {!isPopped ? (
                <button
                  onClick={() => handlePopBalloon(index, wText)}
                  className="group relative cursor-pointer animate-float transition-transform active:scale-90"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {/* Balloon Oval */}
                  <div className={`w-14 h-18 sm:w-16 sm:h-20 rounded-full bg-gradient-to-b ${colorClass} border shadow-lg shadow-pink-500/20 relative flex items-center justify-center`}>
                    {/* Shine highlight */}
                    <div className="absolute top-2 left-3 w-3 h-5 bg-white/40 rounded-full blur-[1px]" />
                  </div>
                  {/* Balloon Knot & String */}
                  <div className="w-2 h-2 bg-pink-600 rounded-full mx-auto -mt-1" />
                  <div className="w-0.5 h-8 bg-white/20 mx-auto" />
                </button>
              ) : (
                <div className="w-14 h-18 flex items-center justify-center text-xl animate-ping">
                  ✨
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Popped Status Badge */}
      <div className="px-4 py-1.5 rounded-full bg-white/10 border border-pink-500/30 text-xs font-semibold text-pink-200">
        Popped {poppedSet.size}/{wishesList.length}
      </div>

      {/* Active Wish Text Banner */}
      {activeRevealedWish && (
        <div className="p-4 rounded-2xl bg-[#1a0e28] border border-pink-500/40 text-pink-100 font-semibold text-sm shadow-xl animate-fadeIn max-w-sm">
          <Sparkles className="w-4 h-4 text-amber-300 inline mr-2" />
          {activeRevealedWish}
        </div>
      )}

      {/* Continue Button */}
      <div className="pt-4">
        <button
          onClick={onNextStage}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 text-white font-bold text-base shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
