import React, { useState, useEffect, useRef } from 'react';
import { WishData } from '../../types';
import { CAKE_CONFIGS } from '../Creator/Step4Cake';
import { playCandleBlowSound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Flame, Mic, RotateCcw, Heart, ArrowRight } from 'lucide-react';

interface CelebrationStageProps {
  wish: WishData;
  onNextStage: () => void;
}

export const CelebrationStage: React.FC<CelebrationStageProps> = ({ wish, onNextStage }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [micActive, setMicActive] = useState(false);
  const cakeCfg = CAKE_CONFIGS[wish.cakeType] || CAKE_CONFIGS.chocolate;

  // Calculate age stats
  const [ageStats, setAgeStats] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculate = () => {
      const birth = new Date(wish.birthDate || '2006-05-01').getTime();
      const now = Date.now();
      const diffMs = Math.max(0, now - birth);

      const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor(diffMs / (1000 * 60));

      setAgeStats({ years, days, hours, minutes });
    };

    calculate();
    const interval = setInterval(calculate, 30000);
    return () => clearInterval(interval);
  }, [wish.birthDate]);

  // Blow out candles handler
  const handleBlowOut = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    playCandleBlowSound();

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  const handleRelight = () => {
    setCandlesLit(true);
  };

  // Optional Microphone blow detection
  const startMicListener = async () => {
    try {
      setMicActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new AudioContext();
      const mic = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      mic.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        if (average > 65) {
          handleBlowOut();
          stream.getTracks().forEach((t) => t.stop());
          setMicActive(false);
        } else if (micActive) {
          requestAnimationFrame(checkVolume);
        }
      };
      checkVolume();
    } catch (err) {
      console.warn('Microphone permission denied:', err);
      setMicActive(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center animate-fadeIn relative z-10 space-y-6 max-w-lg mx-auto pb-16">
      {/* Title Header */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white flex items-center justify-center gap-2">
          Happy Birthday {wish.recipientName} 🎂
        </h1>
        <p className="text-xs font-semibold text-pink-300 flex items-center justify-center gap-1">
          The World Has Been Better Since <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </p>
      </div>

      {/* Realtime Age Statistics Box */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="p-3.5 rounded-2xl bg-[#170c24] border border-pink-500/20 shadow-lg">
          <p className="text-2xl font-bold font-mono text-white">{ageStats.years.toLocaleString()}</p>
          <p className="text-[10px] font-bold tracking-widest text-pink-300 uppercase">YEARS</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#170c24] border border-pink-500/20 shadow-lg">
          <p className="text-2xl font-bold font-mono text-white">{ageStats.days.toLocaleString()}</p>
          <p className="text-[10px] font-bold tracking-widest text-pink-300 uppercase">DAYS</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#170c24] border border-pink-500/20 shadow-lg">
          <p className="text-2xl font-bold font-mono text-white">{ageStats.hours.toLocaleString()}</p>
          <p className="text-[10px] font-bold tracking-widest text-pink-300 uppercase">HOURS</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#170c24] border border-pink-500/20 shadow-lg">
          <p className="text-2xl font-bold font-mono text-white">{ageStats.minutes.toLocaleString()}</p>
          <p className="text-[10px] font-bold tracking-widest text-pink-300 uppercase">MINUTES</p>
        </div>
      </div>

      {/* Interactive Birthday Cake */}
      <div
        onClick={handleBlowOut}
        className="relative group cursor-pointer my-4 flex flex-col items-center select-none"
      >
        {/* Candle Flames */}
        <div className="flex items-center gap-4 mb-1 z-20">
          <div className="flex flex-col items-center">
            {candlesLit ? (
              <div className="w-3.5 h-5 bg-amber-300 rounded-full animate-bounce shadow-[0_0_15px_#f59e0b] border border-amber-200" />
            ) : (
              <div className="w-1.5 h-4 bg-slate-400 opacity-60 rounded-full animate-pulse" />
            )}
            <div className="w-2 h-8 bg-white rounded-t border-t-2 border-amber-400 font-mono text-[9px] text-slate-800 font-bold flex items-center justify-center">
              2
            </div>
          </div>

          <div className="flex flex-col items-center">
            {candlesLit ? (
              <div className="w-3.5 h-5 bg-amber-300 rounded-full animate-bounce shadow-[0_0_15px_#f59e0b] border border-amber-200" />
            ) : (
              <div className="w-1.5 h-4 bg-slate-400 opacity-60 rounded-full animate-pulse" />
            )}
            <div className="w-2 h-8 bg-white rounded-t border-t-2 border-amber-400 font-mono text-[9px] text-slate-800 font-bold flex items-center justify-center">
              1
            </div>
          </div>
        </div>

        {/* Top Cake Tier */}
        <div className={`w-36 h-14 ${cakeCfg.cakeColor} rounded-t-2xl border-t-4 border-amber-300/40 relative flex items-center justify-center shadow-xl`}>
          <div className={`absolute top-0 inset-x-0 h-3 ${cakeCfg.frostingColor} rounded-t-2xl`} />
        </div>

        {/* Bottom Cake Tier */}
        <div className={`w-52 h-16 ${cakeCfg.cakeColor} rounded-t-3xl border-t-4 border-amber-300/40 relative shadow-2xl`}>
          <div className={`absolute top-0 inset-x-0 h-4 ${cakeCfg.frostingColor} rounded-t-3xl`} />
        </div>

        {/* Cake Stand Base */}
        <div className="w-60 h-4 bg-amber-100 rounded-full shadow-lg mt-1" />
      </div>

      {/* Candle Controls */}
      <div className="space-y-3">
        <p className="text-xs text-pink-200/80">
          {candlesLit ? 'Tap the cake to blow out the candles 🕯️' : 'Make a wish... 🌌'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {candlesLit ? (
            <button
              onClick={startMicListener}
              className={`px-4 py-2 rounded-full border border-pink-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                micActive ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/10 hover:bg-white/20 text-pink-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              {micActive ? 'Listening... Blow now!' : 'Blow with your breath'}
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-pink-500/30 text-xs font-semibold text-pink-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Relight
            </button>
          )}
        </div>
      </div>

      {/* Next Stage Button */}
      <div className="pt-4">
        <button
          onClick={onNextStage}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 text-white font-bold text-base shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>See Our Memories</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
