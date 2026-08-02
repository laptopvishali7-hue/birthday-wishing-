import React, { useState } from 'react';
import { WishData } from '../../types';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';

interface MemoriesStageProps {
  wish: WishData;
  onNextStage: () => void;
}

export const MemoriesStage: React.FC<MemoriesStageProps> = ({ wish, onNextStage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const memories = wish.memories.length > 0 ? wish.memories : [
    {
      id: 'm1',
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
      caption: 'Our first adventure together 🌸'
    }
  ];

  const handleNext = () => {
    if (currentIndex < memories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onNextStage();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentItem = memories[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center animate-fadeIn relative z-10 space-y-6 max-w-md mx-auto pb-16">
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-bold text-white tracking-wide">
          Cute Memories 💕
        </h2>
        <p className="text-xs text-pink-200/70">
          Photo {currentIndex + 1} of {memories.length}
        </p>
      </div>

      {/* Polaroid Photo Card Container */}
      <div className="relative w-full flex items-center justify-center my-2">
        <div className="w-72 sm:w-80 p-4 pb-10 bg-white text-slate-900 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-1 transition-all duration-300">
          <div className="w-full h-72 bg-slate-200 rounded-sm overflow-hidden mb-4 shadow-inner relative">
            {currentItem.type === 'video' || currentItem.url?.startsWith('data:video/') || currentItem.url?.match(/\.(mp4|webm|mov)($|\?)/i) ? (
              <video
                src={currentItem.videoUrl || currentItem.url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={currentItem.url}
                alt={currentItem.caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800';
                }}
              />
            )}
          </div>

          <p className="font-handwriting text-2xl text-center text-slate-800 leading-tight px-2">
            {currentItem.caption || 'Our sweet memory'}
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-xl transition-all active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {currentIndex < memories.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-xl transition-all active:scale-90"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Slide Indicator Dots */}
      <div className="flex justify-center items-center gap-2">
        {memories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === idx ? 'w-6 bg-pink-500' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

      <p className="text-[11px] text-pink-200/50">
        -- swipe, or tap the photo --
      </p>

      {/* Next Surprise Button */}
      <div className="pt-2">
        <button
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 text-white font-bold text-base shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Next Surprise</span>
          <Gift className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
