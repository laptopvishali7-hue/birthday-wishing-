import React, { useState, useEffect } from 'react';
import { WishData, DEFAULT_WISH_DATA } from './types';
import { decodeWishFromHash, getWishFromStorage } from './utils/urlHelper';
import { getWishFromFirebase } from './lib/firebaseService';
import { HomeDashboard } from './components/HomeDashboard';
import { CreatorWizard } from './components/Creator/CreatorWizard';
import { RecipientJourney } from './components/Recipient/RecipientJourney';
import { Sparkles } from 'lucide-react';

type AppView = 'home' | 'wizard' | 'recipient';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [activeWish, setActiveWish] = useState<WishData>(DEFAULT_WISH_DATA);
  const [isLoadingWish, setIsLoadingWish] = useState(false);

  // Check URL on load for shared wish parameters (e.g. ?id=wish_123 or ?name=Rahul or #wish=...)
  useEffect(() => {
    const checkUrlWish = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get('id') || params.get('wishId');
      const queryName = params.get('name');

      // 1. First priority: Check Cloud Firestore for queryId
      if (queryId) {
        setIsLoadingWish(true);
        try {
          const cloudWish = await getWishFromFirebase(queryId);
          if (cloudWish) {
            if (queryName) {
              cloudWish.recipientName = queryName;
            }
            setActiveWish(cloudWish);
            setView('recipient');
            setIsLoadingWish(false);
            return;
          }
        } catch (err) {
          console.warn('Error loading wish from cloud:', err);
        }
        setIsLoadingWish(false);
      }

      // 2. Second priority: Try decoding from hash (#wish=...)
      if (hash && hash.includes('#wish=')) {
        const decoded = decodeWishFromHash(hash);
        if (decoded) {
          if (queryName) {
            decoded.recipientName = queryName;
          }
          setActiveWish(decoded);
          setView('recipient');
          return;
        }
      }

      // 3. Third priority: Try looking up in local storage if queryId exists
      if (queryId) {
        const stored = getWishFromStorage(queryId);
        if (stored) {
          if (queryName) {
            stored.recipientName = queryName;
          }
          setActiveWish(stored);
          setView('recipient');
          return;
        }
      }

      // 4. Fourth priority: If direct ?name=Rahul parameter is supplied
      if (queryName && queryName.trim()) {
        const customWish: WishData = {
          ...DEFAULT_WISH_DATA,
          id: `wish_${Date.now()}`,
          recipientName: queryName.trim(),
        };
        setActiveWish(customWish);
        setView('recipient');
        return;
      }
    };

    checkUrlWish();
  }, []);

  const handleStartNew = () => {
    const newWish: WishData = {
      ...DEFAULT_WISH_DATA,
      id: `wish_${Date.now()}`,
      recipientName: '',
      birthDate: '2006-05-01',
      pin: '1234',
      pinHint: '',
      createdAt: Date.now(),
    };
    setActiveWish(newWish);
    setView('wizard');
  };

  const handleEditWish = (wish: WishData) => {
    setActiveWish(wish);
    setView('wizard');
  };

  const handleOpenWish = (wish: WishData) => {
    setActiveWish(wish);
    setView('recipient');
  };

  if (isLoadingWish) {
    return (
      <div className="min-h-screen bg-[#0f0814] text-white flex flex-col items-center justify-center p-6 space-y-4">
        <div className="p-4 rounded-3xl bg-pink-500/20 border border-pink-500/40 text-pink-300 animate-bounce">
          <Sparkles className="w-8 h-8 text-amber-300" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-white">Unwrapping Your Birthday Surprise...</h3>
          <p className="text-xs text-pink-200/70">Fetching custom photos, song & memories from Cloud</p>
        </div>
        <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-pink-500 to-amber-400 animate-pulse w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0814] text-white">
      {view === 'home' && (
        <HomeDashboard
          onStartNew={handleStartNew}
          onOpenWish={handleOpenWish}
          onEditWish={handleEditWish}
        />
      )}

      {view === 'wizard' && (
        <CreatorWizard
          initialWish={activeWish}
          onGoHome={() => setView('home')}
          onPlayFullPreview={(wish) => {
            setActiveWish(wish);
            setView('recipient');
          }}
        />
      )}

      {view === 'recipient' && (
        <RecipientJourney
          wish={activeWish}
          onExitPreview={() => setView('wizard')}
          onCreateNew={handleStartNew}
        />
      )}
    </div>
  );
}

