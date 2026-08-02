import React, { useState } from 'react';
import { UserProfile, saveUserProfile, signOutUser } from '../utils/userAuth';
import { User, LogIn, LogOut, Check, Sparkles, X, Mail, ShieldCheck, Heart } from 'lucide-react';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUserChange: (user: UserProfile | null) => void;
}

const AVATAR_OPTIONS = [
  '💖', '🌟', '👑', '🎉', '🎁', '🎈', '🌸', '✨', '🎂', '🥳', '🦄', '🚀'
];

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
}) => {
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '💖');
  const [signature, setSignature] = useState(currentUser?.signature || 'With love, ' + (currentUser?.name || ''));
  const [activeTab, setActiveTab] = useState<'quick' | 'email'>('quick');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleQuickSignIn = (demoName: string, demoEmail: string, demoAvatar: string) => {
    const profile = saveUserProfile({
      name: demoName,
      email: demoEmail,
      avatar: demoAvatar,
      signature: `With love, ${demoName}`,
    });
    onUserChange(profile);
    setSuccessMsg(`Welcome, ${demoName}! Signed in successfully.`);
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const profile = saveUserProfile({
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      avatar: avatar,
      signature: signature.trim() || `With love, ${name.trim()}`,
    });

    onUserChange(profile);
    setSuccessMsg('Profile updated & signed in successfully! ✨');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1500);
  };

  const handleSignOut = () => {
    signOutUser();
    onUserChange(null);
    setName('');
    setEmail('');
    setSignature('');
    setSuccessMsg('Signed out successfully.');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-[#180e26] border-2 border-pink-500/40 rounded-3xl shadow-2xl overflow-hidden relative text-white">
        
        {/* Header */}
        <div className="p-5 border-b border-pink-500/20 flex items-center justify-between bg-gradient-to-r from-pink-900/30 via-purple-900/30 to-rose-900/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-pink-500/20 border border-pink-500/40 text-pink-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">User Account & Signature</h3>
              <p className="text-xs text-pink-200/70">
                {currentUser ? 'Manage your logged-in profile' : 'Sign in to personalize birthday wishes'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-pink-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 bg-emerald-500/20 border-b border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {currentUser ? (
            /* Logged In View */
            <div className="space-y-6 text-center">
              <div className="p-6 rounded-3xl bg-pink-500/10 border border-pink-500/30 space-y-3">
                <div className="text-5xl">{currentUser.avatar}</div>
                <div>
                  <h4 className="text-xl font-bold text-white">{currentUser.name}</h4>
                  <p className="text-xs text-pink-300/80 font-mono">{currentUser.email}</p>
                </div>

                <div className="pt-2 border-t border-pink-500/20 text-xs text-pink-200/90 italic">
                  "{currentUser.signature}"
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-semibold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Signed In & Verified</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSignOut}
                  className="flex-1 py-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Sign In Options */
            <div className="space-y-5">
              {/* Tab Selector */}
              <div className="flex p-1 rounded-2xl bg-black/40 border border-pink-500/30">
                <button
                  type="button"
                  onClick={() => setActiveTab('quick')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'quick'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'text-pink-200/70 hover:text-white'
                  }`}
                >
                  ⚡ One-Click Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('email')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'email'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'text-pink-200/70 hover:text-white'
                  }`}
                >
                  ✉️ Manual Sign In
                </button>
              </div>

              {activeTab === 'quick' ? (
                <div className="space-y-3">
                  <p className="text-xs text-pink-200/80 leading-relaxed text-center">
                    Select a quick profile to sign in instantly with Google / Social account:
                  </p>

                  <button
                    type="button"
                    onClick={() => handleQuickSignIn('Vishal Bhoi', 'vishalbhoi@gmail.com', '👑')}
                    className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-between text-left transition-all active:scale-98 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👑</span>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-pink-300">
                          Vishal Bhoi
                        </div>
                        <div className="text-[11px] text-pink-200/60 font-mono">
                          vishalbhoi@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold group-hover:bg-pink-500 group-hover:text-white transition-all">
                      Sign In
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickSignIn('Rahul Sharma', 'rahul.sharma@gmail.com', '🌟')}
                    className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-between text-left transition-all active:scale-98 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🌟</span>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-pink-300">
                          Rahul Sharma
                        </div>
                        <div className="text-[11px] text-pink-200/60 font-mono">
                          rahul.sharma@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold group-hover:bg-pink-500 group-hover:text-white transition-all">
                      Sign In
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickSignIn('Priya Patel', 'priya.patel@gmail.com', '💖')}
                    className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-between text-left transition-all active:scale-98 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💖</span>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-pink-300">
                          Priya Patel
                        </div>
                        <div className="text-[11px] text-pink-200/60 font-mono">
                          priya.patel@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold group-hover:bg-pink-500 group-hover:text-white transition-all">
                      Sign In
                    </div>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-pink-200 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (!signature || signature.startsWith('With love, ')) {
                          setSignature(`With love, ${e.target.value}`);
                        }
                      }}
                      placeholder="Enter your name (e.g. Vishal Bhoi)"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-pink-500/40 text-white font-medium text-sm focus:outline-none focus:border-pink-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-pink-200 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-pink-500/40 text-white font-medium text-sm focus:outline-none focus:border-pink-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-pink-200 mb-1">
                      Choose Your Badge Avatar
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {AVATAR_OPTIONS.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setAvatar(a)}
                          className={`p-2.5 text-xl rounded-xl border transition-all ${
                            avatar === a
                              ? 'bg-pink-500/30 border-pink-400 scale-110'
                              : 'bg-black/30 border-white/10 hover:border-pink-500/40'
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-pink-200 mb-1">
                      Default Signature Line
                    </label>
                    <input
                      type="text"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="With love, Vishal"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-pink-500/40 text-white font-medium text-sm focus:outline-none focus:border-pink-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In & Save Profile</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
