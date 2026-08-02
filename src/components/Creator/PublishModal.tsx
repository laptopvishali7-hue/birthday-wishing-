import React, { useState } from 'react';
import { WishData } from '../../types';
import {
  getShareableWishUrl,
  getWhatsAppShareUrl,
  generateQrCodeSvg,
} from '../../utils/urlHelper';
import { X, Copy, Check, Play, Share2, Sparkles, QrCode } from 'lucide-react';

interface PublishModalProps {
  wish: WishData;
  onClose: () => void;
  onPlayFullPreview: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  wish,
  onClose,
  onPlayFullPreview,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const shareUrl = getShareableWishUrl(wish);
  const waUrl = getWhatsAppShareUrl(wish);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-[#140b1e] border border-pink-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400">
            READY TO PUBLISH
          </span>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            {wish.recipientName}'s birthday journey ✨
          </h2>
          <p className="text-xs text-pink-200/70">
            Play full-screen, copy your private link & QR code to send to {wish.recipientName}!
          </p>
        </div>

        {/* Summary Checklist */}
        <div className="p-4 rounded-2xl bg-[#1d0e2c] border border-pink-500/20 space-y-2.5 text-xs text-pink-200/90">
          <div className="flex items-center gap-2">
            <span className="text-base">🎁</span>
            <span>Animated 3D gift & secret PIN unlock ({wish.pin})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">📸</span>
            <span>{wish.memories.length} Photo memories, sliding puzzle & balloon wishes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">✨</span>
            <span>Scratch card reveal & handwritten letter</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">🔗</span>
            <span>Private shareable link + QR code</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          {/* Show Full Preview */}
          <button
            onClick={onPlayFullPreview}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-pink-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            Show full preview
          </button>

          {/* Copy Shareable Link */}
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3.5 py-2.5 bg-[#0e0716] border border-pink-500/30 rounded-xl text-xs font-mono text-pink-200 truncate focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 rounded-xl text-xs font-semibold text-pink-200 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer min-w-[100px] justify-center"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* WhatsApp Direct Share Button */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Share2 className="w-4 h-4" />
            Share via WhatsApp
          </a>

          {/* QR Code Toggle */}
          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className="w-full py-2.5 rounded-xl border border-pink-500/20 bg-white/5 hover:bg-white/10 text-xs font-semibold text-pink-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-pink-400" />
            {showQr ? 'Hide QR Code' : 'Show QR Code'}
          </button>

          {/* QR Code Graphic Box */}
          {showQr && (
            <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-pink-500/20 space-y-2 animate-fadeIn">
              <div dangerouslySetInnerHTML={{ __html: generateQrCodeSvg(shareUrl) }} />
              <p className="text-[11px] text-pink-300/80">
                Scan this QR code on any phone to open {wish.recipientName}'s surprise!
              </p>
            </div>
          )}
        </div>

        <div className="text-center pt-2">
          <p className="text-[11px] text-pink-200/50">
            This gift link works instantly anywhere without log in. Have fun celebrating! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};
