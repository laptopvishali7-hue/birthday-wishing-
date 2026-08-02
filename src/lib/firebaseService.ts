import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { WishData } from '../types';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(
  app,
  firebaseConfig.firestoreDatabaseId || '(default)'
);

/**
 * Saves full WishData to Cloud Firestore so anyone opening the link 
 * on any device will see all photos, songs, letters, and custom configurations.
 */
export async function saveWishToFirebase(wish: WishData): Promise<boolean> {
  try {
    const wishRef = doc(db, 'wishes', wish.id);
    await setDoc(wishRef, {
      id: wish.id,
      recipientName: wish.recipientName || 'Friend',
      fullData: wish,
      createdAt: wish.createdAt || Date.now(),
      updatedAt: Date.now(),
    });
    return true;
  } catch (err) {
    console.error('Error saving wish to Firebase Firestore:', err);
    return false;
  }
}

/**
 * Retrieves full WishData from Cloud Firestore by wishId
 */
export async function getWishFromFirebase(wishId: string): Promise<WishData | null> {
  if (!wishId) return null;
  try {
    const wishRef = doc(db, 'wishes', wishId);
    const snap = await getDoc(wishRef);
    if (snap.exists()) {
      const data = snap.data();
      if (data && data.fullData) {
        return data.fullData as WishData;
      }
    }
  } catch (err) {
    console.warn('Error fetching wish from Firebase Firestore:', err);
  }
  return null;
}
