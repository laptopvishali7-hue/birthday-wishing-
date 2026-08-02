import React from 'react';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

interface WizardHeaderProps {
  currentStep: number;
  totalSteps: number;
  onGoHome: () => void;
  onBack: () => void;
}

export const WizardHeader: React.FC<WizardHeaderProps> = ({
  currentStep,
  totalSteps,
  onGoHome,
  onBack,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-4 pb-2 sticky top-0 z-30 bg-[#0f0814]/90 backdrop-blur-md border-b border-pink-500/10">
      <div className="flex items-center justify-between mb-3">
        {currentStep > 1 ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-pink-200/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-pink-500/20 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-pink-200/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-pink-500/20 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        )}

        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-pink-300 uppercase">
            Step {currentStep} / {totalSteps} · {percentage}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
