import React, { useState, useEffect } from 'react';
import { WishData, DEFAULT_WISH_DATA } from './types';
import { decodeWishFromHash, getWishFromStorage } from './utils/urlHelper';
import { HomeDashboard } from './components/HomeDashboard';
import { CreatorWizard } from './components/Creator/CreatorWizard';
import { RecipientJourney } from './components/Recipient/RecipientJourney';

type AppView = 'home' | 'wizard' | 'recipient';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [activeWish, setActiveWish] = useState<WishData>(DEFAULT_WISH_DATA);

  // Check URL on load for shared wish parameters (e.g. ?name=Rahul or #wish=...)
  useEffect(() => {
    const checkUrlWish = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get('id');
      const queryName = params.get('name');

      // 1. Try decoding from hash (#wish=...)
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

      // 2. Try looking up in localStorage if queryId exists
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

      // 3. If direct ?name=Rahul parameter is supplied
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
