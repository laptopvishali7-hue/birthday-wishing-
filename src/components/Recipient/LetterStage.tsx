import React, { useState, useEffect } from 'react';
import { WishData } from '../../types';
import { RotateCcw, Heart, Sparkles, Plus } from 'lucide-react';

interface LetterStageProps {
  wish: WishData;
  onFinishJourney: () => void;
}

export const LetterStage: React.FC<LetterStageProps> = ({ wish, onFinishJourney }) => {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const letterText = `${wish.letter.greeting}\n\n${wish.letter.body}\n\n${wish.letter.signOff}`;

  const startTypewriter = () => {
    setDisplayedText('');
    setIsTyping(true);
    let idx = 0;

    const timer = setInterval(() => {
      if (idx < letterText.length) {
        setDisplayedText(letterText.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 30);
  };

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
    startTypewriter();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center animate-fadeIn relative z-10 space-y-6 max-w-lg mx-auto pb-16">
      {!envelopeOpened ? (
        /* Sealed Letter Envelope Stage */
        <div className="space-y-6 max-w-sm mx-auto">
          <div className="space-y-1">
            <h2 className="text-3xl font-display font-bold text-white tracking-wide">
              A Letter Just For You
            </h2>
            <p className="text-xs text-pink-200/80">Tap to unseal your personal letter</p>
          </div>

          <div
            onClick={handleOpenEnvelope}
            className="w-72 h-48 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-slate-800 border-2 border-amber-300 shadow-[0_20px_50px_rgba(236,72,153,0.3)] relative flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform active:scale-95 animate-float"
          >
            <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg text-xl mb-2">
              💌
            </div>
            <p className="font-handwriting text-xl text-slate-800 font-bold">Tap to open 💖</p>
          </div>
        </div>
      ) : (
        /* Opened Vintage Handwritten Letter Paper Stage */
        <div className="w-full space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h2 className="text-2xl font-display font-bold text-white tracking-wide flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              A Letter Just For You
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h2>
          </div>

          {/* Paper Container */}
          <div className="w-full p-6 sm:p-8 bg-[#180e22] border-2 border-pink-500/30 rounded-3xl shadow-2xl text-left space-y-4 font-handwriting text-2xl text-amber-100 leading-relaxed max-h-[60vh] overflow-y-auto no-scrollbar relative">
            <div className="whitespace-pre-wrap">
              {displayedText}
              {isTyping && <span className="animate-pulse text-pink-400">|</span>}
            </div>
          </div>

          {/* Letter Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={startTypewriter}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-pink-500/30 text-xs font-semibold text-pink-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Watch it again
            </button>

            <button
              onClick={onFinishJourney}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Create a Birthday Wish for a Friend
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
