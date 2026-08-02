import React, { useState } from 'react';
import { WishData, DEFAULT_WISH_DATA } from '../types';
import { getCreatedWishesList, deleteWishFromStorage, getShareableWishUrl, getCustomizedNameUrl, getWhatsAppShareNameUrl } from '../utils/urlHelper';
import { getUserProfile, UserProfile } from '../utils/userAuth';
import { UserAuthModal } from './UserAuthModal';
import { Plus, Gift, Sparkles, Play, Share2, Heart, Copy, Check, Send, Link, Trash2, User, UserCheck } from 'lucide-react';

interface HomeDashboardProps {
  onStartNew: () => void;
  onOpenWish: (wish: WishData) => void;
  onEditWish: (wish: WishData) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onStartNew,
  onOpenWish,
  onEditWish,
}) => {
  const [wishesList, setWishesList] = useState<WishData[]>(() => getCreatedWishesList());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [friendNameInput, setFriendNameInput] = useState('Rahul');
  const [generatedLink, setGeneratedLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getUserProfile());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleDeleteWish = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this birthday wish?')) {
      const updated = deleteWishFromStorage(id);
      setWishesList(updated);
    }
  };

  const handleGenerateLink = () => {
    const url = getCustomizedNameUrl(friendNameInput);
    setGeneratedLink(url);
    setLinkCopied(false);
  };

  const handleCopyGeneratedLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleCopyLink = (wish: WishData, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getShareableWishUrl(wish);
    navigator.clipboard.writeText(url);
    setCopiedId(wish.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f0814] text-white font-sans-custom p-4 sm:p-6 max-w-xl mx-auto space-y-8 relative z-10 pb-20">
      {/* Top User Sign In / Profile Navigation Bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎂</span>
          <span className="text-xs font-bold text-pink-300 tracking-wider uppercase">Wish Studio</span>
        </div>

        <button
          onClick={() => setIsAuthModalOpen(true)}
          className={`px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
            currentUser
              ? 'bg-pink-500/20 border-pink-400 text-pink-200 hover:bg-pink-500/30'
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }`}
        >
          {currentUser ? (
            <>
              <span className="text-sm">{currentUser.avatar}</span>
              <span className="truncate max-w-[100px] sm:max-w-[140px]">{currentUser.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </>
          ) : (
            <>
              <User className="w-3.5 h-3.5 text-pink-300" />
              <span>User Sign In</span>
            </>
          )}
        </button>
      </div>

      {/* App Branding Header */}
      <div className="text-center space-y-3 pt-2 animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-semibold text-pink-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>Interactive Birthday Wish Generator</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white leading-tight">
          Create Magical <span className="font-script text-pink-400 font-normal">Birthday Surprises</span>
        </h1>

        <p className="text-sm text-pink-200/70 max-w-md mx-auto leading-relaxed">
          Unwrap 3D gifts, blow real candles, pop wish balloons, solve photo puzzles, scratch cards, and unseal handwritten letters for your friends!
        </p>
      </div>



      {/* Features Showcase Pill Badges */}
      <div className="grid grid-cols-2 gap-2.5 text-xs text-pink-200/80">
        <div className="p-3 rounded-2xl bg-[#160c22] border border-pink-500/20 flex items-center gap-2">
          <span className="text-lg">🎁</span>
          <span>3D Gift Box & PIN</span>
        </div>
        <div className="p-3 rounded-2xl bg-[#160c22] border border-pink-500/20 flex items-center gap-2">
          <span className="text-lg">🎂</span>
          <span>Interactive Candle Blow</span>
        </div>
        <div className="p-3 rounded-2xl bg-[#160c22] border border-pink-500/20 flex items-center gap-2">
          <span className="text-lg">🧩</span>
          <span>Photo Sliding Puzzle</span>
        </div>
        <div className="p-3 rounded-2xl bg-[#160c22] border border-pink-500/20 flex items-center gap-2">
          <span className="text-lg">💌</span>
          <span>Handwritten Letter</span>
        </div>
      </div>

      {/* Wish List / Drafts Section */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-pink-300">
            My Wish Journeys ({wishesList.length})
          </h2>
          <button
            onClick={() => onOpenWish(DEFAULT_WISH_DATA)}
            className="text-xs text-pink-400 hover:text-pink-300 underline font-semibold"
          >
            Play Demo Surprise
          </button>
        </div>

        <div className="space-y-3">
          {wishesList.map((w) => (
            <div
              key={w.id}
              onClick={() => onOpenWish(w)}
              className="p-4 rounded-2xl bg-[#170c24] border border-pink-500/30 hover:border-pink-500/60 transition-all cursor-pointer shadow-lg space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center text-lg shadow">
                    🎂
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-base group-hover:text-pink-300 transition-colors">
                      {w.recipientName || 'Untitled Friend'}
                    </p>
                    <p className="text-xs text-pink-200/60 font-mono">
                      PIN: {w.pin} · {w.birthDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDeleteWish(w.id, e)}
                    title="Delete Wish"
                    className="p-2 rounded-full bg-rose-500/10 hover:bg-rose-500/30 text-rose-300 hover:text-rose-100 transition-all border border-rose-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-pink-500 text-white transition-all">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-2 border-t border-pink-500/10 text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditWish(w);
                  }}
                  className="text-pink-300 hover:text-white font-medium"
                >
                  Edit details
                </button>

                <button
                  onClick={(e) => handleCopyLink(w, e)}
                  className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30"
                >
                  {copiedId === w.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      Copied Link!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy Share Link
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Full Customization CTA Button at Bottom */}
      <div className="text-center pt-6">
        <button
          onClick={onStartNew}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 text-white font-bold text-base shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          <span>Build Full Multi-Stage Surprise</span>
        </button>
      </div>

      {/* User Auth Modal */}
      <UserAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUserChange={(updated) => setCurrentUser(updated)}
      />
    </div>
  );
};
