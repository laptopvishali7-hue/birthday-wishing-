import React from 'react';
import { WishData } from '../../types';
import { User, Calendar, Lock, HelpCircle } from 'lucide-react';

interface Step1WhoForProps {
  wish: WishData;
  onChange: (updated: Partial<WishData>) => void;
  onNext: () => void;
}

export const Step1WhoFor: React.FC<Step1WhoForProps> = ({ wish, onChange, onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.recipientName.trim()) return;
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 space-y-6 animate-fadeIn">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold text-white tracking-wide">
          Who is this <span className="font-script text-pink-400 font-normal">for</span>
        </h2>
        <p className="text-sm text-pink-200/70">
          Tell us who the journey is for. Your details are kept private.
        </p>
      </div>

      <div className="space-y-4">
        {/* Recipient Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-pink-300/90 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-pink-400" />
            Birthday Person's Name *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              maxLength={150}
              value={wish.recipientName}
              onChange={(e) => onChange({ recipientName: e.target.value })}
              placeholder="Who is celebrating their birthday?"
              className="w-full px-4 py-3 bg-[#190e24] border border-pink-500/30 focus:border-pink-500 rounded-xl text-white placeholder-pink-300/30 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all font-medium text-base"
            />
            <span className="absolute right-3 bottom-2 text-[10px] text-pink-300/40">
              {wish.recipientName.length}/150
            </span>
          </div>
        </div>

        {/* Date of Birthday */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-pink-300/90 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-pink-400" />
            Date of Birthday *
          </label>
          <input
            type="date"
            required
            value={wish.birthDate}
            onChange={(e) => onChange({ birthDate: e.target.value })}
            className="w-full px-4 py-3 bg-[#190e24] border border-pink-500/30 focus:border-pink-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all font-medium text-base"
          />
        </div>

        {/* Secret PIN */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-pink-300/90 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-pink-400" />
            Secret PIN (4 Digits) *
          </label>
          <input
            type="text"
            required
            maxLength={4}
            pattern="[0-9]*"
            value={wish.pin}
            onChange={(e) => onChange({ pin: e.target.value.replace(/\D/g, '') })}
            placeholder="1234"
            className="w-full px-4 py-3 bg-[#190e24] border border-pink-500/30 focus:border-pink-500 rounded-xl text-white placeholder-pink-300/30 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all font-mono tracking-widest text-lg font-bold"
          />
        </div>

        {/* PIN Hint */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-pink-300/90 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
            PIN Hint (Optional)
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={120}
              value={wish.pinHint}
              onChange={(e) => onChange({ pinHint: e.target.value })}
              placeholder="e.g. Our anniversary (DDMM) 💖"
              className="w-full px-4 py-3 bg-[#190e24] border border-pink-500/30 focus:border-pink-500 rounded-xl text-white placeholder-pink-300/30 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all text-sm"
            />
            <span className="absolute right-3 bottom-2 text-[10px] text-pink-300/40">
              {wish.pinHint.length}/120
            </span>
          </div>
          <p className="text-[11px] text-pink-200/50 leading-relaxed pt-1">
            Shown on the lock screen so the recipient knows what to enter. Leave blank to show no hint. Avoid writing the PIN itself here.
          </p>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={!wish.recipientName.trim()}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-pink-500/25 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
        >
          Next
        </button>
      </div>
    </form>
  );
};
