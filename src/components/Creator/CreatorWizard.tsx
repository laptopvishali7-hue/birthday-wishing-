import React, { useState } from 'react';
import { WishData } from '../../types';
import { WizardHeader } from './WizardHeader';
import { Step1WhoFor } from './Step1WhoFor';
import { Step2Theme } from './Step2Theme';
import { Step3GiftWrap } from './Step3GiftWrap';
import { Step4Cake } from './Step4Cake';
import { Step5Welcome } from './Step5Welcome';
import { Step6Music } from './Step6Music';
import { Step7Memories } from './Step7Memories';
import { Step8Game } from './Step8Game';
import { Step9Wishes } from './Step9Wishes';
import { Step10ScratchCard } from './Step10ScratchCard';
import { Step11Letter } from './Step11Letter';
import { PublishModal } from './PublishModal';

interface CreatorWizardProps {
  initialWish: WishData;
  onGoHome: () => void;
  onPlayFullPreview: (wish: WishData) => void;
}

export const CreatorWizard: React.FC<CreatorWizardProps> = ({
  initialWish,
  onGoHome,
  onPlayFullPreview,
}) => {
  const [wish, setWish] = useState<WishData>(initialWish);
  const [step, setStep] = useState(1);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const totalSteps = 11;

  const handleUpdate = (partial: Partial<WishData>) => {
    setWish((prev) => ({ ...prev, ...partial }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowPublishModal(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0814] text-white font-sans-custom relative z-10 pb-16">
      {/* Wizard Header Progress Bar */}
      <WizardHeader
        currentStep={step}
        totalSteps={totalSteps}
        onGoHome={onGoHome}
        onBack={handleBack}
      />

      {/* Steps Content Router */}
      <div className="pt-2">
        {step === 1 && (
          <Step1WhoFor wish={wish} onChange={handleUpdate} onNext={handleNext} />
        )}
        {step === 2 && (
          <Step2Theme wish={wish} onChange={handleUpdate} onNext={handleNext} />
        )}
        {step === 3 && (
          <Step3GiftWrap wish={wish} onChange={handleUpdate} onNext={handleNext} />
        )}
        {step === 4 && (
          <Step4Cake wish={wish} onChange={handleUpdate} onNext={handleNext} />
        )}
        {step === 5 && (
          <Step5Welcome wish={wish} onChange={handleUpdate} onNext={handleNext} />
        )}
        {step === 6 && (
          <Step6Music wish={wish} onChange={handleUpdate} onNext={handleNext} />
        )}
        {step === 7 && (
          <Step7Memories wish={wish} onChange={handleUpdate} onNext={handleNext} />
        )}
        {step === 8 && (
          <Step8Game wish={wish} onChange={handleUpdate} onNext={handleNext} />
        )}
        {step === 9 && (
          <Step9Wishes wish={wish} onChange={handleUpdate} onNext={handleNext} />
        )}
        {step === 10 && (
          <Step10ScratchCard wish={wish} onChange={handleUpdate} onNext={handleNext} />
        )}
        {step === 11 && (
          <Step11Letter
            wish={wish}
            onChange={handleUpdate}
            onPreview={() => onPlayFullPreview(wish)}
            onFinish={() => setShowPublishModal(true)}
          />
        )}
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <PublishModal
          wish={wish}
          onClose={() => setShowPublishModal(false)}
          onPlayFullPreview={() => {
            setShowPublishModal(false);
            onPlayFullPreview(wish);
          }}
        />
      )}
    </div>
  );
};
