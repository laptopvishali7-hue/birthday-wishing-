import React, { useState, useEffect } from 'react';
import { WishData } from '../../types';
import { ThemeCanvas } from '../ThemeCanvas';
import { UnwrapStage } from './UnwrapStage';
import { PinLockStage } from './PinLockStage';
import { CurtainsStage } from './CurtainsStage';
import { CelebrationStage } from './CelebrationStage';
import { MemoriesStage } from './MemoriesStage';
import { PopWishesStage } from './PopWishesStage';
import { PuzzleStage } from './PuzzleStage';
import { ScratchCardStage } from './ScratchCardStage';
import { LetterStage } from './LetterStage';
import { startBackgroundMusic, stopBackgroundMusic, toggleAudioMute, getMuteState } from '../../utils/audio';
import { Volume2, VolumeX, Sparkles, ArrowLeft } from 'lucide-react';

interface RecipientJourneyProps {
  wish: WishData;
  onExitPreview?: () => void;
  onCreateNew?: () => void;
}

type StageName =
  | 'unwrap'
  | 'pin_lock'
  | 'curtains'
  | 'celebration'
  | 'memories'
  | 'pop_wishes'
  | 'puzzle'
  | 'scratch_card'
  | 'letter';

export const RecipientJourney: React.FC<RecipientJourneyProps> = ({
  wish,
  onExitPreview,
  onCreateNew,
}) => {
  const [stage, setStage] = useState<StageName>('unwrap');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    startBackgroundMusic(
      wish.song,
      wish.customSongUrl,
      wish.musicDurationMinutes || 2
    );
    return () => {
      stopBackgroundMusic();
    };
  }, [wish.song, wish.customSongUrl, wish.musicDurationMinutes]);

  const handleMuteToggle = () => {
    const muted = toggleAudioMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d0614] text-white overflow-x-hidden font-sans-custom">
      {/* Background Animated Theme Canvas */}
      <ThemeCanvas theme={wish.theme} />

      {/* Floating Top Controls (Audio Mute Toggle & Exit Preview) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {onExitPreview && (
          <button
            onClick={onExitPreview}
            className="px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Edit Wish
          </button>
        )}

        <button
          onClick={handleMuteToggle}
          className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-pink-300 hover:text-white backdrop-blur-md transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-pink-400" />}
        </button>
      </div>

      {/* Stage Flow */}
      {stage === 'unwrap' && (
        <UnwrapStage
          wish={wish}
          onOpened={() => setStage(wish.pin ? 'pin_lock' : 'curtains')}
        />
      )}

      {stage === 'pin_lock' && (
        <PinLockStage
          wish={wish}
          onUnlocked={() => setStage('curtains')}
        />
      )}

      {stage === 'curtains' && (
        <CurtainsStage
          wish={wish}
          onOpened={() => setStage('celebration')}
        />
      )}

      {stage === 'celebration' && (
        <CelebrationStage
          wish={wish}
          onNextStage={() => setStage('memories')}
        />
      )}

      {stage === 'memories' && (
        <MemoriesStage
          wish={wish}
          onNextStage={() => setStage('pop_wishes')}
        />
      )}

      {stage === 'pop_wishes' && (
        <PopWishesStage
          wish={wish}
          onNextStage={() => setStage('puzzle')}
        />
      )}

      {stage === 'puzzle' && (
        <PuzzleStage
          wish={wish}
          onNextStage={() => setStage('scratch_card')}
        />
      )}

      {stage === 'scratch_card' && (
        <ScratchCardStage
          wish={wish}
          onNextStage={() => setStage('letter')}
        />
      )}

      {stage === 'letter' && (
        <LetterStage
          wish={wish}
          onFinishJourney={() => {
            if (onCreateNew) onCreateNew();
          }}
        />
      )}
    </div>
  );
};
