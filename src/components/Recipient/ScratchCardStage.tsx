import React, { useRef, useEffect, useState } from 'react';
import { WishData } from '../../types';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ScratchCardStageProps {
  wish: WishData;
  onNextStage: () => void;
}

export const ScratchCardStage: React.FC<ScratchCardStageProps> = ({ wish, onNextStage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);

  const revealImage = wish.scratchCard.revealImage || wish.memories[0]?.url || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw metallic purple-pink foil gradient cover
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#c026d3');
    grad.addColorStop(0.5, '#e11d48');
    grad.addColorStop(1, '#7e22ce');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw silver foil pattern text overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch here 🪙', width / 2, height / 2 - 10);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('drag your finger across the card', width / 2, height / 2 + 15);
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Check scratched area percentage
    if (!isScratched) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let clearCount = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearCount++;
      }
      const percentage = clearCount / (pixels.length / 4);
      if (percentage > 0.4) {
        setIsScratched(true);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center animate-fadeIn relative z-10 space-y-6 max-w-md mx-auto pb-16">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-bold text-white tracking-wide">
          One Last Surprise ✨
        </h2>
        <p className="text-xs text-pink-200/80">
          Scratch the golden card to reveal it
        </p>
      </div>

      {/* Foil Scratch Card Container */}
      <div className="relative w-80 h-52 rounded-3xl overflow-hidden border-2 border-pink-500/40 shadow-[0_20px_50px_rgba(236,72,153,0.3)] bg-slate-900 select-none">
        {/* Hidden Reveal Layer underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <img
            src={revealImage}
            alt="Surprise"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800';
            }}
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
            <h3 className="font-display font-bold text-xl text-white drop-shadow-lg">
              {wish.scratchCard.title || 'Happy Birthday! 🎉'}
            </h3>
            <p className="text-xs font-medium text-pink-200 drop-shadow mt-1">
              {wish.scratchCard.message || 'You found the hidden surprise 💖'}
            </p>
          </div>
        </div>

        {/* Interactive Scratch Canvas Layer */}
        {!isScratched && (
          <canvas
            ref={canvasRef}
            width={320}
            height={208}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            onMouseDown={(e) => {
              isDrawing.current = true;
              const { x, y } = getCanvasCoords(e);
              scratch(x, y);
            }}
            onMouseMove={(e) => {
              if (isDrawing.current) {
                const { x, y } = getCanvasCoords(e);
                scratch(x, y);
              }
            }}
            onMouseUp={() => (isDrawing.current = false)}
            onTouchStart={(e) => {
              isDrawing.current = true;
              const { x, y } = getCanvasCoords(e);
              scratch(x, y);
            }}
            onTouchMove={(e) => {
              if (isDrawing.current) {
                const { x, y } = getCanvasCoords(e);
                scratch(x, y);
              }
            }}
            onTouchEnd={() => (isDrawing.current = false)}
          />
        )}
      </div>

      <p className="text-xs text-pink-200/80">
        {isScratched ? 'You uncovered it! 💖' : 'Scratch anywhere on the card above 👆'}
      </p>

      {/* Read My Letter Button */}
      <div className="pt-2">
        <button
          onClick={onNextStage}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 text-white font-bold text-base shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Read My Letter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
