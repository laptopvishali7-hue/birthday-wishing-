import React, { useState, useEffect } from 'react';
import { WishData } from '../../types';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, ArrowRight } from 'lucide-react';

interface PuzzleStageProps {
  wish: WishData;
  onNextStage: () => void;
}

// Solved grid state: [0, 1, 2, 3, 4, 5, 6, 7, 8] where 8 is blank
const SOLVED = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const PuzzleStage: React.FC<PuzzleStageProps> = ({ wish, onNextStage }) => {
  const [board, setBoard] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  const puzzleImg = wish.puzzleImage || wish.memories[0]?.url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800';

  // Shuffle board on mount
  const handleShuffle = () => {
    let newBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // Perform valid random swaps
    for (let i = 0; i < 20; i++) {
      const emptyIdx = newBoard.indexOf(8);
      const validMoves: number[] = [];
      const row = Math.floor(emptyIdx / 3);
      const col = emptyIdx % 3;

      if (row > 0) validMoves.push(emptyIdx - 3);
      if (row < 2) validMoves.push(emptyIdx + 3);
      if (col > 0) validMoves.push(emptyIdx - 1);
      if (col < 2) validMoves.push(emptyIdx + 1);

      const randomTarget = validMoves[Math.floor(Math.random() * validMoves.length)];
      // Swap
      const temp = newBoard[emptyIdx];
      newBoard[emptyIdx] = newBoard[randomTarget];
      newBoard[randomTarget] = temp;
    }
    setBoard(newBoard);
    setMoves(0);
    setIsSolved(false);
  };

  useEffect(() => {
    handleShuffle();
  }, []);

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    const emptyIdx = board.indexOf(8);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIdx / 3);
    const emptyCol = emptyIdx % 3;

    // Check adjacency
    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newBoard = [...board];
      newBoard[emptyIdx] = newBoard[index];
      newBoard[index] = 8;
      setBoard(newBoard);
      setMoves(moves + 1);

      // Check if solved
      if (newBoard.every((val, i) => val === SOLVED[i])) {
        setIsSolved(true);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const handleAutoSolve = () => {
    setBoard([...SOLVED]);
    setIsSolved(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center animate-fadeIn relative z-10 space-y-6 max-w-md mx-auto pb-16">
      {/* Title Header */}
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-bold text-white tracking-wide">
          Birthday Puzzle 🎂
        </h2>
        <p className="text-xs text-pink-200/80">
          Solve to unlock a special message ✨
        </p>
      </div>

      {/* Stats Counter & Thumbnail */}
      <div className="flex items-center justify-center gap-6">
        <div>
          <p className="text-3xl font-bold font-mono text-white">{moves}</p>
          <p className="text-[10px] font-bold tracking-widest text-pink-300 uppercase">MOVES</p>
        </div>
        <div className="w-12 h-12 rounded-xl border border-pink-500/40 overflow-hidden shadow-lg">
          <img src={puzzleImg} alt="Target" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* 3x3 Tile Grid */}
      <div className="w-72 h-72 p-2 bg-[#190e24] border-2 border-pink-500/40 rounded-2xl shadow-2xl grid grid-cols-3 grid-rows-3 gap-1 relative overflow-hidden">
        {board.map((tileVal, tileIdx) => {
          if (tileVal === 8 && !isSolved) {
            // Blank space
            return <div key={tileIdx} className="bg-black/40 rounded-lg" />;
          }

          // Calculate background position offset for 3x3 piece
          const correctPos = tileVal;
          const bgX = (correctPos % 3) * 50;
          const bgY = Math.floor(correctPos / 3) * 50;

          return (
            <button
              key={tileIdx}
              onClick={() => handleTileClick(tileIdx)}
              className="w-full h-full rounded-lg overflow-hidden relative shadow transition-all cursor-pointer active:scale-95 border border-white/20"
              style={{
                backgroundImage: `url(${puzzleImg})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${bgX}% ${bgY}%`,
              }}
            />
          );
        })}
      </div>

      {/* Controls & Helpers */}
      <div className="space-y-3">
        {!isSolved ? (
          <div className="flex justify-center gap-3">
            <button
              onClick={handleShuffle}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-pink-500/30 text-xs font-semibold text-pink-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Shuffle Again
            </button>
            <button
              onClick={handleAutoSolve}
              className="px-4 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-xs font-semibold text-pink-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Solve it for me
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-bold text-sm animate-bounce">
            🎉 Puzzle complete!
          </div>
        )}
      </div>

      {/* Next Surprise Button */}
      <div className="pt-2">
        <button
          onClick={onNextStage}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 text-white font-bold text-base shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>One Last Surprise</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
