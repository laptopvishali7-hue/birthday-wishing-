import React, { useState } from 'react';
import { WishData } from '../../types';
import { playKeypadClickSound } from '../../utils/audio';
import { Lock, KeyRound, HelpCircle, Delete } from 'lucide-react';

interface PinLockStageProps {
  wish: WishData;
  onUnlocked: () => void;
}

export const PinLockStage: React.FC<PinLockStageProps> = ({ wish, onUnlocked }) => {
  const [pinDigits, setPinDigits] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handlePressNum = (num: string) => {
    if (pinDigits.length >= 4) return;
    playKeypadClickSound();
    const updated = [...pinDigits, num];
    setPinDigits(updated);

    if (updated.length === 4) {
      const entered = updated.join('');
      if (entered === wish.pin) {
        setTimeout(() => {
          onUnlocked();
        }, 300);
      } else {
        // Wrong PIN
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
          setPinDigits([]);
        }, 600);
      }
    }
  };

  const handleDelete = () => {
    if (pinDigits.length === 0) return;
    playKeypadClickSound();
    setPinDigits(pinDigits.slice(0, -1));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn relative z-10 select-none">
      <div className="w-full max-w-xs space-y-6">
        {/* Clock header */}
        <div className="space-y-1">
          <p className="text-5xl font-extralight text-white font-mono tracking-tight">19:53</p>
          <p className="text-xs font-semibold text-pink-300 flex items-center justify-center gap-1">
            Birthday Surprise 💖
          </p>
        </div>

        {/* Lock Icon & Instruction */}
        <div className={`space-y-3 transition-transform ${isShaking ? 'animate-bounce text-rose-400' : ''}`}>
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-pink-500/30 flex items-center justify-center mx-auto text-amber-300 shadow-xl">
            <Lock className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-pink-200">
            Enter the secret code 🔐
          </p>

          {/* Hint Badge */}
          {wish.pinHint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-amber-300 hover:text-amber-200 flex items-center justify-center gap-1 mx-auto bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {showHint ? wish.pinHint : '💡 Need a hint?'}
            </button>
          )}
        </div>

        {/* Digit Dots Indicator */}
        <div className="flex justify-center items-center gap-4 py-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                pinDigits.length > i
                  ? 'bg-pink-500 border-pink-400 scale-110 shadow-[0_0_10px_#ec4899]'
                  : 'bg-white/10 border-white/30'
              }`}
            />
          ))}
        </div>

        {/* Keypad Grid 3x4 */}
        <div className="grid grid-cols-3 gap-3.5 pt-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handlePressNum(num)}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 active:bg-pink-500 border border-white/15 text-white font-semibold text-2xl flex items-center justify-center mx-auto transition-all active:scale-90 shadow-md"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handlePressNum('0')}
            className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 active:bg-pink-500 border border-white/15 text-white font-semibold text-2xl flex items-center justify-center mx-auto transition-all active:scale-90 shadow-md"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-pink-300 flex items-center justify-center mx-auto transition-all active:scale-90"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
