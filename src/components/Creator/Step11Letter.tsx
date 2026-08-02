import React from 'react';
import { WishData } from '../../types';
import { getUserProfile } from '../../utils/userAuth';
import { Sparkles, UserCheck } from 'lucide-react';

interface Step11LetterProps {
  wish: WishData;
  onChange: (updated: Partial<WishData>) => void;
  onFinish: () => void;
  onPreview: () => void;
}

export const Step11Letter: React.FC<Step11LetterProps> = ({
  wish,
  onChange,
  onFinish,
  onPreview,
}) => {
  const currentUser = getUserProfile();

  const handleApplySignature = () => {
    if (currentUser?.signature) {
      onChange({
        letter: { ...wish.letter, signOff: currentUser.signature },
      });
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6 animate-fadeIn pb-12">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold text-white tracking-wide">
          A handwritten <span className="font-script text-pink-400 font-normal">letter</span>
        </h2>
        <p className="text-sm text-pink-200/70">
          The final letter — typed out one character at a time, in handwriting.
        </p>
      </div>

      <div className="space-y-4">
        {/* Greeting */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">
            GREETING
          </label>
          <input
            type="text"
            value={wish.letter.greeting}
            onChange={(e) =>
              onChange({
                letter: { ...wish.letter, greeting: e.target.value },
              })
            }
            placeholder="My dearest,"
            className="w-full px-4 py-3 bg-[#190e24] border border-pink-500/30 focus:border-pink-500 rounded-xl text-white text-base focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
        </div>

        {/* Body */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">
            BODY (ONE PARAGRAPH PER LINE)
          </label>
          <textarea
            rows={7}
            value={wish.letter.body}
            onChange={(e) =>
              onChange({
                letter: { ...wish.letter, body: e.target.value },
              })
            }
            placeholder="On this very special day, I want you to know how deeply you are loved..."
            className="w-full px-4 py-3 bg-[#190e24] border border-pink-500/30 focus:border-pink-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 leading-relaxed font-sans"
          />
        </div>

        {/* Sign-Off */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">
              SIGN-OFF
            </label>

            {currentUser && (
              <button
                type="button"
                onClick={handleApplySignature}
                className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30 transition-all cursor-pointer"
              >
                <UserCheck className="w-3 h-3 text-amber-400" />
                <span>Use My Signature ("{currentUser.signature}")</span>
              </button>
            )}
          </div>

          <input
            type="text"
            value={wish.letter.signOff}
            onChange={(e) =>
              onChange({
                letter: { ...wish.letter, signOff: e.target.value },
              })
            }
            placeholder="Forever yours, with all my heart 💖"
            className="w-full px-4 py-3 bg-[#190e24] border border-pink-500/30 focus:border-pink-500 rounded-xl text-white text-base focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
        </div>

        {/* Handwriting Live Preview */}
        <div className="p-5 rounded-2xl border border-pink-500/30 bg-[#160c22] space-y-2">
          <span className="text-xs font-semibold text-pink-300 block">
            ✍️ Handwriting Font Live Preview
          </span>
          <div className="p-4 rounded-xl bg-amber-50/5 text-amber-100 font-handwriting text-2xl leading-relaxed space-y-2 border border-amber-300/10">
            <p className="font-semibold text-pink-300">{wish.letter.greeting || 'My dearest,'}</p>
            <p className="opacity-90">{wish.letter.body.slice(0, 120)}...</p>
            <p className="font-semibold text-pink-300 text-right pt-2">{wish.letter.signOff || 'With love,'}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPreview}
          className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-pink-500/30 text-white font-semibold text-sm transition-all cursor-pointer"
        >
          Preview
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 text-white font-bold shadow-lg shadow-pink-500/30 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          Create 🎉
        </button>
      </div>
    </div>
  );
};
