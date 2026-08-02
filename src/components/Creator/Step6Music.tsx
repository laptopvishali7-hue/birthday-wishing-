import React, { useState } from 'react';
import { WishData, SongId } from '../../types';
import { startBackgroundMusic, stopBackgroundMusic } from '../../utils/audio';
import { Play, Square, Music, Volume2 } from 'lucide-react';

interface Step6MusicProps {
  wish: WishData;
  onChange: (updated: Partial<WishData>) => void;
  onNext: () => void;
}

export const SONG_OPTIONS: Record<SongId, {
  name: string;
  desc: string;
  badge: string;
}> = {
  dooron_dooron: {
    name: 'Dooron Dooron Main',
    desc: 'The original default melodic track.',
    badge: '🎂 Dooron Dooron Main selected',
  },
  soft_warm: {
    name: 'Soft & Warm',
    desc: 'A soft, warm alternative tune.',
    badge: '🎹 Soft & Warm selected',
  },
  gentle_upbeat: {
    name: 'Gentle & Upbeat',
    desc: 'A gentle, cheerful upbeat track.',
    badge: '🎻 Gentle & Upbeat selected',
  },
  custom: {
    name: 'Custom Song',
    desc: 'Your own direct audio link (mp3, m4a, ogg).',
    badge: '🎧 Custom song selected',
  }
};

export const Step6Music: React.FC<Step6MusicProps> = ({ wish, onChange, onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = (songId: SongId) => {
    if (isPlaying) {
      stopBackgroundMusic();
      setIsPlaying(false);
    } else {
      startBackgroundMusic(songId === 'custom' ? 'soft_warm' : songId);
      setIsPlaying(true);
    }
  };

  const selectedOption = SONG_OPTIONS[wish.song] || SONG_OPTIONS.soft_warm;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6 animate-fadeIn pb-12">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold text-white tracking-wide">
          Set the <span className="font-script text-pink-400 font-normal">mood</span>
        </h2>
        <p className="text-sm text-pink-200/70">
          Add a song that plays softly through the whole journey.
        </p>
      </div>

      {/* Selected Song Active Badge */}
      <div className="p-4 rounded-2xl border border-pink-500/30 bg-[#160c22] shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shadow">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="font-bold text-sm text-white">{selectedOption.badge}</p>
            <p className="text-xs text-pink-200/60">{selectedOption.desc}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleTogglePlay(wish.song)}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-pink-500/30 text-xs font-semibold text-pink-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
        >
          {isPlaying ? <Square className="w-3.5 h-3.5 fill-pink-400 text-pink-400" /> : <Play className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />}
          {isPlaying ? 'Pause' : 'Test Audio'}
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">
          CHOOSE A SONG
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.keys(SONG_OPTIONS) as SongId[]).map((songId) => {
            const opt = SONG_OPTIONS[songId];
            const isSelected = wish.song === songId;

            return (
              <button
                key={songId}
                type="button"
                onClick={() => {
                  onChange({ song: songId });
                  if (isPlaying) {
                    stopBackgroundMusic();
                    startBackgroundMusic(songId === 'custom' ? 'soft_warm' : songId);
                  }
                }}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative flex items-start gap-3 ${
                  isSelected
                    ? 'border-pink-500 bg-[#231233] ring-2 ring-pink-500/40 shadow-lg shadow-pink-500/20'
                    : 'border-pink-500/20 bg-[#150b1f] hover:border-pink-500/40'
                }`}
              >
                <div className={`p-2 rounded-xl text-white ${isSelected ? 'bg-pink-500' : 'bg-white/5'}`}>
                  <Music className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-white">{opt.name}</p>
                  <p className="text-[11px] text-pink-200/60 leading-tight mt-0.5">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Music Duration Selector (0.5 minute to 4 minutes) */}
      <div className="space-y-2 p-4 rounded-2xl border border-pink-500/30 bg-[#160c22] shadow-xl">
        <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">
          BACKGROUND MUSIC DURATION (0.5 MINUTE TO 4 MINUTES)
        </label>
        <p className="text-xs text-pink-200/70">
          Choose how long the background music plays during the birthday surprise:
        </p>

        <div className="grid grid-cols-5 gap-2 pt-1">
          {[0.5, 1, 2, 3, 4].map((dur) => {
            const isSel = (wish.musicDurationMinutes || 2) === dur;
            return (
              <button
                key={dur}
                type="button"
                onClick={() => onChange({ musicDurationMinutes: dur })}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                  isSel
                    ? 'bg-pink-500 text-white border-pink-400 shadow-md shadow-pink-500/30'
                    : 'bg-white/5 text-pink-200 border-white/10 hover:bg-white/10'
                }`}
              >
                {dur === 0.5 ? '0.5 min (30s)' : `${dur} min`}
              </button>
            );
          })}
        </div>
      </div>

      {wish.song === 'custom' && (
        <div className="space-y-3 p-4 rounded-2xl border border-pink-500/30 bg-[#190e24]">
          <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">
            UPLOAD CUSTOM AUDIO OR PASTE DIRECT LINK
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <label className="flex-1 px-4 py-2.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-xs font-bold text-pink-200 cursor-pointer text-center flex items-center justify-center gap-2">
              <span>🎵 Upload Audio File from Gallery</span>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    onChange({ customSongUrl: url });
                  }
                }}
              />
            </label>
          </div>

          <input
            type="url"
            value={wish.customSongUrl || ''}
            onChange={(e) => onChange({ customSongUrl: e.target.value })}
            placeholder="Or paste direct URL: https://example.com/song.mp3"
            className="w-full px-4 py-2.5 bg-[#12071a] border border-pink-500/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
        </div>
      )}

      <p className="text-[11px] text-pink-200/50 leading-relaxed text-center">
        Tap a card to preview it — tap again to stop. Pick one of the built-in tracks or use custom audio.
      </p>

      <div className="pt-2 flex justify-between items-center">
        <button
          type="button"
          onClick={onNext}
          className="text-xs font-semibold text-pink-300/70 hover:text-white transition-colors"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={() => {
            stopBackgroundMusic();
            setIsPlaying(false);
            onNext();
          }}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};
